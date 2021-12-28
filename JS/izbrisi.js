function dopolniModalIzbris(kraj_odhoda, kraj_prihoda, cas_odhoda, id){ //doponi modal za izbris rezervacije
	document.getElementById("izbrisModalHeader").innerHTML = "<b>Izbris rezervacije:</b> " + kraj_odhoda + " → " + kraj_prihoda + " na dan " + cas_odhoda;
	document.getElementById("izbrisModalBody").innerHTML = "Če želiš izbrisati rezervacijo, potem klikni gumb 'Izbriši'. Tega dejanja ni mogoče razveljaviti.";
	document.getElementById("id_rezervacije").innerHTML = id;
}

function izbrisi(tabela){

  id = document.getElementById("id_rezervacije").innerHTML;

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){

    if (this.readyState == 4 && this.status == 204){
        try {
          setTimeout(function (){
            $(".modal").modal("hide");
            document.getElementById("tablelaRezervacij").innerHTML = ""; //da se ne appenda več kot ena tabela
            mojeRezervacije(); //ponovno nalozi tabelo
          }, 1000);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
    }
  };

  httpRequest.open("DELETE",  "/projekt/api/"+tabela+".php?id="+id, true);
  httpRequest.send();

}
