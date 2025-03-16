export const deviceService = {
  getOne: async (id) => {
    return { id: id, name: "Device 1" };
  },
  getAll: async () => {
    return [
      { id: 1, name: "Device 1" },
      { id: 2, name: "Device 2" },
    ];
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
