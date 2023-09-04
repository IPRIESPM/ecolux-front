import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => ({
    token: ref(''),
    admin: ref(false),
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      this.admin = true;
    },
    logout() {
      this.token = '';
      this.admin = false;
    },
  },
  persist: {
    enabled: true,
  },
});
