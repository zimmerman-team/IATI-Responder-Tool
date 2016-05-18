$("h2").text("Projects Map")

L.mapbox.accessToken = 'pk.eyJ1IjoibWFuc3VyIiwiYSI6ImNpbjAyY2NrNjAwbHJ2OW0xZzBhYXpoaG8ifQ.l5at2Lcce4D_XJc8o6tglg';
var geolocate = document.getElementById("geolocate");
var coordinates = document.getElementById('coordinates');

var rad = 100;

$("#radius").change(function(e){
    rad = event.target.value;
    filterCircle.setRadius(rad * 1000);
});

$("#radius").mousewheel(function(event) {
    rad = event.target.value;
    filterCircle.setRadius(rad * 1000);
});

var West = L.latLng( -60.0,  180.0),
    East = L.latLng( 60.0,  -180.0),
    bounds = L.latLngBounds(West, East);

var map = L.mapbox.map('map', 'mapbox.streets', {  //mapbox.emerald
    maxBounds: bounds,
    maxZoom: 11,
    minZoom: 2,
    tileLayer: {
        continuousWorld: false,
        // This option disables loading tiles outside of the world bounds.
        noWrap: true
    }
});
// .setView([52, 5], 8)


var clusteredMarkers = L.markerClusterGroup();

//center map on marker
map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});

// add dragable marker 
var marker = L.marker([52, 5], {
    icon: L.mapbox.marker.icon({
      'marker-color': '#f86767'
    }),
    draggable: true
}).addTo(map);

var filterCircle = L.circle([52, 5], rad * 1000, {
    opacity: 1,
    weight: 1,
    fillOpacity: 0
}).addTo(map);


// every time the marker is dragged, update the coordinates container
marker.on('drag', ondrag);


// Set the initial marker coordinates on load.
ondrag();
var lat;
var lon;

function ondrag() {
    var m = marker.getLatLng();
    filterCircle.setLatLng(m);
    lat = m.lat;
    lon = m.lng;
}


function projects_near_marker(){
    // remove old markers    
    map.removeLayer(clusteredMarkers);
    clusteredMarkers = L.markerClusterGroup();

    // query oipa
    show_nearby_projects(lon, lat, rad);
}

function start_location(){
    map.setView([lat, lon], 7)
}


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
    console.log(rad)
    show_nearby_projects(e.latlng.lng, e.latlng.lat, rad);
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
              fields: "id,locations,title,aggregations",
              page_size: 20

            })
            .done(function(data){

                console.log(data);
                console.log(longitude);
                console.log(latitude);
                console.log(distance);

                var geojson = [];

                // voor elke location, maak geojson aan
                $.each(data.results, function(i, activity) {

                    $.each(activity.locations, function(i, location) {

                        if(location.point.pos == null){ return false; }

                        var longitude = location.point.pos.longitude;
                        var latitude = location.point.pos.latitude;
                        var activity_id = activity.id;


                        var title = activity_id;

                        if(activity.title != null && activity.title.narratives.length){
                            title = activity.title.narratives[0].text.split(/\s+/).slice(0,6).join(" ");
                        }

                        var popupContent = '<div>';
                            popupContent += '<h3>'+title+'</h3>'; 
                            popupContent += '<a href="/detail.php?activity_id='+activity_id+'">Read more</a>'+" about this project";
                            // popupContent += 'Total budget value';
                            popupContent += '</div>';

                        var marker = L.marker(new L.LatLng(latitude, longitude), {
                            icon: L.mapbox.marker.icon({
                                "marker-color": "#3ca0d3",
                                "marker-size": "medium",
                                "marker-symbol": "star"}),
                        });

                        marker.bindPopup(popupContent,{
                            closeButton: true,
                            minWidth: 180
                        });
                        clusteredMarkers.addLayer(marker);
                    });
                });

                map.addLayer(clusteredMarkers);
//map.panTo(latitude, longitude);
                
                if (data.count == 0){
                 alert('No projects availabe, choose a different location');
                }

                West = L.latLng( latitude+2, longitude-0.2),
                East = L.latLng( latitude-2, longitude+0.2),
                bounds = L.latLngBounds(West, East);
                map.fitBounds(bounds);

                $('#loader').css('display', 'none');
      });

}







