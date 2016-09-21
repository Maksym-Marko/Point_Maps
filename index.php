<?php header('Content-Type: text/html; charset=utf-8'); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Points on the map</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	<body>

		<div class="mx-map_wrap" id="mapField">
			<img src="maps/map1.jpg" alt="">
			<div class="mx-point" id="mxPoint"></div>
		</div>

		<div class="mx-points_wrap">
			<div class="mx-point_1">
				<div>
					<span>X</span>
					<input type="text" id="coordinates_x" value="" disabled>
				</div>
				<div>
					<span>Y</span>
					<input type="text" id="coordinates_y" value="" disabled>
				</div>
			</div>
		</div>
			
		<span id="mxSaveJSON">Сохранить</span>

		<form method="post" action="createjson.php" id="mx-form_create_json">
			<input type="hidden" name="jsondata" id="mxJSONData" value="" /> <br>
			<input type="submit" name="createjson" id="mxCreateJSONFile" value="Создать JSON-файл" />
			<input type="reset" id="mxResetJSON" value="Отменить" />
		</form>

		<div class="mx-save_point_wrap">
			<div class="mx-save_point">
				<h3>Сохранить данную точку?</h3>
				<textarea id="MxTextSave" placeholder="Введите описание данной точки"></textarea>
				<div class="mx-save_buttons">
					<span id="mxNoSave">Нет</span>
					<span id="mxSave">Да</span>
				</div>			
			</div>
		</div>		

		<script src="PointsMap.js"></script>

	</body>
</html>