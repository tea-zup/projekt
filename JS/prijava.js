// /**
//  * Pridobi podatke iz obrazca in jih vrne v obliki JSON objekta.
//  * @param  {HTMLFormControlsCollection} elements  Elementi obrazca
//  * @return {Object}                               Object literal
//  */
// const formToJSON = elements => [].reduce.call(elements, (data, element) =>
// {
// 	if(element.name!="")
// 	{
// 		data[element.name] = element.value;
// 	}
//   return data;
// }, {});
//
//
// function prijava() {
// 	const data = formToJSON(document.getElementById("obrazec").elements);	// vsebino obrazca pretvorimo v objekt
// 	var JSONdata = JSON.stringify(data, null, "  ");						// objekt pretvorimo v znakovni niz v formatu JSON
//   console.log(JSONdata);
// 	var xmlhttp = new XMLHttpRequest();
//   if (this.readyState == 4 && this.status == 201){					// zahteva je bila uspešno poslana, prišel je odgovor 201
//     console.log(this.responseText);
//   }
// }
