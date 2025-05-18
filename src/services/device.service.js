import { mqttHandler, MqttTopicEnum } from '../config/mqtt.js';
import { ErrorConstants } from '../constants/error.constant.js';
import { deviceModel } from '../models/device.model.js';

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
    const [light, fan, airConditioner] = await deviceModel.getRecentStatus();
    console.log('service', light, fan, airConditioner);

    mqttHandler.publish(
      MqttTopicEnum.DeviceToggle,
      `{LED1:'${light ? 'ON' : 'OFF'}', LED2:'${fan ? 'ON' : 'OFF'}', LED3:'${
        airConditioner ? 'ON' : 'OFF'
      }'}`
    );

    return [light, fan, airConditioner];
  },
  toggle: async (devices) => {
    console.log('devices', devices);

    let command = '';
    const states = devices.map((device, index) => {
      const deviceName = device.device;
      const deviceState = device.state;
      command += `{LED${index + 1}:'${deviceState ? 'ON' : 'OFF'}'}`;
      return {
        device: deviceName,
        state: deviceState ? 1 : 0,
      };
    });

    console.log('command', command);

    try {
      mqttHandler.publish(MqttTopicEnum.DeviceToggle, command);
      devices.forEach(async (device) => {
        await deviceModel.create(device);
      });
    } catch (error) {
      console.error('Error toggling LED:', error);
      return ErrorConstants.INTERVAL_SERVER_ERROR.errorCode;
    }
  },
};
