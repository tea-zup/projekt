<!DOCTYPE html>
<html>
	<head>
		<title>Glavna stran</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Prevozi</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/js/bootstrap-select.min.js"></script>
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.9/dist/css/bootstrap-select.min.css">
    <link rel="stylesheet" type="text/css" href="CSS/stil.css" />
		<script src="js/vsiPrevozi.js"></script>
		<script src="js/predlagajKraj.js"></script>
	</head>
	<body onload="vsiPrevozi(); predlagajKraj('kraj_odhoda'); predlagajKraj('kraj_prihoda');">
		<div class="center" id='main'>
			<?php include "navbar.php"?>
			<div class="container-fluid h-custom">
				<div class="row d-flex h-100" >
					<div class="col-6" style="margin-left: 5%;">
					<br>
					<form id="obrazecRezervacija">
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
							<label name="cas_odhoda">ob: </label>
							<input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-07T00:00" min="2018-06-07T00:00" style="border-radius: 5px;">
						</div>
						<div class="text-center text-lg-start mt-4 pt-2">
							<button id="rezervacijaGumb" type="button" class="btn btn-secondary btn-sm"
								style="float:left;margin-top:-1em" data-toggle="modal" data-target="#rezervacijaModal">Rezervacija</button>
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
		        <h5 class="modal-title">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p>Modal body text goes here.</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary">Potrdi</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
	</div>

	</body>
</html>
