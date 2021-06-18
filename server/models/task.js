import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: { type: String },
    client: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Client' }],
    annotater: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Annotater' }],
    totalImage: { type: Number },
    totalAnnotater: { type: Number },
    title: { type: String },
    label: { type: String },
    instruction: { type: String },
    timeSpan: { type: Number },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    
})

export default mongoose.model('Task', taskSchema);