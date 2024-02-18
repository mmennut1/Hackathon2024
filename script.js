function initMap() {
    const directionsService = new google.maps.DirectionsService();

    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 } // Default center (Chicago)
    });
    directionsRenderer.setMap(map);

    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");


    const startAutocomplete = new google.maps.places.Autocomplete(startInput);
    startAutocomplete.bindTo("bounds", map);

    const endAutocomplete = new google.maps.places.Autocomplete(endInput);
    endAutocomplete.bindTo("bounds", map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    document.getElementById("show-route").addEventListener("click", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const placesService = new google.maps.placesService();
    
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    const placeType = document.getElementById("type").value;
    const locationRadius = document.getElementById("radius").value;

    switch(placeType) {
        case "Bar":
            placeType = "bar";
            break;
        case "Casino":
            placeType = "casino";
            break;
        case "Night Club":
            placeType = "night_club";
            break;
    }

    // Set the intermediate waypoint to Pittsburgh
    var placeOfInterest = {
        location: new google.maps.LatLng(42.0987, -75.9154),
        radius: locationRadius,
        type: [placeType],
        rankby: prominence
    };

    directionsService.route(
        {
            origin: start,
            destination: end,
            waypoints: [{ location: placesService.nearbySearch(placeOfInterest, callbackPOI), stopover: true }],
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Directions request failed due to " + status);
            }
        }
    );
}

function callbackPOI(results, status) {
    if(status === placesService.OK)
        return results[0];
}

window.onload = initMap;
