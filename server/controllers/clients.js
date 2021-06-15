import Client from '../models/client.js';

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