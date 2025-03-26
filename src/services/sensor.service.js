import { sensorModel } from '../models/sensor.model.js';

export const sensorService = {
  getOne: async (id) => {
    return await sensorModel.getOne(id);
  },
  getAll: async (pageSize, page) => {
    return await sensorModel.getAll(pageSize, page);
  },
  create: async (sensor) => {
    try {
      await sensorModel.create(sensor);
      return true;
    } catch {
      return false;
    }
  },
  update: async (sensor) => {
    try {
      await sensorModel.update(sensor);
      return true;
    } catch {
      return false;
    }
  },
  delete: async (id) => {
    try {
      await sensorModel.delete(id);
      return true;
    } catch {
      return false;
    }
  },
};
