export default {
  methods: {
    /**
     * Sets the Vuex store using the palette object.
     * Not directly tied to IDB, but used in multiple locations
     * so it's included within this mixin.
     *
     * @param {Object} obj The palette to set.
     */
    setPalette(obj) {
      if (obj.projectColors) {
        const majorVersion = parseInt(obj.version.split('.')[0], 10);
        // TODO: Add previous version migrations
        // TODO: Pull this from package.json
        if (majorVersion < 1) {
          this.$store.dispatch('core/setAlert', {
            title: 'Outdated version',
            text: 'It looks like this palette was saved with a previous version of this application. I\'ll be working on legacy version migration as soon as possible.',
            type: 'error',
          });
        } else {
          this.$store.dispatch('colors/importColors', obj);
          this.$store.dispatch('themes/importThemes', obj);
        }
      } else {
        this.$store.dispatch('core/setAlert', {
          title: 'Oops',
          text: 'It doesn\'t look like the file you uploaded was created with this application.',
          type: 'error',
        });
      }
    },
    /**
     * getAll alias for IDB.
     *
     * @param {String} storeName The name of the store to query.
     *
     * @returns {Promise} The results in a promise.
     */
    getAllFromIDB(storeName) {
      const idb = this.$store.state.core.db;
      if (!idb) {
        return null;
      }
      return idb.getAll(storeName);
    },
    /**
     * get alias for IDB.
     *
     * @param {String} storeName The name of the store to query.
     * @param {String} id The unique ID to fetch.
     *
     * @returns {Promise} The result in a promise.
     */
    getFromIDB(storeName, id) {
      const idb = this.$store.state.core.db;
      if (!idb) {
        return null;
      }
      return idb.get(storeName, id);
    },
    /**
     * put alias for IDB.
     *
     * @param {String} storeName The name of the store to place the item.
     * @param {Object} item The item to put.
     */
    putInIDB(storeName, item) {
      const idb = this.$store.state.core.db;
      if (!idb) {
        return;
      }
      idb.put(storeName, item);
      this.$store.dispatch('core/setAlert', {
        type: 'success',
        title: 'Palette Saved',
      });
    },
  },
};
