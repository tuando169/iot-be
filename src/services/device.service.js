import { database } from "../config/database.js";

export const deviceService = {
  getOne: async (id) => {
    return { id: id, name: "Device 1" };
  },
  getAll: async (pageSize, page) => {
    const deviceList = [];
    await database.query("SELECT * FROM device", (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      rows.forEach((row) => {
        deviceList.push(row);
      });
    });
    return deviceList;
  },
  create: async (device) => {
    return device;
  },
  update: async (device) => {
    return device;
  },
  delete: async (id) => {
    return { id: id, name: "Device 1" };
  },
};
