import Task from '../models/task.js';
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
                                instruction:instruction, timespan:timespan, 
                                idClient:req.user.id,
                                createdAt: new Date().toISOString()
                            });

    const savedTask = await newTask.save();
    
    // save image in the database
    const newImage = new Image ({ imageURL: UrlImage, idTask: savedTask._id});

    try {
        await newImage.save();
        res.status(201).json(newImage);

    } catch (error) {
        console.log(error);
    }

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

