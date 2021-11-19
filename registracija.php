<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Prevozi</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="CSS/stil.css" />
    <script src="js/registracija.js"></script>
	</head>
  <body>
		<div id="indexPage" class="center">
      <section class="vh-100" >
        <br>
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="img/carpooling.jpg" class="img-fluid" style="border-radius: 100%;">
            </div>
          </div>

          <br>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5" style="border: 2px solid white; border-radius: 25px; background-color : white">
              <br>
              <h2 style="text-align: center; ">Registracija</h2>
              <br>

              <form id="obrazecRegistracija">
                <!-- Username input -->
                <div class="form-outline mb-3">
                  <input type="text" name="uporabnisko_ime" class="form-control form-control-lg"
                    placeholder="Uporabniško Ime" />
                </div>

                <!-- Password input -->
                <div class="form-outline mb-3">
                  <input type="password" name="geslo" class="form-control form-control-lg"
                    placeholder="Geslo" />
                </div>

                <!-- Name input -->
                <div class="form-outline mb-3">
                  <input type="text" name="ime" class="form-control form-control-lg"
                    placeholder="Ime" />
                </div>

                <!-- Surname input -->
                <div class="form-outline mb-3">
                  <input type="text" name="priimek" class="form-control form-control-lg"
                    placeholder="Priimek" />
                </div>

                <!-- Email input -->
                <div class="form-outline mb-3">
                  <input type="email" name="email" class="form-control form-control-lg"
                    placeholder="Email Naslov" />
                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                  <button id="registracijaGumb" type="button" class="btn btn-primary btn-lg"
                    style="padding-left: 2.5rem; padding-right: 2.5rem;" onclick="registracija()">Registracija</button>
                  <p class="medium fw-bold mt-2 pt-1 mb-0">Že imaš račun? <a href="prijava.php"
                      class="link-danger">Prijava</a></p>
                </div>
									<div id="odgovor-ok-msg" class = "collapse">
										<br>
										<div class="alert alert-success" role="alert" style="text-align: center;">
											Registracija je uspela!
										</div>
									</div>
									<div id="odgovor-err-msg" class = "collapse">
										<br>
										<div id='reg-err-alert-text' class="alert alert-danger" role="alert" style="text-align: center;">
										</div>
									</div>
									<div id='registracija-prazna-polja' class = "collapse">
										<br>
										<div class="alert alert-warning" role="alert" style="text-align: center;">
											Izpolni vsa polja!
										</div>
									</div>
              </form>
              <br>
            </div>
          </div>
        </div>
        <br>
        <br>
      </section>
    </div>
  </body>
</html>
