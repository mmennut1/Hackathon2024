function initMap() {
    const directionsService = new google.maps.DirectionsService();

    const directionsRenderer = new google.maps.DirectionsRenderer();

    const map = new google.maps.Map(document.getElementById("googleMap"), {
        zoom: 7,
        center: { lat: 42.0911, lng: -75.9693 } // Default center (Binghamton University)
    });
    directionsRenderer.setMap(map);

    const startInput = document.getElementById("start");
    const endInput = document.getElementById("end");

    const startAutocomplete = new google.maps.places.Autocomplete(startInput);
    startAutocomplete.bindTo("bounds", map);

    const endAutocomplete = new google.maps.places.Autocomplete(endInput);
    endAutocomplete.bindTo("bounds", map);

    const onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsRenderer, map);
    };
    document.getElementById("show-route").addEventListener("click", onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, map) {
    const geocodeService = new google.maps.Geocoder();
    const placesService = new google.maps.places.PlacesService(map);

    const startLocation = document.getElementById("start").value;
    const endLocation = document.getElementById("end").value;
    let placeType = document.getElementById("LocationType").value;
    const locationRadius = document.getElementById("radius").value;

    switch(placeType) {
        case "Amusement Park":
            placeType = "amusement_park";
            break;
        case "Bar":
            placeType = "bar";
            break;
        case "Casino":
            placeType = "casino";
            break;
        case "Cemetery":
            placeType = "cemetery";
            break;
        case "Museum":
            placeType = "museum";
            break;
        case "Night Club":
            placeType = "night_club";
            break;
        case "Park":
            placeType = "park";
            break;
        case "Tourist Attraction":
            placeType = "tourist_attraction";
            break;
        default:
            console.error("Invalid type selection");
            break;
    }

    //calculate midpoint here
    let lat;
    let lng;
    geocodeService.geocode({ address: startLocation }, (results1, status1) => {
        if (status1 === "OK" && results1[0]) {
            const startLat = results1[0].geometry.location.lat();
            const startLng = results1[0].geometry.location.lng();

            geocodeService.geocode({ address: endLocation }, (results2, status2) => {
                if (status2 === "OK" && results2[0]) {
                    const endLat = results2[0].geometry.location.lat();
                    const endLng = results2[0].geometry.location.lng();

                    // Calculate midpoint coordinates
                    lat = (startLat + endLat) / 2;
                    lng = (startLng + endLng) / 2;

                } 
                else {
                    console.error("Geocode for end location failed with status:", status2);
                }
            });
        } 
        else {
            console.error("Geocode for start location failed with status:", status1);
        }
    });

    setTimeout(function() {

        var request = {
            location: new google.maps.LatLng(lat, lng),
            radius: locationRadius,
            type: [placeType],
            rankby: google.maps.places.RankBy.PROMINENCE
        }; 

        let poi;
        placesService.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                poi = results[0];
                /*const marker = new google.maps.Marker({
                    map,
                    position: poi.geometry.location,
                });*/
                directionsService.route(
                {
                    origin: startLocation,
                    destination: endLocation,
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
        } 
        else {
            window.alert("Places service failed due to " + status);
        }
    });
    }, 250);

}

window.onload = initMap;
