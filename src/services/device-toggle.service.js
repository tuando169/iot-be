import { mqttHandler, MqttTopicEnum } from "../config/mqtt.js";
import { ErrorConstants } from "../constants/error.constant.js";
import { deviceModel } from "../models/device.model.js";

export const deviceToggleService = {
  toggleDevice: async (devices) => {
    const states = devices.map((device) => {
      return {
        value: device.state ? 1 : 0,
        label: device.state ? "ON" : "OFF",
      };
    });
    const command = `LED1_${states[0]},LED2_${states[1]},LED3_${states[2]}`;
    try {
      let deviceHistories = [];
      mqttHandler.listenToTopic(MqttTopicEnum.DeviceStatus, (message) => {
        // LED1_ON LED2_OFF LED3_ON
        const status = message.split(" ");
        status.forEach((currentState, index) => {
          if (currentState.split("_")[1] !== states[index].label) {
            deviceHistories.push({
              name: "LED1",
              state: states[index].value,
            });
          }
        });
      });
      mqttHandler.publish(MqttTopicEnum.DeviceToggle, command);
      deviceHistories.forEach(async (device) => {
        await deviceModel.create(device);
      });
    } catch (error) {
      console.error("Error toggling LED:", error);
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
};
