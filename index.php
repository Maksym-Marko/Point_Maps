<?php header('Content-Type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Points on the map</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>
		<div id="mx-download-page" style="display: none;">DOWNLOAD...</div>
		
		<div id="mx-upload_nav">
			<nav id="mx-navigation">
				<ul>
					<li>
						<a href="#" id="startPage">Главная</a>
					</li>
					<li>
						<a href="#" id="createMap">Создать карту</a>
					</li>
					<li>
						<a href="#" id="readMap">Прочитать карту</a>
					</li>
					<li>
						<a href="#" id="instructions">Инструкция</a>
					</li>
				</ul>
			</nav>
		</div>

		<!-- add -->
		<div id="mx-upload_area"></div>
		<!-- add -->	

		<script src="add/contr.js"></script>		

	</body>
</html>