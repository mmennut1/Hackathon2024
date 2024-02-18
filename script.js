function initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(document.getElementById('googleMap'), {
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
    const start = document.getElementById("start").value;
    const end = document.getElementById("end").value;

    // Set the intermediate waypoint to Pittsburgh
    const pittsburgh = "Pittsburgh, Pennsylvania";

    directionsService.route(
        {
            origin: start,
            destination: end,
            waypoints: [{ location: pittsburgh, stopover: true }],
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

window.onload = initMap;
