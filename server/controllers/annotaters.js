import Annotater from '../models/annotater.js';

export const getAnnotater = async (req, res) => { 
    try {
        const annotater = await Annotater.find();
        res.status(200).json(annotater);
    } catch (error) {
        console.log(error)
        // res.status(404).json({ message: error.message });
    }
}

