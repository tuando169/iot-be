import { deviceController } from "../controllers/device.controller.js";

export function deviceRouter(router) {
  router.get("/", deviceController.getAll);
  router.get("/detail/:id", deviceController.getOne);
  router.post("/", deviceController.create);
  router.patch("/", deviceController.update);
  router.delete("/", deviceController.delete);
}
