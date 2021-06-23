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

//GET ALL ANNOTATION 
export const getAnnotation = async (req,res)  => {
    try {
        const annotation = await Annotation.find().populate('annotater task', 'name title totalImage');
        res.status(200).json(annotation);
    }
    catch(err) {
        res.status(500).send();
    }
}
//GET ANNOTATION By ID IMAGE
export const getAnnotationByIdImage = async (req,res)  => {
    try {
        const imageId= req.params.id;
        const annotation = await Annotation.find({image:imageId}).populate('annotater task', 'name title totalImage');
        res.status(200).json(annotation);
    }
    catch(err) {
        res.status(500).send();
    }
}

//EDIT ANNOTATION BY ID IMAGE
export const editAnnotation = async( req, res ) => {
    try{
        const {x, y, height, width} = req.body;
        const imageId = req.params.id;

        if(!imageId)
        return res.status(400).json(imageId);
      
        const annotation = await Annotation.find({image:imageId});
        if(!annotation)
        return res.status(400).json(annotation);

        // if (annotation.annotater.toString() !== req.user.id)
        //     return res.status(400).json({ errorMesssage: "Unauthorized"});
        
            // const boundingBox = []; 
            // boundingBox.push ({
            //     x: x,
            //     y: y,
            //     height: height,
            //     width: width
            // });
        const query ={image:imageId, annotater:req.user.id}
        // console.log(query)
        const update = {
            $set: {'boundingBox.$.x':x,
                    'boundingBox.$.y':y,
                    'boundingBox.$.width':width,
                   'boundingBox.$.height':height}
        };
        console.log(update)
        const result = await Annotation.find(query);
        // annotation.boundingBox.x = x;
        // annotation.boundingBox.y = y;
        // annotation.boundingBox.height = height;
        // annotation.boundingBox.width = width;
        console.log(result)
        const savedAnnotation = await result.save();

        res.status(201).json(savedAnnotation);


    }
    catch(err){
        res.status(500).send();
    }
};