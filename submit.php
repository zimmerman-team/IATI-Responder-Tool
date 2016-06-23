<!-- submit.php -->

<?php include('header.php'); 

echo '<pre>';
var_dump($_POST);
echo '</pre>';

$to = 'mansur@zimmermanzimmerman.nl';
$subject = 'IATI Responder form';
$message = 'Response through the responder tool.';
$message .= 'First question answer: ' . $_POST['question0'];
$message .= 'Second question answer: ' . $_POST['question1'];

$headers = "From: IATI Responder Tool <responder@iatistudio.com>";
$headers .= "\r\nReply-To: responder@iatistudio.com";
$headers .= "\r\nX-Mailer: PHP/".phpversion();

// $mail_status = mail($to, $subject, $message, $headers);
  //var_dump($mail_status);

?>
<center>
<h2>Thank you for submitting trough the responder tool</h2>
<a href="/index.php" class="btn btn-primary return-home">Return to homepage</a>
</center>

<?php 
include('footer.php');
?>