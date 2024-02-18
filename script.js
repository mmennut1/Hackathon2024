var myLatLng = { lat: 42.0987, lng: -75.9180 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};
var input1 = document.getElementById('userLocation1').value;
var input2 = document.getElementById('userLocation2').value;


var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

directionsDisplay.setMap(map);


// EVERYTHING BELOW HERE IS BORROWED CODE. DONT KEEP IT AROUND, JUST WANTED TO USE IT FOR TESTING ATM
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    //pass the request to the route method
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map in London
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });

}

var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);