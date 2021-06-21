import Annotation from '../models/annotation.js';
import Image from '../models/image.js';
import Task from '../models/task.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {

    console.log('hello new')
    const {x, y, length, width, imageId} = req.body;
    const lastIndex = true;
    // const {x, y, length, width, imageId, lastIndex} = req.body;
    // const imageId = req.params.id; 
    // const ObjectId = require('mongodb').ObjectID;
    console.log("this is", imageId)
    if(!imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

    const image= await Image.findOne({_id: imageId});
    if(!image)
    return res.status(400).json({ errorMessage: "No image with this ID was found."});

    if(lastIndex==true){
        const task= await Task.findOne({_id: image.task})
        if(!task)
        return res.status(400).json({ errorMessage: "No task with this ID was found."});
        
        task.totalAnnotater.push(req.user.id)
        const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true });
        // console.log("here is task", task._id)
        // const result = await Task.updateOne(
        //     {
        //         _id: task._id
        //     },
        //     {
        //         $set:{"totalAnnotater": task.totalAnnotater+1}
        //     }
        // )
    }
    
    // save annotation in the database
    const newAnnotation = new Annotation ({ image:imageId, annotater: req.user.id, pointX: x, pointY:y, 
        length:length, width:width
    })
    
    try {
        const savedAnnotation = await newAnnotation.save();
        res.status(200).json(savedAnnotation);
    
        } catch (error) {
            console.log(error);
        }
};


//GET ANNOTATION BY ID IMAGE
export const getAnnotation = async (req,res)  => {
    try {
        const image = await Annotation.find().populate('image', 'task imageURL' );

        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}