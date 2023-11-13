<template>
  <div>
    <ClientOnly>
      <Map @mapready="mapready" @latlng="getlatlng" />
    </ClientOnly>
  </div>
</template>

<script setup>

var getlatlng = (ltlng) => {
  
}

var mapready = (map) => {

}
</script>