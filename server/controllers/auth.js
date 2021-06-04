import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Annotater from '../models/annotater.js';
import Client from '../models/client.js';
import Verificator from '../models/verificator.js';

export const signin = async( req, res ) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await Client.findOne({ email });
        if(!existingUser) return res.status(401).json({ message: ' User doesnt exist. '});

        const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials'});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'});
        console.log("existing user", existingUser.email)

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ messgae: 'Something went wrong' })
    }
};

export const signup = async( req, res ) => {
    const { email, password } = req.body;

    try {
        console.log("from controller ", email, password);
        const existingUser = await Client.findOne({ email });

        if(existingUser) return res.status(400).json({ message: ' User already exist. '});

        const hashedPassword = await bycrypt.hash(password, 12);

        const result = await Client.create( { email, password: hashedPassword });
        
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h'});

        res.status(200).json({ result: result, token })
    } catch (error) {
        console.log(error);
    }
};