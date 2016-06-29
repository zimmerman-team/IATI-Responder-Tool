// respond.js
     //  $("h2").text("Projects List")
var x = document.getElementById("demo");
var longitude;
var latitude;
var distance = 50;
var page_nr = 1;
var number = 0;
var tbody_html = [];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }  
}
    
function showPosition(position, status) { 
  longitude = position.coords.longitude;
  latitude = position.coords.latitude;
  project_list(); 
}

var active_projects = true;

$("#cmn-toggle-1").click(function() {
  active_projects = !active_projects;
  $("#cmn-toggle-1").prop("checked", active_projects);
 project_list(); 
  // console.log(active_projects);
});
  
$("#show-more").click(function() {
  page_nr += 1;
  project_list();
});

function project_list(){
        
      var projectAPI = "https://www.oipa.nl/api/activities/";
      var projectApiArgs = {
        format: "json",
        location_longitude: longitude,
        location_latitude: latitude,
        location_distance_km: distance,
        fields: "id,locations,title,recipient_countries,recipient_regions,activity_status",
        page_size: 20,
        page: page_nr
      }
      
      if(active_projects){
          projectApiArgs.activity_status = "1,2,3" 
      }
      
      $.getJSON( projectAPI, projectApiArgs)
        .done(function(data){
        var geojson = [];
        var seen = {}
        var results = data.results;
        results = results.filter(function(activity) {
          if (seen[activity.id]) {
            return false
          }

          seen[activity.id] = true
          return true
        })
        console.log(data)
        // voor elke location, maak geojson aan
        $.each(results, function(index1, activity) {

            var activity_id = activity.id;

            var title = activity_id;
            // console.log(activity);
            if(activity.title.narratives.length > 0){
              if (activity.title.narratives[0].text != null){
                title = activity.title.narratives[0].text;
              }
            }


            var countries = [];
            
            if (activity.recipient_countries.length > 0){

              for(var i=0; i<activity.recipient_countries.length;i++){

                if (activity.recipient_countries[i].country.name != null){
                  if (i<3){
                    countries.push(activity.recipient_countries[i].country.name);
                  }
                }               
              }
            } else {
            //display region if country is unavailable
              for(var i=0; i<activity.recipient_regions.length;i++){
                if (activity.recipient_regions[i].region.name != null){
                  if (i<3){
                    countries.push(activity.recipient_regions[i].region.name);
                  }
                }               
              }
            }

            if(countries.length == 0){
              countries = 'Unavailable'
            } else {
              countries = countries.join(', &nbsp');
            }
            
            if(activity.activity_status){
              var status = activity.activity_status.name
            } else {
              var status = 'No activity status'
            }

            var project_radius = "Radius: "+distance+" km";
            document.getElementById("radius-list").innerHTML = project_radius;

            var project_count = data.count+ " projects near me"; 
            document.getElementById("count-list").innerHTML = project_count;
                 
            document.getElementById("show-more").innerHTML = "Show more";

            number += 1;
            
            var projects = {
                "type": "Feature",
                "properties": {
                    "title": title,
                    "country": countries,
                    "id": activity_id,  
                    "status": status,     
                },
                "number": number
            };

            

            geojson.push(projects);       
        });

        $.each(geojson, function(index, projects){
          tbody_html.push('<tr><td>'+projects.number+'</td> <td><a href="/detail.php'+'?activity_id='+projects.properties.id+'">'+projects.properties.title+'</a></td>  <td>'+projects.properties.country+'</td> <td>'+projects.properties.status+'</td></tr>'); 
        });
    
        $('#project-list tbody').html(tbody_html.join(''));
        
  });
}
