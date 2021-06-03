import mongoose from 'mongoose';

const annotaterSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    performanceScore: { type: Number },
    totalAnnotation: { type: Number },
})

export default mongoose.model('Annotater', annotaterSchema);