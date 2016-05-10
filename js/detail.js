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
      // fields: "id,locations,descriptions,title,recipient_countries,reporting_organisations,last_updated_datetime,activity_status,activity_budget_value,sector"
    })


    .done(function(data){
     console.log(data)

                var title = id;
                if(data.title.narratives.length != 0){
                    title = '<h4><center>' + data.title.narratives[0].text + '</center></h4>';
                }

                var description = '<br>There is no description available for this project'; 
                  if(data.descriptions.length > 0){
                    description = [];

                    for(var i = 0;i < data.descriptions.length;i++){
                        for (var y = 0;y < data.descriptions[i].narratives.length;y++){
                             if (data.descriptions[i].narratives[y].text != null){
                            description.push(data.descriptions[i].narratives[y].text);
                            }
                        }
                    }
                    description = "<br>Project description:<br>"+description.join('<br>');
                }
           

                var countries = 'Country: Unavailable'
                  if(data.recipient_countries.length > 0){
                    countries = [];

                    for(var i = 0;i < data.recipient_countries.length;i++){
                        countries.push(data.recipient_countries[i].country.name);
                    }

                    countries = "Country: " + countries.join(',');
                    // countries = countries: Algeria, Kenya
                }

                var last_updated = "Last updated on: "+data.last_updated_datetime;  
                  var status = "Status: "+ data.activity_status.name;
                  if (data.reporting_organisations.length > 0){
                  var reporting_org = "Reporting organisation: "+ data.reporting_organisations[0].organisation.organisation_identifier
                }

                var sector = "Sector: Unknown" 
                  if(data.sectors.length > 0){
                    sector = [];

                    for(var i = 0;i < data.sectors.length;i++){
                        if (data.sectors[i].sector.name != null){
                        sector.push(data.sectors[i].sector.name);
                        }
                    }
                    sector ="Sector: "+sector.join(',');
                }
               
                var region = "Region: Unknown" 
                  if(data.recipient_regions.length > 0){
                     region = [];

                    for(var i = 0;i < data.recipient_regions.length;i++){
                        if (data.recipient_regions[i].region.name != null){
                        region.push(data.recipient_regions[i].region.name);
                        }
                        
                    }
                    region ="Region: "+region.join(',');
                }
                
                var commitment_currency = [];
                    if (data.aggregations.activity.commitment_currency !=null){
                        commitment_currency.push(data.aggregations.activity.commitment_currency)
                    }        
                var commitment = "Commitment: Unavailable" 
                if (data.aggregations.commitment_value != null || data.aggregations.activity.commitment_value !=0){

                 commitment ="Commitment in "+commitment_currency+": "+ data.aggregations.activity.commitment_value;
                 }
                
                var disbursement_currency = [];
                    if (data.aggregations.activity.disbursement_currency !=null){
                        disbursement_currency.push(data.aggregations.activity.disbursement_currency)
                    }        
                var disbursement = "Disbursement: Unavailable" 
                if (data.aggregations.disbursement_value != null || data.aggregations.activity.disbursement_value !=0){

                 disbursement ="Disbursement in "+disbursement_currency+": "+ data.aggregations.activity.disbursement_value;
                 }

                var expenditure_currency = [];
                    if (data.aggregations.activity.expenditure_currency !=null){
                        expenditure_currency.push(data.aggregations.activity.expenditure_currency)
                    }        
                var expenditure = "Expenditure: Unavailable" 
                if (data.aggregations.expenditure_value != null || data.aggregations.activity.expenditure_value !=0){

                 expenditure ="Expenditure in "+expenditure_currency+": "+ data.aggregations.activity.expenditure_value;
                 } 


                var info = [title, "Project ID: "+id, reporting_org,last_updated, status, region, countries, sector,"<br>"+commitment, disbursement, expenditure, description]

                // head.innerHTML = title 
                text.innerHTML = info.join('<br>');

                $('#loader').css('display', 'none');
   
  });
}
 //respond on this project 