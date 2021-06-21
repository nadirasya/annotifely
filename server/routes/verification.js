import express from 'express';
import { createVerification, getVerification } from '../controllers/verification.js';

import findUser from '../middleware/findUser.js';

const router = express.Router();

router.post('/createVerification', findUser, createVerification);
router.get('/getVerification', getVerification);
export default router;