import { ref } from 'vue';
import { defineStore } from 'pinia';

export default defineStore('user', () => {
  const token = ref('');
  const admin = ref(false);

  const setToken = (newToken) => {
    token.value = newToken;
    admin.value = true;
  };

  const logout = () => {
    token.value = '';
    admin.value = false;
  };

  return {
    token,
    admin,
    setToken,
    logout,
  };
});
