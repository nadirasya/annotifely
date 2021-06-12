import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Annotater from '../models/annotater.js';
import Client from '../models/client.js';
import Verificator from '../models/verificator.js';

export const signinAnnotater = async( req, res ) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await Annotater.findOne({ email });
        if(!existingUser) return res.status(401).json({ message: ' Annotater doesnt exist. '});

        const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials'});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'});
        // console.log("existing user", existingUser.email)

        res.status(200).json({ result: existingUser, token, role: "annotater" })
    } catch (error) {
        res.status(500).json({ messgae: 'Something went wrong' })
    }
};

export const signinClient = async( req, res ) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await Client.findOne({ email });
        if(!existingUser) return res.status(401).json({ message: ' Client doesnt exist. '});

        const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials'});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'});
        // console.log("existing user", existingUser.email)

        res.status(200).json({ result: existingUser, token, role: "client" })
    } catch (error) {
        res.status(500).json({ messgae: 'Something went wrong' })
    }
};

export const signinVerificator = async( req, res ) => {
    const { email, password, role } = req.body;
    try {
        const existingUser = await Verificator.findOne({ email });
        if(!existingUser) return res.status(401).json({ message: ' Verificator doesnt exist. '});

        const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({ message: 'invalid credentials'});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h'});
        // console.log("existing user", existingUser.email)

        res.status(200).json({ result: existingUser, token, role: "verificator" })
    } catch (error) {
        res.status(500).json({ messgae: 'Something went wrong' })
    }
};

export const signupAnnotater = async( req, res ) => {
    const { name, email, password } = req.body;

    try {
        console.log("from controller ", email, password);
        const existingUser = await Annotater.findOne({ email });

        if(existingUser) return res.status(400).json({ message: ' User already exist. '});

        const hashedPassword = await bycrypt.hash(password, 12);

        const result = await Annotater.create( { name, email, password: hashedPassword });
        
        const token = jwt.sign({ name: result.name, email: result.email, id: result._id }, 'test', { expiresIn: '1h'});

        res.status(200).json({ result: result, token, role: "annotater" })
    } catch (error) {
        console.log(error);
    }
};

export const signupClient= async( req, res ) => {
    const { name, email, password } = req.body;

    try {
        console.log("from controller ", email, password);
        const existingUser = await Client.findOne({ email });

        if(existingUser) return res.status(400).json({ message: ' User already exist. '});

        const hashedPassword = await bycrypt.hash(password, 12);

        const result = await Client.create( { name, email, password: hashedPassword });
        
        const token = jwt.sign({ name: result.name, email: result.email, id: result._id }, 'test', { expiresIn: '1h'});

        res.status(200).json({ result: result, token, role: "client" })
    } catch (error) {
        console.log(error);
    }
};