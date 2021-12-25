<?php

  $DEBUG = true;
  include("orodja.php");
  $zbirka = dbConnect();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');	// Dovolimo dostop izven trenutne domene (CORS)
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

  switch($_SERVER["REQUEST_METHOD"]){

	case 'GET':

    if (isset($_GET["cas_odhoda"])){ // klice se filter prevozov
      filterPrevozi();
    }
    else {
      vsiPrevozi(); //vsi prosti, ne pretekli prevozi
    }
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

  $odgovor = array();
  $poizvedba = "SELECT kraj_odhoda, kraj_prihoda, cas_odhoda, voznik, cena, id, prosta_mesta FROM prevozi WHERE cas_odhoda > NOW() AND prosta_mesta > 0 ORDER BY kraj_odhoda ASC";
  $rezultat = mysqli_query($zbirka, $poizvedba);
  while ($vrstica = mysqli_fetch_assoc($rezultat)) {
    $vrstica["cas_odhoda"] = date('d-m-Y H:i', strtotime($vrstica["cas_odhoda"]));
    $odgovor[] = $vrstica;
  }

  http_response_code(200);
  echo json_encode($odgovor);
}

function filterPrevozi(){
  global $zbirka;

  if(isset($_GET["cas_odhoda"], $_GET["kraj_odhoda"], $_GET["kraj_prihoda"])){

    $cas_odhoda = mysqli_escape_string($zbirka, $_GET["cas_odhoda"]);
    $kraj_odhoda = mysqli_escape_string($zbirka, $_GET["kraj_odhoda"]);
    $kraj_prihoda = mysqli_escape_string($zbirka, $_GET["kraj_prihoda"]);

    $odgovor = array();
    $poizvedba = "SELECT kraj_odhoda, kraj_prihoda, cas_odhoda, voznik, cena, id, prosta_mesta FROM prevozi WHERE kraj_odhoda LIKE '$kraj_odhoda' AND kraj_prihoda LIKE '$kraj_prihoda' AND cas_odhoda > '$cas_odhoda' AND cas_odhoda > NOW() AND prosta_mesta > 0 ORDER BY kraj_odhoda ASC";
    $rezultat = mysqli_query($zbirka, $poizvedba);
    while ($vrstica = mysqli_fetch_assoc($rezultat)) {
      $odgovor[] = $vrstica; //cas odhoda je ze tipa date
    }

    http_response_code(200);
    echo json_encode($odgovor);
  }
}
?>
