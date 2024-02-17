var myLatLng = { lat: 42.0987, lng: -75.9180 };
var mapOptions = {
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP

};

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);