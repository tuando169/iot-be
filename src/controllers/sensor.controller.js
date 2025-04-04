import { sensorService } from '../services/sensor.service.js';

export const sensorController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const sortBy = req.query.sortBy || 'temperature';
    const sortOrder = req.query.sortOrder || 'ASC';
    const filterBy = req.query.filterBy;
    const filterValue = req.query.filterValue;

    return res.json({
      sensors: await sensorService.getAll(
        pageSize,
        page,
        filterBy,
        filterValue,
        sortBy,
        sortOrder
      ),
    });
  },
  getOne: async (req, res) => {
    const id = req.params.id;
    return res.json({ sensor: await sensorService.getOne(id) });
  },
  create: async (req, res) => {
    const error = await sensorService.create(req.body);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
  update: async (req, res) => {
    const error = await sensorService.update(req.body);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const error = await sensorService.delete(id);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
};
