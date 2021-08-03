import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
    id: { type: String },
    annotation: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Annotation' }],
    idBoundingBox: { type: String },
    verificator: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Verificator' }],
    score: { type: Number },
    feedback: { type: String },
})

export default mongoose.model('Verification', verificationSchema);