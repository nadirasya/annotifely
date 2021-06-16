import express from 'express';
import { createAnnotation, getAnnotation, getImageById, getImageByTask } from '../controllers/images.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.get('/getImageById', getImageById);
router.get('/getImageByTask/:id', getImageByTask);
router.post('/createAnnotation', findUser, createAnnotation);
router.get('/getAnnotation/:id', getAnnotation);

export default router;

