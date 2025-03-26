import { deviceModel } from '../models/device.model.js';

export const deviceService = {
  getOne: async (id) => {
    return deviceModel.getOne(id);
  },
  getAll: async (pageSize, page) => {
    return await deviceModel.getAll(pageSize, page);
  },
  create: async (device) => {
    try {
      await deviceModel.create(device);
      return true;
    } catch {
      return false;
    }
  },
  update: async (device) => {
    try {
      await deviceModel.update(device);
      return true;
    } catch {
      return false;
    }
  },
  delete: async (id) => {
    try {
      await deviceModel.delete(id);
      return true;
    } catch {
      return false;
    }
  },
};
