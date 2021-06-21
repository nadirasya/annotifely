import Verification from "../models/verification.js";
import Annotation from "../models/annotation.js";

export const createVerification = async (req, res) => {

    const {score, feedback,annotationId} = req.body;
    // const ObjectId = require('mongodb').ObjectID;

    if(!annotationId)
        return res.status(400).json({ errorMessage: "Annotatioin ID not given."});

    const annotation= await Annotation.findById(annotationId).populate('image', 'imageURL')

    if(!annotation)
    return res.status(400).json({ errorMessage: "No annotation with this ID was found."});

    // save verification in the database
    const newVerification = new Verification ({ score:score, feedback:feedback, annotater:annotation.annotater, verificator:req.user.id});
    
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
        const feedback = await Verification.find();

        return res.status(200).json(feedback);
    }
    catch(err) {
        res.status(500).send();
    }
}