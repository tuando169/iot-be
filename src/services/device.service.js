import { ErrorConstants } from "../constants/error.constant.js";
import { deviceModel } from "../models/device.model.js";

export const deviceService = {
  getOne: async (id) => {
    return deviceModel.getOne(id);
  },
  getAll: async (pageSize, page) => {
    return await deviceModel.getAll(pageSize, page);
  },
  create: async (device) => {
    try {
      if (this.getOne(device.id) !== undefined)
        return ErrorConstants.ALREADY_EXISTS.errorCode;
      await deviceModel.create(device);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
  update: async (device) => {
    try {
      if (this.getOne(device.id) === undefined)
        return ErrorConstants.NOT_FOUND.errorCode;
      await deviceModel.update(device);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
  delete: async (id) => {
    try {
      if (this.getOne(id) === undefined)
        return ErrorConstants.NOT_FOUND.errorCode;
      await deviceModel.delete(id);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
};
