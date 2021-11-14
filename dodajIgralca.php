<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Igra - Vpis igralca</title>
		<link rel="stylesheet" type="text/css" href="stil.css" />
		<script src="js/dodajIgralca.js"></script>
	</head>
	<body>
		<div class="center">
			<?php include "Meni.html"?>
		
			<form id="obrazec" onsubmit="dodajIgralca(); return false;">
				<label for="vzdevek">Vzdevek:</label><br>
				<input type="text" name="vzdevek" required/> <br>
				
				<label for="geslo">Geslo:</label><br>
				<input type="password" name="geslo" required/> <br>
				
				<label for="ime">Ime:</label><br>
				<input type="text" name="ime" required/> <br>

				<label for="priimek">Priimek:</label><br>
				<input type="text" name="priimek" required/> <br>
				
				<label for="email">Email:</label><br>
				<input type="email" name="email" required/> <br>
				
				<input type="submit" value="Vpiši" />
			</form>
			<div id="odgovor"></div>
		</div>
	</body>
</html>