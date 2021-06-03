import mongoose from 'mongoose';

const verificationSchema = mongoose.Schema({
    id: { type: String },
    idAnnotater: { type: String },
    idVerificator: { type: String },
    score: { type: Number },
    feedback: { type: String },
})

export default mongoose.model('Verification', verificationSchema);