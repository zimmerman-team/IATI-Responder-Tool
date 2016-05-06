// detail.js
var text = document.getElementById("description");
var head = document.getElementById("title");

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var id = getParameterByName('activity_id'); // 


console.log(id)


function info(){
    
    $('#loader').css('display', 'block');

var projectAPI = "https://dev.oipa.nl/api/activities/" + id;    
    $.getJSON( projectAPI, {

      format: "json",
      fields: "id,locations,descriptions,title,recipient_countries,reporting_organisations",
    })

    .done(function(data){
     console.log(data)

                var title = id;
                if(data.title.narratives.length != 0){
                    title = '<h4>' + data.title.narratives[0].text + '</h4>';
                }

                var description = 'There is no description available for this project';
                   
                  if(data.descriptions.length > 0){
                    description = [];

                    for(var i = 0;i < data.descriptions.length;i++){
                        description.push(data.descriptions[i].narratives.text);
                        }
                         description =+ description.join('<br>');
                    }
                    else if (data.locations.length > 0){
                        //description = data.locations.description[0].narratives[0].text
                        for(var i = 0;i < data.locations.length;i++){
                        description.push(data.locations.description[i].narratives[i].text);
                        }
                    }
                console.log(data);

                var countries = 'Unknown location'
                  if(data.recipient_countries.length > 0){
                    countries = [];

                    for(var i = 0;i < data.recipient_countries.length;i++){
                        countries.push(data.recipient_countries[i].country.name);
                    }

                    // countries = ['Algeria', 'Kenya']
                    countries = "Country: " + countries.join(',');
                    // countries = countries: Algeria, Kenya
                }

                if(data.reporting_organisations.organisation != null){
                  var last_updated = data.reporting_organisations.organisation.last_updated_datetime;  
                }
                

                var info = [title, "Project ID: "+id, countries, "Last updated: "+last_updated, description]

                // head.innerHTML = title 
                text.innerHTML = info.join('<br>');

                $('#loader').css('display', 'none');
   
  });
}
 //respond on this project 