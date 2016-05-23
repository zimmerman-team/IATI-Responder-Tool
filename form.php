<?php 
include('header.php'); 
$page = 'messages';
if (!empty($_POST)){

$to = 'mansur@zimmermanzimmerman.nl';
$subject = 'IATI Responder form';
$message = 'Response through the responder tool. blabalbla';

// mail($to, $subject, $message);
  var_dump($_POST);
}
?>
  <div class="container-fluid">
    <form role="form" action="form.php" method="post" >
      <!-- <div class="form-group"> -->
         <!-- <center><h3>Form</h3></center> -->
        
        <br><label> What is the status of this project?</label>
        <div class="radio">
          <label><input type="radio" name="question0" value="finished"> The project is finished</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="progress">The project is in progress</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="slow_progress">The progress is running slowly</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="no_progress">I dont see any progress made</label>
        </div>
     <!-- </div> -->

        <label> How many projects are there in your area</label>
        <div class="radio">
          <label><input type="radio" name="question1" value="progress">1-5</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="progress">5-10</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="progress">15-20</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="progress">20+</label>
        </div>

        <label> How satisfied are you with the progress of this project</label>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Extremely satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Average</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Extremely dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="progress">Don't know</label>
        </div>


       <center><button type="submit" class="btn btn-default">Submit</button></center> 
    </form>
  </div>
 
<?php
include('footer.php');
?>