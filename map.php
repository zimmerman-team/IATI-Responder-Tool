<?php 

include('header.php'); 

$page = 'map';

?>


  <div class="row">
    <div class="col-xs-12">
        <div id='map'></div>
    </div>
  </div>


  <div id="my-legend">  
      <a class="btn btn-primary find-projects" onclick="projects_near_marker()" role="button">Find projects</a> <hr>
      
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
          <p id="show-button"></p><hr>

           <div id="hide-legend" class="btn btn-primary"> Hide legend </div>
      </div>


  </div>
    <div id="show-legend" class="btn btn-primary" role="button"> Show legend </div>
   




<?php include('footer.php'); ?>
