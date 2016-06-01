<?php 

include('header.php'); 

$page = 'map';

?>


 <div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
        <div id='map'></div>
        
<!--       <div ondragend="dragEndMain(event)" class="viewcontroller">
      </div> -->

        <div id="loader">
            <div id="loader-icon">Loading...</div>
            <div id="loader-bg"></div>
        </div>
    </div>
  </div>

  <div class="my-legend">  
      <a class="btn btn-primary find-projects" onclick="projects_near_marker()" role="button">Find projects</a>
      
      <pre id='coordinates' class='ui-coordinates'></pre>
      
      <div id="radius-input">
          <div class="form-group">
            <label for="usr">Radius in km:</label>
            <input type="number" class="form-control" id="radius" step="10" min="10" max="500" value="100">
          </div>
      </div> 
      

    
      <div id="label-size">
      <label>Active projects &nbsp
        <div class="switch">
           <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox">
            <label id="check" for="cmn-toggle-1"></label>
        </div>
</label>
        <label id="count" for="usr"></label>
      </div>
  </div>
</div>
     

<?php include('footer.php'); ?>