import express from 'express';

import { signinAnnotater, signinClient, signinVerificator,signupClient, signupAnnotater } from '../controllers/auth.js';

const router = express.Router();

router.post('/signinAnnotater', signinAnnotater);
router.post('/signinClient', signinClient);
router.post('/signinVerificator', signinVerificator);
router.post('/signupClient', signupClient);
router.post('/signupAnnotater', signupAnnotater);
export default router;