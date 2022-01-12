function dopolniModalIzbris(kraj_odhoda, kraj_prihoda, cas_odhoda, id, tabela){ //doponi modal za izbris rezervacije
	document.getElementById("izbrisModalHeader").innerHTML = "<b>Izbris rezervacije:</b> " + kraj_odhoda + " → " + kraj_prihoda + " na dan " + cas_odhoda;
	document.getElementById("izbrisModalBody").innerHTML = "Če želiš izbrisati rezervacijo, potem klikni gumb 'Izbriši'. Tega dejanja ni mogoče razveljaviti.";
	document.getElementById("id_rezervacije").innerHTML = id;
	if (tabela == "rezervacije"){
		document.getElementById("id_rezervacije").innerHTML = id;
	}
	else if (tabela == "prevozi") {
		document.getElementById("id_prevoza").innerHTML = id;
	}
}

function izbrisi(tabela){ //brisemo lahko rezervacije in prevoze

	if (tabela == "rezervacije"){
		id = document.getElementById("id_rezervacije").innerHTML;
	}
	else if (tabela == "prevozi") {
		id = document.getElementById("id_prevoza").innerHTML;
	}

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 204){
        try {
          setTimeout(function (){
            $(".modal").modal("hide");
						if (tabela == "rezervacije"){
							document.getElementById("tablelaRezervacij").innerHTML = ""; //da se ne appenda več kot ena tabela
	            mojeRezervacije(); //ponovno nalozi tabelo
						}
						else if (tabela == "prevozi"){
							document.getElementById("tablelaPonudb").innerHTML = "";
	            mojePonudbe();
						}

          }, 1000);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
    }
  };

  httpRequest.open("DELETE",  "/projekt-api/api/"+tabela+".php?id="+id, true);
	httpRequest.setRequestHeader('AUTH-USER', uporabnisko_ime);
	httpRequest.setRequestHeader('AUTH-COOKIE', auth_cookie);
	httpRequest.send();

}
