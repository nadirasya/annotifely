import Task from '../models/task.js';
import Image from '../models/image.js';
import mongoose from 'mongoose';

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find();
                
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error)
        // res.status(404).json({ message: error.message });
    }
}

export const createTask = async( req, res ) => {

    const {title, label, instruction, timespan, UrlImage } = req.body;

    // save task in the database
    const newTask = new Task ({ title: title, label:label, 
                                instruction:instruction, timeSpan:timespan, 
                                idClient:req.user.id,
                                createdAt: new Date().toISOString()
                            });
    // console.log(req.body);

    const savedTask = await newTask.save();
    
    // save image in the database
    UrlImage.map(async(image) => {
        const newImage = new Image ({ imageURL: image, idTask: savedTask._id});
        try {
            await newImage.save();
            res.status(201).json(newImage);
    
        } catch (error) {
            console.log(error);
        }
    })
    

};


//READ DATA FROM DATABASE
export const getClientTasks = async (req,res)  => {
    try {
        console.log(req.user); 

        const task = await Task.find({idClient: req.user.id});
        
        res.json(task);
    } 
    catch (error) {
        res.status(500).json({errorMessage: 'something went wrong'});
    }
}

export const updateTime = async( req, res ) => {
    try{
        const {timespan} = req.body;
        const taskId = req.params.id;

        if(!taskId)
        return res.status(400).json(taskId);

        const originalTask = await Task.findById(taskId);
        if(!originalTask)
        return res.status(400).json(originalTask);

        if (originalTask.idClient.toString() !== req.user.id)
            return res.status(400).json({ errorMesssage: "Unauthorized"});

        originalTask.timeSpan = timespan;

        const savedTask = await originalTask.save();

        res.status(201).json(savedTask);

    }
    catch(err){
        res.status(500).send();
    }
};

//READ DATA CLIENT FROM DATABASE
export const getClientById = async (req,res)  => {
    try {
        const client = await Client.find({id: req.idClient});

        res.status(200).json(client);
    }
    catch(err) {
        res.status(500).send();
    }
}
