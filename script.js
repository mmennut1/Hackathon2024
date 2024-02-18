function initMap() {
    const directionsService = new google.maps.DirectionsService();

    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("googleMap"), {
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

    const placesService = new google.maps.PlacesService(map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer, placesService);
    };
    document.getElementById("show-route").addEventListener("click", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, placesService) {
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;
    let placeType = document.getElementById("LocationType").value;
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

    console.log("Start:", start);
    console.log("End:", end);
    console.log("Place Type:", placeType);
    console.log("Location Radius:", locationRadius);

    var request = {
        location: new google.maps.LatLng(42.0987, -75.9154),
        radius: locationRadius,
        type: [placeType],
        rankby: google.maps.places.RankBy.PROMINENCE
    };

    let poi;
    placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            poi = results[0];
            directionsService.route(
                {
                    origin: start,
                    destination: end,
                    waypoints: [{ location: poi.geometry.location, stopover: true }],
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
        } else {
            window.alert("Places service failed due to " + status);
        }
    });
}

window.onload = initMap;
