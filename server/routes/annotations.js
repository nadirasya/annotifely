import express from 'express';
import { createAnnotation, editAnnotation, getAnnotation, getAnnotationByIdTask, getAnnotationByIdAnnotater } from '../controllers/annotations.js';
import findUser from '../middleware/findUser.js';

const router = express.Router();

router.post('/createAnnotation', findUser, createAnnotation);
router.get('/getAnnotation', getAnnotation);
router.get('/getAnnotationByIdAnnotater', getAnnotationByIdAnnotater);
router.get('/getAnnotationByIdTask/:id', getAnnotationByIdTask);
router.put('/editAnnotation/:id', findUser, editAnnotation);
export default router;