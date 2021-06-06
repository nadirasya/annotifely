import mongoose from 'mongoose';

const taskSchema = mongoose.Schema({
    id: { type: String },
    idClient: { type: String },
<<<<<<< HEAD
=======
    UrlImage: { type: String },
>>>>>>> Create a Task Form
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