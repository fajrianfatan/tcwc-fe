  <template>
    <div class="z-50 w-full h-full">
      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative z-100">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-dark rounded-[10px]">
          <div class="w-[12rem] mx-auto mt-2">
            <label for="trackType" class="block mb-2 text-base text-gray-900 dark:text-white font-poppins">Select Track Type</label>
            <select id="trackType" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Observation Track</option>
                <option>Official Forecast Track</option>
            </select>
          </div>
      </div>
      </div>

      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-dark rounded-[10px]">
          <div class="w-[12rem] mx-auto mt-2">
            <label for="dataSource" class="block mb-2 text-base text-gray-900 dark:text-white font-poppins">Data Source</label>
            <select id="dataSource" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <input type="date" id="date" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
          <div class="w-[8.5rem]">
            <label for="time" class="text-white text-sm font-medium font-poppins">Time</label>
            <input type="time" id="time" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
        </div>

        <div class="w-full left-[15px] top-[7.5rem] absolute flex space-x-2">
          <div class="w-[8.5rem]">
            <label for="latitude" class="text-white text-sm font-medium font-poppins">Latitude</label>
            <input :value="props.coordinates.latitude" type="number" id="latitude" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
          <div class="w-[8.5rem]">
            <label for="longitude" class="text-white text-sm font-medium font-poppins">Longitude</label>
            <input :value="props.coordinates.longitude" type="number" id="longitude" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
        </div>

        <div class="w-full left-[15px] top-[12rem] absolute flex space-x-2">
          <div class="w-[8.5rem]">
            <label for="pressure" class="text-white text-sm font-medium font-poppins">Pressure</label>
            <input type="text" id="pressure" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="4" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
          <div class="w-[8.5rem]">
            <label for="wind-average" class="text-white text-sm font-medium font-poppins">Wind Average</label>
            <input type="text" id="meanWind" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1').replace(/^0[^.]/, '0');" min="0" maxlength="3" class="w-full p-1 bg-gray-100 rounded-[10px]" required/>
          </div>
        </div>

        <button @click="addTrack" class="w-[125px] h-[38px] mt-4 left-[15px] top-[16.5rem] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex
          text-white text-sm font-medium font-poppins">Save Track
        </button>
        <button @click="submitData" class="w-[125px] h-[38px] mt-4 left-[163px] top-[16.5rem] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex text-white text-sm font-medium font-poppins">
          Submit Data
        </button>
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
                <th class="px-2 py-2 text-sm text-center font-poppins">Type</th>
                <th class="px-2 py-2 text-sm text-center font-poppins">Action</th>
              </tr>
            </thead>
            
            <tbody>
              <tr v-for="(track, index) in [...tracks.list, ...forecasts.list]" :key="index">
                <td class="px-2 py-2 text-center font-poppins">{{ index + 1 }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ track.coordinates.latitude }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ track.coordinates.longitude }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ new Date(track.datetime).toLocaleDateString() }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ new Date(track.datetime).toLocaleTimeString() }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ track.pressure }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ track.windAvg }}</td>
                <td class="px-2 py-2 text-center font-poppins">{{ track.type || 'Observation' }}</td>
                <td class="px-2 py-2 text-center font-poppins">
                  <button @click="deleteTrack(index)" class="text-red-500 hover:text-red-700">Delete</button>
                </td>
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
  const router = useRouter()
  const axios = useAxiosDev()

  const disturbanceStore = useDisturbanceStore();
  const showTrackList = ref(true);

  const toggleTrackList = () => {
    showTrackList.value = !showTrackList.value;
  };

  const props = defineProps(['coordinates']);
  const tracks = reactive({ list: [] });
  const forecasts = reactive({ list: [] });
  var data = reactive({
    isModalOpen: false,
    trackOne: [],
  }) 

  const deleteTrack = (index) => {
    tracks.list.splice(index, 1);
  };

  watchEffect(() => {
    console.log('Tracks:', tracks.list);
    console.log('Tracks:', forecasts.list);
  });

  const addTrack = () => {
    try {
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const latitude = document.getElementById('latitude').value;
      const longitude = document.getElementById('longitude').value;
      const pressure = document.getElementById('pressure').value;
      const meanWind = document.getElementById('meanWind').value;
      const trackType = document.getElementById('trackType').value;
      // Check if any of the required inputs is empty
      if (!date || !time || !latitude || !longitude || !pressure || !meanWind) {
        alert('Please fill in all required fields.');
        return;
      }

      // Check if the time input is empty
      if (!time.trim()) {
        alert('Please enter a valid time.');
        return;
      }
      const newTrack = {
        coordinates: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        datetime: new Date(`${date}T${time}`).toISOString(),
        pressure: parseFloat(pressure),
        windAvg: parseFloat(meanWind),
        type: trackType === 'Observation Track' ? 'Observation' : 'Forecast',
      };
      const isConfirmed = window.confirm('Apakah Anda akan menyimpan data ini?');
      if (isConfirmed) {
        if (trackType === 'Observation Track') {
          // Clear the forecast array and add to the track array
          tracks.list.push(newTrack);
        } else if (trackType === 'Official Forecast Track') {
          forecasts.list.push(newTrack);
        } else {
          console.warn('Unknown track type:', trackType);
        }
        
        console.log('Tracks:', tracks.list);
        console.log('Forecast:', forecasts.list);
      } else {
        console.log('User canceled track save.');
      }
    } catch (error) {
      console.error("An error occurred while adding track:", error);
    }
  };

  const submitData = async () => {
    try {
      const disturbanceData = disturbanceStore.formData;
      const payload = {
        month: disturbanceData.month,
        year: disturbanceData.year,
        area: disturbanceData.area,
        name: disturbanceData.name,
        description: disturbanceData.description,
        is_current: disturbanceData.is_current,
        direct_impact: disturbanceData.direct_impact,
        technical_bulletin: disturbanceData.technical_bulletin, 
        public_bulletin: disturbanceData.public_bulletin, 
        ocean_gale: disturbanceData.ocean_gale, 
        gale: disturbanceData.gale, 
        extreme_weather: disturbanceData.extreme_weather,
        description_id: disturbanceData.description_id,
      };
      if (tracks.list.length > 0 || forecasts.list.length > 0) {
        const isConfirmed = window.confirm('Apakah Anda akan menyimpan data track ini?');
        if (isConfirmed) {
          if (tracks.list.length > 0) {
            payload.track = tracks.list.map(track => ({
              geometry: {
                coordinates: [
                  track.coordinates.longitude,
                  track.coordinates.latitude
                ],
                type: "Point"
              },
              type: "Feature",
              properties: {
                date: track.datetime,
                pressure: track.pressure,
                meanWind: track.windAvg
              }
            }));
          }
          if (forecasts.list.length > 0) {
            payload.forecast = forecasts.list.map(forecast => ({
              geometry: {
                coordinates: [
                  forecast.coordinates.longitude,
                  forecast.coordinates.latitude
                ],
                type: "Point"
              },
              type: "Feature",
              properties: {
                date: forecast.datetime,
                pressure: forecast.pressure,
                meanWind: forecast.windAvg
              }
            }));
          }

          const response = await axios.post(
            "url/api/get/cyclone/create",
            payload
          );

          if (response.status === 200 && response.data.status === 'OK') {
            console.log('Data submitted successfully:', response.data.data);
            tracks.list = [];
            forecasts.list = [];
            router.push("/disturbance")
          } else {
            console.error('Error submitting data:', response.data.message);
          }
        }
      } else {
        alert("Tidak ada track yang ditambahkan. Mohon untuk menambahkan track terlebih dahulu");
        console.log('No tracks to submit.');
      }  
    } catch (error) {
      console.error("An error occurred while submitting data:", error);
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