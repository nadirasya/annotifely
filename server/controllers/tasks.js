import Task from '../models/task.js';

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