<?php

  $DEBUG = true;
  include("orodja.php");
  $zbirka = dbConnect();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');	// Dovolimo dostop izven trenutne domene (CORS)
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

  switch($_SERVER["REQUEST_METHOD"]){

	case 'GET':
    vsiPrevozi();
		break;

	case 'OPTIONS':
		http_response_code(204);
		break;

	default:
		http_response_code(405);		//'Method Not Allowed'
		break;
}

mysqli_close($zbirka);

function vsiPrevozi(){

  global $zbirka;

  echo "<div class='container-fluid' style='margin-top: 50px;'>";
  echo "<div class='row' style='background-color: white'>";
  echo "<table class='table table-striped'>";
  echo "<thead><tr><th>Kraj odhoda</th><th>Kraj prihoda</th><th>Čas odhoda</th><th>Cena</th></tr></thead><tbody>";

  $poizvedba = "SELECT * FROM prevozi ORDER BY kraj_odhoda DESC, kraj_prihoda DESC, cas_odhoda ASC";
  $rezultat = mysqli_query($zbirka, $poizvedba);
  while($vrstica = mysqli_fetch_assoc($rezultat)){
    $kraj_odhoda = $vrstica["kraj_odhoda"];
    $kraj_prihoda = $vrstica["kraj_prihoda"];
    $cas_odhoda = date('d-m-Y H:i', strtotime($vrstica["cas_odhoda"]));
    $cena = $vrstica["cena"];
    echo "<tr><td>$kraj_odhoda</td><td>$kraj_prihoda</td><td>$cas_odhoda</td><td>$cena €</td></tr>";
  }
  echo "</tbody></table></div></div>";
  http_response_code(200);
}
