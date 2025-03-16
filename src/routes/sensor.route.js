import { sensorController } from "../controllers/sensor.controller.js";

export function sensorRouter(router) {
  router.get("/", sensorController.getAll);
  router.get("/detail/:id", sensorController.getOne);
  router.post("/", sensorController.create);
  router.patch("/", sensorController.update);
  router.delete("/", sensorController.delete);
}
