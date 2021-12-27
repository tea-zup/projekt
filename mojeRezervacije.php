<head>
  <script src="js/mojeRezervacije.js"></script>
  <script src="js/pretvoriDatumVString.js"></script>
</head>
<?php include "head.php"?>
<body onload="mojeRezervacije()">
  <div class="center" id='moje_rezervacije'>
    <?php include "navbar.php"?>
    <div class="container-fluid h-custom">
      <div id='tablelaRezervacij'></div>
    </div>
  </div>
</body>
