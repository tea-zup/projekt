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

function registracija(){
	const data = formToJSON(document.getElementById("obrazecRegistracija").elements);
	data["tip"] = "registracija";
	var email_re = /\S+@\S+\.\S+/;
	if (data["uporabnisko_ime"] == '' || data["geslo"] == '' || data["ime"] == '' ||  data["priimek"] == '' || data["email"] == ''){
    $("#registracija-prazna-polja").show();
    setTimeout(function (){
      $("#registracija-prazna-polja").hide();
    }, 2000);
  }
	else if (email_re.test(data["email"]) == false) {
		$("#registracijaGumb").css("background-color", "red");
		var msg = "Vnesi veljaven email naslov!";
		document.getElementById("reg-err-alert-text").innerHTML = msg;
		$("#odgovor-err-msg").show();
		setTimeout(function (){
			$("#registracijaGumb").css("background-color", "#007bff");
			document.getElementById("reg-err-alert-text").innerHTML = '';
			$("#odgovor-err-msg").hide();
		}, 2000);
	}
	else {  //ni praznih polj
		var JSONdata = JSON.stringify(data, null, "  ");

		var xmlhttp = new XMLHttpRequest();

		xmlhttp.onreadystatechange = function(){
			if (this.readyState == 4 && this.status == 201){
				$("#registracijaGumb").css("background-color", "green");
				$("#odgovor-ok-msg").show();
				setTimeout(function (){
					$("#registracijaGumb").css("background-color", "#007bff");
					$("#odgovor-ok-msg").hide();
					window.location = 'prijava.php';
				}, 1000);
			}
			if(this.readyState == 4 && this.status != 201){
				$("#registracijaGumb").css("background-color", "red");
				var msg = (JSON.parse(this.responseText))["error_message"];
				document.getElementById("reg-err-alert-text").innerHTML = msg;
				$("#odgovor-err-msg").show();
				setTimeout(function (){
					$("#registracijaGumb").css("background-color", "#007bff");
					document.getElementById("reg-err-alert-text").innerHTML = '';
					$("#odgovor-err-msg").hide();
				}, 2000);
			}
		};

		xmlhttp.open("POST", "/projekt-api/api/uporabniki.php", true);
		xmlhttp.send(JSONdata);
	}

}
