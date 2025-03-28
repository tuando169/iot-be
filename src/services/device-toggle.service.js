export const deviceToggleService = {
  toggleLed: async (status) => {
    const led1 = status[0];
    const led2 = status[1];
    const led3 = status[2];
    try {
      // Simulate toggling LEDs
      console.log(`LED 1: ${led1}, LED 2: ${led2}, LED 3: ${led3}`);
      return true;
    } catch (error) {
      console.error('Error toggling LED:', error);
      return false;
    }
  },
};
