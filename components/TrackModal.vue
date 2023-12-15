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
			<input v-model="trackData.properties.date" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="date">
		  </div>
          
          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Time</div>
			<span class="flex-grow"></span>
			<input v-model="trackData.properties.time" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="time">
		  </div>

          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Wind Avg</div>
			<span class="flex-grow"></span>
			<input v-model="trackData.properties.meanWind" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="3" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
		  </div>

          <div class="flex items-center mb-3">
			<div class="text-black text-base font-medium font-poppins tracking-wide">Pressure</div>
			<span class="flex-grow"></span>
			<input v-model="trackData.properties.pressure" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="4" class="w-[13rem] h-[2rem] bg-white text-black text-sm rounded-[3px] border border-zinc-400" type="text">
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

const trackData = ref({
  properties: {
    date: '',
	time: '',
    meanWind: '',
    pressure: '',
  }
});

onMounted(async () => {
  const response = await axios.get("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/" + useRoute().params.id);
  const track = response.data.data.track.find(track => track._id === props.trackParams.id);

  trackData.value.properties = {
    date: new Date(track.properties.date).toISOString().split('T')[0],
	  time: new Date(track.properties.date).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    meanWind: track.properties.meanWind,
    pressure: track.properties.pressure,
  };

});

const submitUpdate = async () => {
  try {
    const dateTimeString = `${trackData.value.properties.date} ${trackData.value.properties.time}`;
    const combinedDateTime = new Date(dateTimeString);

    const response = await axios.get("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/" + useRoute().params.id);
    const existingTracks = response.data.data.track;
    const trackIndex = existingTracks.findIndex(existingTrack => existingTrack._id === props.trackParams.id);
	
    if (trackIndex !== -1) {
      const updatedTrack = {
        ...existingTracks[trackIndex],
        geometry: {
          coordinates: existingTracks[trackIndex].geometry.coordinates,
          type: "Point",
        },
        type: "Feature",
        properties: {
          date: combinedDateTime.toISOString(),
          meanWind: parseFloat(trackData.value.properties.meanWind),
          pressure: parseFloat(trackData.value.properties.pressure),
        },
      };
      const updatedTracksArray = [...existingTracks];
      updatedTracksArray[trackIndex] = updatedTrack;

      const updatedTrackData = {
        _id: useRoute().params.id,
        track: updatedTracksArray,
      };

      const updateResponse = await axios.post(
        'https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/update',
        updatedTrackData
      );
	  
      showModal.value = false;
      router.go(0);

    } else {
      console.error('Track not found for update.');
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
