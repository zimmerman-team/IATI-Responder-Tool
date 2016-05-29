<?php 

include('header.php'); 

$page = 'map';

?>

<section>
 <div class="container-fluid">
  <div class="row">
    <div class="col-xs-12">
        <div id='map'></div>

        <div id="loader">
            <div id="loader-icon">Loading...</div>
            <div id="loader-bg"></div>
        </div>
    </div>
  </div>

  <div class="my-legend">  
      <a class="btn btn-primary find-projects" onclick="projects_near_marker()" role="button">Find projects</a>

      <div id="radius-input">
          <div class="form-group">
            <label for="usr">Radius in km:</label>
            <input type="number" class="form-control" id="radius" step="10" min="10" max="500" value="100">
          </div>
      </div> 
       <pre id='coordinates' class='ui-coordinates'></pre>
      <label id="count" for="usr"></label>
  </div>
</div>
</section>       

<?php include('footer.php'); ?>