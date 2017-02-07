<?php 
include('header.php'); 
$page = 'list';
?> 
<div class="col-md-10 col-md-push-1" >
    <div class="row">
        <div class="list-column ">   
          <h3>Project list</h3>
          <p>
           In the project list all the projects near you are shown.
           Lorum ipsum...
          </p>
          <div id="toggle-button-list">
            <div id="label-size">
              <label>Active projects &nbsp 
                <div class="switch">
                    <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" checked="">
                    <label id="check" for="cmn-toggle-1"></label>
                </div>
              </label>
            </div>
          </div>
          
          <label id="radius-list" for="usr"></label> 
          <label id="count-list" for="usr"></label>            
<!--           <label id="active-projects-list">Active projects &nbsp </label>
 -->
        </div>     
    </div>


    <div class="row">
      <div style="overflow-x:auto;">
        <table class="table-striped table-hover" id="project-list">
                <thead>
                    <tr>
                        <th>Nr.</th>
                        <th><h4>Projects</h4></th>
                        <th><h4>Locations</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
        </table>
      </div>
        <center><div id="show-more" class="btn btn-primary"></div></center>
    </div>
</div>

<?php include('footer.php'); ?>