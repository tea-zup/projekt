<nav class="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="main.php">Domov <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="mojeRezervacije.php">Moje rezervacije</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Moje ponudbe</a>
      </li>
    </ul>
  </div>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Moj profil</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="odjava.php">🌙</a>
      </li>
    </ul>
</div>
</nav>

<?php
session_start();
if (!isset($_SESSION["loggedin"])){ #na vsaki strani (razen prijavi in registraciji) preverimo, če je uporabnik prijavljen
  header("Location: prijava.php"); #ce uporabnik ni prijavljen ga preusmerimo na prijavo
}
?>
