/* -------------------------------- begin access ------------------------------------- */
var
	addMap = document.getElementById( 'addMap' ),
	access = document.getElementById( 'access' ),
	infoErrorWind = document.getElementById( 'infoError' ),
	fileldWrap = document.getElementById( 'mx-fileld_wrap' ),
	accessWrap = document.getElementById( 'mx-access_wrap' );
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
		//console.log( accessPass + arr[f] );
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
	arrayPointers: [],
	correctPosition: 7
};

var JSONData = {};

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

		// remove from the array
		addMethods.arrayPointers.pop();

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

		alert( 'Информация преобразована в JSON-формат. Теперь вы можете создать файл JSON' );

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
			//console.log( coordLength );		
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

	// Create id for point
	createIdFromPoint: function(){

		var numberId = addMethods.arrayPointers.length;
			
		return{				
			saveId: ('mxPoint' + numberId)
		};

	},

	// Push Coordinates In Array
	pushCoordinatesInArray: function( saveId, saveX, saveY, descriptionPoint ){

		var setArray = [saveId, saveX, saveY, descriptionPoint];

		addMethods.arrayPointers.push(setArray);		

	},

	// Save in JSON
	dataPointsJSON: function(){

		var arrayPointersData = addMethods.arrayPointers;

		for( var i = 0; i < arrayPointersData.length; i++ ){

			idPoint = arrayPointersData[i][0];
			PosXPoint = arrayPointersData[i][1];
			PosYPoint = arrayPointersData[i][2];
			DesriptionPoint = arrayPointersData[i][3];

			dataPointId = 'dataPointId' + i;
			JSONData[dataPointId] = { 'id': idPoint, 'PosX': PosXPoint, 'PosY': PosYPoint, 'Desription': DesriptionPoint };
		}

		var inputJSONData = document.getElementById( 'mxJSONData' );
			inputJSONData.value = JSON.stringify(JSONData);

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

			for( var l=0; l<leng.coordLength; l++ ){
				dataPointId = 'dataPointId' + l
				//console.log( leng.getJSONObj.Coordinates[dataPointId].id );
				newPointId = leng.getJSONObj.Coordinates[dataPointId].id;
				newPointPosX = leng.getJSONObj.Coordinates[dataPointId].PosX;
				newPointPosY = leng.getJSONObj.Coordinates[dataPointId].PosY;
				newPointDesription = leng.getJSONObj.Coordinates[dataPointId].Desription;

				view.createNewPoint( newPointId, newPointPosX, newPointPosY, newPointDesription );
			}

			//console.log( leng.coordLength );	
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

		createNewId = model.createIdFromPoint();
		saveId = createNewId.saveId;
		descriptionPoint = '';
	
		model.pushCoordinatesInArray( saveId, saveX, saveY, descriptionPoint );

	},

	// Attachment points
	attachmentPoints: function(){

		var getNumberFromArray = addMethods.arrayPointers.length;
		getNumberFromArray -= 1;

		// push description in array
		if( mxTextSave.value == '' ){
			mxTextSave.value = 'Нет описания';
		}
		addMethods.arrayPointers[getNumberFromArray][3] = mxTextSave.value;

		// get from array and set in element attribute
		newPointId = addMethods.arrayPointers[getNumberFromArray][0];
		newPointPosX = addMethods.arrayPointers[getNumberFromArray][1];
		newPointPosY = addMethods.arrayPointers[getNumberFromArray][2];
		newPointDesription = addMethods.arrayPointers[getNumberFromArray][3];

		// create point
		view.createNewPoint( newPointId, newPointPosX, newPointPosY, newPointDesription );

		// hidden popup
		view.hidePopupShowSaveButton();

		// clear textarea
		view.clearTextArea();

	}

};

/* ---------------------------- end controller ----------------------------------------- */

function start(){

	addMap.onclick = function(){
		controller.GetJSONDataContr();
	}
	
	// Click on field
	mapField.onclick = function(){

		controller.getCoordinatesPoint();
		controller.setCoordinatesPointInMap();

		// get and push Coordinates In Array Contr
		controller.getAndPushCoordinates();	
		
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