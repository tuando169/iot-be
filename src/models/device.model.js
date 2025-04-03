import { database } from "../config/database.js";

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
      "SELECT * FROM device_history LIMIT ? OFFSET ?",
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
};
