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
