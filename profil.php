<head>
  <script src="js/naloziProfil.js"></script>
  <script src="js/spremeniProfil.js"></script>
</head>
<?php include "head.php"?>
<body onload="naloziProfil()">
<div class="center" id='profil'>
  <?php include "navbar.php"?>
  <div class="container-fluid" style="text-align: center;margin-left:auto; margin-right:auto; width:60%;">
    <br>
    <div class="row mb-3" style="max-height:30%">
      <div class="col-sm-12"><img src="img/default_profile_pic.jpg" style="max-width:60%;max-height:60%; object-fit: contain;"></div>
    </div>
    <div class="row mb-3">
      <div class="col-sm-12"><h4 id="profil_ui"></h4></div>
    </div>
    <form id="spremeniProfil">
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-right">Ime:</label>
        <div class="col-sm-8">
          <input name="ime" type="text" class="form-control" id="profil_ime">
        </div>
        <div class="col-sm-2"></div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-right">Priimek:</label>
        <div class="col-sm-8">
          <input name="priimek" type="text" class="form-control" id="profil_priimek">
        </div>
        <div class="col-sm-2"></div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-right">Email:</label>
        <div class="col-sm-8">
          <input name="email" type="text" class="form-control" id="profil_email">
        </div>
        <div class="col-sm-2"></div>
      </div>
      <div class="row mb-3">
        <label class="col-sm-2 col-form-label text-right">Geslo:</label>
        <div class="col-sm-8">
          <input name="geslo" type="password" class="form-control" id="profil_geslo">
        </div>
        <div class="col-sm-2"></div>
      </div>
    </form>
    <div class="row mb-3" style="text-align: center;">
      <div class="col-sm-12">
        <button type="button" class="btn btn-dark" id="profilShrani" onclick="spremeniProfil()">Shrani</button>
        <button type="button" class="btn btn-outline-dark" id="ProfilPreklici" onclick="window.location.reload();">Prekliči</button>
      </div>
    </div>

  </div>
</div>
