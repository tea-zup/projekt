<!DOCTYPE html>
<html>
	<head>
		<title>Glavna stran</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Prevozi</title>
		<script src="js/filterPrevozov.js"></script>
		<script src="js/vsiPrevozi.js"></script>
		<script src="js/predlagajKraj.js"></script>
		<script src="js/rezervacija.js"></script>
		<script src="js/filterPrevozov.js"></script>
	</head>
	<?php include "head.php"?>
	<body onload="vsiPrevozi(); predlagajKraj('kraj_odhoda'); predlagajKraj('kraj_prihoda');">
		<div class="center" id='main'>
			<?php include "navbar.php"?>
			<div class="container-fluid h-custom">
				<div class="row d-flex h-100" >
					<div class="col-6" style="margin-left: 5%;">
					<br>
					<form id="obrazecFilterPrevozov">
						<div class="mb-3">
							<label name="kraj_odhoda">Iščem prevoz od: </label>
							<select id="kraj_odhoda" class="selectpicker" data-live-search="true" title="Išči...">
							</select>
						</div>
						<div class="mb-3">
							<label name="kraj_prihoda">do: </label>
							<select id="kraj_prihoda" class="selectpicker" data-live-search="true" title="Išči...">
							</select>
						</div>
						<div class="mb-3 form-group pmd-textfield pmd-textfield-floating-label">
							<label>ob: </label>
							<input type="datetime-local" id="meeting-time" name="cas_odhoda" value="<?php echo date("Y-m-d", strtotime("+1 day"))?>T08:00" min="<?php echo date("Y-m-d")?>T00:00" style="border-radius: 5px;">
						</div>
						<div class="text-center text-lg-start mt-4 pt-2">
							<button id="filterPrevozovGumb" type="button" class="btn btn-dark btn-md"
								style="float:left;margin-top:-1em;" onclick="filterPrevozov()">Išči prevoz</button>
						</div>
					</form>
				</div>
			</div>
			<div id='tablelaPrevozov'></div>
		</div>


		<div id="rezervacijaModal" class="modal" tabindex="-1" role="dialog">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Rezervacija prevoza</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
						<div class="container-fluid">
							<div id="id_prevoza" hidden></div>
							<div class="row"><div class="col-sm-12"><span id="rez_krajOdhoda"></span></div></div>
							<div class="row"><div class="col-sm-12"><span id="rez_krajPrihoda"></span></div></div>
							<div class="row"><div class="col-sm-12"><span id="rez_dt"></span></div></div>
							<br>
							<form id="obrazecRezerviraj">
								<div class="form-group row">
									<label class="col-sm-4 col-form-label text-right">Ime in priimek:</label>
									<div class="col-sm-8">
										<input name="imeinpriimek" type="text" class="form-control" id="reg_imeinpriimek">
									</div>
								</div>
							  <div class="form-group row">
							    <label class="col-sm-4 col-form-label text-right">Email:</label>
							    <div class="col-sm-8">
							      <input name="email" type="email" class="form-control" id="reg_email">
							    </div>
							  </div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label text-right">Telefon:</label>
									<div class="col-sm-8">
										<input name="tel" type="tel" class="form-control" id="reg_tel">
									</div>
								</div>
								<div class="row">
									<div class="col-sm-4 text-right">
										<span>Št oseb:</span>
									</div>
									<div class="col-sm-8">
										<select id="select_st_oseb" class="selectpicker"></select>
									</div>
								</div>
							</form>
							<div class="row">
								<hr class="col-sm-12" style="width: 100%; color: black; height: 0.2px; background-color:text-secondary;"> <!--horizontal line -->
							</div>
							<div class="row">
								<div class="col-sm-12">
									<span id="cena"></span>
									<span>Način plačila: </span>
									<select id="nacin_placila" class="selectpicker">
										<option>Gotovina</option>
										<option>Kartica</option>
									</select>
								</div>
							</div>
							<br>
							<div class="row">
								<div class="col-sm-12 d-flex justify-content-center">
									<div class="form-check">
									  <input class="form-check-input" type="checkbox" value="" id="pogojiCheckbox">
									  <label class="form-check-label" for="flexCheckDefault">Strinjam se s pogoji poslovanja</label>
									</div>
								</div>
							</div>
						</div>
					</div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" id="potrdiRezervacijo" onclick="rezervacija()">Potrdi</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Zapri</button>
		      </div>
					<div id="rezervacija-ok" class = "collapse" style="width:85%;margin:auto;">
						<div class="alert alert-success" role="alert" style="text-align: center;">
							Rezervacija je ok!
						</div>
					</div>
					<div id='rezervacija-prazna-polja' class = "collapse" style="width:85%;margin:auto;">
						<div class="alert alert-warning" role="alert" style="text-align: center;">
							Izpolni vsa polja!
						</div>
					</div>
					<div id="rezervacija-err" class = "collapse" style="width:85%;margin:auto;">
						<br>
						<div id='rezervacija-err-text' class="alert alert-danger" role="alert" style="text-align: center;">
						</div>
					</div>
		    </div>
		  </div>
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
</html>
