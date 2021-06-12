import express from 'express';

import { getTasks, createTask, getClientTasks, updateTime, getClientById } from '../controllers/tasks.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.get('/',getTasks);
router.post('/createTask',findUser, createTask);
router.get('/getClientTask', findUser, getClientTasks);
router.put('/updateTime/:id',findUser, updateTime);
router.get('/getClientById', getClientById);


export default router;