/* -------------------------------- begin access ------------------------------------- */
var
	addMap = document.getElementById( 'addMap' ),
	access = document.getElementById( 'access' ),
	infoErrorWind = document.getElementById( 'infoError' ),
	fileldWrap = document.getElementById( 'mx-fileld_wrap' ),
	accessWrap = document.getElementById( 'mx-access_wrap' ),
	imgMap = document.getElementById( 'imgMap' );

fileldWrap.style.display = 'none';

// Lile exists
var exs = true;
function fileEx( filePath ){
	ajax.open( 'GET', filePath, false );
	ajax.send( null );	
	if( ajax.status != 200 ){
		// alert( 'File "' + filePath + '", Not Found!' );
		exs = false;
	} else{
		exs = true;
	}
}

function GetAccess(){
	accessVal = access.value;
	accessPass = 'maps/' + accessVal;	
	
	var arr = [ '.jpg', '.png', '.gif' ];
	var infoError = '';
	for( var f = 0; f < arr.length; f++ ){
		fileEx( accessPass + arr[f] );
		if( exs == false ){
			infoError = 'Неверный код!';
		} else{
			imgMap.setAttribute( 'src', accessPass + arr[f] );
			fileldWrap.style.display = 'block';
			accessWrap.style.display = 'none';
			infoError = '';
			break;
		}
	}

	infoErrorWind.innerHTML = infoError;
}

/* -------------------------------- end access ------------------------------------- */


var mapField = document.getElementById( 'mapField' ),
	mxPopupSave = document.getElementsByClassName( 'mx-save_point_wrap' ),
	mxTextSave = document.getElementById( 'MxTextSave' ),
	JSONFile;

/* -------------------------------- begin add methods ------------------------------------- */

var addMethods = {	
	correctPosition: 7
};

// JSON Object
var getJSONObj = {},
	coordLength;

/* -------------------------------- end add methods ------------------------------------- */


/* -------------------------------- begin view -------------------------------------------- */

var view = {

	getFieldMap: function( pointX, pointY, pointId ){	
			
		var inputX = document.getElementById( 'coordinates_x' ),
			inputY = document.getElementById( 'coordinates_y' );

			inputX.value = pointX;
			inputY.value = pointY;

	},

	// Place a button on the map
	setPointInMap: function( pointX, pointY ){
		
		var pointInMap = document.getElementById( 'mxPoint' ),
			pointInMapX = pointInMap.style.left = pointX - addMethods.correctPosition + 'px',
			pointInMapY = pointInMap.style.top = pointY - addMethods.correctPosition + 'px';

	},

	// Save the location of point
	savePointInMap: function(){
		
		mxPopupSave[0].style.display = 'block';

		return{
			poupDisplay: mxPopupSave[0].style.display
		}

	},

	// Create new points
	createNewPoint: function( newPointId, newPointPosX, newPointPosY, newPointDesription ){

		var newPoint = document.createElement( 'div' );
		newPoint.setAttribute( 'class', 'mx-point' );
		newPoint.setAttribute( 'id', newPointId );
		newPoint.style.left = newPointPosX - addMethods.correctPosition + 'px';
		newPoint.style.top = newPointPosY - addMethods.correctPosition + 'px';

		//create title
		var titlePoint = document.createAttribute( 'title' );

		titlePoint.value = newPointDesription;
		newPoint.setAttributeNode( titlePoint );

		mapField.appendChild( newPoint );

	},

	// Cance save
	canceSavePoint: function(){

		// hidden popup
		mxPopupSave[0].style.display = 'none';

		// hidden point	
		var	Point = document.getElementById( 'mxPoint' );
		Point.style.left = '-100px';

		// remove from the JSON
		var dataPointId = 'dataPointId' + coordLength;

		delete getJSONObj.Coordinates[dataPointId];

	},

	// Hidden popup show save button
	hidePopupShowSaveButton: function(){
		mxPopupSave[0].style.display = 'none';
		document.getElementById( 'mxSaveJSON' ).style.display = 'block';
	},

	// Show form and scroll to bottom
	showFormAndScrollBottom: function(){

		formCreateJSON = document.getElementById( 'mx-form_create_json' );
		heightBody = document.body.scrollHeight;

		formCreateJSON.style.display = 'block';
		document.body.scrollTop = heightBody + 100;

		alert( 'Информация сохранена. Теперь вы можете обновить карту' );

	},

	// Clean tetxtarea
	clearTextArea: function(){
		
		mxTextSave.value = '';

	},

	// Reset JSON form
	resetFormJSON: function(){

		formCreateJSON = document.getElementById( 'mx-form_create_json' );
		formCreateJSON.style.display = 'none';

	}		

};

/* -------------------------------- end view -------------------------------------------- */


/* ------------------------------- begin model ------------------------------------------ */

