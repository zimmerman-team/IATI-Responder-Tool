<?php 
include('header.php'); 
$page = 'list';
?> 
<div class="col-md-8 col-md-push-2" >
    <div class="row">
        <div class="list-column ">   

          <div id="toggle-button-list">
            
                <div class="switch toggle-on-list">
                    <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" checked="">
                    <label id="check" for="cmn-toggle-1"></label>
                </div>              
          </div>
          
          <label id="active-projects-list">Active projects &nbsp </label>
          <label id="radius-list" for="usr"></label>
          <label id="count-list" for="usr"></label>
            
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