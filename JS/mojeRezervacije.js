function mojeRezervacije(){

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
        prikaziRezervacije(odgovorJSON);
    }
  };
  uporabnisko_ime = "dummyText"; //trenutnega uporabnika dobimo s sejne spremenljivke
  httpRequest.open("GET",  "/projekt/api/rezervacije.php?uporabnisko_ime=" + uporabnisko_ime, true);
  httpRequest.send();
}

function prikaziRezervacije(odgovorJSON) {
  var fragment = document.createDocumentFragment();

  var table = document.createElement("table"); //table
  table.className = "table table-striped";
  table.style.cssText = 'margin-top: 50px; background-color: white;margin-left:auto;margin-right:auto;width:90%;';
  fragment.appendChild(table);

  table_header = ["Kraj odhoda", "Kraj prihoda", "Datum in ura odhoda", "Št. oseb", "Plačano", "Voznik", "Izbriši"]; // table header
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

  for (var i = 0 ; i < odgovorJSON.length ; i++) { //podatki tabele
    var tr = document.createElement("tr");
    tr.setAttribute("style", "text-align: center");

    if (odgovorJSON[i]["nacin_placila"] == "Gotovina"){ //shardcodano!
      var placano = "❌";
    }
    else { //kartica
      var placano = "✔️";
    }
    var stolpci = [odgovorJSON[i]["kraj_odhoda"], odgovorJSON[i]["kraj_prihoda"], pretvoriDatumVString(odgovorJSON[i]["cas_odhoda"]), odgovorJSON[i]["st_oseb"], placano, odgovorJSON[i]["voznik"], "<i class='fa fa-trash' aria-hidden='true'></i>"];

    for (var stolpec in stolpci) {
      var td = document.createElement("td");
      if (stolpec == 5){ //pazi! voznik modal
        td.setAttribute("data-toggle", "modal");
        td.setAttribute("data-target", "#voznikModal");
        var arg = "infoVoznik(" + "'" + stolpci[stolpec] + "'" + ")";
        td.setAttribute("onclick", arg);
      }
      if (stolpec == 6){ //pazi! gumb izbris rezervacije
        td.setAttribute("data-toggle", "modal");
        td.setAttribute("data-target", "#izbrisRezervacije");
        var arg = "dopolniModalIzbris(" + JSON.stringify(stolpci[0]) + ", " + JSON.stringify(stolpci[1]) +  ", " + JSON.stringify(stolpci[2]) + ", " + JSON.stringify(odgovorJSON[i]["id"]) + ")";
        td.setAttribute("onclick", arg);
      }
      td.innerHTML = stolpci[stolpec];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
  document.getElementById("tablelaRezervacij").appendChild(fragment);
}
