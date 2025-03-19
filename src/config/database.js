import mysql from "mysql2";

let connection;
export const database = {
  connect: () => {
    connection = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "123456",
      database: "iot",
      port: 3306,
    });
  },
  query: (query, callback) => {
    connection.query(query, callback);
  },
};
