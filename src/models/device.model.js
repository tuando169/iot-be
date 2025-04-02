import { database } from "../config/database.js";

export const deviceModel = {
  getAll: async (pageSize, page, dateSearch) => {
    const limit = pageSize.toString();
    const offset = ((page - 1) * pageSize).toString();

    if (dateSearch) {
      const res = await database.execute(
        "SELECT * FROM device_history WHERE UpdatedAt LIKE ? LIMIT ? OFFSET ?",
        ["%" + dateSearch + "%", limit, offset]
      );
      return res.map((row) => {
        return {
          id: row.ID,
          name: row.Device,
          state: row.State ? true : false,
          updatedAt: row.UpdatedAt,
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
        name: row.Device,
        state: row.State ? true : false,
        time: row.UpdatedAt,
      };
    });
  },
  getOne: async (id) => {
    const res = await database.execute(
      "SELECT * FROM device_history WHERE ID = ?",
      [id]
    );
    return {
      id: res[0].ID,
      name: res[0].Device,
      state: res[0].State,
      time: res[0].UpdatedAt,
    };
  },
  updateState: async (id, state) => {
    return await database.execute(
      "UPDATE device_history SET State = ? WHERE ID = ?",
      [state, id]
    );
  },
  create: async (device) => {
    return await database.execute(
      "INSERT INTO device_history (Device, State) VALUES (?, ?)",
      [device.name, device.state]
    );
  },
  update: async (device) => {
    return await database.execute(
      "UPDATE device_history SET Device = ?, State = ? WHERE ID = ?",
      [device.name, device.state, device.id]
    );
  },
  delete: async (id) => {
    return await database.execute("DELETE FROM device_history WHERE ID = ?", [
      id,
    ]);
  },
};
