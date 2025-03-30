import { ErrorConstants } from "../constants/error.constant.js";
import { sensorModel } from "../models/sensor.model.js";

export const sensorService = {
  getOne: async (id) => {
    return await sensorModel.getOne(id);
  },
  getAll: async (pageSize, page) => {
    return await sensorModel.getAll(pageSize, page);
  },
  create: async (sensor) => {
    try {
      if (this.getOne(sensor.id) !== undefined)
        return ErrorConstants.ALREADY_EXISTS.errorCode;
      await sensorModel.create(sensor);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
  update: async (sensor) => {
    try {
      if (this.getOne(sensor.id) === undefined)
        return ErrorConstants.NOT_FOUND.errorCode;
      await sensorModel.update(sensor);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
  delete: async (id) => {
    try {
      if (this.getOne(id) === undefined)
        return ErrorConstants.NOT_FOUND.errorCode;
      await sensorModel.delete(id);
    } catch {
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
};
