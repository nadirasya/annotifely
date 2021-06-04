import express from 'express';

import { signinAnnotater, signinClient, signinVerificator,signup } from '../controllers/auth.js';

const router = express.Router();

router.post('/signinAnnotater', signinAnnotater);
router.post('/signinClient', signinClient);
router.post('/signinVerificator', signinVerificator);
router.post('/signup', signup);

export default router;