import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
    id: { type: String },
    annotation: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Annotation' }],
    verificator: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Verificator' }],
    feedback: [{
        idBoundingBox: { type: mongoose.Schema.Types.ObjectId },
        score: { type: Number },
        criteria1: { type: Number },
        criteria2: { type: Number },
    }],
})

export default mongoose.model('Verification', verificationSchema);