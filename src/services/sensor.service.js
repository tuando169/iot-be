import { mqttHandler, MqttTopicEnum } from '../config/mqtt.js';
import { ErrorConstants } from '../constants/error.constant.js';
import { sensorModel } from '../models/sensor.model.js';

export const sensorService = {
  getAll: async (pageSize, page, filterBy, filterValue, sortBy, sortOrder) => {
    if (filterBy == 'time' && filterValue) {
      const date = new Date(filterValue);
      if (isNaN(date.getTime())) {
        return ErrorConstants.BAD_REQUEST.errorCode;
      }
      //convert time to UTC + 7: 2025-04-10T06:45:54.000Z to 2025-04-10 13:45:54
      const utcDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
      filterValue = utcDate.toISOString().slice(0, 19).replace('T', ' ');
    }
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
