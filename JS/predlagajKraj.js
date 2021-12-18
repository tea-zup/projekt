function predlagajKraj(tip){

  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      //console.log(this.responseText);
      var odgovorJSON = JSON.parse(this.responseText);
      select = document.getElementById(tip);
      for (var i = 0; i < odgovorJSON.length ; i++) {
        var option = document.createElement('option');
        option.text = odgovorJSON[i][tip];
        select.add(option);
      }
      //$('#kraj_odhoda').selectpicker('refresh'); //druga opcija
      $('.selectpicker').selectpicker('refresh');
    }
  }
  xmlhttp.open("GET","/projekt/api/prevozi.php?tip=" + tip, true);
  xmlhttp.send();
}
