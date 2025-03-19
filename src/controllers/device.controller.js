import { deviceService } from "../services/device.service.js";

export const deviceController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    return await deviceService.getAll(pageSize, page);
  },
  getOne: async (req, res) => {
    res.send("Device Controller Get One");
  },
  create: async (req, res) => {
    res.send("Device Controller Create");
  },
  update: async (req, res) => {
    res.send("Device Controller Update");
  },
  delete: async (req, res) => {
    res.send("Device Controller Delete");
  },
};
