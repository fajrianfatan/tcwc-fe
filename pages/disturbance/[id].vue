<template>
    <Navbar/>
    <section v-if="disturbanceData" class="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-200 mt-20">
    <h1 class="text-xl font-bold text-black capitalize dark:text-black">Edit Cyclone Data</h1>
    <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
            <label class="text-black dark:text-black" for="name">Cyclone Name</label>
            <input
            v-model="disturbanceData.name"
            id="name"
            type="text"
            class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
        </div>

        <div>
        <label class="text-black dark:text-black" for="area">Storm Identifier</label>
        <input v-model="disturbanceData.area" id="area" type="text" class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
        </div>

        <div>
            <label class="text-black dark:text-black" for="year">Month/Year</label>
            <input
                v-model="formattedDateInput"
                id="year"
                type="month"
                class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
            />
        </div>

        
        <div>
            <label class="text-black dark:text-black" for="passwordConfirmation">Priority</label>    
            <div class="flex mt-6">
            <div class="flex items-center me-32">
            <input
                id="high-priority"
                type="radio"
                value="High"
                v-model="priority"
                name="priority-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-200 dark:border-gray-600"
            />
            <label for="high-priority" class="ms-2 text-sm font-medium text-gray-900 dark:text-black">High</label>
            </div>

            <div class="flex items-center me-4">
            <input
                id="low-priority"
                type="radio"
                value="Low"
                v-model="priority"
                name="priority-group"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-200 dark:border-gray-600"
            />
            <label for="low-priority" class="ms-2 text-sm font-medium text-gray-900 dark:text-black">Low</label>
            </div>
            </div>
        </div>

        <div>
        <label class="text-black dark:text-black" for="technicalBulletin">Technical Bulletin</label>
        <textarea v-model="disturbanceData.technical_bulletin" id="technicalBulletin" type="textarea" class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
        </div>

        <div>
        <label class="text-black dark:text-black" for="publicBulletin">Public Bulletin</label>
        <textarea v-model="disturbanceData.public_bulletin" id="publicBulletin" type="textarea" class="block w-full px-4 py-2 mt-2 text-black bg-white border border-gray-300 rounded-md dark:bg-white dark:text-black dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
        </div>
        </div>
        <div class="flex justify-end mt-20">
            <NuxtLink to="/disturbance" class="px-6 py-2 mr-2 leading-5 text-white transition-colors duration-200 transform bg-btn-submit rounded-md hover:bg-red-800 focus:outline-none focus:bg-gray-600">Back</NuxtLink>
            <NuxtLink
            to="/disturbance"
            class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-btn-submit rounded-md hover:bg-blue-800 focus:outline-none focus:bg-gray-600"
            @click="submitForm"
            >
            Save
            </NuxtLink>
        </div>
    </form>
</section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
const axios = useAxiosDev()
const route = useRoute()
const params = route.params.id;
const disturbanceData = ref({}); // Change initialization to an empty object

const formattedDateInput = ref(''); // Create a separate ref for the input

const fetchDistData = async () => {
    try {
        const response = await axios.get(`https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/${params}`);
        if (response.data.status === 'OK') {
            disturbanceData.value = response.data.data;
            // Ensure that the API provides a valid month and year format, and set it to the formattedDate
            formattedDateInput.value = `${response.data.data?.year}-${String(response.data.data?.month).padStart(2, '0')}`;
            priority.value = response.data.data.is_current ? 'High' : 'Low';
        } else {
            console.error('Error fetching disturbances:', response.data);
        }
    } catch (error) {
        console.error('Error fetching disturbances:', error);
    }
};

const submitForm = async () => {
  try {
    const editedData = {
      _id: disturbanceData.value._id,
      month: disturbanceData.value.month,
      year: disturbanceData.value.year,
      area: disturbanceData.value.area,
      name: disturbanceData.value.name,
      description: disturbanceData.value.description,
      is_current: priority.value === 'High',
      track: disturbanceData.value.track,
      technical_bulletin: disturbanceData.value.technical_bulletin,
      public_bulletin: disturbanceData.value.public_bulletin,
      ocean_gale: disturbanceData.value.ocean_gale,
      gale: disturbanceData.value.gale,
      extreme_weather: disturbanceData.value.extreme_weather,
    };

    const response = await axios.post(
      'https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/update',
      editedData
    );

    if (response.data.status === 'OK') {
      console.log('Data updated successfully:', response.data);
      // Redirect to the disturbance page or handle success as needed
    } else {
      console.error('Error updating data:', response.data);
    }
  } catch (error) {
    console.error('Error updating data:', error);
  }
};

onMounted(fetchDistData);

// Format the date as per your requirement
const formattedDate = computed(() => {
  const month = disturbanceData.value?.month;
  const year = disturbanceData.value?.year;
  return month && year ? `${month}/${year}` : '';
});
const priority = ref('');
</script>
