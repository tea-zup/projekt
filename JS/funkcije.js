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

	httpRequest.open("GET",  "/projekt-api/api/uporabniki.php?uporabnisko_ime=" + voznik, true);
	httpRequest.send();

}
