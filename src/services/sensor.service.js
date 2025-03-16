export const sensorService = {
  getOne: async (id) => {
    return { id: id, name: "Sensor 1" };
  },
  getAll: async () => {
    return [
      { id: 1, name: "Sensor 1" },
      { id: 2, name: "Sensor 2" },
    ];
  },
  create: async (sensor) => {
    return sensor;
  },
  update: async (sensor) => {
    return sensor;
  },
  delete: async (id) => {
    return { id: id, name: "Sensor 1" };
  },
};
