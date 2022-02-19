<?php
$name = $_POST['name'];
$phone = $_POST['phone'];
$message = $_POST['message'];

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF; //Enable verbose debug output
    $mail->isSMTP(); //Send using SMTP
    $mail->Host = 'hst3.sibnet.ru'; //Set the SMTP server to send through
    $mail->SMTPAuth = true; //Enable SMTP authentication
    $mail->Username = 'mailer@slavgorod.ru'; //SMTP username
    $mail->Password = 'bhnjmkO0'; //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; //Enable implicit TLS encryption
    $mail->Port = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

    //Recipients
    $mail->setFrom('mailer@slavgorod.ru', 'Tzeezoje');
    $mail->addAddress('kda@slavgorod.ru', 'Tzeezoje'); //Add a recipient

    //Content
    $mail->isHTML(true); //Set email format to HTML
    $mail->Subject = 'New reservation recieved!';
    $mail->Body = "New reservation:<br>
                Name: $name<br>
                Phone: $phone<br>
                Message: $message";

    $mail->send();
    echo json_encode(['message' => 'success']);
} catch (Exception $e) {
    echo json_encode(['message' => 'error']);
}
