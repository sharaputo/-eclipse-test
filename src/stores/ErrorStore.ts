import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useErrorStore = defineStore('errorStore', () => {
  const error = ref('');
  const setError = (message: string): void => {
    error.value = message;
  };

  return {
    error,
    setError,
  };
});
