<?php 
include('header.php'); 
$page = 'list';
?> 

    <div class="col-md-12 col-md-2 col-md-push-10" > 
        <div class="list-column clearfix">    
          <div id="toggle-button-list">
          <label>Active projects &nbsp 
            <div class="switch">
               <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" checked="">
                <label id="check" for="cmn-toggle-1"></label>
            </div>
          </label>
          </div><hr>
            <label id="radius-list" for="usr"></label><hr>
            <label id="count-list" for="usr"></label>
        </div>     
</div>

    <div class="col-md-12 col-md-10 col-md-pull-2"> 
        <table class="table-striped table-hover" id="project-list">
                <thead>
                    <tr>
                        <th><h4>Projects</h4></th>
                        <th><h4>Locations</h4></th>
                        <th><h4>Status</h4></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
        </table>

        <center><div id="show-more" class="btn btn-primary"></div></center>
    </div>

</div>
<?php include('footer.php'); ?>