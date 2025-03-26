import { sensorService } from '../services/sensor.service.js';

export const sensorController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    return res.json({ sensors: await sensorService.getAll(pageSize, page) });
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    return res.json({ sensor: await sensorService.getOne(id) });
  },
  create: async (req, res) => {
    const success = await sensorService.create(req.body);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
  update: async (req, res) => {
    const success = await sensorService.update(req.body);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const success = await sensorService.delete(id);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
};
