<?php

  $DEBUG = true;
  include("orodja.php");
  $zbirka = dbConnect();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');	// Dovolimo dostop izven trenutne domene (CORS)
  header('Access-Control-Allow-Methods: POST');


	$podatki = json_decode(file_get_contents('php://input'), true);
  #var_dump($podatki);

	if(isset($podatki["uporabnisko_ime"], $podatki["geslo"], $podatki["ime"], $podatki["priimek"], $podatki["email"])){
		$uporabnisko_ime = mysqli_escape_string($zbirka, $podatki["uporabnisko_ime"]);
		$geslo = password_hash(mysqli_escape_string($zbirka, $podatki["geslo"]), PASSWORD_DEFAULT);
		$ime = mysqli_escape_string($zbirka, $podatki["ime"]);
		$priimek = mysqli_escape_string($zbirka, $podatki["priimek"]);
		$email = mysqli_escape_string($zbirka, $podatki["email"]);

		if(!uporabnik_obstaja($uporabnisko_ime)){
			$poizvedba="INSERT INTO uporabniki (uporabnisko_ime, geslo, ime, priimek, email) VALUES ('$uporabnisko_ime', '$geslo', '$ime', '$priimek', '$email')";

			if(mysqli_query($zbirka, $poizvedba)){
				http_response_code(201);
				$odgovor=URL_vira($uporabnisko_ime);
				echo json_encode($odgovor);
			}
			else{
				http_response_code(500);

				if($DEBUG){
					pripravi_odgovor_napaka(mysqli_error($zbirka));
				}
			}
		}
		else{
			http_response_code(409);
			pripravi_odgovor_napaka("Uporabnik že obstaja!");
		}
	}

?>