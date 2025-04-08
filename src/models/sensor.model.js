import { database } from '../config/database.js';

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
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const res = await database.execute(query, params);
    return res.map((row) => {
      return {
        id: row.ID,
        temperature: row.Temperature,
        humidity: row.Humidity,
        light: row.Light,
        time: row.Time,
      };
    });
  },
  create: async (data) => {
    const now = new Date();
    const query = `INSERT INTO data_sensor (Temperature, Humidity, Light, Time) VALUES (?, ?, ?, ?)`;
    const params = [
      data.temperature,
      data.humidity,
      data.light,
      now.toISOString().slice(0, 19).replace('T', ' '),
    ];
    const res = await database.execute(query, params);
    return res;
  },
};
