// respond.js
// var geolocate = document.getElementById("geolocate");
      $("h2").text("Projects List")
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
  project_list(position.coords.longitude, position.coords.latitude, 100); 
}
  

function project_list(longitude, latitude, distance){
    $('#loader').css('display', 'block');
    
    var projectAPI = "https://dev.oipa.nl/api/activities/";
    $.getJSON( projectAPI, {
      format: "json",
      location_longitude: longitude,
      location_latitude: latitude,
      location_distance_km: distance,
      fields: "id,locations,title,recipient_countries,recipient_regions",
      //recipient_country: "recipient_country",

      page_size: 20
    })
    .done(function(data){
     console.log(data);
        var geojson = [];
        var titles =[];

        // voor elke location, maak geojson aan
        $.each(data.results, function(index1, activity) {

            $.each(activity.locations, function(index2, location) {
                var longitude = location.point.pos.longitude;
                var latitude = location.point.pos.latitude;
                var activity_id = activity.id;
                

                var title = activity_id;
                if(activity.title != null){
                    title = activity.title.narratives[0].text;
                }
              
            console.log(title);


                var countries = [];
                
                if (data.results[index1].recipient_countries.length > 0){

                  for(var i=0; i<data.results[index1].recipient_countries.length;i++){

                    if (data.results[index1].recipient_countries[i].country.name != null){
                      if (i<3){
                        countries.push(data.results[index1].recipient_countries[i].country.name);
                      }
                    }               
                  }
                } else {
                //display region if country is unavailable
                  for(var i=0; i<data.results[index1].recipient_regions.length;i++){
                    if (data.results[index1].recipient_regions[i].region.name != null){
                      if (i<3){
                        countries.push(data.results[index1].recipient_regions[i].region.name);
                      }
                    }               
                  }
                }

                if(countries.length == 0){
                  countries = 'Unavailable'
                } else {
                  countries = countries.join(', &nbsp');
                }

                var projects = {
                    "type": "Feature",
                    "properties": {
                        "title": title,
                        "country": countries,
                        "id" : activity_id        
                    }
                };
                titles.push(title)
                //print een lijst van de titles van de projecten 
    
                  geojson.push(projects);
          
                $('#loader').css('display', 'none');
            });
       
        });
        console.log(geojson);
        //console.log(titles);
        // var project_title=[];
        // for(i=0; i<geojson.length; i++){
        //    project_title = geojson[i].properties.title
        //   }
          //   if(titles.indexOf(project_title) = -1){
          // }


        var tbody_html = '';

        $.each(geojson, function(index, projects){
          tbody_html += '<tr><td><a href="/detail.php'+'?activity_id='+projects.properties.id+'">'+projects.properties.title+'</a></td>  <td>'+projects.properties.country+'</td></tr>' 
        });
    
        $('#project-list tbody').html(tbody_html);
        
  });
}
