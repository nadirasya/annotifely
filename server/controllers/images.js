import Image from '../models/image.js';
import mongoose from 'mongoose';

export const getTotalImage = async (req, res) => {
    const id = req.params.id
    try {
        const totalNumber = await Image.count({idTask: id})

        res.status(201).json(totalNumber);
    } catch (error) {
        console.log(error)
    }
}
