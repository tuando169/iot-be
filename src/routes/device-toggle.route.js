import express from 'express';
import { deviceToggleController } from '../controllers/device-toggle.controller.js';

const router = express.Router();

router.post('/led', deviceToggleController.toggleLed);

export default router;
