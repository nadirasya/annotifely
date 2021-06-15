import Task from '../models/task.js';
import Image from '../models/image.js';
import Client from '../models/client.js';
import mongoose from 'mongoose';

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find();
        
        console.log('task hitted')
        // await tasks.map(async(task) => {
        //     const clientName = await Client.findById(task.idClient);
        //     // console.log("clientName", clientName.name)
        //     task['clientName'] = clientName.name
        // })
        // console.log("this is",tasks);
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

        const tasks = await Task.find({idClient: req.user.id});
        // console.log("client hitted")
        
        
        res.json(tasks);
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
    const { idClient } = req.params;
    try {
        const client = await Client.findById(idClient);
        // console.log("client", client)
        // console.log("client hitted")
        res.status(200).json(client);
    }
    catch(err) {
        console.log(err)
    }
}

//GET IMAGE BY ID TASK
export const getImageById = async (req,res)  => {
    try {
        const taskId = req.params.id;
        const image = await Image.find({idTask: taskId});

        res.status(200).json(image);
    }
    catch(err) {
        res.status(500).send();
    }
}

export const downloadTask = async (req,res)  => {
    try {
        const taskId = req.params.id;
        const image = await Image.find({idTask: taskId});

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