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

<h3 id="page-title"></h3>

<table class="table" id="detail">

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
