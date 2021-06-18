import mongoose from 'mongoose';

const imageSchema = mongoose.Schema({
    id: { type: String },
    task: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task' }],
    imageURL: { type: String },
})

export default mongoose.model('Image', imageSchema);