<?php
class DownloadMap{

	public $dir;
	public $files;

	public function InspectionFile(){
		$this->files = scandir( $this->dir );
		if( count( $this->files ) > 0 ){
			for( $i = 0; $i < count( $this->files ); $i++ ){

				if( $this->files[$i] !== '.' && $this->files[$i] !== ".." ){

				}
			}
			echo $this->dir;
		}
		else{			
			echo 'No file';
		}
		
		
	}
}

$downClass = new DownloadMap();
$downClass->dir = '../../maps/';
$downClass->InspectionFile();

?>
<form method="post" action="" enctype='multipart/form-data' class="mx-form_map_download">
	<p>
		<label class='label' >
			<span>Карта в формате: .jpg, .gif, .png.</span>
		</label>
		<br>
		<p align="center"><input type='file' name='upload[]' id='upl' class='input' multiple accept="image/*,image/jpeg,image/jpg,image/png,image/gif" size="5"></p>
	</p>

	<input type="hidden" name="date" value="<?php echo time(); ?>"/>
	
	<p>	
		<input type="submit" name="add" value="Загрузить карту" />
	</p>
</form>