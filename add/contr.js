/* Ajax */
var ajax = new XMLHttpRequest();

// Include file
function include( jsPath ){
	ajax.open( 'GET', jsPath, false );
	ajax.send( null );
	if( ajax.status != 200 ){
		alert( 'File "' + jsPath + '", Not Found!' );
	} else{
		eval( ajax.responseText  );
	}
}

// Include js for file
function includeJS( boll, pageJsPath ){
	if( boll == true ){
		setTimeout( function(){
			ajax.open( 'GET', pageJsPath, false );
			ajax.send( null );
			if( ajax.status != 200 ){
				alert( 'File "' + pageJsPath + '", Not Found!' );
			} else{
				eval( ajax.responseText );
			}
		},1000 );
	} else{
		return;
	}	
}

/* Include JS for page */
window.onload = function(){
	include( 'add/Navigation/nav.js' );
}