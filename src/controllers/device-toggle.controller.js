import { deviceToggleService } from '../services/device-toggle.service';

export const deviceToggleController = {
  toggleLed: async (req, res) => {
    const ledStatuses = req.body.status;
    const success = await deviceToggleService.toggleLed(ledStatuses);
    if (!success) return res.status(400).json({});
    return res.status(200).json({});
  },
};
