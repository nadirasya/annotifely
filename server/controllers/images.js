import Task from '../models/task.js';
import Image from '../models/image.js';

//GET IMAGE BY ID IMAGE
export const getImageById = async (req,res)  => {
    try {
        const imageId = req.params.id;
        const image = await Image.findById(imageId).populate('task', 'title label instruction timeSpan')
        console.log("image", image);
        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}

//GET IMAGE BY ID Task
export const getImageByTask = async (req,res)  => {
    try {
        const taskId = req.params.id;
        const image = await Image.find({task: taskId}).populate('task', 'id title label instruction timeSpan')
        console.log("image", image);
        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}

export const createAnnotation = async( req, res ) => {

    const {pointX, pointY, length, width} = req.body;

    // save task in the database
    const newAnnotation = new Image({ pointX: pointX, pointY:pointY, 
                                length:length, width:width, 
                                idBoundingBox:req.id, annotater: req.user.id,
                            }).populate('annotater', 'id name');
    // console.log(req.body);

    const savedAnnotation = await newAnnotation.save();

        try {
            await savedAnnotation.save();
            res.status(201).json(savedAnnotation);
    
        } catch (error) {
            console.log(error);
        }
};

//GET ANNOTATION BY ID IMAGE
export const getAnnotation = async (req,res)  => {
    try {
        const imageId = req.params.id;
        const image = await Image.find(imageId);

        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}
