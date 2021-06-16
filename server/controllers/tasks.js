import Task from '../models/task.js';
import Image from '../models/image.js';

export const getTasks = async (req, res) => { 
    try {
        const task= await Task.aggregate([
            {  $unwind: "$image" },
                {$match: {'image._id': "$image._id"},
                $group: {
                _id: null },
                count: { $sum:1 }}
        ]);

        // if(!image)
        // return res.status(400).json(image);

        const tasks = await Task.find().populate('client image', 'name', $total );

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).send();
    }
}

// export const getTotal = async (req, res) => {
//     try {
//       const image= await Image.aggregate([
//         { $group: {
//             _id: {task:"$_id"},
//             count: { $sum: 1 }
//         }}
//     ]);
//     // const total = image[0].total + total;
//     console.log(image);
//     // if((await image).length > 0 ) {
//     //     total += image[0].total;
//     // }
//     //   res.status(200).json(image.total);
//     } catch (error) {
//         res.status(500).send();
//     }
// }

export const getTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const tasks = await Task.findById(id);

        if(!tasks)
        return res.status(400).json(tasks); 

        const image = await Image.find({task: id}).populate('task', 'id title label instruction timeSpan');

        res.status(200).json(image);
    } catch (error) {
        res.status(500).send();
    }
}

export const createTask = async( req, res ) => {

    const {title, label, instruction, timespan, UrlImage } = req.body;

    // save task in the database
    const newTask = new Task ({ title: title, label:label, 
                                instruction:instruction, timeSpan:timespan, 
                                client: req.user.id,
                                createdAt: new Date().toISOString()
                            }).populate ('client', 'id');
    // console.log(req.body);

    const savedTask = await newTask.save();
    
    // save image in the database
    UrlImage.map(async(image) => {
        const newImage = new Image ({ imageURL: UrlImage, task:savedTask._id }).populate ('task', 'id');
        try {
            await newImage.save();
            const url = new Task ({ image: newImage._id}).save();
            res.status(201).json(newImage);
    
        } catch (error) {
            res.status(500).send();
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
