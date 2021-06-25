import mongoose from 'mongoose';
import Annotation from '../models/annotation.js';
import Image from '../models/image.js';
import Task from '../models/task.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {
    const {annotationsData} = req.body;
    const lastIndex = true;

    console.log("annotationsData", annotationsData)

    const total = annotationsData?.length
    await annotationsData?.map(async(anno, index) => {
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
        const annotation = await Annotation.find().populate('annotater task', 'name title totalImage');
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

//EDIT ANNOTATION BY ID IMAGE
export const editAnnotation = async( req, res ) => {
    try{
        const {x, y, height, width,imageId} = req.body;
        const taskId = req.params.id;

        if(!taskId)
        return res.status(400).json(taskId);
      
        const annotation = await Annotation.find({task:taskId});
        if(!annotation)
        return res.status(400).json(annotation);

        // if (annotation.annotater.toString() !== req.user.id)
        //     return res.status(400).json({ errorMesssage: "Unauthorized"});
    
        //  console.log(image);
            const boundingBox = []; 
            boundingBox.push ({
                x: x,
                y: y,
                height: height,
                width: width
            });

        const query ={image:"60d2c99aa901552a88df1991",annotater:req.user.id}
        console.log(query)
        const update = {
            $set: {'boundingBox.$' : boundingBox}
        };
        console.log(update)
        const result = await Annotation.updateOne(query,update);
        console.log(result)
        // annotation.boundingBox = boundingBox;
        // const savedAnnotation = await annotation.save();
            // console.log(savedAnnotation);
        res.status(201).json(result); 

    }
    catch(err){
        res.status(500).send();
    }
};