<template>
    <div>
      <Navbar />
      <ClientOnly>
        <div class="absolute top-50 left-0 w-[10rem] z-10">
          <TrackType :coordinates="coordinates" />
        </div>
        <Map @latlng="getlatlng" :params="params" />
      </ClientOnly>
    </div>
  </template>

<script setup>
import { reactive, ref, onMounted, defineProps, defineEmits } from 'vue';

// Import useRoute from vue-router
import { useRoute } from 'vue-router';

// Import the necessary components
import Navbar from "@/components/Navbar/Navbar.vue";
import TrackType from "@/components/Form/Track.vue";

// Define the coordinates reactive object
const coordinates = reactive({
  latitude: "",
  longitude: "",
});

// Define the emit function to send data to the parent component
const { emit } = defineEmits();

// Define the data reactive object to store the params
const data = reactive({
  params: '',
});

// Access the route object
const route = useRoute();

// Use onMounted to perform actions after the component is mounted
onMounted(async () => {
  // Get the params from the route and store them in data.params
  data.params = route.params.id;
  console.log('Params:', data.params);
  // Emit the params to the parent component
  emit('params', { params: data.params });
});

// Define the getlatlng function
const getlatlng = (ltlng) => {
  coordinates.latitude = ltlng.latitude;
  coordinates.longitude = ltlng.longitude;
};

// Define the mapready function
const mapready = (map) => {};
</script>