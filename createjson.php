<?php
header('Content-Type: text/html; charset=utf-8');

class CreateJSON{

	function InspectionFile( $JSONfile ){

		if( file_exists( $JSONfile ) ):

			$generate_file = fopen( $JSONfile, 'w' );

			
		endif;

	}

	function OpenJSONfile( $JSONfile, $JSONdata ){

		$openJSONfile = fopen( $JSONfile, 'w+' );
		$addJSONdata = fwrite( $openJSONfile, $JSONdata );
		fclose( $openJSONfile );

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

			$JSONfile = 'json/data.json';
			$JSONdata = $_POST['jsondata'];

			$createJSONdata = new CreateJSON;

			$createJSONdata->InspectionFile( $JSONfile );
			$createJSONdata->OpenJSONfile( $JSONfile, $JSONdata );

			echo '<h1>Файл JSON создано. Расположение: "' . $JSONfile . '". ВНИМАНИЕ! При следующим сохранении, файл будет перезаписан.</h1>';

			echo "
				<script>
					window.onload = function(){
						setTimeout( function(){ window.location.href = 'index.php'; }, 5000 );
					};
				</script>
			";

		endif;
		?>

	</body>
</html>