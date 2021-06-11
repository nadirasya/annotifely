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

    const newTask = new Task ({ title: title, label:label, 
                                instruction:instruction, timespan:timespan, 
                                UrlImage: UrlImage, idClient:req.user.id,
                                createdAt: new Date().toISOString()
                            });

    try {
          await newTask.save();
          res.status(201).json(newTask);

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

