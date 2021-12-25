function filterPrevozov(){
  const data = formToJSON(document.getElementById("obrazecFilterPrevozov").elements); //na main linkaih vec js file-ov, formToJSON definiran v enem od njih
  kraj_odhoda = $("#kraj_odhoda").val();
  kraj_prihoda = $("#kraj_prihoda").val();
  cas_odhoda = moment(data["cas_odhoda"]).toDate();
  if (kraj_prihoda == "" || kraj_odhoda == ""){
    document.getElementById("tablelaPrevozov").innerHTML = "";
    vsiPrevozi();
    return;
  }

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
        if (jQuery.isEmptyObject(odgovorJSON)){
          document.getElementById("tablelaPrevozov").innerHTML = "<br><h5 style='width:85%;margin:auto'> Za izbran dan in uro ni na voljo nobenega prevoza. Poskusi znova z drugačnimi parametri. <h5>";
        }
        else {
          prikazi(odgovorJSON); //v main je linkanih vec js-ov, prikazi je eden od njih
        }
		}
	};

	httpRequest.open("GET",  "/projekt/api/prevozi.php?kraj_odhoda="+kraj_odhoda+"&kraj_prihoda="+kraj_prihoda+"&cas_odhoda="+cas_odhoda, true);
	httpRequest.send();
}
