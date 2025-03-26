import { database } from '../config/database.js';

export const sensorModel = {
  getAll: async () => {
    return await database.execute(
      'SELECT * FROM data_sensor LIMIT ? OFFSET ?',
      [pageSize, pageSize * page]
    );
  },
  getOne: async (id) => {
    return await database.execute('SELECT * FROM data_sensor WHERE ID = ?', [
      id,
    ]);
  },
  create: async (sensor) => {
    return await database.execute(
      'INSERT INTO data_sensor (Temperature, Humidity, Light) VALUES (?, ?,?)',
      [sensor.temperature, sensor.humidity, sensor.light]
    );
  },
  update: async (sensor) => {
    return await database.execute(
      'UPDATE data_sensor SET Temperature = ?, Humidity = ?, Light = ? WHERE ID = ?',
      [sensor.temperature, sensor.humidity, sensor.light, sensor.id]
    );
  },
  delete: async (id) => {
    return await database.execute('DELETE FROM data_sensor WHERE ID = ?', [id]);
  },
};
