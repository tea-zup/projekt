<head>
  <script src="js/mojePonudbe.js"></script>
  <script src="js/dodajPrevoz.js"></script>
  <script src="js/izbrisi.js"></script>
  <link rel="stylesheet" type="text/css" href="CSS/deleteModal.css" />
</head>
<?php include "head.php"?>
<body onload="mojePonudbe()">
<div class="center" id='moje_ponudbe'>
  <?php include "navbar.php"?>
  <div class="container-fluid">
    <br>
    <div class="row" style="margin-bottom:5px;margin-left:auto; margin-right:auto; width:85%;" >
      <div class="col-9"></div>
      <div class="col-3">
        <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#dodajPrevozModal" style="float:right;">Dodaj Prevoz</button>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div id='tablelaPonudb'></div>
      </div>
    </div>
  </div>
</div>

<div id="dodajPrevozModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Dodaj Prevoz:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="id_prevoza" hidden></div>
        <div class="container-fluid" style="width:80%; margin:auto">
          <form id="obrazecDodajPrevoz">
            <div class="form-group mb-3" >
              <label class="col-form-label">Kraj odhoda:</label>
              <input name="kraj_odhoda" type="text" class="form-control">
            </div>
            <div class="form-group mb-3" >
              <label class="col-form-label">Kraj prihoda:</label>
              <input name="kraj_prihoda" type="text" class="form-control">
            </div>
            <div class="mb-3 form-group ">
              <label>Datum in čas odhoda: </label>
              <input type="datetime-local" id="meeting-time" name="cas_odhoda" value="<?php echo date("Y-m-d", strtotime("+1 day"))?>T08:00" min="<?php echo date("Y-m-d")?>T00:00" style="border-radius: 5px;">
            </div>
            <div class="form-group mb-3" >
              <label class="col-form-label">Št. prostih mest:</label>
              <input name="prosta_mesta" type="text" class="form-control">
            </div>
            <div class="form-group mb-3" >
              <label class="col-form-label">Cena[€]: </label>
              <input name="cena" type="text" class="form-control">
            </div>
          </form>
          <div id="prevoz-ok" class = "collapse" style="width:85%;margin:auto;">
            <div class="alert alert-success" role="alert" style="text-align: center;">
              Prevoz dodan!
            </div>
          </div>
          <div id='dodajPrevoz-prazna-polja' class = "collapse" style="width:85%;margin:auto;">
            <div class="alert alert-warning" role="alert" style="text-align: center;">
              Izpolni vsa polja!
            </div>
          </div>
        </div>
        <div id="dodajPrevoz-err" class = "collapse" style="width:85%;margin:auto;">
          <br>
          <div id='dodajPrevoz-err-text' class="alert alert-danger" role="alert" style="text-align: center;">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" id="dodajPrevoz" onclick="dodajPrevoz()">Dodaj</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zapri</button>
      </div>
    </div>
  </div>
</div>

<div id="potnikiModal" class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Informacije o potnikih:</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div id="id_rezervacije" hidden></div>
        <div class="container-fluid" id="potnikPodatki"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zapri</button>
      </div>
    </div>
  </div>
</div>

<div id="izbrisPrevoza" class="modal">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header flex-column">
				<div class="icon-box">
          <i class="fas fa-times"></i>
				</div>
				<h4 class="modal-title w-100"  id="izbrisModalHeader">Ali res želiš izbrisati rezervacijo?</h4>
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
        <h6 id="izbrisModalBody"></h6>
			</div>
			<div class="modal-footer justify-content-center">
        <button type="button" class="btn btn-danger" onclick="izbrisi('prevozi')">Izbriši</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Prekliči</button>
			</div>
		</div>
	</div>
</div>
