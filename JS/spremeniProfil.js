/**
 * Pridobi podatke iz obrazca in jih vrne v obliki JSON objekta.
 * @param  {HTMLFormControlsCollection} elements
 * @return {Object}
 */
 //DRUGACNA OD DRUGIH VERZIJ TE FUNKCIJE
const formToJSON = elements => [].reduce.call(elements, (data, element) =>
{
	if (element.name != "" && element.value != ""){
		data[element.name] = element.value;
	}
  else {
    data[element.name] = document.getElementsByName(element.name)[0].placeholder;

  }
  return data;
}, {});

function spremeniProfil(){

  const data = formToJSON(document.getElementById("spremeniProfil").elements);
  var JSONdata = JSON.stringify(data, null, "  ");

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 204){
        try {
          // console.log("ok");
          $("#profilShrani").css("background-color", "green");
          setTimeout(function (){
            $("#profilShrani").css("background-color", "#007bff");
            window.location.reload();
          }, 1000);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
    }
  };

  httpRequest.open("PUT",  "/projekt-api/api/uporabniki.php", true);
  httpRequest.send(JSONdata);
}
