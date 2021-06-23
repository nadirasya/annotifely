import mongoose from 'mongoose';

const annotationSchema = mongoose.Schema({
    id: { type: String },
    image: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image' }],
    annotater: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annotater' }],
    task: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task' }],
    boundingBox: [{
        idBoundingBox: { type: String },
        x: { type: Number },
        y: { type: Number },
        height: { type: Number },
        width: { type: Number },
    }],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})


export default mongoose.model('Annotation', annotationSchema);