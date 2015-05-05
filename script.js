var map = L.map('map', {
         'zoomControl': false,
     }).setView([39.739800, -104.989276], 13);

     //zoom custom position
     L.control.zoom({
         position: 'topright'
     }).addTo(map);

     //the base map
     L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
     }).addTo(map);
