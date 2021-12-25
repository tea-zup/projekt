<?php

  $DEBUG = true;
  include("orodja.php");
  $zbirka = dbConnect();

  header('Content-Type: application/json');
  header('Access-Control-Allow-Origin: *');	// Dovolimo dostop izven trenutne domene (CORS)
  header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

  switch($_SERVER["REQUEST_METHOD"]){

	case 'GET':
    vseRezervacije();
	  break;

  case 'POST':
    rezerviraj();
    break;

  case 'PUT': //spremeni st. prostih mest pri dodajanju / brisanju rezervacije
    rezervacija_spremeni_prosta_mesta();
    break;

	case 'OPTIONS':
		http_response_code(204);
		break;

	default:
		http_response_code(405);		//'Method Not Allowed'
		break;
}

mysqli_close($zbirka);

function vseRezervacije(){

  global $zbirka;

  $odgovor = array();
  $poizvedba = "SELECT * FROM rezervacije";
  $rezultat = mysqli_query($zbirka, $poizvedba);
  while ($vrstica = mysqli_fetch_assoc($rezultat)) {
    $odgovor[] = $vrstica;
  }

  http_response_code(200);
  echo json_encode($odgovor);
}

function rezerviraj(){
  global $zbirka, $DEBUG;
  $podatki = json_decode(file_get_contents('php://input'), true);

  if(isset($podatki["imeinpriimek"], $podatki["email"], $podatki["tel"], $podatki["st_oseb"], $podatki["nacin_placila"], $podatki["id_prevoza"])){

    $imeinpriimek = mysqli_escape_string($zbirka, $podatki["imeinpriimek"]);
    $email = mysqli_escape_string($zbirka, $podatki["email"]);
    $tel = mysqli_escape_string($zbirka, $podatki["tel"]);
    $st_oseb = mysqli_escape_string($zbirka, $podatki["st_oseb"]);
    $nacin_placila = mysqli_escape_string($zbirka, $podatki["nacin_placila"]);
    $id_prevoza = mysqli_escape_string($zbirka, $podatki["id_prevoza"]);
    session_start();
    $uporabnisko_ime_prijavljenega = $_SESSION['uporabnisko_ime'];

    $poizvedba="INSERT INTO rezervacije (id, id_prevoza, uporabnisko_ime, imeinpriimek, email, tel, st_oseb, nacin_placila) VALUES (NULL, '$id_prevoza', '$uporabnisko_ime_prijavljenega', '$imeinpriimek', '$email', '$tel', '$st_oseb', '$nacin_placila')";

    if(mysqli_query($zbirka, $poizvedba)){
      http_response_code(201);
      //$odgovor=URL_vira($id_prevoza);
      //echo json_encode($odgovor);
    }
    else{
      http_response_code(500);
      if($DEBUG){
        pripravi_odgovor_napaka(mysqli_error($zbirka));
      }
    }
  }
}

function rezervacija_spremeni_prosta_mesta(){
  global $zbirka, $DEBUG;
  $podatki = json_decode(file_get_contents('php://input'), true);

  if(isset($podatki["id_prevoza"], $podatki["st_oseb"])){

    $id_prevoza = mysqli_escape_string($zbirka, $podatki["id_prevoza"]);
    $st_oseb = mysqli_escape_string($zbirka, $podatki["st_oseb"]);

    $poizvedba = "SELECT prosta_mesta FROM prevozi WHERE id = '$id_prevoza'";
    $rezultat = mysqli_query($zbirka, $poizvedba);
    $vrstica = mysqli_fetch_assoc($rezultat);

    $nova_prosta_mesta = $vrstica["prosta_mesta"] - $st_oseb;
    $poizvedba="UPDATE prevozi SET prosta_mesta = '$nova_prosta_mesta' WHERE id = '$id_prevoza'";

    if(mysqli_query($zbirka, $poizvedba)){
      http_response_code(204);
      //$odgovor=URL_vira($id_prevoza);
      //echo json_encode($odgovor);
    }
    else{
      http_response_code(500);
      if($DEBUG){
        pripravi_odgovor_napaka(mysqli_error($zbirka));
      }
    }
  }
}

?>
