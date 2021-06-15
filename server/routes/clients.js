import express from 'express';

import { getClients } from '../controllers/clients.js';
import { getClientTasks } from '../controllers/tasks.js';
import findUser from '../middleware/findUser.js';


const router = express.Router();

router.get('/',getClients);
router.get('/getClientTask', findUser, getClientTasks);

export default router;