import express from 'express';

import { getTotalImage } from '../controllers/images.js';

const router = express.Router();

router.get('/total/:id',getTotalImage);

export default router;
