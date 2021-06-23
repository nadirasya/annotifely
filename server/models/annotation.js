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
    annotation_boundingBox: {
        boundingBox: [{
            idBoundingBox: { type: String },
            pointX: { type: Number },
            pointY: { type: Number },
            length: { type: Number },
            width: { type: Number },
        }]
    },
})


export default mongoose.model('Annotation', annotationSchema);