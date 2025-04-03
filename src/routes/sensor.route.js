import { sensorController } from "../controllers/sensor.controller.js";
import express from "express";

const router = express.Router();

router.get("/", sensorController.getAll);

export default router;
