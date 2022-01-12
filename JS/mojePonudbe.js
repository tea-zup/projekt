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


  httpRequest.open("GET",  "/projekt-api/api/prevozi.php?moje_ponudbe=" + 'true', true);
  httpRequest.setRequestHeader('AUTH-USER', uporabnisko_ime);
  httpRequest.setRequestHeader('AUTH-COOKIE', auth_cookie);
  httpRequest.send();
}

function prikaziPonudbe(odgovorJSON){
  var fragment = document.createDocumentFragment();

  var table = document.createElement("table"); //table
  table.className = "table table-striped";
  table.style.cssText = 'background-color: white;margin-left:auto;margin-right:auto;width:85%;';
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
      if (stolpec == 4){
        td.setAttribute("data-toggle", "modal");
        td.setAttribute("data-target", "#potnikiModal");
        var arg = "modalPotniki(" + "'" + odgovorJSON[i]["id"] + "'" + ")";
        td.setAttribute("onclick", arg);
      }
      if (stolpec == 6){ //pazi! gumb izbris rezervacije
        td.setAttribute("data-toggle", "modal");
        td.setAttribute("data-target", "#izbrisPrevoza");
        var arg = "dopolniModalIzbris(" + JSON.stringify(odgovorJSON[i]["kraj_odhoda"]) + ", " + JSON.stringify(odgovorJSON[i]["kraj_prihoda"]) +  ", " + JSON.stringify(odgovorJSON[i]["cas_odhoda"]) + ", " + JSON.stringify(odgovorJSON[i]["id"]) + ", 'prevozi')";
        td.setAttribute("onclick", arg);
      }
      td.innerHTML = stolpci[stolpec];
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }
  document.getElementById("tablelaPonudb").appendChild(fragment);
}

function modalPotniki(id_prevoza){
  document.getElementById("id_prevoza").innerHTML = id_prevoza;

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        try {
          var odgovorJSON = JSON.parse(this.responseText);
          // console.log(odgovorJSON);
          var fragment = document.createDocumentFragment();
          arrayLabels = ["Uporabniško ime: ", "Ime in priimek: ", "Št. oseb: ", "Telefon: ", "Email: ", "Način plačila: "];
          arrayValues = ["uporabnisko_ime", "imeinpriimek", "st_oseb", "tel", "email", "nacin_placila"];
          for (var i = 0 ; i < odgovorJSON.length ; i++){
            for (var j = 0 ; j < arrayValues.length ; j++){
              var divRow = document.createElement("div");
              divRow.className = "row";
              var divCol = document.createElement("div");
              divRow.className = "col-sm-12";
              var span = document.createElement("span");
              span.innerHTML = "<b>" + arrayLabels[j] + "</b>" + odgovorJSON[i][arrayValues[j]];
              fragment.appendChild(divRow).appendChild(divCol).appendChild(span);
            }
            var br = document.createElement("br");
            fragment.appendChild(br);
          }
          document.getElementById("potnikPodatki").innerHTML = "";
          document.getElementById("potnikPodatki").appendChild(fragment);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
    }
  };

  httpRequest.open("GET",  "/projekt-api/api/prevozi.php?id=" + id_prevoza, true);
  httpRequest.setRequestHeader('AUTH-USER', uporabnisko_ime);
  httpRequest.setRequestHeader('AUTH-COOKIE', auth_cookie);
  httpRequest.send();
}
