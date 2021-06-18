import Image from '../models/image.js';

export const getTotalImage = async (req, res) => {
    const id = req.params.id
    try {
        const totalNumber = await Image.count({idTask: id})

        res.status(201).json(totalNumber);
    } catch (error) {
        console.log(error)
    }
}

// CREATE ANNOTATION
export const createAnnotation = async( req, res ) => {

    const {pointX, pointY, length, width} = req.body;
    const imageId = req.params.id; 

    if(!imageId)
        return res.status(400).json({ errorMessage: "Task ID not given."});

    const image= await Image.findById(imageId);
    if(!image)
    return res.status(400).json({ errorMessage: "No image with this ID was found."});

    if (image.user.toString() !== req.user)
    return res.status(401).json({ errorMessage: "Unauthorized." });
    // save task in the database

    const annotations = {
        $set:{
        "annotater": req.user.id,
        "boundingBox.pointX": pointX,
        "boundingBox.pointY": pointY,
        "boundingBox.length": length,
        "boundingBox.width": width,
        }
    }
    // const newAnnotation = ({ pointX: pointX, pointY:pointY, 
    //                             length:length, width:width, 
    //                             idBoundingBox:req.id, annotater: req.user.id,
    //                         }).populate('annotater', 'id name');
    // console.log(req.body);

    // const savedAnnotation = await annotations.save();

        try {
            // await savedAnnotation.save();
            const result = await Image.updateOne(image, annotations);
            res.status(201).json(result);
    
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
