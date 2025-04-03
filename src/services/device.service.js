import { mqttHandler, MqttTopicEnum } from "../config/mqtt.js";
import { ErrorConstants } from "../constants/error.constant.js";
import { deviceModel } from "../models/device.model.js";

export const deviceService = {
  getOne: async (id) => {
    return deviceModel.getOne(id);
  },
  getAll: async (pageSize, page, dateSearch, sortBy, sortOrder) => {
    return await deviceModel.getAll(
      pageSize,
      page,
      dateSearch,
      sortBy,
      sortOrder
    );
  },
  getStatus: async () => {
    try {
      mqttHandler.listenToTopic(MqttTopicEnum.DeviceStatus, () => {
        console.log("Device status received");
      });
    } catch (error) {
      console.error("Error toggling LED:", error);
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
    return [true, false, true];
  },
  toggle: async (devices) => {
    let command = "";
    const states = devices.map((device, index) => {
      const deviceName = device.device;
      const deviceState = device.state;
      command += deviceState ? `LED${index}_ON ` : `LED${index}_OFF `;
      return {
        name: deviceName,
        state: deviceState ? 1 : 0,
      };
    });
    console.log("service", states);

    // try {
    //   mqttHandler.publish(MqttTopicEnum.DeviceToggle, command);
    //   devices.forEach(async (device) => {
    //     await deviceModel.create(device);
    //   });
    // } catch (error) {
    //   console.error('Error toggling LED:', error);
    //   return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    // }
  },
};
