// store/index.js
import { defineStore } from 'pinia';

export const useDisturbanceStore = defineStore({
  id: 'disturbance',
  state: () => ({
    formData: {},
  }),
  actions: {
    setFormData(data) {
      this.formData = data;
      if (process.client) {
        localStorage.setItem('disturbanceFormData', JSON.stringify(data));
      }
      console.log('Form Data in Pinia Store:', this.formData);
    },
    loadFormData() {
      if (process.client) {
        const storedData = localStorage.getItem('disturbanceFormData');
        if (storedData) {
          this.formData = JSON.parse(storedData);
        }
      }
    },
  },
});
