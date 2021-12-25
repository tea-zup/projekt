function filterPrevozov(){
  const data = formToJSON(document.getElementById("obrazecFilterPrevozov").elements); //na main linkaih vec js file-ov, formToJSON definiran v enem od njih
  kraj_odhoda = $("#kraj_odhoda").val();
  kraj_prihoda = $("#kraj_prihoda").val();
  cas_odhoda = moment(data["cas_odhoda"]).toDate();

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
				try {
          // console.log(this.responseText);
          document.getElementById("tablelaPrevozov").innerHTML = ""; //da pol ne appendas s klikom na gumb 'rezervacija' se ene tabele
          var odgovorJSON = JSON.parse(this.responseText);
        }
				catch(e){
					console.log("Napaka pri razčlenjevanju podatkov " + e);
					return;
				}
				prikazi(odgovorJSON); //v main je linkanih vec js-ov, prikazi je eden od njih
		}
	};

	httpRequest.open("GET",  "/projekt/api/prevozi.php?kraj_odhoda="+kraj_odhoda+"&kraj_prihoda="+kraj_prihoda+"&cas_odhoda="+cas_odhoda, true);
	httpRequest.send();
}
