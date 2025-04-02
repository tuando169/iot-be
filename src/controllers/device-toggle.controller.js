import { deviceToggleService } from "../services/device-toggle.service.js";

export const deviceToggleController = {
  toggleDevice: async (req, res) => {
    const devices = req.body.status;
    const error = await deviceToggleService.toggleDevice(
      devices.map((device) => {
        return { name: device.name, state: device.state };
      })
    );
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
};
