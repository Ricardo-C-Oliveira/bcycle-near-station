var map = L.map('map', {
         'zoomControl': false,
     }).setView([39.739800, -104.989276], 13);

     //zoom custom position
     L.control.zoom({
         position: 'topright'
     }).addTo(map);

     //the base map
     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
         attribution: 'Map tiles by <a href="http://cartodb.com/attributions#basemaps">CartoDB</a>, under <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>. Data by <a href="http://www.openstreetmap.org/">OpenStreetMap</a>, under ODbL.'
     }).addTo(map);

//stations data
var data = L.geoJson(stations, {
pointToLayer: function (feature, latlgn) {
    var popupContent = '<p style="font-family: Roboto, sans-serif; color: white; font-size: 16px"><b>Station Name: </b><span style="color: red"><b>' + feature.properties.STATION + '</b></span></p>';
    return L.circleMarker(latlgn, Style(feature)).bindPopup(popupContent);
},
}).addTo(map);

//function that defines style for each point
     function Style(feature) {
         return {
             fillColor: "#1015a5",
             stroke: 1,
             opacity: 1,
             color: "#dd0d24",
             fillOpacity: 1,
             weight: 1,
             radius: 6
         };
     }

     var marker = L.marker(new L.LatLng(39.739800, -104.989276), {
        icon: L.AwesomeMarkers.icon({
             icon: 'fa-bicycle',
             markerColor: 'red',
             prefix: 'fa'
         }),
         draggable: true
     }).addTo(map);