import { database } from '../config/database.js';

export const deviceModel = {
  getAll: async (pageSize, page) => {
    return await database.execute(
      'SELECT * FROM device_history LIMIT ? OFFSET ?',
      [pageSize, pageSize * page]
    );
  },
  getOne: async (id) => {
    return await database.execute('SELECT * FROM device_history WHERE ID = ?', [
      id,
    ]);
  },
  updateState: async (id, state) => {
    return await database.execute(
      'UPDATE device_history SET State = ? WHERE ID = ?',
      [state, id]
    );
  },
  create: async (device) => {
    return await database.execute(
      'INSERT INTO device_history (Device, State) VALUES (?, ?)',
      [device.name, device.state]
    );
  },
  update: async (device) => {
    return await database.execute(
      'UPDATE device_history SET Device = ?, State = ? WHERE ID = ?',
      [device.name, device.state, device.id]
    );
  },
  delete: async (id) => {
    return await database.execute('DELETE FROM device_history WHERE ID = ?', [
      id,
    ]);
  },
};
