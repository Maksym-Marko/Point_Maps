var mapField = document.getElementById( 'mapField' ),
	mxPopupSave = document.getElementsByClassName( 'mx-save_point_wrap' );


/* -------------------------------- begin add methods ------------------------------------- */

var addMethods = {	
	arrayPointers: [],
	correctPosition: 7
}

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
	createNewPoint: function( newPointId, newPointPosX, newPointPosY ){

		var newPoint = document.createElement( 'div' );
		newPoint.setAttribute( 'class', 'mx-point' );
		newPoint.setAttribute( 'id', newPointId );
		newPoint.style.left = newPointPosX - addMethods.correctPosition + 'px';
		newPoint.style.top = newPointPosY - addMethods.correctPosition + 'px';
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

	}

};

/* -------------------------------- end view -------------------------------------------- */


/* ------------------------------- begin model ------------------------------------------ */

var model = {

	// Get position point
	getPositionPoint: function( mxMap, event ){

		var blockMap = mxMap.getBoundingClientRect();

		return{
			pointPosX: ( event.clientX - blockMap.left ),
			pointPosY: ( event.clientY - blockMap.top )
		};

	},

	// Create id
	createIdFromPoint: function(){

		var numberId = addMethods.arrayPointers.length;
			
		return{				
			saveId: ('mxPoint' + numberId)
		};

	},

	// push Coordinates In Array
	pushCoordinatesInArray: function( saveId, saveX, saveY ){

		var setArray = [saveId, saveX, saveY];

		addMethods.arrayPointers.push(setArray);		

	}
	
};

/* ------------------------------- end model ------------------------------------------ */


/* --------------------------- begin controller ---------------------------------------- */

var controller = {

	getCoordinatesPoint: function(){

		point = model.getPositionPoint( mapField, event );

		pointX = point.pointPosX;
		pointY = point.pointPosY;
		pointId = '111';
		view.getFieldMap( pointX, pointY, pointId );

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

	// push Coordinates In Array Contr
	getAndPushCoordinates: function(){

		point = model.getPositionPoint( mapField, event );
		saveX = point.pointPosX;
		saveY = point.pointPosY;

		createNewId = model.createIdFromPoint();
		saveId = createNewId.saveId;
		model.pushCoordinatesInArray( saveId, saveX, saveY );

	},

	// attachment points
	attachmentPoints: function(){

		var getNumberFromArray = addMethods.arrayPointers.length;
		getNumberFromArray -= 1;

		newPointId = addMethods.arrayPointers[getNumberFromArray][0];
		newPointPosX = addMethods.arrayPointers[getNumberFromArray][1];
		newPointPosY = addMethods.arrayPointers[getNumberFromArray][2];

		view.createNewPoint( newPointId, newPointPosX, newPointPosY );

		// hidden popup
		mxPopupSave[0].style.display = 'none';

	}

};

/* ---------------------------- end controller ----------------------------------------- */


function start(){
	
	// click on field
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

	// Cance save	
	var canceSave = document.getElementById( 'mxNoSave' );
	canceSave.onclick = function(){

		view.canceSavePoint();
		
	};
}

start();