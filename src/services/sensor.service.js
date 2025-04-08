import { mqttHandler, MqttTopicEnum } from "../config/mqtt.js";
import { ErrorConstants } from "../constants/error.constant.js";
import { sensorModel } from "../models/sensor.model.js";

export const sensorService = {
  getAll: async (pageSize, page, filterBy, filterValue, sortBy, sortOrder) => {
    return await sensorModel.getAll(
      pageSize,
      page,
      filterBy,
      filterValue,
      sortBy,
      sortOrder
    );
  },
};
