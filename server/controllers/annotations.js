import Annotation from '../models/annotation.js';
import Image from '../models/image.js';

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {

    const {pointX, pointY, length, width} = req.body;
    const imageId = req.params.id; 
    // const ObjectId = require('mongodb').ObjectID;

    if(!imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

    const image= await Image.findOne({_id: imageId});
    if(!image)
    return res.status(400).json({ errorMessage: "No image with this ID was found."});

    // save annotation in the database
    const newAnnotation = new Annotation ({ image:imageId, annotater: req.user.id, pointX: pointX, pointY:pointY, 
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