var ajax = new XMLHttpRequest();

function include( jsPath ) {
	ajax.open( 'GET', jsPath, false );
	ajax.send( null );
	if( ajax.status != 200 ){
		alert( 'File "' + jsPath + '", Not Found!' );
	} else{
		eval( ajax.responseText  );
	}
}

//include( 'add/CreatePoints/PointsMap.js' );

window.onload = function(){

	// opload area
	var uploadArea = document.getElementById( 'mx-upload_area' );
	// navigation erea
	var areaNav = document.getElementById( 'mx-upload_nav' );
	// nav
	var navig = document.getElementById( 'mx-navigation' );

	// func upload
	var upPage;
	function UploadPage( pagePath ) {
		ajax.open( 'GET', pagePath, false );
		ajax.send( null );
		if( ajax.status != 200 ){
			alert( 'File "' + pagePath + '", Not Found!' );
		} else{
			var dowlPage = document.getElementById( 'mx-download-page' );
			dowlPage.style.display = 'block';
			setTimeout( function(){
				dowlPage.style.display = 'none';
			}, 500 );
				upPage = ajax.responseText;
			
		}
	}

	function ChangePage( pageUpload ){
		opacity = 1;
		if( navig.className !== 'mx-navigation_active' ){
			intervalOpacity = setInterval( function(){
				navig.style.opacity = opacity;
				opacity -= 0.2;
				if( opacity <= 0 ){
					clearInterval( intervalOpacity );
					opacity = 1;
					navig.className = 'mx-navigation_active';							
					navig.style.opacity = opacity;
				}
			},100 );
		}

		varPageUpload = document.getElementById( pageUpload );
		if( varPageUpload.className !== 'activeLink' ){
			UploadPage( 'add/UploadPages/' + pageUpload + '.php' );

			uploadArea.innerHTML = '';
			setTimeout( function(){
				uploadArea.innerHTML = upPage;
			},1000 );
			
			navLink = areaNav.querySelectorAll( 'a' );
			for( var a = 0; a < navLink.length; a++ ){
				navLink[a].className = '';
			}
			
			varPageUpload.className = 'activeLink';
		}					
	}

	// upload home
	var UploadstartPage = document.getElementById( 'startPage' );	
	UploadstartPage.onclick = function(){
		ChangePage( 'startPage' );
		return false;
	}

	// upload create map page
	var UploadcreateMap = document.getElementById( 'createMap' );
	UploadcreateMap.onclick = function(){
		ChangePage( 'createMap' );					
		return false;				
	}

	// upload read map page
	var UploadreadMap = document.getElementById( 'readMap' );
	UploadreadMap.onclick = function(){
		ChangePage( 'readMap' );					
		return false;				
	}
	
	// upload instructions
	var Uploadinstructions = document.getElementById( 'instructions' );
	Uploadinstructions.onclick = function(){
		ChangePage( 'instructions' );					
		return false;				
	}

}