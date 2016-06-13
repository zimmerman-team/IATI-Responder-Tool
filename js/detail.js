// detail.js
      //$("h2").text("Detail")

var text = document.getElementById("description");
var head = document.getElementById("page-title");


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


function info(){
    
    $('#loader').css('display', 'block');

var projectAPI = "https://www.oipa.nl/api/activities/" + id;    
    $.getJSON( projectAPI, {
      format: "json",
    })

    .done(function(data){
     console.log(data)

                var title = id;
                if(data.title.narratives.length != 0){
                    title = data.title.narratives[0].text;
                }

                var description = '<b>Description unavailable</b>'; 
                  if(data.descriptions.length > 0){
                    description = [];

                    for(var i = 0;i < data.descriptions.length;i++){
                        for (var y = 0;y < data.descriptions[i].narratives.length;y++){
                            if (data.descriptions[i].narratives.length != 0){
                                 if (data.descriptions[i].narratives[y].text != null){
                                }
                                description.push(data.descriptions[i].narratives[y].text);
                            }
                        }
                    }
                    description = description.join('<hr>');
                }
           

                var countries = 'Unavailable'
                  if(data.recipient_countries.length > 0){
                    countries = [];

                    for(var i = 0;i < data.recipient_countries.length;i++){
                        countries.push(data.recipient_countries[i].country.name);
                    }
                    countries = countries.join(',&nbsp');
                }

                var last_updated = data.last_updated_datetime; 
                if (data.activity_status.name != null){
                  var status = data.activity_status.name;   
                }
               
                var reporting_org = "Unavailable"
                reporting_org = [];
                    for(var x=0; x < data.reporting_organisations.length; x++){
                        for (var i =0; i < data.reporting_organisations[x].narratives.length; i++){
                           if(data.reporting_organisations[x].narratives[i].text != null){
                            reporting_org.push(data.reporting_organisations[x].narratives[i].text);
                            }
                        }
                       reporting_org = reporting_org.join(',&nbsp');
                    }
                

                var sector = "Unavailable" 
                  if(data.sectors.length > 0){
                    sector = [];

                    for(var i = 0;i < data.sectors.length;i++){
                        if (data.sectors[i].sector.name != null){
                        sector.push(data.sectors[i].sector.name);
                        }
                    }
                    sector =sector.join(',');
                }
               
                var region = "Unavailable" 
                  if(data.recipient_regions.length > 0){
                     region = [];

                    for(var i = 0;i < data.recipient_regions.length;i++){
                        if (data.recipient_regions[i].region.name != null){
                        region.push(data.recipient_regions[i].region.name);
                        }   
                    }
                    region =region.join(',');
                }
                var budget = "Unavailable"
                if (data.budgets.length > 0){
                     budget = [];
                    for(i=0; i<data.budgets.length; i++){
                        if (data.budgets[i].value.value != 0){ 
                        budget.push(data.budgets[i].value.value+ '&nbsp'+ data.budgets[i].value.currency.code);
                        }
                    }
                    budget = budget.join(',&nbsp')
                }

                //commitement
                var commitment_currency = [];
                if (data.aggregations.activity.commitment_currency != null){
                    commitment_currency.push(data.aggregations.activity.commitment_currency)
                }        
                var commitment = "Unavailable" 
                if (data.aggregations.commitment_value != null || data.aggregations.activity.commitment_value !=0){
                 commitment = data.aggregations.activity.commitment_value +'&nbsp'+ commitment_currency;
                }

                //disbursement
                var disbursement_currency = [];
                if (data.aggregations.activity.disbursement_currency != null){
                    disbursement_currency.push(data.aggregations.activity.disbursement_currency)
                }        
                var disbursement = "Unavailable" 
                if (data.aggregations.disbursement_value != null || data.aggregations.activity.disbursement_value !=0){
                 disbursement =data.aggregations.activity.disbursement_value +'&nbsp'+  disbursement_currency ;
                }
                //expenditure
                var expenditure_currency = [];
                if (data.aggregations.activity.expenditure_currency !=null){
                    expenditure_currency.push(data.aggregations.activity.expenditure_currency)
                }        
                var expenditure = "Unavailable" 
                if (data.aggregations.expenditure_value != null || data.aggregations.activity.expenditure_value !=0){
                 expenditure = data.aggregations.activity.expenditure_value+'&nbsp'+  expenditure_currency;
                } 

                var aid_type = "Unavailable"
                if (data.default_aid_type !=null){
                    if(data.default_aid_type.name != null){
                        aid_type = data.default_aid_type.name
                    }
                }

                var date_type =[]
                for (i=0; i < data.activity_dates.length; i++){
                    date_type.push(data.activity_dates[i].type.name+" date ")
                }

                var finance_type ="Unavailable"
                if (data.default_finance_type != null){
                    if(data.default_finance_type.name != null){
                    finance_type = data.default_finance_type.name
                    }
                }


                var date = []
                for (i=0; i < data.activity_dates.length; i++){
                    date.push(data.activity_dates[i].iso_date)
                }

                console.log(date)

                var info = [id, reporting_org, last_updated, status, region, countries, sector, budget, commitment, disbursement, expenditure, aid_type, finance_type]
                var info2 = [description]

                head.innerHTML ='<center>'+title+'</center><br>';
                text.innerHTML = info2.join('<br>'); 
                
          
                var parameters = ["Project ID", "Reporting organisation", "Last updated", "Status", "Region", "Country", "Sector", "Budgets", "Commitment", "Disbursement", "Expenditure", "Aid type", "Finance type"]

                var table = document.getElementById("detail");

                    for (var i = 0, parameters; i<parameters.length; i++) {
                     table += '<tr><td><b>'+parameters[i]+'</b></td><td>'+info[i]+'</td></tr>'
                    }

                    if (date_type && date !=null){
                        for (i=0; i < data.activity_dates.length; i++){
                            table += '<tr><td><b>'+date_type[i]+'</b></td><td>'+date[i]+'</td></tr>'
                        }
                    }
                    
                
                 $('#detail tbody').html(table);

                $('#loader').css('display', 'none');
   
  });
}
 //respond on this project 