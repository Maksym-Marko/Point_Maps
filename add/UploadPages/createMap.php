<form method="post" action="add/UploadPages/downloadMap/download.php" enctype='multipart/form-data' class="mx-form_map_download">
	<p>
		<label class='label' >
			<span>Карта в формате: .jpg, .gif, .png. Не больше 1 мб.</span>
		</label>		
	</p>
	<p>
		Название карты: <input type='text' name='nameMap' id='nameMap' />
	</p>
	<p>
		<input type='file' name='upload[]' id='upl' class='input' accept="image/*,image/jpeg,image/jpg,image/png,image/gif">
	</p>

	<input type="hidden" name="date" value="<?php echo time(); ?>"/>
	
	<p>	
		<input type="submit" name="download" id="downloadId" value="Загрузить карту" />
	</p>
</form>
