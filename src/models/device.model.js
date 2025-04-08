import { database } from '../config/database.js';

export const deviceModel = {
  getAll: async (pageSize, page, dateSearch, sortBy, sortOrder) => {
    const limit = pageSize.toString();
    const offset = ((page - 1) * pageSize).toString();

    if (dateSearch) {
      const res = await database.execute(
        `SELECT * FROM device_history WHERE Time LIKE ? ORDER BY ${sortBy} ${sortOrder} LIMIT ? OFFSET ?`,
        [`%${dateSearch}%`, limit, offset]
      );
      return res.map((row) => {
        return {
          id: row.ID,
          device: row.Device,
          state: row.State ? true : false,
          time: row.Time,
        };
      });
    }
    const res = await database.execute(
      'SELECT * FROM device_history LIMIT ? OFFSET ?',
      [limit, offset]
    );
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
      ['airConditioner']
    );
    return [
      light[0].State ? true : false,
      fan[0].State ? true : false,
      airConditioner[0].State ? true : false,
    ];
  },
};
