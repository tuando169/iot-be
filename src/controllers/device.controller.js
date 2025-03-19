import { database } from "../config/database.js";

export const deviceController = {
  getAll: async (req, res) => {
    const pageSize = req.query.pageSize || 10;
    const page = req.query.page || 1;

    database.query(`SELECT * FROM device`, (err, res) => {
      console.log(res);
    });
  },
  getOne: async (req, res) => {
    res.send("Device Controller Get One");
  },
  create: async (req, res) => {
    res.send("Device Controller Create");
  },
  update: async (req, res) => {
    res.send("Device Controller Update");
  },
  delete: async (req, res) => {
    res.send("Device Controller Delete");
  },
};
