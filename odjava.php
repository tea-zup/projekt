<?php
  session_start();
  unset($_SESSION["loggedin"]);
  unset($_SESSION["uporabnisko_ime"]);

  header("Location: prijava.php");
  exit();
?>
