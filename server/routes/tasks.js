import express from 'express';

import { getTasks, createTask, updateTime, downloadTask, getTasksById } from '../controllers/tasks.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.get('/',getTasks);
// router.get('/getTotal', getTotal);
router.get('/getTasksById/:id', getTasksById);
router.post('/createTask',findUser, createTask);
router.put('/updateTime/:id',findUser, updateTime);
router.get('/downloadTasks/:id', downloadTask);

export default router;