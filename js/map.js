var geolocate = document.getElementById("geolocate");
var click = document.getElementById('click');
//mousemove = document.getElementById('mousemove');

L.mapbox.accessToken = 'pk.eyJ1IjoibWFuc3VyIiwiYSI6ImNpbjAyY2NrNjAwbHJ2OW0xZzBhYXpoaG8ifQ.l5at2Lcce4D_XJc8o6tglg';

var West = L.latLng( -60.0,  180.0),
    East = L.latLng( 80.0,  -180.0),
    bounds = L.latLngBounds(West, East);

var map = L.mapbox.map('map', 'mapbox.streets', {  //mapbox.emerald
        maxBounds: bounds,
        minZoom: 2,
        tileLayer: {
            // This map option disables world wrapping. by default, it is false.
            continuousWorld: false,
            // This option disables loading tiles outside of the world bounds.
            noWrap: true
        }

    })//.setView([8.734, 39.00], 2)
    .setView([52, 5], 9)
    .addControl(L.mapbox.geocoderControl('mapbox.places')); // for marker with clusters
    map.fitBounds(bounds);

// show coordinates on click 
map.on(' click', function(e) {
    window[e.type].innerHTML = e.latlng.toString(); // e.containerPoint.toString() + ', '
});


var myLayer = null;
   
map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer
//
// See this chart of compatibility for details:
// http://caniuse.com/#feat=geolocation

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}




map.on('locationfound', function(e) {
    //map.fitBounds(e.bounds);      // Once we've got a position, zoom and center the map

    var my_location_geojson = {
        type: 'Feature',
        geometry: {
            type: 'Point',          // on it, and add a single marker.
            coordinates: [e.latlng.lng, e.latlng.lat]
        },

        properties: {
            'title': 'I am here!',
            'marker-color': '#ff8888',
            'marker-symbol': 'circle'
        }
    };

    L.mapbox.featureLayer().setGeoJSON(my_location_geojson).addTo(map); //call function
    show_nearby_projects(e.latlng.lng, e.latlng.lat, 1000);
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});


//OIPA call with 2 coordinates
 function show_nearby_projects(longitude, latitude, distance){
          
           var projectAPI = "https://dev.oipa.nl/api/activities/";
           $.getJSON( projectAPI, {
              format: "json",
              location_longitude: longitude,
              location_latitude: latitude,
              location_distance_km: distance,
              fields: "id,locations,descriptions,title",
              page_size: 20

            })
            .done(function(data){

                console.log(data);
                console.log(longitude);
                console.log(latitude);

                var geojson = [];

                // voor elke location, maak geojson aan
                $.each(data.results, function(i, activity) {

                    $.each(activity.locations, function(i, location) {
                        var longitude = location.point.pos.longitude;
                        var latitude = location.point.pos.latitude;
                        var activity_id = activity.id;
                        //var description = activity.descriptions[0].narratives[0].text;
                                         // console.log(description);

                        var title = 'Unnamed activity';

                        if(activity.title != null){
                            title = activity.title.narratives[0].text;
                        }
                     
                        var location_geojson = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [longitude, latitude]
                            },
                            "properties": {
                                "title": title,
                                "description": "click here for more info",
                                "marker-color": "#3ca0d3",
                                "marker-size": "medium",
                                "marker-symbol": "star"
                            }
                        };

                        geojson.push(location_geojson);
                    });
                });
                
                console.log(geojson);

                // toon geojson op de map
                myLayer = L.mapbox.featureLayer().setGeoJSON(geojson).addTo(map);

      });
}
 //show_nearby_projects(39.00, 8.734, 100);




