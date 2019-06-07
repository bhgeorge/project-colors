export default {
  methods: {
    // TODO: Make this based on time to prevent 1 in a millions
    generateRandomId() {
      const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let str = '';
      for (let i = 0; i < 16; i += 1) {
        str += chars.charAt(Math.round(Math.random() * 62));
      }
      return str;
    },
  },
};
