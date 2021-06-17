import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: { type: String },
    client: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Client' }],
    image: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image' }],
    annotater: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Annotater' }],
    title: { type: String },
    label: { type: String },
    instruction: { type: String },
    timeSpan: { type: Number },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    image: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Image' }],
})

export default mongoose.model('Task', taskSchema);