import express from 'express';

import { getTasks, createTask, getClientTasks, updateTime, getClientById } from '../controllers/tasks.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.get('/',getTasks);
router.post('/createTask',findUser, createTask);
router.put('/updateTime/:id',findUser, updateTime);
router.get('/getClientById/:idClient', getClientById);
router.get('/downloadTasks/:id',downloadTask);
router.get('/getImageById/:id', getImageById);

export default router;