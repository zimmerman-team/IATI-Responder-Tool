<?php 
include('header.php'); 
$page = 'list';
?> 
      
<div class="col-xs-12" >
    <div class="list-wrapper">

        <div id="loader">
            <div id="loader-icon">Loading...</div>
            <div id="loader-bg"></div>
        </div>

        <div class="table-responsive" id="project-list">
            <table class="table">
            <thead>
                <tr>
                    <th>Projects near me</th>
                    <th>Locations</th>
                    <th>Designation</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </div>
</div>

<?php include('footer.php'); ?>