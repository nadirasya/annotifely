import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
    id: { type: String },
    image: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image' }],
    annotater: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Annotater' }],
    verificator: [{ 
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Verificator' }],
    score: { type: Number },
    feedback: { type: String },
})

export default mongoose.model('Verification', verificationSchema);