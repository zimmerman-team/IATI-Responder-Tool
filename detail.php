<?php 
include('header.php'); 
$page = 'detail';
?>
  
  <div class="container-fluid">
      <div id="loader">
        <div id="loader-icon">Loading...</div>
        <div id="loader-bg"></div>
      </div>  
 <div class="col-xs-6 col-md-4" > 
      <div class="sidebar-right">
            <div class="table-responsive" id="detail">
              
              <table class="table">
                <thead>
                  <a class="btn btn-primary respond" href="form.php" role="button">Respond</a>
                </thead>
                <tbody>
                </tbody>
              </table>
          
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-md-8">
        <div class="detail-column">
     
          <h3 id="page-title"></h3>
          <div class="container-fluid">
            <div id="description"></div>
          </div>

        </div>
      </div> 
    
  </div>
<?php 
include('footer.php');
?>


