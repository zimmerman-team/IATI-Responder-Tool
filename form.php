<?php 
include('header.php'); 
$page = 'messages';
?>
  <div class="container-fluid">
    <form role="form">
      <!-- <div class="form-group"> -->
         <!-- <center><h3>Form</h3></center> -->
        
        <label> What is the status of this project?</label>
        <div class="radio">
          <label><input type="radio" name="optradio">The project is finished</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">The project is in progress</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">The progress is running slowly</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">I dont see any progress made</label>
        </div>
     <!-- </div> -->
    </form>

    <form>
        <label> How many projects are there in your area</label>
        <div class="radio">
          <label><input type="radio" name="optradio">1-5</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">5-10</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">15-20</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">20+</label>
        </div>
     </form>

     <form>
        <label> How satisfied are you with the progress of this project</label>
        <div class="radio">
          <label><input type="radio" name="optradio">Extremely satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Average</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Extremely dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="optradio">Don't know</label>
        </div>
      </form>

       <center><button type="submit" class="btn btn-default">Submit</button></center> 
    </form>
  </div>
 
<?php
include('footer.php');
?>