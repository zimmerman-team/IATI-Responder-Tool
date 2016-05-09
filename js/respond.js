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
  project_list(position.coords.longitude, position.coords.latitude, 200); 
}
    
function project_list(longitude, latitude, distance){
    $('#loader').css('display', 'block');
    
    var projectAPI = "https://dev.oipa.nl/api/activities/";
    $.getJSON( projectAPI, {
      format: "json",
      location_longitude: longitude,
      location_latitude: latitude,
      location_distance_km: distance,
      fields: "id,locations,descriptions,title,recipient_countries",
      //recipient_country: "recipient_country",

      page_size: 20
    })
    .done(function(data){
     console.log(data);
        var geojson = [];

        // voor elke location, maak geojson aan
        $.each(data.results, function(index, activity) {

            $.each(activity.locations, function(index, location) {
                var longitude = location.point.pos.longitude;
                var latitude = location.point.pos.latitude;
                var activity_id = activity.id;
                
                var description = 'No description available';
                   if(activity.descriptions[0] != null){
                    description = activity.descriptions[0].narratives[0].text;
                }
                //console.log(description);

                var title = 'Unnamed activity';
                if(activity.title != null){
                    title = activity.title.narratives[0].text.split(/\s+/).slice(0,6).join(" ");
                }

                var countries = 'Unknown location'
                  if(data.results[index].recipient_countries.length > 0){
                    countries = [];

                    for(var i = 0;i < data.recipient_countries.length;i++){
                        countries.push(data.recipient_countries[i].country.name);
                    }

                    // countries = ['Algeria', 'Kenya']
                    countries += countries.join(',');
                    //country = activity.recipient_countries.country.name;
                }
     
                var projects = {
                    "type": "Feature",
                    "properties": {
                        "title": title,
                        "country": countries,
                        "description": description,
                        "id" : activity_id        
                    }
                };
                
                //print een lijst van de titles van de projecten 
                geojson.push(projects);
                $('#loader').css('display', 'none');
            });

        });
           console.log(geojson);

        

        var tbody_html = '';


        $.each(geojson, function(index, projects){
          tbody_html += '<tr><td><a href="/detail.html'+'?activity_id='+projects.properties.id+'">'+projects.properties.title+'</a></td>  <td>'+projects.properties.country+'</td></tr>' 
        });
    
        $('#project-list tbody').html(tbody_html);
      
        //'+ projects.properties.language'
        //geojson.toString();

        // x.innerHTML = "title:" + title;
        
  });
}
