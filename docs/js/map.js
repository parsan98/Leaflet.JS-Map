var myMap = L.map('map').setView([51.508, -0.149], 13);

var markers = new L.FeatureGroup();
var bounds = new L.LatLngBounds();

var mapRequestTimeOut = setTimeout(function(){
  let thisMap = document.getElementById('map');
  thisMap.classList.add("gone");
  let mapError = document.getElementById('mapError');
  mapError.classList.remove("gone");
}, 4000);

// API call to display the map
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  	maxZoom: 17,
    minZoom: 11,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
  	'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
  }).on('tileload', mapLoaded).addTo(myMap);

function mapLoaded(){
  let elems = document.getElementsByClassName('icon-id');
  for (let i = 0; i < elems.length; i++) {
    elems[i].classList.remove("hide");
  }
  clearTimeout(mapRequestTimeOut);
}

// Get the url for marker icon
function getIconUrl(place) {
  let url;
  PlaceTypesModel.forEach((x) => {
    if (x.name == place.type) {
      url = x.icon;
    }
  });
  return url;
}

// Pop up
function setPopup(place) {
  let content = '<div><span>';
  content += place.name;
  content += '</span><br>';
  content += '<span>';
  content += place.address;
  content += '</span></div>';
  return content;
}

//Function to display a marker
var addMarker = function(place) {
  markers.addLayer(place.marker);
  bounds.extend(place.marker.getLatLng());
}

function getID(text){
  return text.replace(/\W/g, '-');
}

function animateIcon(placeName) {
  let allIcons = document.getElementsByClassName('icon-id');
  for (let i = 0; i < allIcons.length; i++ ){
    allIcons[i].classList.remove('animated-icon');
  }
  document.getElementById(getID(placeName)).classList.add('animated-icon');
  dowiki(placeName);
}
