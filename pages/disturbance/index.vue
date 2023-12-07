<template>
    <div>
      <Navbar/>
	  <div class="w-full h-full">
		<button class="w-[15rem] h-[3rem] ml-12 top-[10.5rem] absolute text-white text-base font-medium font-poppins bg-emerald-500 rounded-[32px] shadow justify-center items-center gap-2.5 inline-flex"
		@click="isModalOpen = true">
		Add New Disturbance
		</button>
		<div class="w-6 h-6 left-[1324px] top-[325px] absolute" />
		<div class="w-6 h-6 left-[1289px] top-[325px] absolute">
			<div class="w-[17px] h-[17px] left-[4px] top-[3px] absolute">
			</div>
		</div>
		<div class="relative w-[100rem] mx-auto justify-center top-[10rem] shadow-md rounded-[10px]">
			<div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
				<div>
					<button id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:text-black dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
						<svg class="w-3 h-3 text-gray-500 dark:text-gray-400 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
								<path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
							</svg>
						Last 30 days
						<svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
						</svg>
					</button>
					<!-- Dropdown menu -->
					<div id="dropdownRadio" class="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="top" style="position: absolute; inset: auto auto 0px 0px; margin: 0px; transform: translate3d(522.5px, 3847.5px, 0px);">
						<ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
							<li>
								<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="filter-radio-example-1" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="filter-radio-example-1" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last day</label>
								</div>
							</li>
							<li>
								<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input checked="" id="filter-radio-example-2" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="filter-radio-example-2" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 7 days</label>
								</div>
							</li>
							<li>
								<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="filter-radio-example-3" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="filter-radio-example-3" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last 30 days</label>
								</div>
							</li>
							<li>
								<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="filter-radio-example-4" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="filter-radio-example-4" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last month</label>
								</div>
							</li>
							<li>
								<div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="filter-radio-example-5" type="radio" value="" name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
									<label for="filter-radio-example-5" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Last year</label>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<label for="table-search" class="sr-only">Search</label>
				<div class="relative">
					<div class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
						<svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
					</div>
					<input type="text" id="table-search" class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items">
				</div>
			</div>
			<table class="w-full text-sm text-left rtl:text-right text-black rounded-[5px]">
				<thead class="text-base text-black bg-gray-200 ">
					<tr>
						
						<th scope="col" class="px-6 py-3">
							Disturbance id
						</th>
						<th scope="col" class="px-6 py-3">
							Cyclone Name
						</th>
						<th scope="col" class="px-6 py-3">
							Storm Identifier
						</th>
						<th scope="col" class="px-6 py-3">
							Priority
						</th>
						<th scope="col" class="px-6 py-3">
							Action
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="disturbance in mappedDisturbances" :key="disturbance.disturbance_id">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
						{{ disturbance.disturbance_id }}
					</th>
					<td class="px-6 py-4">
						{{ disturbance.cyclone_name }}
					</td>
					<td class="px-6 py-4">
						{{ disturbance.storm_identifier }}
					</td>
					<td class="px-6 py-4">
						{{ disturbance.priority }}
					</td>
					<td class="px-6 py-4">
						<div class="flex space-x-4">
						<NuxtLink :to="`/disturbance/${disturbance.disturbance_id}`" class="font-medium text-blue-600 dark:text-black hover:underline">Edit</NuxtLink>
						<NuxtLink :to="`/maps/${disturbance.disturbance_id}`" class="font-medium text-blue-600 dark:text-black hover:underline">Edit Track</NuxtLink>


						<button @click="deleteDisturbance(disturbance.disturbance_id)" class="font-medium text-blue-600 dark:text-black hover:underline">Delete</button>
						</div>
					</td>
					</tr>
				</tbody>
			</table>
			<DisturbanceModal v-if="isModalOpen" @closeModal="isModalOpen = false" />
		</div>
		</div>
	</div>
</template>

<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import DisturbanceModal from "~/components/DisturbanceModal.vue";
import { ref, onMounted, computed } from 'vue';
const axios = useAxiosDev() // Adjust this path accordingly

const isModalOpen = ref(false);
const disturbances = ref([]);

const fetchDisturbances = async () => {
  try {
    const response = await axios.get('https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/all/');
    if (response.data.status === 'OK') {
      disturbances.value = response.data.data.docs;
    } else {
      console.error('Error fetching disturbances:', response.data);
    }
  } catch (error) {
    console.error('Error fetching disturbances:', error);
  }
};

const mappedDisturbances = computed(() => {
  return disturbances.value.map(disturbance => ({
    disturbance_id: disturbance._id,
    cyclone_name: disturbance.name,
    storm_identifier: disturbance.area,
    priority: disturbance.is_current ? 1 : 0,
  }));
});

const deleteDisturbance = async (disturbanceId) => {
  try {
    const response = await axios.post('https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/delete', {
      _id: disturbanceId,  // Use _id instead of disturbance_id
    });

    if (response.data.status === 'OK') {
      disturbances.value = disturbances.value.filter(disturbance => disturbance._id !== disturbanceId);
      console.log('Disturbance deleted successfully');
    } else {
      console.error('Error deleting disturbance:', response.data);
    }
  } catch (error) {
    console.error('Error deleting disturbance:', error);
  }
};
fetchDisturbances();
</script>