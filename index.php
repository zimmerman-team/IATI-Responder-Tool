<?php include('header.php'); ?>

    <div class="col-md-10 col-md-push-1">
        <div class="content">
              <div class="container">
                  <h1>Welcome to IATI Responder</h1>
                  <!-- Respond to IATI projects from over 400 organisations. <br> -->
                  <h4>A interactive web-tool for local communities</h4>  
                  <p><br>
                  IATI Responder is a interactive tool developed for local communities to provide feedback on running projects.<br> 
                  The IATI Responder serves as a tool to gather feedback from people in development countries concerning develeopment projects that are reported in the IATI Registry. <br>
                  </p>
                  <hr>
              </div>
              <div class="row">
                  <div class="text-map col-md-6 col-md-6">
                       <h4>Projects map</h4><br>
                       <p>
                       The projects map gives a clear view of all the projects near the user.<br>
                       With the draggable marker and legend projects can be searched in specified regions.<br>
                       By holding down for two seconds, the marker will apppear with all the projects near it.<br>
                       </p>
                       <a class="btn btn-primary but1" href="map.php" role="button">
                           <span class="glyphicon glyphicon-map-marker"></span> Go to projects map 
                           <!-- <span class="glyphicon glyphicon-chevron-right"> </span> -->
                       </a>
                   </div>

                   <div class="text-list col-md-6 col-md-6"> 
                       <h4>Projects list</h4><br>
                       <p>
                       The project list shows all the IATI projects in a radius of 50 km. The projects can be filtered on activity by using the Active projects button.<br>
                       </p>
                       <a class="btn btn-primary but2" href="respond.php" role="button">
                           <span class="glyphicon glyphicon-list-alt"></span>Go to projects list
                       </a> 
                   </div>
               </div>
        </div> 
    </div>        
       
<?php include('footer.php'); ?>

