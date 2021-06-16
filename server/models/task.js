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
    totalImage: { type: Number },
    totalAnnotaters: { type: Number, default: 0},
})

export default mongoose.model('Task', taskSchema);