<template>
	<div v-click-outside="onClickOutside">
	<div class="modal-overlay">
    <div class="flex items-center justify-center h-screen">
      <div class="w-[25rem] h-[20rem] bg-gray-200 rounded-[10px] flex flex-col">
        <div class="w-[25rem] h-[2.5rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] shadow">
          <div class="ml-4 mt-2 text-white text-base text-semibold font-poppins">Create New Disturbance</div>
        </div>
		
	
		<div class="p-4 flex flex-col flex-grow">
		  <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Disturbance Id</div>
			<span class="flex-grow"></span>
			<input class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text" disabled>
		  </div>
	
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
	
		  <!-- Priority (is_current) as radio buttons -->
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
	
		  <div class="mt-7">
			<div class="flex justify-end">
              <button @click="createDisturbance" class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-emerald-500 text-white font-poppins rounded-[10px]">Create</button>
            </div>
		  </div>
		</div>
	  </div>
	</div>
	</div>
	</div>
  </template>
  
<script setup>
const axios = useAxiosDev()
const router = useRouter()
const { emit } = getCurrentInstance(); 
const closeModal = () => emit('closeModal');
const onClickOutside = (event, el) => !el.contains(event.target) && closeModal();

var data = reactive({
	month: '12',
    year: '2023',
    area: 'bbu',
    name: 'TC Cempaka',
    description: 'abc',
    is_current: 'true',
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
	data.loading = true;
// const requestData = {
// 	month: data.month,
//     year: data.year,
// 	area: data.area,
// 	name: data.name,
// 	description: data.description,
// 	is_current: JSON.parse(data.is_current),
// 	direct_impact: data.direct_impact,
//     track: data.track, 
//     forecast: data.forecast, 
//     technical_bulletin: data.technical_bulletin, 
//     public_bulletin: data.public_bulletin, 
//     ocean_gale: data.ocean_gale, 
//     gale: data.gale, 
//     extreme_weather: data.extreme_weather
// };

	try {
		// Send data to the API
		const response = await axios.post('tcwc/cyclone/create', {
			month: data.month,
			year: data.year,
			area: data.area,
			name: data.name,
			description: data.description,
			is_current: JSON.parse(data.is_current),
			direct_impact: data.direct_impact,
			track: data.track, 
			forecast: data.forecast, 
			technical_bulletin: data.technical_bulletin, 
			public_bulletin: data.public_bulletin, 
			ocean_gale: data.ocean_gale, 
			gale: data.gale, 
			extreme_weather: data.extreme_weather,
			description_id: data.description_id
		});

		// Handle the response (you can add logic based on the API response)
		console.log('API Response:', response);

		// Close the modal after successful submission
		closeModal();
		router.push("/maps");
	} catch (error) {
		console.error('Error submitting data to API:', error);
		data.loading = false;
		alert("Kesalahan dalam proses menambah data baru");
	}
};

</script>
  
  
  <style scoped>
 .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
  z-index: 999; /* Adjust the z-index to make sure it appears above other elements */
}
  </style>
  