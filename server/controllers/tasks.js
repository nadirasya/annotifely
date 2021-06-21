import Task from '../models/task.js';
import Image from '../models/image.js';
import mongoose from 'mongoose';
import task from '../models/task.js';

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find().populate('client', 'name');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send();
    }
}

export const getTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await Task.findById(id);

        if(!tasks)
        return res.status(400).json(tasks); 

        const image = await Image.find({task: id}).populate('task', 'id title label instruction timeSpan');
        console.log("this is controller", image)
        res.status(200).json(image);
    } catch (error) {
        res.status(500).send();
    }
}

export const createTask = async( req, res ) => {

    const {title, label, instruction, timespan, UrlImage } = req.body;

    //count total image 
    const totalImage = UrlImage.length

    // save task in the database
    const newTask = new Task ({ title: title, label:label, 
                                instruction:instruction, timeSpan:timespan, 
                                client: req.user.id, totalImage: totalImage, totalAnnotater: [],
                                createdAt: new Date().toISOString(), 
                            }).populate ('client', 'id');
    // console.log(req.body);
    const savedTask = await newTask.save();
    
    // save image in the database
    UrlImage.map(async(image) => {
        const newImage = new Image ({ imageURL: image, task:savedTask._id })
        try {
            await newImage.save();
        } catch (error) {
            res.status(500).send();
        }
    })
};

// export const getTotalAnnotater = async (req, res) => {
//     const query = {}
// }

export const updateTime = async( req, res ) => {
    try{
        const {timespan} = req.body;
        const taskId = req.params.id;

        if(!taskId)
        return res.status(400).json(taskId);

        const originalTask = await Task.findById(taskId);
        if(!originalTask)
        return res.status(400).json(originalTask);

        if (originalTask.client.toString() !== req.user.id)
            return res.status(400).json({ errorMesssage: "Unauthorized"});

        originalTask.timeSpan = timespan;

        const savedTask = await originalTask.save();

        res.status(201).json(savedTask);

    }
    catch(err){
        res.status(500).send();
    }
};


export const downloadTask = async (req,res)  => {
    try {
        const taskId = req.params.id;
        const image = await Image.find({task: taskId}).populate('task', 'id');

        const path ="Data_Image.json"; 
        const filePath = fs.writeFileSync(path, JSON.stringify(image,0,2));
        filePath.on('finish',() => {
            filePath.close();
            console.log('Download Completed'); 
        });
        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}
