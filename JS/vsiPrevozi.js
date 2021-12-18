function vsiPrevozi(){

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
				try {
					var odgovorJSON = JSON.parse(this.responseText);
				}
				catch(e){
					console.log("Napaka pri razčlenjevanju podatkov");
					return;
				}
				prikazi(odgovorJSON);
		}
	};

	httpRequest.open("GET",  "/projekt/api/prevozi.php", true);
	httpRequest.send();

}


function prikazi(odgovorJSON){
	var fragment = document.createDocumentFragment();

	var table = document.createElement("table");
	table.className = "table table-striped";
	table.style.cssText = 'margin-top: 50px; background-color: white;margin-left:auto;margin-right:auto;width:80%;';
	fragment.appendChild(table);

	table_header = ["Kraj odhoda", "Kraj prihoda", "Čas odhoda", "Cena"];
	var thead = document.createElement("thead");
	table.appendChild(thead);
	var tr = document.createElement("tr");
	thead.appendChild(tr);
	for (var i = 0 ; i < table_header.length ; i++) { //table header
		th = document.createElement("th");
		th.innerHTML = table_header[i];
		tr.appendChild(th);
	}
	var tbody = document.createElement("tbody");
  table.appendChild(tbody);
	for (var i = 0; i < odgovorJSON.length ; i++) { //table body
		var tr = document.createElement("tr");

		for (var stolpec in odgovorJSON[i]){
			var td = document.createElement("td");
			td.innerHTML = odgovorJSON[i][stolpec];
			if (stolpec == "cena"){
				td.innerHTML = td.innerHTML + " €";
			}
			tr.appendChild(td);
		}
		tbody.appendChild(tr);
	}
	document.getElementById("tablelaPrevozov").appendChild(fragment);
}
