import { deviceController } from "../controllers/device.controller.js";
import express from "express";

const router = express.Router();

router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.post("/", deviceController.create);
router.patch("/", deviceController.update);
router.delete("/", deviceController.delete);

export default router;
