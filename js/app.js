// Prototype of a place
var Place = function(data) {
  var self = this;

  this.name = data.name;
  this.address = data.address;
  this.type = data.type;
  this.coordinates = data.coordinates;
  this.icon = getIconUrl(data);

  // Prototype of marker icon
  this.mapIcon = L.divIcon({
    'iconSize' :     [32, 35],
    'iconAnchor' :   [15, 34],
    'popupAnchor' :  [0, -30],
    'className' : 'icon-id',
    'html' : '<img id="' + getID(data.name) + '" class="hide icon-id" src="' + this.icon + '" alt="" onClick=animateIcon("' + getID(data.name) + '")>'
  });

  this.marker = L.marker(self.coordinates, {
                    'icon' : self.mapIcon,
                    'title' : self.name
                }).bindPopup(setPopup(this));

  this.placeClicked = (() => {
    self.marker.openPopup();
    animateIcon(self.name);
  });

}

// ViewModel
var ViewModel = function() {
  let self = this;

  this.placeTypes = ko.observableArray(PlaceTypesModel);
  this.selectedPlaceType = ko.observable();

  this.wikiElem = ko.observable("<p class='border p-3 rounded m-1'>Please click on a listed place.</p>");

  //Array of all place objects
  let allPlaces = [];
  PlacesModel.forEach(x => allPlaces.push(new Place(x)));

  // Filtering places to be displayed
  this.filteredPlaces = ko.computed(() => {
    let filteredArray = [];
    // Resetting the map
    markers.clearLayers();
    bounds = new L.LatLngBounds();

    allPlaces.forEach((x) => {
      if (self.selectedPlaceType() == undefined || x.type == self.selectedPlaceType()) {
        filteredArray.push(x);
        addMarker(x);
      }
    });

    // Displaying markers
    markers.addTo(myMap);
    myMap.fitBounds(bounds);
    return filteredArray;
  });

  this.thisYear = ko.computed(() => {
    let date = new Date();
    return (date.getFullYear().toString());
  });

};


// Initialising a new view model
var thisVM = new ViewModel();
ko.applyBindings(thisVM);
