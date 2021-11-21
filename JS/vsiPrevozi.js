function vsiPrevozi(){

	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function(){
		if (this.readyState == 4 && this.status == 200){
      document.getElementById("tablelaPrevozov").innerHTML = this.responseText;
		}
	};

	httpRequest.open("GET",  "/projekt/api/prevozi.php", true);
	httpRequest.send();

}
