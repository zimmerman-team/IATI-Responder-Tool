<?php 
include('header.php'); 
$page = 'list';
?> 

          <!-- <button onclick="getLocation()" class="btn btn-primary but3">Nearby projects</button> -->
      
        <div id="loader">
            <div id="loader-icon">Loading...</div>
            <div id="loader-bg"></div>
        </div>

<table class="table-responsive" id="project-list">
    <thead>
        <tr>
            <th>Projects near me</th>
            <th>Locations</th>
        </tr>
    </thead>
    <tbody>
    <!-- <tr><td></td><td></td></tr> -->
    </tbody>
</table>


<?php include('footer.php'); ?>