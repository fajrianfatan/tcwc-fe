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
import Navbar from "@/components/Navbar/Navbar.vue";
import TrackType from "@/components/Form/Track.vue";
import { reactive } from 'vue';
import { useRoute } from 'vue-router';

const coordinates = reactive({
  latitude: "",
  longitude: "",
});

const params = reactive({
  id: '',
});
const route = useRoute();

onMounted(() => {
  params.id = route.params.id;
});

const getlatlng = (ltlng) => {
  coordinates.latitude = ltlng.latitude;
  coordinates.longitude = ltlng.longitude;
};

const mapready = (map) => {};
</script>