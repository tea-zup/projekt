/**
 * Pridobi podatke iz obrazca in jih vrne v obliki JSON objekta.
 * @param  {HTMLFormControlsCollection} elements
 * @return {Object}
 */
const formToJSON = elements => [].reduce.call(elements, (data, element) =>
{
	if(element.name!="")
	{
		data[element.name] = element.value;
	}
  return data;
}, {});

function dodajPrevoz(){

  const data = formToJSON(document.getElementById("obrazecDodajPrevoz").elements);
  var JSONdata = JSON.stringify(data, null, "  ");

  if (data["kraj_odhoda"] == '' || data["kraj_prihoda"] == '' || data["cas_odhoda"] == '' ||  data["prosta_mesta"] == '' || data["cena"] == ''){
    $("#dodajPrevoz").css("background-color", "red");
    $("#dodajPrevoz-prazna-polja").show();
    setTimeout(function (){
      $("#dodajPrevoz").css("background-color", "#007bff");
      $("#dodajPrevoz-prazna-polja").hide();
    }, 2000);
  }
  else if (isNaN(data["prosta_mesta"]) == true || isNaN(data["cena"]) == true){
    $("#dodajPrevoz").css("background-color", "red");
    var msg = "Vnesi veljavno število mest naslov ali ceno!";
    document.getElementById("dodajPrevoz-err-text").innerHTML = msg;
    $("#dodajPrevoz-err").show();
    setTimeout(function (){
      $("#dodajPrevoz").css("background-color", "#007bff");
      document.getElementById("dodajPrevoz-err-text").innerHTML = '';
      $("#dodajPrevoz-err").hide();
    }, 2000);
  }

  else {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 201){
          try {
            $("#dodajPrevoz").css("background-color", "green");
            $("#prevoz-ok").show();
            setTimeout(function (){
              $("#dodajPrevoz").css("background-color", "#007bff");
              $("#prevoz-ok").hide();
              $(".modal").modal("hide");
              window.location.reload(); //da se input form pobrise
              document.getElementById("tablelaPonudb").innerHTML = ""; //once again da ne appendaas vec tabel
               mojePonudbe();
            }, 1000);
          }
          catch(e){
            $("#dodajPrevoz").css("background-color", "red");
            setTimeout(function (){
              $("#dodajPrevoz").css("background-color", "#007bff");
              $(".modal").modal("hide");
            }, 1000);
            console.log("Napaka pri razčlenjevanju podatkov " + e);
            return;
          }
      }
    };

    httpRequest.open("POST",  "/projekt/api/prevozi.php", true);
    httpRequest.send(JSONdata);
  }
}
