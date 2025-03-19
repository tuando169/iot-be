import { sensorController } from "../controllers/sensor.controller.js";
import express from "express";

const router = express.Router();

router.get("/", sensorController.getAll);
router.get("/:id", sensorController.getOne);
router.post("/", sensorController.create);
router.patch("/", sensorController.update);
router.delete("/", sensorController.delete);

export default router;
