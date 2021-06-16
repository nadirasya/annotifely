import Task from '../models/task.js';
import Image from '../models/image.js';

export const getTasks = async (req, res) => { 
    try {
        const tasks = await Task.find().populate('client', 'name');
        
        // console.log('task hitted')
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
                                client: req.user.id,
                                createdAt: new Date().toISOString()
                            }).populate ('client', 'id')
    // console.log(req.body);

    const savedTask = await newTask.save();
    
    // save image in the database
    UrlImage.map(async(image) => {
        const newImage = new Image ({ imageURL: image, task:savedTask._id }).populate ('task', 'id');
        try {
            await newImage.save();
            res.status(201).json(newImage);
    
        } catch (error) {
            console.log(error);
        }
    })
};

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
