import { database } from '../config/database.js';

export const deviceModel = {
  getAll: async (pageSize, page, dateSearch, sortBy, sortOrder) => {
    const limit = pageSize.toString();
    const offset = ((page - 1) * pageSize).toString();
    let query = `SELECT * FROM device_history`;
    const params = [];
    if (dateSearch) {
      query += ` WHERE Time LIKE ?`;
      params.push(dateSearch + '%');
    }
    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const res = await database.execute(query, params);
    return res.map((row) => {
      return {
        id: row.ID,
        device: row.Device,
        state: row.State ? true : false,
        time: row.Time,
      };
    });
  },
  getRecentStatus: async () => {
    const light = await database.execute(
      'SELECT State FROM device_history WHERE Device = ? ORDER BY ID DESC LIMIT 1',
      ['light']
    );
    const fan = await database.execute(
      'SELECT State FROM device_history WHERE Device = ? ORDER BY ID DESC LIMIT 1',
      ['fan']
    );
    const airConditioner = await database.execute(
      'SELECT State FROM device_history WHERE Device = ? ORDER BY ID DESC LIMIT 1',
      ['air-conditioner']
    );
    console.log(light, fan, airConditioner);
    if (!light.length || !fan.length || !airConditioner.length) {
      return [false, false, false];
    }
    return [
      light[0].State ? true : false,
      fan[0].State ? true : false,
      airConditioner[0].State ? true : false,
    ];
  },
  create: async (device) => {
    const now = new Date();
    const res = await database.execute(
      'INSERT INTO device_history (Device, State,Time) VALUES (?, ?,?)',
      [
        device.device,
        device.state,
        now.toISOString().slice(0, 19).replace('T', ' '),
      ]
    );
    return res;
  },
};
