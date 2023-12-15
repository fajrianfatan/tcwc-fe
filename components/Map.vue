<template>
  <div class="relative">
    <div id="map" class="w-full map-height"></div>
    <TrackModal v-if="isModalOpen" @closeModal="isModalOpen = false" :trackParams="trackParams" />
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
  const router = useRouter();
  const axios = useAxiosDev()

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
  const trackParams = reactive({
    id: ''
  })
  const formData = reactive({
  x: '',
  y: '',
  longitude: '',
  latitude: '',
  });
  const isModalOpen = ref(false);
  const isDragging = ref(false);
  const isEditMode = ref(false);
  const exitEditMode = () => {
    isEditMode.value = false;
    
  };
  const addMarker = (lngLat, trackId, date, latitude, longitude, meanWind, pressure) => {
  const popupContent = document.createElement('div');
  popupContent.innerHTML = `
  <b>Date:</b> ${date}<br>
  <b>Latitude:</b> <span class="latitude">${latitude} N</span><br>
  <b>Longitude:</b> <span class="longitude">${longitude} E</span><br>
  <b>Wind Avg:</b> ${meanWind} knots<br>
  <b>Pressure:</b> ${pressure} mbar<br>
  <div class="popup-buttons">
    <button class="edit-position-btn">Edit Position</button>
    <button class="edit-btn">Edit</button>
    <button class="save-btn">Save</button>
  </div>
  `;
  let isMarkerDraggable = isEditMode.value;

  let marker = new maplibregl.Marker({
    draggable: isMarkerDraggable,
  })
    .setLngLat(lngLat)
    .setPopup(
      new maplibregl.Popup().setDOMContent(popupContent)
    )
    .addTo(data.map);
  const trackIdElement = popupContent.querySelector('.track-id');
  if (trackIdElement) {
    trackIdElement.style.display = 'none';
  }
  marker.on("dragstart", () => {
    isDragging.value = true;
  });

  marker.on("drag", () => {
  // Update latitude and longitude in real-time during dragging
  const lngLat = marker.getLngLat();
  const latitudeSpan = popupContent.querySelector('.latitude');
  const longitudeSpan = popupContent.querySelector('.longitude');

  if (latitudeSpan && longitudeSpan) {
    latitudeSpan.textContent = lngLat.lat.toFixed(1);
    longitudeSpan.textContent = lngLat.lng.toFixed(1);
  }
  });
  marker.on("dragend", () => {
    isDragging.value = false;
    // Update latitude and longitude when dragging ends
    formData.longitude = marker.getLngLat().lng.toFixed(1);
    formData.latitude = marker.getLngLat().lat.toFixed(1);
  });

  popupContent.querySelector('.edit-btn').addEventListener('click', () => {
    trackParams.id = trackId; 
    isModalOpen.value = true;
  });

  const handleEditButton = () => {
  isMarkerDraggable = true; // Change this if necessary
  marker.setDraggable(isMarkerDraggable);
  };

  popupContent.querySelector('.save-btn').addEventListener('click', async () => {
    const isConfirmed = window.confirm('Simpan perubahan titik koordinat?');
    if (isConfirmed) {
      try {

      // Fetch existing tracks
      const response = await axios.get("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/" + useRoute().params.id);
      const existingTracks = response.data.data.track;
      
      // Find the index of the specific track to update
      const trackIndex = existingTracks.findIndex(existingTrack => existingTrack._id === trackId);
      console.log('Initial Track ID:', existingTracks[trackIndex]._id);
      console.log(trackIndex);

      if (trackIndex !== -1) {
        // Create a new track object with updated properties
        const updatedTrack = {
          ...existingTracks[trackIndex],
          geometry: {
            coordinates: [
              parseFloat(formData.longitude), // Updated longitude
              parseFloat(formData.latitude),  // Updated latitude
            ],
            type: "Point",
          },
          type: "Feature",
          properties: {
            date: existingTracks[trackIndex].properties.date,
            meanWind: existingTracks[trackIndex].properties.meanWind,
            pressure: existingTracks[trackIndex].properties.pressure,
          },
        };

        console.log('Updated Track ID:', updatedTrack._id);
        console.log('Mean Wind:', updatedTrack.geometry.coordinates[0]);
        console.log('Pressure:', updatedTrack.geometry.coordinates[1]);
        console.log('Existing Track Values:', existingTracks[trackIndex]);
        console.log('Updated Track Object:', updatedTrack);
        router.push(useRoute().params.id);

        // Update only the specific track in the array
        const updatedTracksArray = [...existingTracks];
        updatedTracksArray[trackIndex] = updatedTrack;

        // Prepare the updated track data
        const updatedTrackData = {
          _id: useRoute().params.id, // Cyclone ID
          track: updatedTracksArray,
        };

        console.log('Payload to be sent:', updatedTrackData);

        // Send a PUT request to update the cyclone with the new track data
        const updateResponse = await axios.post(
          'https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/update',
          updatedTrackData
        );
        
        
        console.log('Server Response Track ID:', updateResponse.data._id);
        console.log('Hardcoded Response:', { data: 'Updated successfully' });
        console.log(updateResponse.data);
        marker.setDraggable(false);
        exitEditMode();
        marker.togglePopup();

        router.go(0);
        // Handle the response as needed, e.g., show success message or redirect
      } else {
        console.error('Track not found for update.');
      }
    } catch (error) {
      // Handle errors, e.g., show error message
      console.error('Error updating cyclone:', error);
    }
      

    } else {
      handleEditButton();
    }
  });

  popupContent.querySelector('.edit-position-btn').addEventListener('click', () => {
    handleEditButton();
  });
};

  await nextTick();

  var emit = defineEmits(["latlng", "mapready"]);
    
    onMounted(async () => {
    // console.log(useRoute())
    const response = await axios.get("https://tropicalcyclone.bmkg.go.id/api-tcwc/tcwc/cyclone/get/" + useRoute().params.id);
    const apiData = response.data;
  
    // console.log(apiData)
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
          if (!isDragging.value) {
            return;
          }

          isDragging.value = false;
          formData.longitude = e.lngLat.lng.toFixed(1);
          formData.latitude = e.lngLat.lat.toFixed(1);
          emit("latlng", {
            latitude: e.lngLat.lat.toFixed(1),
            longitude: e.lngLat.lng.toFixed(1),
          });
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
          const track = apiData.data.track;

          console.log(track)

          track.forEach((point) => {
            const lngLat = {
              lng: point.geometry.coordinates[0],
              lat: point.geometry.coordinates[1],
            };
            addMarker(
              lngLat,
              point._id,
              point.properties.date,
              point.geometry.coordinates[1], // Latitude
              point.geometry.coordinates[0], // Longitude
              point.properties.meanWind,
              point.properties.pressure
            );
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
    .popup-buttons {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 8px; /* Add padding for better aesthetics */
    }

    .edit-btn,
    .save-btn {
    margin-left: 5px; /* Add some space between the buttons */
    }
    
  </style>