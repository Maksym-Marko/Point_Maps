var e,
	point,
	pointPosX,
	pointPosY,
	pointX,
	pointY,
	correctPosition = 7,
	arrayPointers = [],
	createNewId,
	saveId,
	newPoint,
	newPointId,
	newPointPosX,
	newPointPosY,
	enterSave = document.getElementById( 'mxSave' ),
	mapField = document.getElementById( 'mapField' ),
	mxPopupSave = document.getElementsByClassName( 'mx-save_point_wrap' ),
	canceSave = document.getElementById( 'mxNoSave' );

/* -------------------------------- begin view -------------------------------------------- */

var view = {

	getFieldMap: function( pointX, pointY ){	
			
		var inputX = document.getElementById( 'coordinates_x' ),
		inputY = document.getElementById( 'coordinates_y' );

		inputX.value = pointX;
		inputY.value = pointY;

	},

	// Place a button on the map
	setPointInMap: function( pointX, pointY ){
		
		var pointInMap = document.getElementById( 'mxPoint' ),
			pointInMapX = pointInMap.style.left = pointX - correctPosition + 'px',
			pointInMapY = pointInMap.style.top = pointY - correctPosition + 'px';

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

		newPoint = document.createElement( 'div' );
		newPoint.setAttribute( 'class', 'mx-point' );
		newPoint.setAttribute( 'id', newPointId );
		newPoint.style.left = newPointPosX - correctPosition + 'px';
		newPoint.style.top = newPointPosY - correctPosition + 'px';
		mapField.appendChild( newPoint );

	},

	// Cance save
	canceSavePoint: function(){

		// hidden popup
		mxPopupSave[0].style.display = 'none';

		// remove from the array
		arrayPointers.pop();

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

		var numberId = arrayPointers.length;
			
		return{				
			saveId: ('mxPoint' + numberId)
		};

	},

	// push Coordinates In Array
	pushCoordinatesInArray: function( saveId, saveX, saveY ){

		var setArray = [saveId, saveX, saveY];

		arrayPointers.push(setArray);		

	}
	
};

/* ------------------------------- end model ------------------------------------------ */


/* --------------------------- begin controller ---------------------------------------- */

var controller = {

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

		var getNumberFromArray = arrayPointers.length;
		getNumberFromArray -= 1;

		newPointId = arrayPointers[getNumberFromArray][0];
		newPointPosX = arrayPointers[getNumberFromArray][1];
		newPointPosY = arrayPointers[getNumberFromArray][2];

		view.createNewPoint( newPointId, newPointPosX, newPointPosY );

		// hidden popup
		mxPopupSave[0].style.display = 'none';

	}

};

/* ---------------------------- end controller ----------------------------------------- */


/* -------------------- anonymous initialize function ------------------------------------ */

( function(){

	var start = {

		init: function(){

			this.main();
			this.control();
			this.event();

		},
		main: function(){
			//options
		},
		control: function(){
			//controllers
		},
		event: function(){

			// click on field
			mapField.onclick = function(){

				controller.getCoordinatesPoint();
				controller.setCoordinatesPointInMap();

				// get and push Coordinates In Array Contr
				controller.getAndPushCoordinates();	
				
			};			

			// Save and create point
			enterSave.onclick = function(){

				controller.attachmentPoints();

			};

			// Cance save
			canceSave.onclick = function(){

				view.canceSavePoint();
				
			}	

		}
	};

	start.init();

} )();

/* -------------------- anonymous initialize function ------------------------------------ */