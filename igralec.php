<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Igra - Podatki igralca</title>
		<link rel="stylesheet" type="text/css" href="stil.css" />

	</head>
	<body>
		<div class="center">
			<?php include "Meni.html"?>

			<form id="obrazec">
				<label for="vzdevek">Vzdevek:</label>
				<input type="text" name="vzdevek" required />
				<input type="submit" value="Prikaži" />
			</form>
			
			<div id="odgovor"></div>
		</div>
	</body>
</html>