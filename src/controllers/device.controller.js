import { deviceService } from "../services/device.service.js";

export const deviceController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const dateSearch = req.query.date;

    return res.json({
      devices: await deviceService.getAll(pageSize, page, dateSearch),
    });
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    return res.json({ device: await deviceService.getOne(id) });
  },
  create: async (req, res) => {
    const error = await deviceService.create(req.body);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
  update: async (req, res) => {
    const error = await deviceService.update(req.body);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const error = await deviceService.delete(id);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
};
