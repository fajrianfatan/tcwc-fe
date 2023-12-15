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
import { reactive } from 'vue';

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

const params = reactive({
  id: '',
});
const route = useRoute();

// Fetch and store the 'id' parameter from the URL when the component is mounted
onMounted(() => {
  params.id = route.params.id;
});


// Define the getlatlng function
const getlatlng = (ltlng) => {
  coordinates.latitude = ltlng.latitude;
  coordinates.longitude = ltlng.longitude;
};

// Define the mapready function
const mapready = (map) => {};
</script>