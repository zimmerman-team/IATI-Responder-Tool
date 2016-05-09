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


//console.log(id)


function info(){
    
    $('#loader').css('display', 'block');

var projectAPI = "https://dev.oipa.nl/api/activities/" + id;    
    $.getJSON( projectAPI, {

      format: "json",
      fields: "id,locations,descriptions,title,recipient_countries,reporting_organisations,last_updated_datetime,activity_status,activity_budget_value,sector",
    })
    //activity_budget_value,activity_expenditure_value,actual_start_date,sector,reporting_organisation
// activity_budget_value
//actual_start_date
// activity_incoming_funds_value
// activity_disbursement_value
// activity_expenditure_value
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
                        description.push(data.descriptions[i].narratives[0].text);
                        }
                         description += description.join('<br>');
                    }
                // console.log(description);

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

                  var last_updated = "Last updated on: "+data.last_updated_datetime;  
                  var status = "Status: "+ data.activity_status.name;
                  if (data.reporting_organisations.length > 0){
                  var reporting_org = "Reporting organisation "+ data.reporting_organisations[0].organisation.organisation_identifier
                }

                var info = [title, "Project ID: "+id, reporting_org, status, countries, last_updated,"<br>Description:<br>"+ description]

                // head.innerHTML = title 
                text.innerHTML = info.join('<br>');

                $('#loader').css('display', 'none');
   
  });
}
 //respond on this project 