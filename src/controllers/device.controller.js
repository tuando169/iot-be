import { deviceService } from '../services/device.service.js';

export const deviceController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;

    return res.json({ devices: await deviceService.getAll(pageSize, page) });
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    return res.json({ device: await deviceService.getOne(id) });
  },
  create: async (req, res) => {
    const success = await deviceService.create(req.body);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
  update: async (req, res) => {
    const success = await deviceService.update(req.body);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const success = await deviceService.delete(id);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
};
