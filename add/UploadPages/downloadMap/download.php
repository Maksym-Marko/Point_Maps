<?php header('Content-Type: text/html; charset=utf-8');

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
	public $userEmail;

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
    		//echo 'Upload';
    	else:
    		exit( 'Произошла ошибка' );
    	endif;	 	
	}

	/* Create JSON */
	public function OpenJSONfile(){

		$this->JSONfile = '../../../json/' . $this->date . '.json';
		
		if( file_exists( $this->JSONfile ) ):

			$generate_file = fopen( $this->JSONfile, 'w' );
			
		endif;

		$this->JSONdata = '{"MapName":"' . $this->nameMap . '","Date":' . $this->date . ',"UserEmail":"' . $this->userEmail . '","Coordinates":{}}';
		$openJSONfile = fopen( $this->JSONfile, 'w+' );
		$addJSONdata = fwrite( $openJSONfile, $this->JSONdata );
		fclose( $openJSONfile );

	}

	public function SendMail(){
		
		$subject = 'Вы загрузили карту на нашем сайте';
		$message = 'Вы загрузили карту на нашем сайте. Карта с названием ' . $this->nameMap . ' будет доступна по адресу <a href="http://PointsMap.com">http://PointsMap.com</a>. <br>
			В поле доступа, введите данный код - ' . $this->date . '.<br>
			Инструкция пользователя, находится на сайте. Успешной работы.
		';

		$headers = 'Content-type:text/html;charset=utf-8' . "\r\n";
		$headers .= 'From: PointsMap <support@PointsMap.com>' . "\r\n";	
		
		mail( $this->userEmail, $subject, $message, $headers );

		echo '<a href="' . $_SERVER['HTTP_REFERER'] . '">Перейти на сайт</a>';
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

	$params->userEmail = $_POST['userEmail'];

	/* Download */
	$params->Download();

	/* Create JSON */
	$params->OpenJSONfile();

	/* Send mail */	
	$params->SendMail();
	
endif;	
