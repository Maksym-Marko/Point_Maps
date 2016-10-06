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

window.onload = function(){
	include( 'add/Navigation/nav.js' );
}