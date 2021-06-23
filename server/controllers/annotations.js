import mongoose from 'mongoose';
import Annotation from '../models/annotation.js';
import Image from '../models/image.js';
import Task from '../models/task.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {
    const {annotationData, imageId} = req.body;
    const lastIndex = true;

    if(!imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

    const image= await Image.findOne({_id: imageId});
    if(!image)
    return res.status(400).json({ errorMessage: "No image with this ID was found."});

    const task= await Task.findOne({_id: image.task});
    if(lastIndex==true){
        if(!task)
        return res.status(400).json({ errorMessage: "No task with this ID was found."});
        
        task.totalAnnotater.push(req.user.id)
        const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });
    }
    const newAnnotation = new Annotation ({ 
        image:imageId, 
        task: task._id, 
        annotater: req.user.id,
        boundingBox: annotationData
    });
    try {
        const savedAnnotation = await newAnnotation.save();
        console.log(savedAnnotation);
        res.status(200).json(savedAnnotation);
    
    } catch (error) {
        console.log(error);
    }
};

//GET ANNOTATION BY ID IMAGE
export const getAnnotation = async (req,res)  => {
    try {
        const annotation = await Annotation.find().populate('annotater task', 'name title totalImage');
        res.status(200).json(annotation);
    }
    catch(err) {
        res.status(500).send();
    }
}

//EDIT ANNOTATION BY ID IMAGE
export const editAnnotation = async( req, res ) => {
    try{
        const {x, y, length, width} = req.body;
        const annotationId = req.params.id;

        if(!annotationId)
        return res.status(400).json(annotationId);

        const annotation = await Annotation.findById(annotationId);
        if(!annotation)
        return res.status(400).json(annotation);

        if (annotation.annotater.toString() !== req.user.id)
            return res.status(400).json({ errorMesssage: "Unauthorized"});

        annotation.pointX = x;
        annotation.pointY = y;
        annotation.length = length;
        annotation.width = width;

        const savedAnnotation = await annotation.save();

        res.status(201).json(savedAnnotation);

    }
    catch(err){
        res.status(500).send();
    }
};