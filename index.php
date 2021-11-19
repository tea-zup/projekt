<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Prevozi</title>
</head>
<?php
  $url = $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  if ($url == 'localhost/projekt/'){ //po defaultu nas preusmeri na prijavo
    header("Location: prijava.php");
  }
?>
<body>
</body>
</html>
