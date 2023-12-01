<template>
  <div class="relative">
    <div id="map" class="w-full map-height"></div>
  </div>
</template>
  
  <script>

  export default {
    data() {
      return {
        latitude: null,
        longitude: null,
      };
    },
    methods: {
      updateLatLng(latlng) {
        this.latitude = latlng.latitude;
        this.longitude = latlng.longitude;
      },
      updateLatitude(value) {
        this.latitude = value;
      },
      updateLongitude(value) {
        this.longitude = value;
      },
    },
  };
  </script>
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
  
  const formData = reactive({
  x: '',
  y: '',
  longitude: '',
  latitude: '',
  });

  const addMarker = (lngLat, date, pressure, meanWind) => {
  const marker = new maplibregl.Marker()
    .setLngLat(lngLat)
    .setPopup(new maplibregl.Popup().setHTML(`<b>Date:</b> ${date}<br><b>Pressure:</b> ${pressure}<br><b>Wind Average:</b> ${meanWind}`))
    .addTo(data.map);
  };

  await nextTick();

  var emit = defineEmits(["latlng", "mapready"]);
    
    onMounted(async () => {
    const response = await fetch("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/all");
    const apiData = await response.json();
      data.map = new maplibregl.Map({
        container: "map", 
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
          formData.longitude = e.lngLat.lng.toFixed(6);
          formData.latitude = e.lngLat.lat.toFixed(6);

        // this.map.addLayer({})
        emit('latlng', { latitude: e.lngLat.lat.toFixed(6), longitude: e.lngLat.lng.toFixed(6) });
          // console.log(formData)
        addMarker([e.lngLat.lng, e.lngLat.lat]);
      });
        
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
        
        // data.map.addLayer({
        //   id: "indocgfill",
        //   type: "fill",
        //   source: "contours",
        //   "source-layer": "indocg",
        //   paint: {
        //     "fill-color": "rgb(185 185 185)",
        //   },
        // });
    
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

        data.map.addSource('dark_all', {
              type: "raster",
              tiles: ["https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"],
              tileSize: 256,
          });

          data.map.addLayer(
              {
                  id: 'dark_all',
                  type: "raster",
                  source: 'dark_all',
                  paint: {
                      "raster-fade-duration": 0,
                      "raster-opacity": 0.9,
                  },
              }, "indocg"
          );
          const track = apiData.data.docs[0].track;

        // Add markers
        track.forEach((point) => {
          const lngLat = { lng: point.geometry.coordinates[0], lat: point.geometry.coordinates[1] };
          addMarker(lngLat, point.properties.date, point.properties.pressure, point.properties.meanWind);
        });
        data.map.addControl(new maplibregl.NavigationControl());

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