// This will pull up an interactive map to help plan the trip
// This modifies the search bar and 

var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var distance = 0;
var hasDirections = false;
var trip = null;

var mileage = document.getElementById("mileage_input");
var price = document.getElementById("price_input");

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

var myOptions = {
		zoom: 12, // The larger the zoom number, the bigger the zoom
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP
};

var infowindow = new google.maps.InfoWindow();
infowindow.width = 300;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();

  var markers = [];
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(42.4561700, -71.168882),
      new google.maps.LatLng(42.3561700, -71.068882));
  map.fitBounds(defaultBounds);

  getMyLocation();


  // Create the search box and link it to the UI element.
  var input = /** @type {HTMLInputElement} */(
      document.getElementById('pac-input'));
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  var searchBox = new google.maps.places.SearchBox(
    /** @type {HTMLInputElement} */(input));

  // [START region_getplaces]
  // Listen for the event fired when the user selects an item from the
  // pick list. Retrieve the matching places for that item.
  google.maps.event.addListener(searchBox, 'places_changed', function() {
    var places = searchBox.getPlaces();

    for (var i = 0, marker; marker = markers[i]; i++) {
      marker.setMap(null);
    }

    // For each place, get the icon, place name, and location.
    markers = [];
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
      var image = {
        url: place.icon,
        size: new google.maps.Size(25, 25),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      var marker = new google.maps.Marker({
        map: map,
        icon: image,
        title: place.name,
        position: place.geometry.location
      });

      // Open info window on click of marker
      google.maps.event.addListener(marker, 'click', function() {
        
        distance = getDirections(me, this);
        
      });

      google.maps.event.addListener(marker, 'mouseover', function() {
        if(!hasDirections) {
          infowindow.setContent(this.title+"<br/><br/>");
          infowindow.open(map, this);
        }

      });

      google.maps.event.addListener(marker, 'mouseout', function() {
        if(!hasDirections) {
          infowindow.close(map,this);
        }
      });

      markers.push(marker);

      bounds.extend(place.geometry.location);
    }

    //map.fitBounds(bounds);
  });
  // [END region_getplaces]

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  google.maps.event.addListener(map, 'bounds_changed', function() {
    var bounds = map.getBounds();
    searchBox.setBounds(bounds);
  });
}

function getDirections(start, end) {
  var total = 0;

  hasDirections = true;

  var request = {
    origin:start,
    destination:end.position,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
      trip = response.routes[0]; 

      distance = getDistance(trip)/1000;
      infowindow.setContent(end.title + "<br/>Distance: " + distance + " km away<br/><br/>");
      setInputBoxes();
      
      infowindow.close(map, end);
      infowindow.open(map, end);
    }
  });

  directionsDisplay.setMap(map);
  
}

function getDistance(place) {
  var total = 0;
  
  if(place) {
    for (var i = 0; i < place.legs.length; i++) {
          total += place.legs[i].distance.value; 
    }
  }

  return total;
}

function getMyLocation()
{
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
			myLat = position.coords.latitude;
			myLng = position.coords.longitude;
			renderMap();
      setInputBoxes();
		});
    setBounds(.2);
	}
	else {
		alert("Geolocation is not supported by your web browser.  What a shame!");
	}
}

function setBounds(size) {
  if(!size)
    size = .2;
  var newBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(myLat-size, myLng-size),
      new google.maps.LatLng(myLat+size, myLng+size));
  map.fitBounds(newBounds);

  return newBounds;
}

function renderMap()
{
  //alert("rendering map");
	me = new google.maps.LatLng(myLat, myLng);

	// Update map and go there...
	map.panTo(me);

	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I am!"
	});
	marker.setMap(map);

	google.maps.event.addListener(marker, 'mouseover', function() {        
    //var distance = getDirections(me, this.position);

    infowindow.setContent(marker.title+"<br/><br/>");
    infowindow.open(map, marker);

  });

  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close(map,marker);
  });
}

function setInputBoxes() {

  var mileage = document.getElementById("mileage_input");
  var price = document.getElementById("price_input");

  mileage.value = distance + " km";

  var cost =  distance * 0.35;
  cost = Math.round(100*cost)/100;

  if(cost == 0) {
    price.value = "$0.00";
  }
  else if(cost < 1) {
    price.value = "$" + cost;
  }
  else {
    price.value = "$" + cost;
  }

}

google.maps.event.addDomListener(window, 'load', initialize);
