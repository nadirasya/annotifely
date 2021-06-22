import Verification from "../models/verification.js";
import Annotation from "../models/annotation.js";
import Image from "../models/image.js";

export const createVerification = async (req, res) => {

    const {score, feedback, imageId} = req.body;

    // console.log("this is", imageId)
    if(!imageId)
        return res.status(400).json({ errorMessage: "Image ID not given."});

    const image= await Image.findOne({_id: imageId});
    if(!image)
    return res.status(400).json({ errorMessage: "No image with this ID was found."});

    const annotation= await Annotation.find({image: image}).populate('annotater', 'id')

    if(!annotation)
    return res.status(400).json({ errorMessage: "No annotation with this ID was found."});

    // save verification in the database
    const newVerification = new Verification ({ score:score, feedback:feedback, imageId:imageId, annotater:annotation.annotater, verificator:req.user.id});
    
    try {
        const savedVerification = await newVerification.save();
        res.status(200).json(savedVerification);
    
        } catch (error) {
            console.log(error);
        }
}

//GET VERIFICATION BY ID TASK
export const getVerification = async (req,res)  => {
    try {
        const feedback = await Verification.find({annotater: req.user.id});

        return res.status(200).json(feedback);
    }
    catch(err) {
        res.status(500).send();
    }
}