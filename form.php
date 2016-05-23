<?php 
include('header.php'); 
$page = 'messages';
if (isset($_POST['question0'])){

$to = 'mansur@zimmermanzimmerman.nl';
$subject = 'IATI Responder form';
$message = 'Response through the responder tool.';
$message .= 'First question answer: ' . $_POST['question0'];

$headers = "From: IATI Responder Tool <responder@iatistudio.com>";
$headers .= "\r\nReply-To: responder@iatistudio.com";
$headers .= "\r\nX-Mailer: PHP/".phpversion();

// $mail_status = mail($to, $subject, $message, $headers);
  //var_dump($mail_status);
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
          <label><input type="radio" name="question0" value="slow progress">The progress is running slowly</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question0" value="no progress">I dont see any progress made</label>
        </div>
     <!-- </div> -->


        <label> How satisfied are you with the progress of this project?</label>
        <div class="radio">
          <label><input type="radio" name="question1" value="Extremely satisfied">Extremely satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Satisfied">Satisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Average">Average</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Dissatisfied">Dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Extremely dissatisfied">Extremely dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question1" value="Don't know">Don't know</label>
        </div>

      <label>In wich way does this project benefit you?</label>
      <div class="form-group">
      <!--   <label for="inputlg">input-lg</label> -->
        <input class="form-control input-lg" id="inputlg" type="text">
      </div>

        <label> The information on the detail page is:</label>
        <div class="radio">
          <label><input type="radio" name="question2" value="Great">Great</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Ample">Ample</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Sufficient">Sufficient</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Dissatisfied">Dissatisfied</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Somewhat poor">Somewhat poor</label>
        </div>
        <div class="radio">
          <label><input type="radio" name="question2" value="Poor">Poor</label>
        </div>

       <center><button type="submit" class="btn ">Submit</button></center> 
    </form>
  </div>
 
<?php
include('footer.php');
?>