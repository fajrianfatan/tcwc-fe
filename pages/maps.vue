<template>
  <div>
    <Navbar/>
    <ClientOnly>
      <Map @mapready="mapready" @latlng="getlatlng" />
    </ClientOnly>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar/NavbarDisturbance.vue"

var getlatlng = (ltlng) => {
  
}

var mapready = (map) => {

}
</script>