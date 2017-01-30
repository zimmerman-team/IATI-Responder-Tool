// init 
L.mapbox.accessToken = 'pk.eyJ1IjoibWFuc3VyIiwiYSI6ImNpbjAyY2NrNjAwbHJ2OW0xZzBhYXpoaG8ifQ.l5at2Lcce4D_XJc8o6tglg';
var rad = 100;
var coordinates = document.getElementById('coordinates');

var West = L.latLng( -60.0,  180.0),
    East = L.latLng( 60.0,  -180.0),
    bounds = L.latLngBounds(West, East);

var map = L.mapbox.map('map', 'mapbox.streets', {  //mapbox.emerald
    maxBounds: bounds,
    maxBoundsViscosity: 0,
    maxZoom: 18,
    minZoom: 2,
    tileLayer: {
        continuousWorld: true,
        // This option disables loading tiles outside of the world bounds.
        noWrap: false
    }
});


var clusteredMarkers = L.markerClusterGroup();
var lat;
var lon;
var marker;
var filterCircle;
var active_projects = true;
var page_nr = 1;
var count = 200;
var mouse_latlng = null;

map.on('mousemove', function(e) {
mouse_latlng = e.latlng;         
});

// map.dragPan.disable(); 

var timeoutId = 0;
function onHoldForTwoSeconds(){
  console.log(mouse_latlng);
  lat = mouse_latlng.lat;
  lon = mouse_latlng.lng;
  page_nr = 1;
  setHistory();
  projects_near_marker();
  marker.setLatLng([lat,lon]);
  filterCircle.setLatLng([lat,lon]);
  marker.unbindPopup();
}

$("#map").on("taphold",function(){
    onHoldForTwoSeconds();
});

$('#map').mousedown(function() {
    timeoutId = setTimeout(onHoldForTwoSeconds, 2000);
}).bind('mouseup mouseleave', function() {
    clearTimeout(timeoutId);
});


$("#cmn-toggle-1").click(function() {
  active_projects = !active_projects;
  $("#cmn-toggle-1").prop("checked", active_projects);
  projects_near_marker();
});

$("#show-button").click(function() {
  page_nr += 1;
  count += 200;
  show_nearby_projects([lat, lon], rad);
});

$("#open-legend").click(function(){
    var marginTop = $("#my-legend").css('margin-top');
      $("#my-legend").animate({marginTop: '10px'});
});

$("#close-legend").click(function(){
      var marginTop = $("#my-legend").css('margin-top');
   $("#my-legend").animate({marginTop: '-350px'});
});
//button position when legend is open
$("#open-legend").click(function(){
    var marginTop = $("#my-legend").css('margin-top');
      $("#find-projects").animate({marginTop: '0%'});
});

$("#close-legend").click(function(){
    var marginTop = $("#my-legend").css('margin-top');
      $("#find-projects").animate({marginTop: '-15%'});
});
// add listeners 
// $("h2").text("Projects Map")

$("#radius").change(function(e){
    rad = e.target.value;
    filterCircle.setRadius(rad * 1000);
    setHistory();
});

$("#radius").mousewheel(function(event) {
    rad = event.target.value;
    filterCircle.setRadius(rad * 1000);
    setHistory();
});

//center map on marker
map.featureLayer.on('click', function(e) {
    map.panTo(e.layer.getLatLng());
});

var ondragvar = function ondrag(){
    var m = marker.getLatLng();
    filterCircle.setLatLng(m);
    lat = m.lat;
    lon = m.lng;
    coordinates.innerHTML = 'Latitude: ' + lat.toPrecision(10) + '<br />Longitude: ' + lon.toPrecision(10);
}

function setHistory(){
  window.history.pushState("", "", '/map.php?lat='+lat+'&lng='+lon+'&radius='+rad);
}

function ondragend(){
  marker.bindPopup("Press the Search for projects button to search for projects");
  marker.openPopup();
  setHistory();
} 

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});

if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
}

map.on('locationfound', function(e) {
    init_marker([e.latlng.lat, e.latlng.lng]);
});


