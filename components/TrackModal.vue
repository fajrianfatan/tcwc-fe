<template>
	<div v-click-outside="onClickOutside">
	<div v-if="showModal" class="modal-overlay">
    <div class="flex items-center justify-center h-screen">
      <div class="w-[25rem] h-[20rem] bg-gray-200 rounded-[10px] flex flex-col">
        <div class="w-[25rem] h-[2.5rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] shadow">
          <div class="ml-4 mt-2 text-white text-base text-semibold font-poppins">Edit Track Data</div>
        </div>
	
		<div class="p-4 flex flex-col flex-grow">
      <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Date</div>
			<span class="flex-grow"></span>
			<input v-model="data.properties.date" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="date">
		  </div>
          
          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Time</div>
			<span class="flex-grow"></span>
			<input v-model="data.properties.time" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="time">
		  </div>

          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Wind Avg</div>
			<span class="flex-grow"></span>
			<input v-model="data.properties.meanWind" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="3" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
		  </div>

          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Pressure</div>
			<span class="flex-grow"></span>
			<input v-model="data.properties.pressure" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="4" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
		  </div>
	
		  <div class="mt-7">
			<div class="flex justify-between">
				<button @click="cancelUpdate" class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-gray-400 text-white font-poppins rounded-[10px]">Cancel</button>
				<button @click="submitUpdate" class="w-[6rem] h-[2.5rem] flex items-center justify-center bg-emerald-500 text-white font-poppins rounded-[10px]">Save</button>
			</div>
		  </div>
		</div>
	  </div>
	</div>
	</div>
	</div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue';
const router = useRouter();
const axios = useAxiosDev()

const showModal = ref(true);
const props = defineProps(['trackParams']);
console.log(props.trackParams.id)
const data = ref({
  properties: {
    date: '',
    time: '',
    meanWind: '',
    pressure: '',
  }
});

onMounted(async () => {
  try {
    const response = await axios.get("url/api/get/cyclone/get/" + useRoute().params.id);
    const cycloneData = response.data.data;

    if (props.trackParams.id) {
      const dataId = props.trackParams.id;

      const trackOrForecast = cycloneData.track.concat(cycloneData.forecast).find(item => item._id === dataId);

      if (trackOrForecast) {
        // Update data properties based on track or forecast
        data.value.properties = {
          date: new Date(trackOrForecast.properties.date).toISOString().split('T')[0],
          time: new Date(trackOrForecast.properties.date).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          meanWind: trackOrForecast.properties.meanWind,
          pressure: trackOrForecast.properties.pressure,
        };
      } else {
        console.error('Track or Forecast not found for the provided id:', dataId);
      }
    } else {
      console.error('Invalid parameters provided. Expected props.trackParams.id or props.trackParams.f_id.');
    }
  } catch (error) {
    console.error('Error fetching cyclone data:', error);
  }
});

const submitUpdate = async () => {
  try {
    // Validate input fields
    if (!data.value.properties.date || !data.value.properties.time || !data.value.properties.meanWind || !data.value.properties.pressure) {
      // Display an alert or log an error message
      alert('Please fill in all required fields.');
      return;
    }

    const dateTimeString = `${data.value.properties.date} ${data.value.properties.time}`;
    const combinedDateTime = new Date(dateTimeString);

    const response = await axios.get("url/api/get/cyclone/get/" + useRoute().params.id);

    const trackAndForecastData = response.data.data.track.concat(response.data.data.forecast);

    // Find the index based on the scenario
    const dataIndex = trackAndForecastData.findIndex(item => item._id === props.trackParams.id);

    if (dataIndex !== -1) {
      // Update the data properties based on the scenario
      const updatedData = {
        ...trackAndForecastData[dataIndex],
        geometry: {
          coordinates: trackAndForecastData[dataIndex].geometry.coordinates,
          type: "Point",
        },
        type: "Feature",
        properties: {
          date: combinedDateTime.toISOString(),
          meanWind: parseFloat(data.value.properties.meanWind),
          pressure: parseFloat(data.value.properties.pressure),
        },
      };

      // Update the array based on the scenario
      const updatedDataArray = [...trackAndForecastData];
      updatedDataArray[dataIndex] = updatedData;

      // Create the payload based on the scenario
      const updatePayload = {
        _id: useRoute().params.id,
        track: updatedDataArray,
      };

      // Perform the update based on the scenario
      const updateResponse = await axios.post(
        'url/api/get/cyclone/update',
        updatePayload
      );

      showModal.value = false;
      // router.go(0);
    } else {
      console.error('Data not found for update. Check if the provided ID matches any items in the existingData array.');
    }
  } catch (error) {
    console.error('Error updating cyclone:', error);
  }
};

const cancelUpdate = () => {
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
