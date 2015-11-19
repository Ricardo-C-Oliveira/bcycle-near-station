var map = L.map('map', {
  'zoomControl': false,
}).setView([39.739800, -104.989276], 14);

//zoom custom position
L.control.zoom({
  position: 'topright'
}).addTo(map);

//the base map
L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'
}).addTo(map);

//info box
var info = L.control({
  position: 'topleft'
});

info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};

info.update = function(props) {
  this._div.innerHTML = '<img src="img/logo.png"><br>' + (props ?
    '<h1><b>' + props.STATION + '</b></h1>' : '');
};

info.addTo(map);
//end info box

//function that defines style for each point
function Style(feature) {
  return {
    fillColor: "#1015a5",
    color: "#dd0d24",
    fillOpacity: 1,
    weight: 2,
    radius: 6
  };
}

//stations data
var data = L.geoJson(stations, {
  pointToLayer: function(feature, latlgn) {
    var popupContent = '<p style="font-family: Roboto, sans-serif; color: white; font-size: 16px"><b>Station Name: </b><span style="color: red"><b>' + feature.properties.STATION + '</b></span></p>';
    return L.circleMarker(latlgn, Style(feature)).bindPopup(popupContent);
  },
}).addTo(map);

var marker = L.marker(new L.LatLng(39.736686, -105.002213), {
  icon: L.AwesomeMarkers.icon({
    icon: 'fa-crosshairs',
    markerColor: 'red',
    prefix: 'fa'
  }),
  draggable: true
});

marker.bindPopup('<p style="font-family: Roboto, sans-serif; color: white; font-size: 14px"><b>Drag me to find the clesest station to you! </b></p>');
marker.addTo(map).openPopup();

//custom near icon
var customIcon = L.AwesomeMarkers.icon({
  icon: 'fa-bicycle',
  markerColor: 'blue',
  prefix: 'fa'
});

//remove nearest station
function removeNear() {
  map.removeLayer(near);
  info.update();
}

//add nearest station
function addNear() {
  //make marker a geoJson
<<<<<<< HEAD
  var pointMarker = marker.toGeoJSON();
=======
  pointMarker = marker.toGeoJSON();
>>>>>>> master
  //turf nearest
  nearest = turf.nearest(pointMarker, stations);
  near = L.geoJson(nearest, {
    pointToLayer: function(feature, latlng) {
      return L.marker(latlng, {
        icon: customIcon
      }).bindPopup('<p style="font-family: Roboto, sans-serif; color: white; font-size: 17px"><b>Station Name: </b><span style="color: #D83720"><b>' + feature.properties.STATION + '</b></span></p>');
      info.update(layer.feature.properties);
    }
  }).addTo(map);
  //console.log(nearest);
  near.on('mouseover', function(e) {
    e.layer.openPopup();
  });
  near.on('mouseout', function(e) {
    e.layer.closePopup();
  });
<<<<<<< HEAD
  console.log(nearest);
=======
  console.log(nearest.geometry.coordinates);
  console.log(pointMarker.geometry.coordinates);
>>>>>>> master
  info.update(nearest.properties);
};

//update the nearest station on drag
marker.on('drag', function() {
  removeNear(), addNear();
<<<<<<< HEAD
  //info.update(nearest.feature[0].properties);
});
addNear();
=======
});
addNear();

L.Routing.control({
    waypoints: [
        L.latLng(nearest.geometry.coordinates),
        L.latLng(pointMarker.geometry.coordinates)
    ],
    routeWhileDragging: true,
    router: L.Routing.valhalla('valhalla-obkccAI', 'pedestrian'),
    formatter: new L.Routing.Valhalla.Formatter()
}).addTo(map);
>>>>>>> master
