import { defineStore } from 'pinia';

export const useDisturbanceStore = defineStore({
  id: 'disturbance',
  state: () => ({
    formData: {},
  }),
  actions: {
    setFormData(data) {
      this.formData = data;
      console.log('Form Data in Pinia Store:', this.formData);
    },
  },
});