<head>
  <script src="js/mojeRezervacije.js"></script>
  <script src="js/izbrisi.js"></script>
  <link rel="stylesheet" type="text/css" href="CSS/deleteModal.css" />
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
        <div id="id_rezervacije" hidden></div>
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

<div id="izbrisRezervacije" class="modal">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header flex-column">
				<div class="icon-box">
					<!-- <i class="material-icons">&#xf00d;</i> -->
          <i class="fas fa-times"></i>
				</div>
				<h4 class="modal-title w-100"  id="izbrisModalHeader">Ali res želiš izbrisati rezervacijo?</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
        <h6 id="izbrisModalBody"></h6>
			</div>
			<div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-danger" onclick="izbrisi('rezervacije')">Izbriši</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Prekliči</button>
			</div>
		</div>
	</div>
</div>

</body>
