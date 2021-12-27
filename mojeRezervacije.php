<head>
  <script src="js/mojeRezervacije.js"></script>
</head>
<?php include "head.php"?>
<body onload="mojeRezervacije()">
<div class="center" id='moje_rezervacije'>
  <?php include "navbar.php"?>
  <div class="container-fluid h-custom">
    <div id='tablelaRezervacij'></div>
  </div>
</div>

<div id="voznikModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Informacije o vozniku:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
          <div class="row"><div class="col-sm-12"><span id="voznik_ui"></span></div></div>
          <div class="row"><div class="col-sm-12"><span id="voznik_ime"></span></div></div>
          <div class="row"><div class="col-sm-12"><span id="voznik_priimek"></span></div></div>
          <div class="row"><div class="col-sm-12"><span id="voznik_email"></span></div></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zapri</button>
      </div>
    </div>
  </div>
</div>

</body>
