function pretvoriDatumVString(dt){ //lep zapis datuma, npr. petek 23.11.2021 ob 14:00
	const weekday = ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"];
	dan_tedna_date = moment(dt, "DD-MM-YYYY").toDate();
	dan_tedna = weekday[dan_tedna_date.getDay()];
	dan = moment(dan_tedna_date).format('DD.MM.YYYY');
	cas = dt.split(" ")[1];
	var datum_lep = dan_tedna + ", " + dan + ", ob " + cas + ".";
	return datum_lep;
}
