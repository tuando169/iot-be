import { sensorService } from '../services/sensor.service.js';

export const sensorController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;
    const sortBy = req.query.sortBy || 'time';
    const sortOrder = req.query.sortOrder || 'DESC';
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
};
