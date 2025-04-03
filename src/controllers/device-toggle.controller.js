import { ErrorConstants } from '../constants/error.constant.js';
import { deviceToggleService } from '../services/device-toggle.service.js';

export const deviceToggleController = {
  toggleDevice: async (req, res) => {
    const light = req.body.light;
    const fan = req.body.fan;
    const airConditioner = req.body.airConditioner;
    const devices = [];
    if (light !== undefined)
      devices.push({
        device: 'light',
        state: light,
      });
    if (fan !== undefined)
      devices.push({
        device: 'fan',
        state: fan,
      });
    if (airConditioner !== undefined)
      devices.push({
        device: 'airConditioner',
        state: airConditioner,
      });

    const error = await deviceToggleService.toggleDevice(devices);
    if (!error)
      return res.status(ErrorConstants.SUCCESSFUL.statusCode).json({
        message: ErrorConstants.SUCCESSFUL.message,
      });
    return res.status(error.statusCode).json({ message: error.message });
  },
};
