import express from "express";
import { deviceToggleController } from "../controllers/device-toggle.controller.js";

const router = express.Router();

router.post("/", deviceToggleController.toggleDevice);

export default router;
