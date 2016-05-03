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
    .setView([52, 5], 8)
    .addControl(L.mapbox.geocoderControl('mapbox.places')); // for marker with clusters
   // map.fitBounds(bounds);

// cluster markers
var myLayer = L.mapbox.featureLayer().addTo(map);
L.mapbox.featureLayer().on('ready', function(e) {
    // The clusterGroup gets each marker in the group added to it
    // once loaded, and then is added to the map
    var clusterGroup = new L.MarkerClusterGroup();
    e.target.eachLayer(function(layer) {
        clusterGroup.addLayer(layer);
    });
    map.addLayer(clusterGroup);
});

//Add custom popups to each using our custom feature properties
myLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent = '<div>';
    popupContent += '<h3>'+feature.properties.title+'<h3>'; 
    popupContent += '<a href="/detail.html?activity_id='+feature.properties.id+'">Read more</a>'+" about this project";
    popupContent += '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 180
    });
});

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
ondragend();
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

//center map on marker
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
      // Once we've got a position, zoom and center the map
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
    show_nearby_projects(e.latlng.lng, e.latlng.lat, 200);

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
              fields: "id,locations,title",
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


                        var title = activity_id;

                        if(activity.title != null && activity.title.narratives.length){
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
                                "id": activity_id,
                                "marker-color": "#3ca0d3",
                                "marker-size": "medium",
                                "marker-symbol": "star"
                            }
                        };

                        geojson.push(location_geojson);
                    });
                });
                
                if (data.count == 0){
                 alert('No projects availabe, choose a different location');
                }

                West = L.latLng( latitude+2, longitude-0.2),
                East = L.latLng( latitude-2, longitude+0.2),
                bounds = L.latLngBounds(West, East);
                map.fitBounds(bounds);
                // toon geojson op de map
                myLayer.setGeoJSON(geojson);
                $('#loader').css('display', 'none');
      });

}


// var RADIUS = 500000;
// var filterCircle = L.circle(L.latLng(40, -75), RADIUS, {
//     opacity: 1,
//     weight: 1,
//     fillOpacity: 0.4
// }).addTo(map);



