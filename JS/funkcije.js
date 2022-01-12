var auth_cookie = extractCookies()["auth_cookie"]; //global!
var uporabnisko_ime = extractCookies()["uporabnisko_ime"];

function extractCookies() {
	var cookie = document.cookie; //all cookies
	var output = {};
	cookie.split(/\s*;\s*/).forEach(function(pair) {
	  pair = pair.split(/\s*=\s*/);
	  var name = decodeURIComponent(pair[0]);
	  var value = decodeURIComponent(pair.splice(1).join('='));
	  output[name] = value;
	});
	return output;
}


function pretvoriDatumVString(dt){ //lep zapis datuma, npr. petek 23.11.2021 ob 14:00
	const weekday = ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"];
	dan_tedna_date = moment(dt, "DD-MM-YYYY").toDate();
	dan_tedna = weekday[dan_tedna_date.getDay()];
	dan = moment(dan_tedna_date).format('DD.MM.YYYY');
	cas = dt.split(" ")[1];
	var datum_lep = dan_tedna + ", " + dan + ", ob " + cas + ".";
	return datum_lep;
}


function infoVoznik(voznik){

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
				try {
					var odgovorJSON = JSON.parse(this.responseText);
          // console.log(odgovorJSON);
          document.getElementById("voznik_ui").innerHTML = "<b>Uporabniško ime:</b> " + odgovorJSON["uporabnisko_ime"] + ",";
          document.getElementById("voznik_ime").innerHTML = "<b>Ime:</b> " + odgovorJSON["ime"] + ",";
          document.getElementById("voznik_priimek").innerHTML = "<b>Priimek:</b> " + odgovorJSON["priimek"] + ",";
          document.getElementById("voznik_email").innerHTML = "<b>Email:</b> " + odgovorJSON["email"] + ".";
				}
				catch(e){
					console.log("Napaka pri razčlenjevanju podatkov " + e);
					return;
				}
		}
	};

	httpRequest.open("GET",  "/projekt-api/api/uporabniki.php?voznik=" + voznik, true);
	httpRequest.setRequestHeader('AUTH-USER', uporabnisko_ime);
	httpRequest.setRequestHeader('AUTH-COOKIE', auth_cookie);
	httpRequest.send();

}
