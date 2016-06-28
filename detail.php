<?php 
include('header.php'); 
$page = 'detail';
?>


  <div class="col-md-12 col-md-4 col-md-push-8" > 
      <div class="sidebar-right">
          <div class="table" id="detail">
            <table class="table">
              <thead>
                <tr>
                  <th colspan="2">
                    <a href="#" class="btn btn-primary respond" id="respond-button" role="button">Respond</a>
                  </th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          
          </div>
        </div>
      </div>

      <div class="col-md-12 col-md-8 col-md-pull-4">
        <div class="detail-column">
          <h3 id="page-title"></h3>
          <div class="container-fluid">
            <div id="description"></div>
          </div>
        </div>
      </div> 

<?php 
include('footer.php');
?>


