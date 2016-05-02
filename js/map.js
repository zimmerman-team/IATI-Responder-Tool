L.mapbox.accessToken = 'pk.eyJ1IjoibWFuc3VyIiwiYSI6ImNpbjAyY2NrNjAwbHJ2OW0xZzBhYXpoaG8ifQ.l5at2Lcce4D_XJc8o6tglg';
var geolocate = document.getElementById("geolocate");
var coordinates = document.getElementById('coordinates');


var West = L.latLng( -60.0,  180.0),
    East = L.latLng( 60.0,  -180.0),
    bounds = L.latLngBounds(West, East);

var map = L.mapbox.map('map', 'mapbox.streets', {  //mapbox.emerald
        maxBounds: bounds,
        minZoom: 1,
        tileLayer: {
            continuousWorld: false,
            // This option disables loading tiles outside of the world bounds.
            noWrap: true
        }
    })//.setView([8.734, 39.00], 2)
    .setView([52, 5], 9)
    .addControl(L.mapbox.geocoderControl('mapbox.places')); // for marker with clusters
   // map.fitBounds(bounds);

// add dragable marker 
var marker = L.marker([52, 5], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#f86767'
    }),
    draggable: true
}).addTo(map);

// every time the marker is dragged, update the coordinates container
marker.on('dragend', ondragend);

// Set the initial marker coordinates on load.
//ondragend();
var lat;
var lon;

function ondragend() {
    var m = marker.getLatLng();
    coordinates.innerHTML = 'Latitude: ' + m.lat + '<br />Longitude: ' + m.lng;
    lat = m.lat;
    lon = m.lng;

}

    function projects_near_marker(){       
            show_nearby_projects(lon, lat, 200);
    }


var myLayer = null;
   
 map.featureLayer.on('click', function(e) {
     map.panTo(e.layer.getLatLng());
 });

// This uses the HTML5 geolocation API, which is available on
// most mobile browsers and modern browsers, but not in Internet Explorer

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
    show_nearby_projects(e.latlng.lng, e.latlng.lat, 800);
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});


//OIPA call with 2 coordinates
 function show_nearby_projects(longitude, latitude, distance){

            $('#loader').css('display', 'block');
          
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


                        var title = 'Unnamed activity';

                        if(activity.title != null){
                            title = activity.title.narratives[0].text.split(/\s+/).slice(0,5).join(" ");
                        }

                     
                        var location_geojson = {
                            "type": "Feature",
                            "geometry": {
                                "type": "Point",
                                "coordinates": [longitude, latitude]
                            },
                            "properties": {
                                "title": title,
                                "description": "Read more about this project",
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
                $('#loader').css('display', 'none');
      });
}
 //show_nearby_projects(39.00, 8.734, 100);

// var RADIUS = 500000;
// var filterCircle = L.circle(L.latLng(40, -75), RADIUS, {
//     opacity: 1,
//     weight: 1,
//     fillOpacity: 0.4
// }).addTo(map);



