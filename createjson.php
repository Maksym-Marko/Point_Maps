<?php
header('Content-Type: text/html; charset=utf-8');

class CreateJSON{

	public $nameMap;
	public $accessJSON;
	public $userEmail;

	public function InspectionFile( $JSONfile ){

		if( file_exists( $JSONfile ) ):

			$generate_file = fopen( $JSONfile, 'w' );

			
		endif;

	}

	public function OpenJSONfile( $JSONfile, $JSONdata ){

		$openJSONfile = fopen( $JSONfile, 'w+' );
		$addJSONdata = fwrite( $openJSONfile, $JSONdata );
		fclose( $openJSONfile );

	}

	public function SendMail(){
		
		$subject = 'Карта обновлена';
		$message = 'Ваша карта с названием "' . $this->nameMap . '" обновлена. Вы можете отправить этот код - "' . $this->accessJSON . '" другу, и он сможет посмотреть на места отмеченые Вами на нашем сайте, в разделе <a href="http://PointsMap.com">"Прочитать карту"</a>.<br>
			Инструкция пользователя, находится на сайте.<br>
			Успешной работы.
		';

		$headers = 'Content-type:text/html;charset=utf-8' . "\r\n";
		$headers .= 'From: PointsMap <support@PointsMap.com>' . "\r\n";	
		
		mail( $this->userEmail, $subject, $message, $headers );

	}

} ?>

<!DOCTYPE html>
<html>
	<head>
		<title>Create json</title>
	</head>
	<body>

		<?php
		if( isset( $_POST['createjson'] ) ):

			$JSONfile = 'json/' . $_POST['nameFile'] . '.json';
			$JSONdata = $_POST['jsondata'];

			$createJSONdata = new CreateJSON;

			$createJSONdata->nameMap = $_POST['nameMap'];
			$createJSONdata->accessJSON = $_POST['nameFile'];
			$createJSONdata->userEmail = $_POST['userEmail'];

			$createJSONdata->InspectionFile( $JSONfile );
			$createJSONdata->OpenJSONfile( $JSONfile, $JSONdata );

			$createJSONdata->SendMail();

			echo '<h3>Карта обновлена. Вы можете отправить этот код - "' . $_POST['nameFile'] . '" другу, и он сможет посмотреть на места отмеченые Вами на нашем сайте, в разделе "Прочитать карту".</h3>';

			echo '<a href="' . $_SERVER['HTTP_REFERER'] . '">Перейти на сайт</a>';

		endif;
		?>

	</body>
</html>