<template>
  <div class="z-50 w-full h-full">
    <button @click="saveCSV" class="fixed w-[6rem] h-[2.5rem] top-[6rem] left-4 bg-btn-submit text-white rounded-full p-2">
      Save CSV
    </button>
    <button @click="toggleTrackList" class="fixed bottom-4 left-[48rem] transform -translate-x-1/2 bg-emerald-500 text-white rounded-full p-2">
      {{ showTrackList ? 'Minimize Track List' : 'Maximize Track List' }}
    </button>
    <div :class="{ 'hidden': !showTrackList }" class="w-[50rem] h-[18rem] bg-dark rounded-[10px] fixed bottom-4 right-4">
      <div class="relative">
        <div class="w-[50rem] h-[3rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] flex items-center">
          <label class="ml-5 text-white font-sm font-poppins">Track List</label>
        </div>
      </div>
     
      <div class="max-h-[15rem] overflow-auto">
        <table class="w-full table-auto text-white">
        <thead>
          <tr>
            <th class="px-2 py-2 text-sm text-center font-poppins">No</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Longitude</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Latitude</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Date</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Time</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Wind Average</th>
            <th class="px-2 py-2 text-sm text-center font-poppins">Pressure</th>
            <!-- <th class="px-2 py-2 text-sm text-center font-poppins">Action</th> -->
          </tr>
        </thead>
        
        <tbody>
          <tr v-for="(track, index) in data.trackOne" :key="index">
            <td class="px-2 py-2 text-center font-poppins">{{ index + 1 }}</td>
            <td class="px-2 py-2 text-center font-poppins">{{ track.lng }} N</td>
            <td class="px-2 py-2 text-center font-poppins">{{ track.lat }} E</td>
            <td class="px-2 py-2 text-center font-poppins">{{ new Date(track.datetime).toLocaleDateString() }}</td>
            <td class="px-2 py-2 text-center font-poppins">{{ new Date(track.datetime).toLocaleTimeString() }}</td>
            <td class="px-2 py-2 text-center font-poppins">{{ track.windAvg }} knots</td>
            <td class="px-2 py-2 text-center font-poppins">{{ track.pressure }} mbar</td>
            <!-- <td class="px-2 py-2 text-center font-poppins">
              <NuxtLink :to="`/maps/track/${track.id}`" class="text-blue-500 hover:text-blue-700 mr-2">Edit</NuxtLink>
              <button class="text-red-500 hover:text-red-700">Delete</button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDisturbanceStore } from '~/store';

const axios = useAxiosDev()
const disturbanceStore = useDisturbanceStore();
const disturbanceData = disturbanceStore.formData;
console.log(disturbanceData)
const showTrackList = ref(true);

const toggleTrackList = () => {
  showTrackList.value = !showTrackList.value;
};

const props = defineProps(['coordinates']);

var data = reactive({
  isModalOpen: false,
  trackOne: [],
}) 
const fetchTrackById = async () => {
  try {
    const res = await axios.get("url/api/get/cyclone/get/" + useRoute().params.id);
    if (res && res.data.data.track && res.data.data.track.length > 0) {
      data.trackOne = [];
      for (let i = 0; i < res.data.data.track.length; i++) {
        const track = res.data.data.track[i];
        const trackId = track._id;
        const coordinates = {
          lat: track.geometry.coordinates[1],
          lng: track.geometry.coordinates[0],
        };
        const properties = track.properties;
        const newTrack = {
          id: trackId,
          lat: coordinates.lat,
          lng: coordinates.lng,
          datetime: properties.date,
          pressure: properties.pressure,
          windAvg: properties.meanWind,
        };
        data.trackOne.push(newTrack);
      }
    } else {
      console.error('No track data found in the response.');
    }
    console.log(data.trackOne);
  } catch (error) {
    console.error('An error occurred while fetching track data:', error);
  }
};

onMounted(() => {
  fetchTrackById();
});

const saveCSV = async () => {
  try {
    const res = await axios.get("url/api/get/cyclone/get/" + useRoute().params.id);
    const shouldSave = window.confirm("Apakah anda akan mencetak data kedalam file csv?");
    if (!shouldSave) {
      return;
    }
    const cycloneName = res.data.data.name;
    const timestamp = new Date().toISOString().replace(/[-T:]/g, "").slice(0, 14);
    let csvContent = 
      "No,Longitude,Latitude,Date,Time,Wind Average,Pressure\n";
    data.trackOne.forEach((track, index) => {
      const row = [
        index + 1,
        track.lng,
        track.lat,
        new Date(track.datetime).toLocaleDateString(),
        new Date(track.datetime).toLocaleTimeString(),
        track.windAvg,
        track.pressure,
      ];
      csvContent += row.join(",") + "\n";
    });
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const filename = `${cycloneName}_${useRoute().params.id}_track_data_${timestamp}.csv`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("An error occurred while saving CSV:", error);
  }
};

</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>