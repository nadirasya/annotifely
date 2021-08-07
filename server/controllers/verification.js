import Verification from "../models/verification.js";
import Annotation from "../models/annotation.js";
import Image from "../models/image.js";

export const createVerification = async (req, res) => {
    const verificationData = req.body;

    await verificationData.map(async(verification) => {
        console.log(verification)
        if(!verification.annotationId)
            return res.status(400).json({ errorMessage: "annotation ID not given."});

        const annotation= await Annotation.findOne({_id: verification.annotationId});
        if(!annotation)
        return res.status(400).json({ errorMessage: "No annotation with this ID was found."});

        await Annotation.updateOne({_id: annotation}, {$set: { "totalScore" : verification.totalScore}});

        const newVerification = new Verification ({ feedback: verification.feedback, 
                                                    annotation: verification.annotationId,
                                                    verificator: req.user.id});

        try {
            const savedVerification = await newVerification.save();
            return res.status(200);    
        } catch (error) {
            console.log(error);
        }
    })
}


//GET VERIFICATION BY ID ANNOTATION 
export const getVerificationById = async (req, res) => {
    const { boundingBoxId } = req.query;

    try {
        const annotationId = req.params.id;
        if(annotationId !== undefined){
        const feedback = await Verification.find({annotation: annotationId, 'feedback.idBoundingBox': boundingBoxId}).populate('annotation', 'boundingBox');
        return res.status(200).json(feedback);
        }
    }
    catch(err) {
    }
}

//GET ANNOTATER PERFORMANCE SCORE BY ANNOTATER ID
export const getPerformanceScore = async (req, res) => {
    const { id } = req.params;
    let score = 0;
    let index = 0;
    try {
        const verifications = await Verification.find().populate('annotation', 'annotater');
        verifications.map((verification) => {
            if(verification.annotation[0].annotater[0].toString() === id.toString()){
                score += verification.score;
                index += 1;
            }
        })
        score = score/index;
        res.status(200).json(score);
    } catch (error) {
        res.status(500).send();
    }
}