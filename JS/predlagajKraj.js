function predlagajKraj(tip){

  var xmlhttp=new XMLHttpRequest();
  xmlhttp.onreadystatechange=function() {
    if (this.readyState == 4 && this.status == 200) {
      // console.log(this.responseText);
      kraji = [];
      var odgovorJSON = JSON.parse(this.responseText);
      select = document.getElementById(tip);
      for (var i = 0; i < odgovorJSON.length ; i++) { //najdi distinct kraje
        if (!kraji.includes(odgovorJSON[i][tip])){
          kraji.push(odgovorJSON[i][tip]);
        }
      }
      kraji.sort(); //abecedni vrstni red
      for (var i = 0; i < kraji.length ; i++) { //v option dodaj select
          var option = document.createElement('option');
          option.text = kraji[i];
          select.add(option);
      }
      $('#' + tip).selectpicker('refresh');
      // $('.selectpicker').selectpicker('refresh'); //druga opcija, vec teh class-ov
    }
  }
  var auth_cookie = extractCookies()["auth_cookie"];
  var uporabnisko_ime = extractCookies()["uporabnisko_ime"];
  xmlhttp.open("GET","/projekt-api/api/prevozi.php?auth_cookie="+auth_cookie+"&uporabnisko_ime="+uporabnisko_ime, true);
  xmlhttp.send();
}
