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
	var JSONdata = JSON.stringify(data, null, "  ");
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function(){
		// if (this.readyState == 4 && this.status == 201){
		// 	document.getElementById("odgovor").innerHTML="Dodajanje uspelo!";
		// }
		if(this.readyState == 4 && this.status != 201){
      console.log(this.responseText);
			// document.getElementById("odgovor").innerHTML="Dodajanje ni uspelo: "+this.status;
		}
	};

	xmlhttp.open("POST", "/projekt/api/registrirajUporabnika.php", true);
	xmlhttp.send(JSONdata);
}
