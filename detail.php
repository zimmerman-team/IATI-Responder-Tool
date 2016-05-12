<?php 
include('header.php'); 
$page = 'detail';
?>
  <!-- var info = [title, "Project ID: "+id, reporting_org,last_updated, status, region, countries, sector,"<br>"+commitment, disbursement, expenditure, aid_type, date_type, description] -->

  
  <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div id="title">
          </div>

        </div>
      </div>
 

  <section>
      <div class="row">
        <div class="col-xs-12">
          <div id="loader">
            <div id="loader-icon">Loading...</div>
            <div id="loader-bg"></div>
          </div>

        <div id="description">
        </div>

        </div>
      </div>
  
  </section>





        <a class="btn btn-primary respond" href="form.php" role="button">Respond</a>
  </div>
<?php 
include('footer.php');
?>
