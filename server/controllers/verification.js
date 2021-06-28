import Verification from "../models/verification.js";
import Annotation from "../models/annotation.js";
import Image from "../models/image.js";

export const createVerification = async (req, res) => {
    const verificationData = req.body;
    const total = verificationData?.length

    console.log("verificationData", verificationData)

    await verificationData?.map(async(verification, index) => {
        console.log(index+1, ". ", "annotatationId: ", verification.annotationId, " ", verification.verificationData.score, " ", verification.verificationData.feedback)
    

    if(!verification.annotationId)
        return res.status(400).json({ errorMessage: "annotation ID not given."});

    const annotation= await Annotation.findOne({_id: verification.annotationId});
    if(!annotation)
    return res.status(400).json({ errorMessage: "No annotation with this ID was found."});

    // save verification in the database
    const newVerification = new Verification ({ score:verification.verificationData.score, feedback:verification.verificationData.feedback, annotation:verification.annotationId, verificator:req.user.id});
    
    try {
        const savedVerification = await newVerification.save();
        return res.status(200).json(savedVerification);
    
        } catch (error) {
            console.log(error);
        }
    })
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