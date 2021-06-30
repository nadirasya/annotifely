import express from 'express';
import { createVerification, getVerification, getVerificationById } from '../controllers/verification.js';

import findUser from '../middleware/findUser.js';

const router = express.Router();

router.post('/createVerification', findUser, createVerification);
router.get('/getVerification', findUser, getVerification);
router.get('/getVerificationById/:id', findUser, getVerificationById);
export default router;