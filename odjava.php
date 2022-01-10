<?php
  unset($_COOKIE["auth_cookie"]);
  setcookie("auth_cookie", null, -1, "/");

  header("Location: prijava.php");
  exit();
?>
