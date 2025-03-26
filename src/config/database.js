import mysql from 'mysql2/promise.js';

let connection;
export const database = {
  connect: () => {
    connection = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'iot',
      port: 3306,
    });
  },
  execute: async (sql, params = []) => {
    const [rows] = await connection.execute(sql, params);
    return rows;
  },
};
