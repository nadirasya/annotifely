import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import clientRoutes from './routes/clients.js';
import imageRoutes from './routes/images.js';
import annotationRoutes from './routes/annotations.js';
import verificationRoutes from './routes/verification.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// console.log("api key is", process.env.CLOUDINARY_API_KEY)

// cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/clients', clientRoutes);
app.use('/images', imageRoutes);
app.use('/annotations', annotationRoutes);
app.use('/verifications', verificationRoutes);


app.get('/', (req,res) => {
    res.send('Hello to annotifely application API');
})

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);