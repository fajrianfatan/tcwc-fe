<template>
	<div>
	<div v-if="showModal" class="modal-overlay">
    <div class="flex items-center justify-center h-screen">
      <div class="w-[25rem] h-[16.5rem] bg-gray-200 rounded-[10px] flex flex-col">
        <div class="w-[25rem] h-[2.5rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] shadow">
          <div class="ml-4 mt-2 text-white text-base text-semibold font-poppins">Create New Disturbance</div>
        </div>
		
		<div class="p-4 flex flex-col flex-grow">
	
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Cyclone Name</div>
			<span class="flex-grow"></span>
			<input v-model="data.name" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
		  </div>
	
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Storm Identifier</div>
			<span class="flex-grow"></span>
			<input v-model="data.area" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
		  </div>
	
          <div class="flex items-center mb-3">
            <div class="text-black text-base font-medium font-poppins tracking-wide">Priority</div>
            <span class="flex-grow"></span>
            <div>
              <label class="inline-flex items-center">
                <input type="radio" v-model="data.is_current" value="true" class="form-radio h-5 w-5 text-emerald-500">
                <span class="ml-2">True</span>
              </label>
              <label class="inline-flex items-center ml-6">
                <input type="radio" v-model="data.is_current" value="false" class="form-radio h-5 w-5 text-red-500">
                <span class="ml-2">False</span>
              </label>
            </div>
          </div>
	
          <div class="mt-7 flex justify-end">
            <button
              @click="cancelAdd"
              class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-gray-400 text-white font-poppins rounded-[10px] mr-2"
            >
              Cancel
            </button>
            <button
              @click="createDisturbance"
              class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-emerald-500 text-white font-poppins rounded-[10px]"
            >
              Create
            </button>
          </div>
		  </div>
	  </div>
	</div>
	</div>
	</div>
  </template>
  
<script setup>
import { ref, reactive} from 'vue';
import { useDisturbanceStore } from '~/store';

const router = useRouter()
const showModal = ref(true);
const disturbanceStore = useDisturbanceStore();


var data = reactive({
	  month: '12',
    year: '2023',
    area: 'bbu',
    name: '',
    description: 'abc',
    is_current: 'false',
    direct_impact: false,
    track: [], 
    forecast: [], 
    technical_bulletin: '', 
    public_bulletin: '', 
    ocean_gale: [], 
    gale: [], 
    extreme_weather: [],
    description_id: 'xyz',
    loading: false
});
 
const createDisturbance = async () => {
  // Validate input fields
  if (!data.name || !data.area || data.is_current === '') {
    alert('Please fill in all required fields.');
    return;
  }

  disturbanceStore.setFormData(data);
  showModal.value = false;
  router.push('/maps/add');
};

const cancelAdd = () => {
  showModal.value = false;
  router.go(0);
};

</script>
  
  
  <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: 999; 
}
  </style>
  