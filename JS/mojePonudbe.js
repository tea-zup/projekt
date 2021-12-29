function mojePonudbe(){
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        try {
          var odgovorJSON = JSON.parse(this.responseText);
          // console.log(odgovorJSON);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
        prikaziPonudbe(odgovorJSON);
    }
  };
  uporabnisko_ime = "dummyText"; //trenutnega uporabnika dobimo s sejne spremenljivke
  httpRequest.open("GET",  "/projekt/api/prevozi.php?uporabnisko_ime=" + uporabnisko_ime, true);
  httpRequest.send();
}

function prikaziPonudbe(odgovorJSON){
  var fragment = document.createDocumentFragment();

  var table = document.createElement("table"); //table
  table.className = "table table-striped";
  table.style.cssText = 'background-color: white;margin-left:auto;margin-right:auto;width:95%;';
  fragment.appendChild(table);

  table_header = ["Kraj odhoda", "Kraj prihoda", "Datum in ura odhoda", "Cena", "Zasedena mesta", "Prosta mesta", "Izbriši"]; // table header
  var thead = document.createElement("thead");
  table.appendChild(thead);
  var tr = document.createElement("tr");
  tr.setAttribute("style", "text-align: center");
  thead.appendChild(tr);
  for (var i = 0 ; i < table_header.length ; i++) { //table header
    th = document.createElement("th");
    th.innerHTML = table_header[i];
    tr.appendChild(th);
  }

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (var i = 0 ; i < odgovorJSON.length ; i++) { //podatki tabele
    var tr = document.createElement("tr");
    tr.setAttribute("style", "text-align: center");
    var stolpci = [odgovorJSON[i]["kraj_odhoda"], odgovorJSON[i]["kraj_prihoda"], pretvoriDatumVString(odgovorJSON[i]["cas_odhoda"]), odgovorJSON[i]["cena"], odgovorJSON[i]["zasedena_mesta"], odgovorJSON[i]["prosta_mesta"], "<i class='fa fa-trash' aria-hidden='true'></i>"];

    for (var stolpec in stolpci) {
      var td = document.createElement("td");
      td.innerHTML = stolpci[stolpec];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
  document.getElementById("tablelaPonudb").appendChild(fragment);
}