function init_marker(latlng){
    lat = latlng[0];
    lon = latlng[1];

    // add dragable marker 
    marker = L.marker(latlng, {
        icon: L.mapbox.marker.icon({
          'marker-color': '#f86767',
          "marker-symbol": "circle",
        }),
        draggable: true
    }).addTo(map);

    var init_text ="To search for projects drag marker to desired location or hold down for 2 seconds."
    marker.bindPopup(init_text)
    marker.openPopup(init_text)
   
    filterCircle = L.circle(latlng, rad * 1000, {
        opacity: 1,
        color: '#000',
        weight: 1,
        fillOpacity: 0
    }).addTo(map);

    marker.on('drag', ondragvar);
    marker.on('dragend', ondragend);

    show_nearby_projects(latlng, rad);
 coordinates.innerHTML = 'Latitude: ' + latlng[0].toPrecision(10) + '<br />Longitude: ' + latlng[1].toPrecision(10) ;
}


function start_location(){
    // indien lat, lng en radius geset zijn in de URL, 
    // dan die gegevens gebruiken en de marker daar tonen. 
    if(QueryString.lat != undefined && QueryString.lng != undefined && QueryString.radius != undefined){
      // set rad en roep init_marker aan met init_marker([lt,lng])
      rad = parseFloat(QueryString.radius);
      init_marker([parseFloat(QueryString.lat),parseFloat(QueryString.lng)]);
    } else { 
      //Anders locatie vragen.
      map.locate();
    }
}


function projects_near_marker(){
    // remove old markers    
    map.removeLayer(clusteredMarkers);
    clusteredMarkers = L.markerClusterGroup();
    page_nr = 1;
    count = 200;

    // query oipa
    show_nearby_projects([lat, lon], rad);
    coordinates.innerHTML = 'Latitude: ' + lat.toPrecision(10) + '<br />Longitude: ' + lon.toPrecision(10);
    marker.unbindPopup();
}

//OIPA call with 2 coordinates
 function show_nearby_projects(latlng, distance, status){

            $('#loader').css('display', 'block');
            //dev.oipa werkt tijdelijk niet
           var projectAPI = "https://www.oipa.nl/api/locations/";
           var projectApiArgs = {
              format: "json",
              fields: "point,name,ref,activity,feature_designation",
              location_longitude: latlng[1],
              location_latitude: latlng[0],
              location_distance_km: distance,
              page_size: 200,
              page: page_nr,
              async: true
            }

            // console.log(page_nr)

            //Status kan alleen bij dev.oipa.nl
            if(active_projects){
              projectApiArgs.activity_status = "1,2,3" 
            }


           $.getJSON( projectAPI, projectApiArgs)
            .done(function(data){

                console.log(data);

                var geojson = [];

                // voor elke location, maak geojson aan
                $.each(data.results, function(i, location) {

                    if(location.point.pos == null){ return false; }

                    var longitude = location.point.pos.longitude;
                    var latitude = location.point.pos.latitude;
                    
                    var activity = location.activity;
                    var title = activity.id;

                    if(activity.title != null && activity.title.narratives.length){
                        title = activity.title.narratives[0].text.split(/\s+/).slice(0,6).join(" ");
                    }

                    if (data.results[i].feature_designation != null){
                      if(data.results[i].feature_designation.name != null){
                        var designation = data.results[i].feature_designation.name
                      }
                    }
                    
                    var popupContent = '<div>';
                        popupContent += '<h4><b>'+title+'</b></h4>';
                        if (data.results[i].feature_designation != null){ 
                        popupContent += 'Designation: '+designation+'<br>'; }
                        popupContent += '<a href="/detail.php?activity_id='+activity.id+'">Read more</a>'+" about this project";
                        popupContent += '</div>';

                    var marker = L.marker(new L.LatLng(latitude, longitude), {
                        icon: L.mapbox.marker.icon({
                            "marker-color": "#3ca0d3",
                            "marker-size": "medium",
                            "marker-symbol": "star"}),
                    });

                    marker.bindPopup(popupContent,{
                        closeButton: true,
                        minWidth: 140
                    });

                    clusteredMarkers.addLayer(marker);
                });

                map.addLayer(clusteredMarkers);
                marker.unbindPopup();

                var content = 'No projects availabe, drag marker to different location'
            
                if (data.count == 0){
                  marker.bindPopup(content);
                  marker.openPopup(content);
                }

            
                var project_count = "<hr>"+ data.count+" projects on map"

                if (data.count > data.results.length){

                  $("#show-button").show();
                  $("#show-button").html("Show more");
                  if(count > data.count){ 
                    count = data.count;
                    $("#show-button").hide();
                  }

                  project_count = "<hr>"+count+" of "+ data.count+" projects on map";
                 
                } else {
                  $("#show-button").hide();
                }

                document.getElementById("count").innerHTML = project_count;

                bounds = filterCircle.getBounds();
                map.fitBounds(bounds);


                $('#loader').css('display', 'none');
      });

}



