import Task from '../models/task.js';
import Image from '../models/image.js';

export const getTask = async( req, res ) => {
    try {
        console.log(req.user);

        const task = await Task.find({idClient: req.user.id});
        res.json(task);
    }
    catch(err) {
        res.status(500).send();
    }
};

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