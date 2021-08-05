import mongoose from 'mongoose';
import Annotation from '../models/annotation.js';
import Image from '../models/image.js';
import Task from '../models/task.js';
import Verification from '../models/verification.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {
    const {annotationsData} = req.body;

    const total = annotationsData.length;
    
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
            await Task.findByIdAndUpdate(task._id, task, { new: true });
        }

        const newAnnotation = new Annotation ({ 
            image:anno.imageId, 
            task: task._id, 
            annotater: req.user.id,
            boundingBox: anno.annotationData
        });
        try {
            const savedAnnotation = await newAnnotation.save();
            // console.log(savedAnnotation);
        } catch (error) {
            console.log(error);
        }
    })
    res.status(200).json(annotationsData)   
    
};

//GET ALL ANNOTATION 
export const getAnnotation = async (req,res)  => {
    try {
        const annotation = []
        const annotationData = await Annotation.find().populate('annotater task', 'name title totalImage createdAt');
        const verification = await Verification.find();
        annotationData.map((anno) => {
            const idChecker = verification.some((verif) => verif.annotation[0]._id.toString()==anno._id.toString())
            // console.log("anno", anno, "status", idChecker)
            if(idChecker === false) annotation.push(anno);
        })
        res.status(200).json(annotation);
    }
    catch(err) {
        res.status(500).send();
    }
}

//GET ANNOTATION BY ID TASK
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


    await annotationsData.map(async(anno) => {
        if(!anno.imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

        const image= await Image.findOne({_id:anno.imageId});
        if(!image)
        return res.status(400).json({ errorMessage: "No image with this ID was found."});

        const query={_id:annotation, annotater: req.user.id, image: anno.imageId};
        //UPDATE ANNOTATION
        await Annotation.updateOne(query, {$set: { "boundingBox" : anno.annotationData}, $unset: { totalScore: "" }});
        //REMOVE VERIFICATION
        await Verification.findOneAndDelete({annotation: annotation[0]._id});
});
};

//GET ANNOTATION BY ID ANNOTATER 
export const getAnnotationByIdAnnotater = async( req, res ) => {
    const {annotaterId} = req.query;
    
    try {
        const data = await Annotation.find({annotater: annotaterId}).populate('task', 'client title totalImage createdAt timeSpan');

        res.status(200).json(data);
    } catch (error) {
        res.status(500).send();
    }
}