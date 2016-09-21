<?php

class CreateJSON{

	function InspectionFile( $JSONfile ){

		if( !file_exists( $JSONfile ) ):

			$generate_file = fopen( $JSONfile, 'w' );

		endif;

	}

	function OpenJSONfile( $JSONfile, $JSONdata ){

		$this->JSONdata = $JSONdata;

		$openJSONfile = fopen( $JSONfile, 'a' );
		$addJSONdata = fwrite( $openJSONfile, $JSONdata );
		fclose( $openJSONfile );

	}

}

$createJSONdata = new CreateJSON;

$JSONfile = 'JSON/data.json';
$JSONdata = '';

$createJSONdata->InspectionFile( $JSONfile );
$createJSONdata->OpenJSONfile( $JSONfile, $JSONdata );

