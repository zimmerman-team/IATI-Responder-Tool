<?php 
include('header.php'); 
$page = 'map';
?>
  
<!-- <div class="col-xs-12 col-md-7 col-md-pull-5" id="map"> -->
  <!-- <div class="col-xs-12 col-md-3 col-md-push-9" id="my-legend"></div> -->
    


  <div class="col-xs-6 col-md-3" id="my-legend">

  <div class="container-fluid">
        <!-- <div id="my-legend">   -->
<!--             <div id="close-legend" class="btn btn-primary"> Close legend 
                <span class="glyphicon glyphicon-chevron-up"></span>
            </div> <hr> -->
           <h3>How do I use the map?</h3>
           <p> By refreshing the page, the map will always show you, your location (red marker) and all the projects around you in a radius of 100km. <br> The projects that are located close togheter are clustered in groups. You can view all the projects in a cluster by clicking on the cluster.<br>
           <br>To search for projects on a different location simply drag the marker to the desired location and press the "search for projects button" or hold down your mouse for 2 seconds on the desired location.
           <br><br>     </p>
            <label >Legend</label> <hr>
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
        <!-- </div> -->

<!--         <div id="open-legend" class="btn btn-primary" role="button"> Open legend
          <span class="glyphicon glyphicon-chevron-down"></span>
        </div> -->
      <a class="btn btn-primary" id= "search-btn" onclick="projects_near_marker()" role="button">Search for projects</a> 
  </div>
</div>
  <div class="col-xs-12 col-md-7" id='map'></div>

<?php include('footer.php'); ?>
