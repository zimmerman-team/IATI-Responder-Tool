<?php include('header.php'); ?>

    <div class="col-md-10 col-md-push-1">
        <div class="content">
                <div class="home">
                    <div class="container-fluid">
                          <h1>Welcome to IATI Responder</h1>
                          <!-- Respond to IATI projects from over 400 organisations. <br> -->
                          <h4>A interactive web-tool designed for local communities</h4>  
                          <p>
                          IATI Responder is a interactive tool developed for local communities to provide feedback on running projects.<br> 
                          The IATI Responder serves as a tool to gather feedback from people in development countries.<br>
                          These projects are concerning aid develeopment and are reported in the IATI Registry. <br>
                          </p> 
                          <!-- <div class="pijltje"> -->
                        <div class="col-md-8 col-md-push-5">
                            <a href="#map-home" class="btn btn-circle page-scroll">
                               <span class="glyphicon glyphicon-chevron-down"></span>
                            </a>
                        </div>
                    </div>
                </div> 


              <div class="row text-map">
                  <div id="map-home" class="col-md-6 col-md-6">
                       <h3>Projects map</h3><br>
                       <p>
                       The projects map gives a clear view of all the projects near the user.<br>
                       With the draggable marker and legend projects can be searched in specified regions.<br>
                       </p>
                       <a class="btn btn-primary but1" href="map.php" role="button">
                           <span class="glyphicon glyphicon-map-marker"></span> Go to projects map 
                           <!-- <span class="glyphicon glyphicon-chevron-right"> </span> -->
                       </a>
                   </div>
                   <div class="col-md-6 col-md-6">
                        <img src="images/mapje.jpg" class="img-responsive" alt="">
                   </div>
               </div>

                <div class="row rij-lijst"> 
                   <div class="col-md-6 col-md-6"> 
                       <h3>Projects list</h3><br>
                       <p>
                       The project list shows all the IATI projects in a radius of 50 km. The projects can be filtered on activity by using the Active projects button.<br>
                       </p>
                       <a class="btn btn-primary but2" href="respond.php" role="button">
                           <span class="glyphicon glyphicon-list-alt"></span>Go to projects list
                       </a> 
                   </div>
                   <div class="col-md-6 col-md-6">
                        <img src="images/lijstje.jpg" class="img-responsive" alt="">
                   </div>
                </div>

        </div> 
    </div>        
       
<?php include('footer.php'); ?>

