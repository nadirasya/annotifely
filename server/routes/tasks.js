import express from 'express';
import findUser from '../middleware/auth.js';
import { getClientTasks } from '../controllers/tasks.js';


const router = express.Router();

router.get('/getClientTask', findUser, getClientTasks);


export default router;