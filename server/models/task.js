import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: { type: String },
    title: { type: String },
    label: { type: String },
    instruction: { type: String },
    timeSpan: { type: Number },
    createdAt: { type: Date, default: new Date() },
    totalImage: { type: Number },
    totalAnnotater: { type: [String],default: [] },
    client: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }],
})

export default mongoose.model('Task', taskSchema);