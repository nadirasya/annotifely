import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    id: { type: String },
    task: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task' }],
    imageURL: { type: String },
    annotations: {
        annotater: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Annotater' }],
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