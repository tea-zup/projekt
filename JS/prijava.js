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

function prijava(){
  const data = formToJSON(document.getElementById("obrazecPrijava").elements);
  data["tip"] = "prijava";
  if (data["uporabnisko_ime"] == '' || data["geslo"] == ''){
    $("#prijava-prazna-polja").show();
    setTimeout(function (){
      $("#prijava-prazna-polja").hide();
    }, 2000);
  }
  else { //vsa polja so izpolnjena
    var JSONdata = JSON.stringify(data, null, "  ");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200){
				var odgovorJSON = JSON.parse(this.responseText); //daj piškotek v browser
				const d = new Date();
				d.setTime(d.getTime() + (2 * 24 * 60 * 60 * 1000));
				let expires = "expires="+d.toUTCString();
				document.cookie = "auth_cookie=" + odgovorJSON["auth_cookie"] + ";" + expires + ";path=/";
				document.cookie = "uporabnisko_ime=" + data["uporabnisko_ime"] + ";" + expires + ";path=/";
        $("#prijavaGumb").css("background-color", "green");
        $("#prijava-ok-msg").show();
        setTimeout(function (){
          $("#prijavaGumb").css("background-color", "#007bff");
          $("#prijava-ok-msg").hide();
          window.location = 'main.php';
        }, 1000);
      }
      if (this.readyState == 4 && this.status != 200){
        console.log(this.responseText);
        $("#prijavaGumb").css("background-color", "red");
        var msg = (JSON.parse(this.responseText))["error_message"];
        document.getElementById("login-err-alert-text").innerHTML = msg;
        $("#prijava-err-msg").show();
        setTimeout(function (){
          $("#prijavaGumb").css("background-color", "#007bff");
          document.getElementById("login-err-alert-text").innerHTML = '';
          $("#prijava-err-msg").hide();
        }, 2000);
      }
    };

    xmlhttp.open("POST", "/projekt-api/api/uporabniki.php", true);
    xmlhttp.send(JSONdata);
  }

}
