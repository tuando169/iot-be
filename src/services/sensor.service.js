import { mqttHandler, MqttTopicEnum } from "../config/mqtt.js";
import { ErrorConstants } from "../constants/error.constant.js";
import { sensorModel } from "../models/sensor.model.js";

export const sensorService = {
  getAll: async (pageSize, page, filterBy, filterValue, sortBy, sortOrder) => {
    // mqttHandler.listenToTopic(MqttTopicEnum.DataSensor, (message) => {
    //   const data = JSON.parse(message);
    //   if (data) {
    //     sensorModel.create({
    //       temperature: data.temperature,
    //       humidity: data.humidity,
    //       light: data.light,
    //     });
    //   }
    //   console.log("Received data:", data);
    // });
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
