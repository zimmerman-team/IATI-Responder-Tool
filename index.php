<?php include('header.php'); ?>

  <section>
  <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div class="title-home">
            <center><h2>Welcome to the IATI Responder</h3> </center>
            <br>To view all the projects near you on a map press the projects map button.<br> 
            To view a list of the nearest 20 projects press the projects list button.
          </div>
      </div>

        <div class="row home-buttons">
          <a class="btn btn-primary but1" href="map.php" role="button">
          <span class="glyphicon glyphicon-map-marker"></span> Projects Map
          </a>

          <a class="btn btn-primary but2" href="respond.php" role="button">
          <span class="glyphicon glyphicon-list-alt"></span> Projects List
          </a> 
        </div>
        
      </div>
  </div>
  </section>

<?php include('footer.php'); ?>