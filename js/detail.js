// detail.js
var text = document.getElementById("description");
var head = document.getElementById("title");
var o = new Object();
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
                if(data.title != null){
                    title = '<h4>' + data.title.narratives[0].text + '</h4>';
                }

                var description = 'There is no description available for this project';
                   if(data.descriptions[0] != null){
                    description = data.descriptions[0].narratives[0].text;
                }
                console.log(data);

                var countries = 'Unknown location'
                  if(data.recipient_countries.length > 0){
                    countries = [];

                    for(var i = 0;i < data.recipient_countries.length;i++){
                        countries.push(data.recipient_countries[i].country.name);
                    }

                    // countries = ['Algeria', 'Kenya']
                    countries = "countries: " + countries.join(',');
                    // countries = countries: Algeria, Kenya
                }

                var info = [title, description, countries]

                // head.innerHTML = title 
                text.innerHTML = info.join('<br>');

                $('#loader').css('display', 'none');
   
  });
}