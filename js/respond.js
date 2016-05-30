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
    
    var projectAPI = "https://www.oipa.nl/api/activities/";
    $.getJSON( projectAPI, {
      format: "json",
      location_longitude: longitude,
      location_latitude: latitude,
      location_distance_km: distance,
      fields: "id,locations,title,recipient_countries,recipient_regions,sector",
      page_size: 20
    })
    .done(function(data){
     console.log(data);
        var geojson = [];
        var titles =[];

        // var title = activity_id;
        var seen = {}
        var results = data.results.filter(function(activity, index, array) {
          if (seen[activity.id]) {
            return false
          }

          seen[activity.id] = true
          return true
        })

console.log(results)
        // voor elke location, maak geojson aan
        $.each(results, function(index1, activity) {


            var activity_id = activity.id;

            var title = activity_id;
            
            if(activity.title.narratives.length > 0){
              if (activity.title.narratives[0].text != null){
                title = activity.title.narratives[0].text;
              }
            }


            var countries = [];
            
            if (results[index1].recipient_countries.length > 0){

              for(var i=0; i<results[index1].recipient_countries.length;i++){

                if (results[index1].recipient_countries[i].country.name != null){
                  if (i<3){
                    countries.push(results[index1].recipient_countries[i].country.name);
                  }
                }               
              }
            } else {
            //display region if country is unavailable
              for(var i=0; i<results[index1].recipient_regions.length;i++){
                if (results[index1].recipient_regions[i].region.name != null){
                  if (i<3){
                    countries.push(results[index1].recipient_regions[i].region.name);
                  }
                }               
              }
            }

            if(countries.length == 0){
              countries = 'Unavailable'
            } else {
              countries = countries.join(', &nbsp');
            }

            var designation = "Unavailable"
            for(var i=0; i<results.length;i++){
               
              if (results[i].locations[0].feature_designation != null){
                designation = [];
                if(results[i].locations[0].feature_designation.name != null){
                   designation.push(results[i].locations[0].feature_designation.name)
                }
              }
            }

            var projects = {
                "type": "Feature",
                "properties": {
                    "title": title,
                    "country": countries,
                    "id": activity_id,  
                    "designation": designation     
                }
            };
            // console.log(title)
            console.log(activity_id)
            titles.push(title)
            //print een lijst van de titles van de projecten 

              geojson.push(projects);
      
            $('#loader').css('display', 'none');
       
        });
        console.log(geojson);


        var tbody_html = '';

        $.each(geojson, function(index, projects){
          tbody_html += '<tr><td><a href="/detail.php'+'?activity_id='+projects.properties.id+'">'+projects.properties.title+'</a></td>  <td>'+projects.properties.country+'</td> <td>'+projects.properties.designation+'</td></tr>' 
        });
    
        $('#project-list tbody').html(tbody_html);
        
  });
}
