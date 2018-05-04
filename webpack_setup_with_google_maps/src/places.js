var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

export const initMap = (lat, lng, zoom) => {
    var myLatLng = {lat: lat || -25.363, lng: lng || 131.044};
    var map = new google.maps.Map(document.getElementById('map'),{
        zoom: zoom || 4,
        center: myLatLng
    });
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'My Location'
    });
};

export const initAutocomplete = () => {
    autocomplete = new google.maps.places.Autocomplete(
       /** @type {!HTMLInputElement} */ (document.getElementById('autocomplete')),
       {types: ['geocode']});

    autocomplete.addListener('place_changed', fillInAddress);
};

export const fillInAddress = () => {
    var place = autocomplete.getPlace();

    if(place){
        console.log('place', place.geometry.location.lat(), place.geometry.location.lng());
        initMap(place.geometry.location.lat(), place.geometry.location.lng(), 15);
    };

    for(var component in componentForm){
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    };

    for(var i=0; i<place.address_components.length; i++){
        var addressType = place.address_components[i].types[0];
        if(componentForm[addressType]){
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        };
    };
};

export const geolocate = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(position){
            var geolocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });

            autocomplete.setBounds(circle.getBounds());
        });
    };
};