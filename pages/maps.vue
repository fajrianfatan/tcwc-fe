<template>
  <div>
    <Navbar/>
    <ClientOnly>
      <div class="absolute top-50 left-0 w-[10rem] z-10">
      <TrackType/>
      </div>
      <Map @mapready="mapready" @latlng="getlatlng" />
    </ClientOnly>
    
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar/Navbar.vue"
import TrackType from "@/components/Form/Track.vue"

var getlatlng = (ltlng) => {
  
}

var mapready = (map) => {

}
</script>