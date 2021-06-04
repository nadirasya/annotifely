import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    id: { type: String },
    name: { type: String },
    email: { type: String, required: true},
    password: { type: String, required: true},
})

export default mongoose.model('Client', clientSchema);