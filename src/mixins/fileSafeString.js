export default {
  methods: {
    getFileSafeString(str) {
      let s = str.replace(/\s+/g, '-');
      s = s.replace(/[^a-zA-Z0-9-]/g, '');
      return s.toLowerCase();
    },
  },
};
