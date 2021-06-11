import express from 'express';

import { getTask, createTask } from '../controllers/task.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.get('/',getTask);
router.post('/createTask',findUser, createTask);

export default router;