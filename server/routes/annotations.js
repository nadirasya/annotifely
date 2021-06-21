import express from 'express';
import { createAnnotation, getAnnotation } from '../controllers/annotations.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.post('/createAnnotation', findUser, createAnnotation);
router.get('/getAnnotation', getAnnotation);

export default router;