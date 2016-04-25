// respond.js
// var geolocate = document.getElementById("geolocate");

var x = document.getElementById("demo");

function getLocation() {

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }  
}
    
function showPosition(position) {
  // x.innerHTML="Latitude: " + position.coords.latitude + 
  //        "<br>Longitude: " + position.coords.longitude;  
  project_list(position.coords.longitude, position.coords.latitude, 1000); 
}
    
function project_list(longitude, latitude, distance){
    
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

        var geojson = [];

        // voor elke location, maak geojson aan
        $.each(data.results, function(index, activity) {

            $.each(activity.locations, function(index, location) {
                var longitude = location.point.pos.longitude;
                var latitude = location.point.pos.latitude;
                var activity_id = activity.id;
                var description = activity.descriptions[0].narratives[0].text;
                                  console.log(description);
               
                        
                var title = 'Unnamed activity';

                if(activity.title != null){
                    title = activity.title.narratives[0].text;
                }

                var projects = {
                    "type": "Feature",
                    "properties": {
                        "title": title,
                        "description": description,
                        "marker-color": "#3ca0d3",
                        "marker-size": "medium",
                        "marker-symbol": "star"
                    }
                };

                //print een lijst van de titles van de projecten 
                geojson.push(projects);
            });

        });

        var tbody_html = '';

        $.each(geojson, function(index, project){
          tbody_html += '<tr><td><a href="#">'+project.properties.title+'</a></td><td>location</td></tr>';
        });

        $('#project-list tbody').html(tbody_html);

        //geojson.toString();
       // for ( i=0; i<10; i++){
        // x.innerHTML = "title:" + title;
      //}
        


  });
}