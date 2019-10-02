

//// Code for heatmap implementation
function startMap() {
    
   // Need to add data from DB in the future, for now temp data is gotten from dummydata_10000.js

  // The type of map being used in Leaflet
  var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
      minZoom: 11,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                  '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                  'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
  });

  var hmConfig = {
    "radius": 0.0005,         // Small to scale down to street sized points
    "maxOpacity": .8,         // Sets max opacity of points
    "scaleRadius": true,      // Scales the radius of the point based on map zoom
    "useLocalExtrema": true,  // Uses data maximum within current map viewpoint for colorationof points
  };

  // Config the map
  // Targeting div with id="balMap"
  var heatmapLayer = new HeatmapOverlay(hmConfig);
  var map = new L.Map('balMap', {
    center: new L.LatLng(39.290203, -76.612816),
    zoom: 12,
    layers: [baseLayer, heatmapLayer]
  });

  heatmapLayer.setData(testData);
}
