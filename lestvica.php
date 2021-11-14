<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Igra - Lestvica</title>
		<link rel="stylesheet" type="text/css" href="stil.css" />

	</head>
	<body>
		<div class="center">
			<?php include "Meni.html"?>

			<form id="obrazec">
				<label for="tezavnost">Izberite težavnost:</label>
				<select name="tezavnost">
					<option value="1">Lahka</option>
					<option value="2">Srednja</option>
					<option value="3">Težka</option>
				</select> 
				<input type="submit" value="OK" />
			</form>
			<table id="tabela"></table>
			
			<div id="odgovor"></div>
		</div>
	</body>
</html>