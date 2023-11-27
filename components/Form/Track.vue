<template>
    <div class="z-50 w-full h-full">
      <!-- Form 1: Select Track Type -->
      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative z-100">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-slate-800 rounded-[10px]">
          <div class="w-[12rem] mx-auto mt-2">
            <label for="countries" class="block mb-2 text-base text-gray-900 dark:text-white font-poppins">Select Track Type</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Analysis Track</option>
                <option>Guidance Forecast Track</option>
                <option>Observation Track</option>
                <option>Official Forecast Track</option>
                <option>Post-event Best Track</option>
                <option>Scratch Track</option>
            </select>
          </div>
      </div>
      </div>
  
      <!-- Form 2: Data Source -->
      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-slate-800 rounded-[10px]">
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
  
      <!-- Form 3: Add Fix -->
      <div class="w-[20rem] h-[22rem] mt-4 ml-4 relative">
        <div class="w-[20rem] h-[22rem] left-0 top-0 absolute bg-slate-800 rounded-[10px]"></div>
        <div class="w-[10rem] h-[15.61px] left-[15px] top-[15.61px] absolute text-white text-medium font-poppins">Add Fix</div>
  
        <!-- Date and Time -->
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
            <input type="text" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" id="wind-average" min="0" maxlength="6" class="w-full p-1 bg-gray-100 rounded-[10px]" />
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="w-[143px] h-[38px] mt-4 left-[15px] top-[16.5rem] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex">
          <div class="text-white text-sm font-medium font-poppins">Save Track</div>
        </div>
      </div>
      
    </div>
    
    <div class="z-50 w-full h-full">
      <button @click="toggleTrackList" class="fixed bottom-4 left-[48rem] transform -translate-x-1/2 bg-emerald-500 text-white rounded-full p-2">
        {{ showTrackList ? 'Minimize Track List' : 'Maximize Track List' }}
      </button>
      <!-- Form 1: Select Track Type -->
      <div :class="{ 'hidden': !showTrackList }" class="w-[50rem] h-[18rem] bg-slate-800 rounded-[10px] fixed bottom-4 right-4">
        <!-- Inserted div at the top -->
        
        <div class="relative">
          
    
          <div class="w-[50rem] h-[3rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] flex items-center">
            <label class="ml-5 text-white font-sm font-poppins">Track List</label>
            
            <!-- Dropdown select -->
            <select class="absolute top-0 right-5 h-full bg-emerald-500 text-white rounded-tr-[10px] rounded-br-[10px] border-none outline-none p-2">
              <option value="001">001</option>
              <option value="002">002</option>
              
            </select>
            <div class="absolute top-0 right-2 h-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
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
              <th class="px-2 py-2 text-sm text-center font-poppins">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(track, index) in mappedTracks" :key="track.track_id">
              <td class="px-2 py-2 text-center font-poppins">{{ index + 1 }}</td>
              <td class="px-2 py-2 text-center font-poppins">{{ track.lat }} N</td>
              <td class="px-2 py-2 text-center font-poppins">{{ track.lng }} E</td>
              <td class="px-2">
                <input class="h-[1.8rem] rounded-[0.3rem] text-black" type="date" :value="formatDate(track.datetime)" />
              </td>
              <td class="px-2 py-2 text-center font-poppins">{{ track.time }}</td>
              <td class="px-2 py-2 text-center font-poppins">{{ track.windAvg }} kts</td>
              <td class="px-2 py-2 text-center font-poppins">{{ track.pressure }} mbar</td>
              <td class="px-2 py-2 text-center font-poppins">
                <button class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button class="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const showTrackList = ref(true);

const toggleTrackList = () => {
  showTrackList.value = !showTrackList.value;
};
const props = defineProps(
  [
    'coordinates'   
  ]
)


</script>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      isModalOpen: false,
      tracks: [],
    };
  },

  methods: {
    async fetchTracks() {
      try {
        const response = await axios.get('https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/all/');
        if (response.data.status === 'OK') {
          this.tracks = response.data.data.docs;
        } else {
          console.error('Error fetching tracks:', response.data);
        }
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    },
    extractTime(datetime) {
      if (!datetime) {
        return '';
      }
      const time = new Date(datetime).toLocaleTimeString('en-US', { hour12: false });
      return time;
    },
  },

  mounted() {
    this.fetchTracks();
  },

  computed: {
  mappedTracks() {
    const allTracks = [];

    this.tracks.forEach((track, index) => {
      if (track.track && Array.isArray(track.track) && track.track.length > 0) {
        track.track.forEach(trackData => {
          const coordinates = trackData.geometry.coordinates;
          const datetime = trackData.properties.date;

          allTracks.push({
            track_id: trackData._id,
            index: index + 1,
            lat: coordinates[1],
            lng: coordinates[0],
            datetime: trackData.properties.date,
            time: this.extractTime(datetime),
            pressure: trackData.properties.pressure,
            windAvg: trackData.properties.meanWind,
          });
        });
      } else {
        console.warn('Invalid track:', track);
      }
    });

    return allTracks;
  },
}
}
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