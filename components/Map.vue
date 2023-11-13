<template>
    <div class="relative">
      <div id="map" class="w-full map-height"></div>
    </div>
  </template>
  
  <script setup>
  import maplibregl from "maplibre-gl";
  
  import "maplibre-gl/dist/maplibre-gl.css";
  var data = reactive({
    map: null,
    zIndex: [
      "baselayer",
      "layer",
      "windlayer",
      "radar",
      "properties",
      "reference",
      "sigmet",
      "holding",
      "airport",
      "draw",
    ],
  });
  
  await nextTick();
  
  var emit = defineEmits(["latlng", "mapready"]);
  
  onMounted(() => {
    data.map = new maplibregl.Map({
      container: "map", // container id
      attributionControl: false,
      // hash: true,
      center: [113.85, -0.4], // starting position
      zoom: 4.11, // starting zoom
      minZoom: 2,
      style: {
        version: 8,
        name: "Circlegeo 3D",
        transition: {
          duration: 0,
          delay: 0,
        },
        metadata: {
          "mapbox:autocomposite": false,
          "maputnik:renderer": "mbgljs",
          "openmaptiles:version": "3.x",
        },
        sources: {
          openmaptiles: {
            type: "vector",
            url: "https://tiles.circlegeo.com/data/planet.json",
          },
          Satellite: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
          },
          Streets: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}",
            ],
          },
        },
        glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
        layers: [
          {
            id: "background",
            type: "background",
            paint: {
              "background-color": "rgb(125,125,125)",
            },
          },
          {
            id: "water",
            type: "fill",
            source: "openmaptiles",
            "source-layer": "water",
            filter: [
              "all",
              ["==", "$type", "Polygon"],
              ["!=", "brunnel", "tunnel"],
            ],
            paint: {
              "fill-color": "rgb(185 185 185)",
            },
          },
        ],
        id: "circlegeo-3d",
      }
    })
    data.map.on("load", async () => {
      data.map.on("click", (e) => {
        // console.log(e)
        emit("latlng", e.lngLat);
      });

      // this.map.addLayer({})
  
      data.map.addSource("contours", {
        type: "vector",
        url: "https://tiles.circlegeo.com/data/indocg.json",
      });
  
      data.map.addLayer({
        id: "indocg",
        type: "line",
        source: "contours",
        "source-layer": "indocg",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#000",
          "line-width": 1,
        },
      });
  
      data.map.addLayer({
        id: "indocgfill",
        type: "fill",
        source: "contours",
        "source-layer": "indocg",
        paint: {
          "fill-color": "rgb(185 185 185)",
        },
      });
  
      data.map.addSource("dummy", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
  
      data.zIndex.forEach((el) => {
        data.map.addLayer(
          {
            id: el,
            type: "fill",
            source: "dummy",
            layout: {},
            paint: {
              "fill-opacity": 0,
            },
          },
          "indocg"
        );
      });
  
      emit("mapready", data.map);
    });
    data.map.on('error', (response) => {
      // alert(response.error.message)
    });
  });
  </script>
  
  <style scoped>
  .map-height {
    height: 100vh;
  }
  
  @media screen and (max-width: 400px) {
    .map-height {
      height: 100vh;
    }
  }
  </style>
  