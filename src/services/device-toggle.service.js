import { mqttHandler, MqttTopicEnum } from '../config/mqtt.js';
import { ErrorConstants } from '../constants/error.constant.js';
import { deviceModel } from '../models/device.model.js';

export const deviceToggleService = {
  toggleDevice: async (devices) => {
    // devices = [{ device1: true }, { device2: false }]
    console.log('devices', devices);
    let command = '';
    const states = devices.map((device, index) => {
      const deviceName = device.device;
      const deviceState = device.state;
      command += deviceState ? `LED${index}_ON ` : `LED${index}_OFF `;
      return {
        name: deviceName,
        state: deviceState ? 1 : 0,
      };
    });
    console.log('service', states);

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
