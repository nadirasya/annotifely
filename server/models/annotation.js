import mongoose from 'mongoose';

const annotationSchema = mongoose.Schema({
    id: { type: String },
    image: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image' }],
    annotater: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Annotater' }],
    pointX: { type: Number },
    pointY: { type: Number },
    length: { type: Number },
    width: { type: Number },
    status: { type: Boolean },
})

export default mongoose.model('Annotation', annotationSchema);