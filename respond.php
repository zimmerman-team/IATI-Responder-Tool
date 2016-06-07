<?php 
include('header.php'); 
$page = 'list';
?> 
<div class="col-xs-12" >      
      <div id="toggle-button-list">
      <label>Active projects &nbsp 
        <div class="switch">
           <input id="cmn-toggle-1" class="cmn-toggle cmn-toggle-round" type="checkbox" checked="">
            <label id="check" for="cmn-toggle-1"></label>
        </div>
      </label>
      </div>
        <label id="radius-list" for="usr"></label>

    <div class="list-wrapper">
        <div class="table-responsive" id="project-list">
            <div class="col-md-12"> 
                <table class="table">
                    <thead>
                        <tr>
                            <th>Projects near me</th>
                            <th>Locations</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

</div>
<?php include('footer.php'); ?>