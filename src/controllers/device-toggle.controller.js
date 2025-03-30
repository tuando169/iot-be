import { deviceToggleService } from "../services/device-toggle.service";

export const deviceToggleController = {
  toggleLed: async (req, res) => {
    const ledStatuses = req.body.status;
    const error = await deviceToggleService.toggleLed(ledStatuses);
    if (!error) return res.status(200).json({});
    return res.status(error.statusCode).json({ message: error.message });
  },
};
