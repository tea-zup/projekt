function vsiPrevozi(){

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
				try {
					var odgovorJSON = JSON.parse(this.responseText);
				}
				catch(e){
					console.log("Napaka pri razčlenjevanju podatkov " + e);
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
	table.style.cssText = 'margin-top: 50px; background-color: white;margin-left:auto;margin-right:auto;width:85%;';
	fragment.appendChild(table);

	table_header = ["Kraj odhoda", "Kraj prihoda", "Čas odhoda", "Voznik", "Cena"];
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
		tr.setAttribute("data-toggle", "modal");
		tr.setAttribute("data-target", "#rezervacijaModal");
		tr.setAttribute("onclick", "dopolniModal(this.cells[0].innerHTML, this.cells[1].innerHTML, this.cells[2].innerHTML, "+odgovorJSON[i]['cena']+","+odgovorJSON[i]['prosta_mesta']+","+odgovorJSON[i]['id']+")");

		odgovorJSON[i]["cas_odhoda"] = pretvoriDatumVString(odgovorJSON[i]["cas_odhoda"]);
		for (var stolpec in odgovorJSON[i]){
			if (stolpec == "id"){
				id = odgovorJSON[i][stolpec];
				break; //tudi 'prosta mesta' ne damo v tabelo
			}
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

function dopolniModal(krajOdhoda, krajPrihoda, dt, cena, prosta_mesta, id){
	document.getElementById("id_prevoza").innerHTML = id; //id skrijemo v html

	document.getElementById("rez_krajOdhoda").innerHTML = "Kraj odhoda: " + krajOdhoda + ",";
	document.getElementById("rez_krajPrihoda").innerHTML = "Kraj prihoda: " + krajPrihoda + ",";
	document.getElementById("rez_dt").innerHTML = "Datum in ura odhoda: " + dt;

	select.options.length = 0;
	select = document.getElementById("select_st_oseb");
	for (var i = 1; i <= prosta_mesta ; i++) {
		var option = document.createElement('option');
		option.text = i;
		option.value = i;
		select.add(option);
	}
	$("#select_st_oseb").val($("#select_st_oseb option:first").val()); //1 always selected by default
	$("#select_st_oseb").selectpicker("refresh");

	$("#select_st_oseb").change(function() {
		var izbranoStOseb = $("#select_st_oseb").val();
		document.getElementById("cena").innerHTML = "Cena je: " + izbranoStOseb * cena + " €.";
	});
	$('#select_st_oseb').trigger('change'); //init cena za 1 osebo
}
