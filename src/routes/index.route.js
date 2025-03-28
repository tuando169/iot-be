import deviceRouter from './device.route.js';
import homeRouter from './home.route.js';
import sensorRouter from './sensor.route.js';
import deviceToggleRouter from './device-toggle.route.js';

export function routes(app) {
  const version = '/';
  app.use(version, homeRouter);
  app.use(version + 'device', deviceRouter);
  app.use(version + 'sensor', sensorRouter);
  app.use(version + 'toggle', deviceToggleRouter);
}
