
import mongoose from 'mongoose';
import Annotation from '../models/annotation.js';
import Image from '../models/image.js';
import task from '../models/task.js';
import Task from '../models/task.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {
    const {annotationsData} = req.body;

    const total = annotationsData.length
    await annotationsData.map(async(anno, index) => {
        if(!anno.imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

        const image= await Image.findOne({_id: anno.imageId});
        if(!image)
        return res.status(400).json({ errorMessage: "No image with this ID was found."});

        const task= await Task.findOne({_id: image.task});
        if(!task)
        return res.status(400).json({ errorMessage: "No task with this ID was found."});

        if(total-1 === index){
            task.totalAnnotater.push(req.user.id)
            const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });
        }

        const newAnnotation = new Annotation ({ 
            image:anno.imageId, 
            task: task._id, 
            annotater: req.user.id,
            boundingBox: anno.annotationData
        });
        try {
            const savedAnnotation = await newAnnotation.save();
            console.log(savedAnnotation);
        } catch (error) {
            console.log(error);
        }
    })
    res.status(200).json(annotationsData)   
    
};

//GET ALL ANNOTATION 
export const getAnnotation = async (req,res)  => {
    try {

        const annotation = await (await Annotation.find().populate('annotater task', 'name title totalImage'));
             
        res.status(200).json(annotation);
    }
    catch(err) {
        res.status(500).send();
    }
}

//GET ANNOTATION By ID TASK
export const getAnnotationByIdTask = async (req,res)  => {
    const {annotaterId} = req.query;
    try {
        const taskId = req.params.id;
        const annotation = await Annotation.find({task:taskId, annotater: annotaterId}).populate('annotater task', 'name title totalImage');
        res.status(200).json(annotation);
    }
    catch(err) {
        console.log(err)
        // res.status(500).send();
    }
}

//EDIT ANNOTATION BY ID TASK
export const editAnnotation = async( req, res ) => {
    
    const {annotationsData} = req.body;
    const taskId = req.params.id;

    if(!taskId)
    return res.status(400).json(taskId);

    const annotation = await Annotation.find({task:taskId});
    if(!annotation)
    return res.status(400).json(annotation);


    await annotationsData.map(async(anno, index) => {
        if(!anno.imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

        const image= await Image.findOne({_id:anno.imageId});
        if(!image)
        return res.status(400).json({ errorMessage: "No image with this ID was found."});

        const query={_id:annotation, annotater: req.user.id, image: anno.imageId}
        const result = await Annotation.updateOne(query, {$set: { "boundingBox" : anno.annotationData}});
        console.log("result is", result);

});
};