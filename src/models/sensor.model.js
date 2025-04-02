import { database } from "../config/database.js";

export const sensorModel = {
  getAll: async (pageSize, page, filter) => {
    const limit = pageSize.toString();
    const offset = ((page - 1) * pageSize).toString();
    const { temperature, humidity, light, time } = filter;
    let query = "SELECT * FROM data_sensor WHERE 1=1";
    const params = [];
    if (temperature) {
      query += " AND Temperature = ?";
      params.push(temperature);
    }
    if (humidity) {
      query += " AND Humidity = ?";
      params.push(humidity);
    }
    if (light) {
      query += " AND Light = ?";
      params.push(light);
    }
    if (time) {
      query += " AND CreatedAt LIKE ?";
      params.push("%" + time + "%");
    }
    query += " LIMIT ? OFFSET ?";

    params.push(limit, offset);
    const res = await database.execute(query, params);
    return res.map((row) => {
      return {
        id: row.ID,
        temperature: row.Temperature,
        humidity: row.Humidity,
        light: row.Light,
        time: row.CreatedAt,
      };
    });
  },
  getOne: async (id) => {
    const res = await database.execute(
      "SELECT * FROM data_sensor WHERE ID = ?",
      [id]
    );
    return {
      id: res[0].ID,
      temperature: res[0].Temperature,
      humidity: res[0].Humidity,
      light: res[0].Light,
      updatedAt: res[0].UpdatedAt,
    };
  },
  create: async (sensor) => {
    return await database.execute(
      "INSERT INTO data_sensor (Temperature, Humidity, Light) VALUES (?, ?,?)",
      [sensor.temperature, sensor.humidity, sensor.light]
    );
  },
  update: async (sensor) => {
    return await database.execute(
      "UPDATE data_sensor SET Temperature = ?, Humidity = ?, Light = ? WHERE ID = ?",
      [sensor.temperature, sensor.humidity, sensor.light, sensor.id]
    );
  },
  delete: async (id) => {
    return await database.execute("DELETE FROM data_sensor WHERE ID = ?", [id]);
  },
};
