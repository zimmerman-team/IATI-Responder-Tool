<?php 
include('header.php'); 
$page = 'map';
?>
  
  <div class="col-md-10 col-md-push-1">
    <div id='map'></div>
  </div>

<div class="container-fluid">
      <div id="my-legend">  
          <div id="close-legend" class="btn btn-primary"> Close legend 
              <span class="glyphicon glyphicon-chevron-up"></span>
          </div> <hr>
          
          <div id="label-size">
            <label >Marker position</label>
          </div>
          
          <div id='coordinates' class='ui-coordinates'></div> <hr>

          <div id="radius-input">
                <label for="usr">Radius in km
                <input type="number" class="form-control" id="radius" step="10" min="10" max="500" value="100"></label> <hr>
          </div> 

        
          <div id="label-size">
            <label>Active projects &nbsp 
              <div class="switch">
                  <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" checked="">
                  <label id="check" for="cmn-toggle-1"></label>
              </div>
            </label>
            
              <label id="count" for="usr"></label>
              <button class="btn btn-primary" id="show-button">Show more</button>
          </div>
      </div>

      <div id="open-legend" class="btn btn-primary" role="button"> Open legend
        <span class="glyphicon glyphicon-chevron-down"></span>
      </div>
</div>
  
<a class="btn btn-primary" id= "search-btn" onclick="projects_near_marker()" role="button">Search for projects</a> 

<?php include('footer.php'); ?>
