import { deviceController } from "../controllers/device.controller.js";
import express from "express";

const router = express.Router();

router.get("/", deviceController.getAll);
router.get("/status", deviceController.getStatus);
router.post("/toggle", deviceController.toggle);

export default router;
