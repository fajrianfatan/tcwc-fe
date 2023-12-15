<template>
  <div class="z-50 w-full h-full">
    <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative z-100">
      <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-dark rounded-[10px]">
        <div class="w-[12rem] mx-auto mt-2">
          <label for="countries" class="block mb-2 text-base text-gray-900 dark:text-white font-poppins">Select Track Type</label>
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option selected>Observation Track</option>
              <option>Official Forecast Track</option>
          </select>
        </div>
    </div>
    </div>

    <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative">
      <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-dark rounded-[10px]">
        <div class="w-[12rem] mx-auto mt-2">
          <label for="countries" class="block mb-2 text-base text-gray-900 dark:text-white font-poppins">Data Source</label>
          <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option>Brisbane CWS</option>
              <option>Brisbane TCWC</option>
              <option>Darwin RSMC</option>
              <option selected>Darwin TCWC</option>
              <option>Fiji</option>
              <option>Guam</option>
              <option>Honolulu</option>
              <option>JMA</option>
              <option>Jakarta</option>
              <option>La Reunion</option>
              <option>Manila</option>
              <option>Nuku Alofa</option>
              <option>Perth CWS</option>
              <option>Perth TCWC</option>
              <option>Port Moresby</option>
              <option>Port Vila</option>
              <option>Wellington</option>
          </select>
        </div>
    </div>
    </div>

    <div class="w-[20rem] h-[22rem] mt-4 ml-4 relative">
      <div class="w-[20rem] h-[22rem] left-0 top-0 absolute bg-dark rounded-[10px]"></div>
      <div class="w-[10rem] h-[15.61px] left-[15px] top-[15.61px] absolute text-white text-medium font-poppins">Add Fix</div>

      <div class="w-full left-[15px] top-[3rem] absolute flex space-x-2">
        <div class="w-[8.5rem]">
          <label for="date" class="text-white text-sm font-medium font-poppins">Date</label>
          <input type="date" id="date" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
        <div class="w-[8.5rem]">
          <label for="time" class="text-white text-sm font-medium font-poppins">Time</label>
          <input type="time" id="time" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
      </div>

      <div class="w-full left-[15px] top-[7.5rem] absolute flex space-x-2">
        <div class="w-[8.5rem]">
          <label for="latitude" class="text-white text-sm font-medium font-poppins">Latitude</label>
          <input :value="props.coordinates.latitude" type="number" id="latitude" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
        <div class="w-[8.5rem]">
          <label for="longitude" class="text-white text-sm font-medium font-poppins">Longitude</label>
          <input :value="props.coordinates.longitude" type="number" id="longitude" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
      </div>

      <div class="w-full left-[15px] top-[12rem] absolute flex space-x-2">
        <div class="w-[8.5rem]">
          <label for="pressure" class="text-white text-sm font-medium font-poppins">Pressure</label>
          <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="4" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
        <div class="w-[8.5rem]">
          <label for="wind-average" class="text-white text-sm font-medium font-poppins">Wind Average</label>
          <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" id="wind-average" min="0" maxlength="3" class="w-full p-1 bg-gray-100 rounded-[10px]" />
        </div>
      </div>

      <div class="w-[143px] h-[38px] mt-4 left-[15px] top-[16.5rem] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex">
        <div class="text-white text-sm font-medium font-poppins">Save Track</div>
      </div>
    </div>
    
  </div>
  
  <div class="z-50 w-full h-full">
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
const axios = useAxiosDev()
import { ref } from 'vue';
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
    const res = await axios.get("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/" + useRoute().params.id);
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