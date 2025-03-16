export const sensorController = {
  getAll: async (req, res) => {
    res.send("Sensor Controller Index");
  },
  getOne: async (req, res) => {
    res.send("Sensor Controller Get One");
  },
  create: async (req, res) => {
    res.send("Sensor Controller Create");
  },
  update: async (req, res) => {
    res.send("Sensor Controller Update");
  },
  delete: async (req, res) => {
    res.send("Sensor Controller Delete");
  },
};
