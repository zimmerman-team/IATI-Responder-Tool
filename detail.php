<?php 
include('header.php'); 
$page = 'detail';
?>
  
  <div class="container-fluid">
      <div class="row">
        <div class="col-xs-12">
          <div id="title">          
          </div>

        </div>
      </div>


<table class="table table-striped" id="detail">
  <col width="130">
  <col width="80">
    <thead id= "thead"> </thead>
    <tbody>
    </tbody>
</table>

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