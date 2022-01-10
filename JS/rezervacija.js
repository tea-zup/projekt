/**
 * Pridobi podatke iz obrazca in jih vrne v obliki JSON objekta.
 * @param  {HTMLFormControlsCollection} elements
 * @return {Object}
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) =>
{
	if(element.name!="")
	{
		data[element.name] = element.value;
	}
  return data;
}, {});

function rezervacija(){

  const data = formToJSON(document.getElementById("obrazecRezerviraj").elements);

  var st_oseb = $("#select_st_oseb").val(); //iz html-ja
  var nacin_placila = $("#nacin_placila").val();
  var id_prevoza = document.getElementById("id_prevoza").innerHTML;
  data["st_oseb"] = st_oseb;
  data["nacin_placila"] = nacin_placila;
  data["id_prevoza"] = id_prevoza;
	data["auth_cookie"] = extractCookies()["auth_cookie"];
	data["uporabnisko_ime"] = extractCookies()["uporabnisko_ime"];
  var JSONdata = JSON.stringify(data, null, "  ");

  var email_re = /\S+@\S+\.\S+/;
  var tel_re = /^(?=\s*\d)[\d\s]+$/;
  if (data["imeinpriimek"] == "" || data["email"] == "" || data["tel"] == ""){
    $("#rezervacija-prazna-polja").show();
    setTimeout(function (){
      $("#rezervacija-prazna-polja").hide();
    }, 2000);
  }
  else if (email_re.test(data["email"]) == false || tel_re.test(data["tel"]) == false){
    $("#potrdiRezervacijo").css("background-color", "red");
    var msg = "Vnesi veljaven email naslov ali telefon!";
    document.getElementById("rezervacija-err-text").innerHTML = msg;
    $("#rezervacija-err").show();
    setTimeout(function (){
      $("#potrdiRezervacijo").css("background-color", "#007bff");
      document.getElementById("rezervacija-err-text").innerHTML = '';
      $("#rezervacija-err").hide();
    }, 2000);
  }
  else if (document.getElementById('pogojiCheckbox').checked == false){
    $("#potrdiRezervacijo").css("background-color", "red");
    var msg = "Strinjati se moraš s pogoji!";
    document.getElementById("rezervacija-err-text").innerHTML = msg;
    $("#rezervacija-err").show();
    setTimeout(function (){
      $("#potrdiRezervacijo").css("background-color", "#007bff");
      document.getElementById("rezervacija-err-text").innerHTML = '';
      $("#rezervacija-err").hide();
    }, 2000);
  }
  else {

    var httpRequest = new XMLHttpRequest();
  	httpRequest.onreadystatechange = function(){
  		if (this.readyState == 4 && this.status == 201) {
  			try {
          $("#potrdiRezervacijo").css("background-color", "green");
          $("#rezervacija-ok").show();
          setTimeout(function (){
            $("#potrdiRezervacijo").css("background-color", "#007bff");
            $("#rezervacija-ok").hide();
            $(".modal").modal("hide");
            window.location.reload();
          }, 1000);
  			}
  			catch(e) {
          $("#potrdiRezervacijo").css("background-color", "red");
          setTimeout(function (){
            $("#potrdiRezervacijo").css("background-color", "#007bff");
            $(".modal").modal("hide");
          }, 1000);
  				console.log("Napaka pri razčlenjevanju podatkov " + e);
  				return;
  			}

  		}
  	};

  	httpRequest.open("POST", "/projekt-api/api/rezervacije.php", true);
  	httpRequest.send(JSONdata);
  }
}
