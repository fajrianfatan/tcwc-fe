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
        isMarkerBeingDragged: false,
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
      onMarkerDragStart() {
        this.isMarkerBeingDragged = true;
      },
      onMarkerDragEnd() {
        this.isMarkerBeingDragged = false;
      },
      canAddMarker() {
        return !this.isMarkerBeingDragged;
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
    marker: null,
    isMarkerDraggable: true,
  });
  
  const formData = reactive({
  x: '',
  y: '',
  longitude: '',
  latitude: '',
  
  });
  
  const onMarkerDrag = () => {
    const lngLat = data.marker.getLngLat();
    formData.longitude = lngLat.lng.toFixed(1);
    formData.latitude = lngLat.lat.toFixed(1);

    emit("latlng", {
      latitude: lngLat.lat.toFixed(1),
      longitude: lngLat.lng.toFixed(1),
    });
  };

  const onMarkerDragEnd = () => {
    const confirmSave = window.confirm(
      "Apakah Anda akan menyimpan titik koordinat ini?"
    );

    if (confirmSave) {
      data.marker.setDraggable(false);
      data.isMarkerDraggable = false;
    } else {
      data.isMarkerDraggable = true;
    }
    data.isMarkerDraggable = true;
  };

  const addMarker = (lngLat, date, pressure, meanWind) => {
    const marker = new maplibregl.Marker({ draggable: data.isMarkerDraggable })
      .setLngLat(lngLat)
      .setPopup(new maplibregl.Popup().setHTML(`<b>Date:</b> ${date}<br><b>Pressure:</b> ${pressure}<br><b>Wind Average:</b> ${meanWind}`))
      .addTo(data.map);
    data.marker = marker;
    marker.on('drag', onMarkerDrag);
    marker.on('dragend', onMarkerDragEnd);
    emit('latlng', { latitude: lngLat.lat.toFixed(1), longitude: lngLat.lng.toFixed(1) });
  };

  await nextTick();

  var emit = defineEmits(["latlng", "mapready"]);
    onMounted(async () => {
      data.map = new maplibregl.Map({
        container: "map", 
        attributionControl: false,
        // hash: true,
        center: [113.85, -0.4],
        zoom: 4.11,
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
                "background-color": "rgb(37, 58, 69)",
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
                "fill-color": "rgb(36, 50, 60)",
              },
            },
          ],
          id: "circlegeo-3d",
        }
      })
      data.map.on("load", async () => {
        data.map.on("click", (e) => {
          formData.longitude = e.lngLat.lng.toFixed(1);
          formData.latitude = e.lngLat.lat.toFixed(1);
        emit('latlng', { latitude: e.lngLat.lat.toFixed(1), longitude: e.lngLat.lng.toFixed(1) });
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
            "line-color": "#8B9196",
            "line-width": 1,
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

        data.map.addSource('voyager_only_labels', {
          type: "raster",
          tiles: ["https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png'"],
          tileSize: 256,
        });

        data.map.addLayer(
          {
            id: 'voyager_only_labels',
            type: "raster",
            source: 'voyager_only_labels',
            paint: {
                "raster-fade-duration": 0,
                "raster-opacity": 0.9,
            },
          }, "indocg"
        );
        data.map.addControl(new maplibregl.NavigationControl());
        emit("mapready", data.map);
      });
      data.map.on('error', (response) => {
      });
    });
    </script>
    
  <style scoped>
    .map-height {
      height: 90vh;
    }
    
    @media screen and (max-width: 400px) {
      .map-height {
        height: 90vh;
      }
    }
    
  </style>