import express from 'express';

import { getClientById, getClients } from '../controllers/clients.js';
import { getClientTasks } from '../controllers/clients.js';
import findUser from '../middleware/findUser.js';


const router = express.Router();

router.get('/',getClients);
router.get('/getClientTasks', findUser, getClientTasks);
router.get('/getClientById/:idClient', getClientById);

export default router;