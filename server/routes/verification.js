import express from 'express';
import { createVerification, getVerificationById, getPerformanceScore } from '../controllers/verification.js';

import findUser from '../middleware/findUser.js';

const router = express.Router();

router.post('/createVerification', findUser, createVerification);
router.get('/getVerificationById/:id', findUser, getVerificationById);
router.get('/getPerformanceScore/:id', getPerformanceScore);
export default router;