import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    id: { type: String },
    idTask: { type: String },
    imageURL: { type: String },
    annotations: {
        idAnnotater: { type: String },
        boundingBox: {
            idBoundingBox: { type: String },
            pointX: { type: Number },
            pointY: { type: Number },
            length: { type: Number },
            width: { type: Number },
        },
        status: { type: Boolean },
    }
})

export default mongoose.model('Image', imageSchema);