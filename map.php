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
<!--     <a href='#' id='geolocate' class='btn btn-primary projects_near_me_button'>Projects near me</a>
 -->    <a class="btn btn-primary marker" onclick="projects_near_marker()" role="button">Projects near marker</a>

    <div id="radius-input">
        <div class="form-group">
          <label for="usr">Radius in km:</label>
          <input type="number" class="form-control" id="radius" step="10" min="10" max="500" value="100">
        </div>
    </div> 

   <label id="count" for="usr"></label>
     
</div>
</section>       

<?php include('footer.php'); ?>