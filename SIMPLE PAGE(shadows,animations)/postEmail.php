<!doctype html>
<html>
<head>
    <meta charset="UTF-8">
    <title>POST  EMAIL</title>
</head>
<body>
<?php
    
    $myEmailAddress="abc@gmail.com";
    $subject="WHats up?";
    $name=$_POST['Name'];
    $email=$_POST['Email'];
    $msg=$_POST['Message'];

    $header="from: $name <$email>";
    mail($myEmailAddress, $subject, $msg, $header);
    

?>
    <p>done</p>
</body>
</html>