import Client from '../models/client.js';
import Task from '../models/task.js';

export const getClients = async (req, res) => { 
    try {
        const client = await Client.find();
        console.log('client hitted')
        res.status(200).json(client);
    } catch (error) {
        console.log(error)
        // res.status(404).json({ message: error.message });
    }
}

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

//READ DATA FROM DATABASE
export const getClientTasks = async (req,res)  => {
    try {
        console.log(req.user); 

        const tasks = await Task.find({client: req.user.id}).populate('client', 'id');
        console.log("client hitted")
        res.json(tasks);
    } 
    catch (error) {
        res.status(500).json({errorMessage: 'something went wrong'});
    }
}
