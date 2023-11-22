<template>
    <div class="z-50 w-full h-full">
      <!-- Form 1: Select Track Type -->
      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative z-100">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-slate-800 rounded-[5px]">
          <div class="w-[12rem] mx-auto mt-2">
            <label for="countries" class="block mb-2 text-sm text-medium text-gray-900 dark:text-white font-['Lato']">Select Track Type</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Forecast Track</option>
            </select>
          </div>
      </div>
      </div>
  
      <!-- Form 2: Data Source -->
      <div class="w-[14rem] h-[5.5rem] mt-4 ml-4 relative">
        <div class="w-[14rem] h-[5.5rem] left-0 top-0 absolute bg-slate-800 rounded-[5px]">
          <div class="w-[12rem] mx-auto mt-2">
            <label for="countries" class="block mb-2 text-sm text-medium text-gray-900 dark:text-white font-['Lato']">Data Source</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 bg-white dark:border-gray-600 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Darwin TCWC</option>
            </select>
          </div>
      </div>
      </div>
  
      <!-- Form 3: Add Fix -->
      <div class="w-[20rem] h-[22rem] mt-4 ml-4 relative">
        <div class="w-[20rem] h-[22rem] left-0 top-0 absolute bg-slate-800 rounded-[5px]"></div>
        <div class="w-[10rem] h-[15.61px] left-[15px] top-[15.61px] absolute text-white text-medium font-['Lato']">Add Fix</div>
  
        <!-- Date and Time -->
        <div class="w-full left-[15px] top-[3rem] absolute flex space-x-2">
          <div class="w-[8.5rem]">
            <label for="date" class="text-white text-sm font-medium font-['Lato']">Date</label>
            <input type="date" id="date" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
          <div class="w-[8.5rem]">
            <label for="time" class="text-white text-sm font-medium font-['Lato']">Time</label>
            <input type="time" id="time" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
        </div>
  
        <div class="w-full left-[15px] top-[7.5rem] absolute flex space-x-2">
          <div class="w-[8.5rem]">
            <label for="latitude" class="text-white text-sm font-medium font-['Lato']">Latitude</label>
            <input :value="props.coordinates.latitude" type="text" id="latitude" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
          <div class="w-[8.5rem]">
            <label for="longitude" class="text-white text-sm font-medium font-['Lato']">Longitude</label>
            <input :value="props.coordinates.longitude" type="text" id="longitude" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
        </div>

        <div class="w-full left-[15px] top-[12rem] absolute flex space-x-2">
          <div class="w-[8.5rem]">
            <label for="pressure" class="text-white text-sm font-medium font-['Lato']">Pressure</label>
            <input type="text" id="pressure" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
          <div class="w-[8.5rem]">
            <label for="wind-average" class="text-white text-sm font-medium font-['Lato']">Wind Average</label>
            <input type="text" id="wind-average" class="w-full p-1 bg-gray-100 rounded-[5px]" />
          </div>
        </div>
  
        <!-- Submit Button -->
        <div class="w-[143px] h-[38px] mt-4 left-[15px] top-[16.5rem] absolute bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex">
          <div class="text-white text-sm font-medium font-['Poppins']">Submit</div>
        </div>
      </div>
      
    </div>
    <div class="z-50 w-full h-full">
      <!-- Form 1: Select Track Type -->
      <div class="w-[50rem] h-[18rem] bg-slate-800 rounded-[5px] fixed bottom-4 right-4">
        <!-- Inserted div at the top -->
        <div class="relative">
    <!-- Existing box -->
          <div class="w-[50rem] h-[3rem] bg-emerald-500 rounded-tl-[10px] rounded-tr-[10px] flex items-center">
            <label class="ml-5 text-white font-semibold font-['Lato']">Track List</label>
            
            <!-- Dropdown select -->
            <select class="absolute top-0 right-5 h-full bg-emerald-500 text-white rounded-tr-[10px] rounded-br-[10px] border-none outline-none p-2">
              <option value="001">001</option>
              <option value="002">002</option>
              <!-- Add more options as needed -->
            </select>
            <div class="absolute top-0 right-2 h-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4 text-white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        <!-- Table with labels -->
        <table class="w-full table-auto text-white">
          <thead>
            <tr>
              <th class="px-4 py-2 text-center font-['Lato']">No</th>
              <th class="px-4 py-2 text-center font-['Lato']">Longitude</th>
              <th class="px-4 py-2 text-center font-['Lato']">Latitude</th>
              <th class="px-4 py-2 text-center font-['Lato']">Date Time</th>
              <th class="px-4 py-2 text-center font-['Lato']">Wind Average</th>
              <th class="px-4 py-2 text-center font-['Lato']">Pressure</th>
              <th class="px-4 py-2 text-center font-['Lato']">Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- Example row, you can repeat this for each data entry -->
            <tr>
              <td class="px-4 py-2 text-center font-['Lato']">001</td>
              <td class="px-4 py-2 text-center font-['Lato']">110.4268N</td>
              <td class="px-4 py-2 text-center font-['Lato']">-10.479E</td>
              <td class="px-4">
                <input class="h-[1.8rem] rounded-[0.3rem] text-black" type="date">
              </td>
              <td class="px-4 py-2 text-center font-['Lato']">35 knots</td>
              <td class="px-4 py-2 text-center font-['Lato']">998 mb</td>
              <td class="px-4 py-2 text-center font-['Lato']">
                <!-- Edit & Delete button -->
                <button class="text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                <button class="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
            <!-- Repeat this block for additional rows -->
          </tbody>
        </table>
      </div>
      
      <!-- Repeat similar blocks for additional tables -->
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const props = defineProps(
  [
    'coordinates'
    
  ]
)
// defineProps(['latitude', 'longitude']);

</script>
  