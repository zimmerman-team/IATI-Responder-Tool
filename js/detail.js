// detail.js

function project_list(longitude, latitude, distance){
    
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
                //var description = activity.descriptions[0].narratives[0].text;
                                  console.log(description);

                var language = activity.title.narratives[0].language.name;

                var title = 'Unnamed activity';

                if(activity.title != null){
                    title = activity.title.narratives[0].text.split(/\s+/).slice(0,5).join(" ");
                }
               // function getWords(title) {
               //                return title.split(/\s+/).slice(1,5).join(" ");
               //            }
               //            console.log(title.split)

                var projects = {
                    "type": "Feature",
                    "properties": {
                        "title": title,
                        "language":language,
                        "description": description   
                    }
                };
                $( "#objectID" ).load( "test.php", { "choices[]": [ "Jon", "Susan" ] } );
                // function DoPost(description){
                // $.post("detail.html", { "description":description } );  //Your values here..
                // }
                //print een lijst van de titles van de projecten 
                geojson.push(projects);
            });

        });