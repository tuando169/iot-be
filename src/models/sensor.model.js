import { database } from "../config/database.js";

export const sensorModel = {
  getAll: async (pageSize, page, filterBy, filterValue, sortBy, sortOrder) => {
    const limit = pageSize.toString();
    const offset = ((page - 1) * pageSize).toString();
    let query = `SELECT * FROM data_sensor`;
    const params = [];
    if (filterBy && filterValue) {
      query += ` WHERE ${filterBy} = ?`;
      params.push(filterValue);
    }
    if (sortBy && sortOrder) {
      query += ` ORDER BY ${sortBy} ${sortOrder}`;
    }
    const total = await database.execute(query, params);
    query += " LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const res = await database.execute(query, params);
    const data = res.map((row) => {
      return {
        id: row.ID,
        temperature: row.Temperature,
        humidity: row.Humidity,
        light: row.Light,
        time: row.Time,
      };
    });
    return {
      sensors: data,
      total: total.length,
    };
  },
  create: async (data) => {
    const query = `INSERT INTO data_sensor (Temperature, Humidity, Light) VALUES (?, ?, ?)`;
    const params = [data.temperature, data.humidity, data.light];
    const res = await database.execute(query, params);
    return res;
  },
};