var model = {

	// Get JSONData
	getJSONFile: function( pagePath ){

		ajax.open( 'GET', pagePath, false );
		ajax.send( null );
		if( ajax.status != 200 ){
			alert( 'File "' + pagePath + '", Not Found!' );
		} else{
			JSONFile = ajax.responseText;			
		}

	},

	GetJSONData: function(){

		if( exs == true ){
			model.getJSONFile( 'json/' + access.value + '.json' );
			getJSONObj = JSON.parse( JSONFile );

			// get lengh Coordinates
			coordLength = Object.getOwnPropertyNames( getJSONObj.Coordinates ).length;
					
			return{
				coordLength: coordLength,
				getJSONObj: getJSONObj
			}	
		}

	},

	// Get position point
	getPositionPoint: function( mxMap, event ){

		var blockMap = mxMap.getBoundingClientRect();

		return{
			pointPosX: ( event.clientX - blockMap.left ),
			pointPosY: ( event.clientY - blockMap.top )
		};

	},

	// Push Coordinates In Array
	pushCoordinatesInArray: function( saveX, saveY, descriptionPoint ){

		//var countCoord = leng.coordLength;
		dataPointId = 'dataPointId' + coordLength;
		saveId = 'mxPoint' + coordLength
		getJSONObj.Coordinates[dataPointId] = {
			'id': saveId,
			'PosX': saveX,
			'PosY': saveY,
			'Desription': descriptionPoint
		};

	},

	// Save in JSON
	dataPointsJSON: function(){
		
		var nameFile = document.getElementById( 'nameFile' );
			nameFile.value = getJSONObj.Date;

		var nameMap = document.getElementById( 'nameMap' );
			nameMap.value = getJSONObj.MapName;

		var userEmail = document.getElementById( 'userEmail' );
			userEmail.value = getJSONObj.UserEmail;

		var inputJSONData = document.getElementById( 'mxJSONData' );
			inputJSONData.value = JSON.stringify( getJSONObj );

	}
	
};

/* ------------------------------- end model ------------------------------------------ */


/* --------------------------- begin controller ---------------------------------------- */

var controller = {

	// Get data JSON
	GetJSONDataContr: function(){

		GetAccess();
		setTimeout( function(){
			var leng = model.GetJSONData();

			for( var l=0; l<coordLength; l++ ){
				dataPointId = 'dataPointId' + l
				//console.log( leng.getJSONObj.Coordinates[dataPointId].id );
				newPointId = leng.getJSONObj.Coordinates[dataPointId].id;
				newPointPosX = leng.getJSONObj.Coordinates[dataPointId].PosX;
				newPointPosY = leng.getJSONObj.Coordinates[dataPointId].PosY;
				newPointDesription = leng.getJSONObj.Coordinates[dataPointId].Desription;

				view.createNewPoint( newPointId, newPointPosX, newPointPosY, newPointDesription );
			}
			
		},1000);

	},

	getCoordinatesPoint: function(){

		point = model.getPositionPoint( mapField, event );

		pointX = point.pointPosX;
		pointY = point.pointPosY;
		view.getFieldMap( pointX, pointY );

	},

	// Place a button on the map (CONTR)
	setCoordinatesPointInMap: function(){			

		point = model.getPositionPoint( mapField, event );

		pointX = point.pointPosX;
		pointY = point.pointPosY;

		// set position
		view.setPointInMap( pointX, pointY );

		// call popup
		view.savePointInMap();

	},

	// Push Coordinates In Array Contr
	getAndPushCoordinates: function(){

		point = model.getPositionPoint( mapField, event );
		saveX = point.pointPosX;
		saveY = point.pointPosY;
		descriptionPoint = '';
	
		model.pushCoordinatesInArray( saveX, saveY, descriptionPoint );
		
		//console.log( getJSONObj );

	},

	// Attachment points
	attachmentPoints: function(){

		// push description in array
		if( mxTextSave.value == '' ){
			mxTextSave.value = 'Нет описания';
		}
		dataPointId = 'dataPointId' + coordLength;
		
		getJSONObj.Coordinates[dataPointId].Desription = mxTextSave.value;

		newPointId = getJSONObj.Coordinates[dataPointId].id;
		newPointPosX = getJSONObj.Coordinates[dataPointId].PosX;
		newPointPosY = getJSONObj.Coordinates[dataPointId].PosY;
		newPointDesription = getJSONObj.Coordinates[dataPointId].Desription;

		// create point
		view.createNewPoint( newPointId, newPointPosX, newPointPosY, newPointDesription );

		// hidden popup
		view.hidePopupShowSaveButton();

		// clear textarea
		view.clearTextArea();

		coordLength++;

	}

};

/* ---------------------------- end controller ----------------------------------------- */

function start(){

	addMap.onclick = function(){
		controller.GetJSONDataContr();
	}
	
	// Click on field
	mapField.onclick = function(){

		if( coordLength ){
			controller.getCoordinatesPoint();
			controller.setCoordinatesPointInMap();

			// get and push Coordinates In Array Contr
			controller.getAndPushCoordinates();	
		}		
		
	};			

	// Save and create point
	var enterSave = document.getElementById( 'mxSave' );
	enterSave.onclick = function(){

		controller.attachmentPoints();	

	};

	// Enter press
	document.onkeydown = function( e ){

		var keyC = e.keyCode,
			mxPopupSaveDisplay = getComputedStyle(mxPopupSave[0], null).getPropertyValue( 'display' );

		if( mxPopupSaveDisplay === 'block' ){

			if( keyC === 13 ){

				controller.attachmentPoints();

			}

		}		

	};

	// Cance save	
	var canceSave = document.getElementById( 'mxNoSave' );
	canceSave.onclick = function(){

		view.canceSavePoint();

		// clean tetxtarea
		view.clearTextArea();
		
	};

	// JSON		
		var createJSON = document.getElementById( 'mxSaveJSON' ),
			resetJSON = document.getElementById( 'mxResetJSON' );

		// create JSON data
		createJSON.onclick = function(){

			// create data
			model.dataPointsJSON();

			// show form
			view.showFormAndScrollBottom();

		};

		// reset form		
		resetJSON.onclick = function(){

			view.resetFormJSON();

		};

}

start();