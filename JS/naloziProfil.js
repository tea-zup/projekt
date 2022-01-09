function naloziProfil(){

  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
        try {
          var odgovorJSON = JSON.parse(this.responseText);
          document.getElementById('profil_ui').innerHTML = odgovorJSON["uporabnisko_ime"];
          document.getElementsByName('ime')[0].placeholder = odgovorJSON["ime"];
          document.getElementsByName('priimek')[0].placeholder = odgovorJSON["priimek"];
          document.getElementsByName('email')[0].placeholder = odgovorJSON["email"];
          document.getElementsByName('geslo')[0].placeholder = "*********";
          // console.log(odgovorJSON);
        }
        catch(e){
          console.log("Napaka pri razčlenjevanju podatkov " + e);
          return;
        }
    }
  };
  var currentUser = "currentUser";
  httpRequest.open("GET",  "/projekt-api/api/uporabniki.php?uporabnisko_ime=" + currentUser, true);
  httpRequest.send();
}
