<?php

  $DEBUG = true;
  include("orodja.php");
  $zbirka = dbConnect();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');	// Dovolimo dostop izven trenutne domene (CORS)
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

  switch($_SERVER["REQUEST_METHOD"]){

	case 'GET':

  if (!empty($_GET["tip"])){
    predlagajKraj($_GET["tip"]);
  }
  else {
    vsiPrevozi();
  }
  #vsiPrevozi();
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
  $poizvedba = "SELECT kraj_odhoda, kraj_prihoda, cas_odhoda, voznik, cena FROM prevozi WHERE cas_odhoda > NOW() ORDER BY kraj_odhoda DESC, kraj_prihoda DESC, cas_odhoda ASC";
  $rezultat = mysqli_query($zbirka, $poizvedba);
  while ($vrstica = mysqli_fetch_assoc($rezultat)) {
    $vrstica["cas_odhoda"] = date('d-m-Y H:i', strtotime($vrstica["cas_odhoda"]));
    $odgovor[] = $vrstica;
  }

  http_response_code(200);
  echo json_encode($odgovor);
}

function predlagajKraj($tip){
  global $zbirka;
  $odgovor = array();
  $tip = mysqli_escape_string($zbirka, $tip);

  $poizvedba = "SELECT DISTINCT " . $tip . " FROM prevozi";

  $rezultat = mysqli_query($zbirka, $poizvedba);

  if(mysqli_num_rows($rezultat) > 0) {
    while ($vrstica = mysqli_fetch_assoc($rezultat)) {
      $odgovor[] = $vrstica;
    }
    http_response_code(200);
    echo json_encode($odgovor);
  }
  else {
    http_response_code(404);		//Not found
  }
}
?>
