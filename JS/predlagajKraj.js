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

  xmlhttp.open("GET","/projekt-api/api/prevozi.php", true);
  xmlhttp.setRequestHeader('AUTH-USER', uporabnisko_ime);
  xmlhttp.setRequestHeader('AUTH-COOKIE', auth_cookie);
  xmlhttp.send();
}
