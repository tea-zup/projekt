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
			console.log(msg);
			document.getElementById("reg-err-alert-text").innerHTML = msg;
			$("#odgovor-err-msg").show();
			setTimeout(function (){
				$("#registracijaGumb").css("background-color", "#007bff");
				document.getElementById("reg-err-alert-text").innerHTML = '';
				$("#odgovor-err-msg").hide();
			}, 2000);
		}
	};

	xmlhttp.open("POST", "/projekt/api/uporabniki.php", true);
	xmlhttp.send(JSONdata);
}
