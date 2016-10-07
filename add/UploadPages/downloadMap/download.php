<?php header('Content-Type: text/html; charset=utf-8'); ?>
<?php
class DownloadMap{

	public $date;
	public $nameMap;
	public $file;
	public $fileType;
	public $fileSize;
	public $tmpFilePath;
	public $uploadPath;
	public $dir;
	public $newNameFile;
	public $JSONfile;
	public $JSONdata;

	/* Validator */
	public function Validator(){

		// empty value
		if( empty( $this->nameMap ) || empty( $this->file ) ):
			if( empty( $this->nameMap ) ) echo 'Введите название карты' . "<br>";
			if( empty( $this->file ) ) echo 'Выберети карту';				
			exit();
		endif;

		// type file
		if( $this->fileType == 'image/gif' ):
			$this->newNameFile = $this->date . '.gif';
		elseif(  $this->fileType == 'image/jpeg'  ):
			$this->newNameFile = $this->date . '.jpg';
		elseif(  $this->fileType == 'image/png'  ):
			$this->newNameFile = $this->date . '.png';
		else:
			exit( 'Запрещенный тип файла!' );
		endif;	

		// size file
		if( $this->fileSize > 1157390 ):
			exit( 'Файл больше 1 мб!' );
		endif;

	}

	/* Download */
	public function Download(){			
		$this->Validator();

		$this->uploadPath = $this->dir . $this->newNameFile;
    	$UpL = move_uploaded_file( $this->tmpFilePath, $this->uploadPath );

    	if( $UpL == true ):
    		echo 'Upload';
    	endif;	 	
	}

	/* Create JSON */
	public function InspectionFile(){

		$this->JSONfile = '../../../json/' . $this->date . '.json';
		
		if( file_exists( $this->JSONfile ) ):

			$generate_file = fopen( $this->JSONfile, 'w' );
			
		endif;

	}

	public function OpenJSONfile(){

		$this->InspectionFile();
		$this->JSONdata = '{"MapName":"' . $this->nameMap . '","Date":' . $this->date . ',"Coordinates":{}}';
		$openJSONfile = fopen( $this->JSONfile, 'w+' );
		$addJSONdata = fwrite( $openJSONfile, $this->JSONdata );
		fclose( $openJSONfile );

	}

}

if( isset( $_POST['download'] ) ):

	$params = new DownloadMap();

	$params->dir = '../../../maps/';
	$params->file = $_FILES['upload']['name'][0];
	$params->fileType = strtolower( $_FILES['upload']['type'][0] );
	$params->fileSize = $_FILES['upload']['size'][0];
	$params->tmpFilePath = $_FILES['upload']['tmp_name'][0];

	$params->date = $_POST['date'];
	$params->nameMap = $_POST['nameMap'];

	/* Download */
	$params->Download();

	/* Create JSON */
	$params->OpenJSONfile();
	
endif;	
