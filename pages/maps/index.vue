<template>
  <div>
    <Navbar />
    <ClientOnly>
      <div class="absolute top-50 left-0 w-[10rem] z-10">
        <TrackType :coordinates="coordinates" />
      </div>
      <Map @latlng="getlatlng" />
    </ClientOnly>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar/Navbar.vue";
import TrackType from "@/components/Form/Track.vue";

const coordinates = reactive({
  latitude: "",
  longitude: "",
});

const getlatlng = (ltlng) => {
  coordinates.latitude = ltlng.latitude;
  coordinates.longitude = ltlng.longitude;
};

const mapready = (map) => {};
</script>
