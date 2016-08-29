var e,
	point,
	pointPosX,
	pointPosY,
	pointX,
	pointY,
	correctPosition = 7,
	mapField = document.getElementById( 'mapField' );

/* -------------------------------- begin view -------------------------------------------- */

var view = {	

	getFieldMap: function( pointX, pointY ){	
			
		var inputX = document.getElementById( 'coordinates_x' ),
		inputY = document.getElementById( 'coordinates_y' );

		inputX.value = pointX;
		inputY.value = pointY;

	},

	// place a button on the map
	setPointInMap: function( pointX, pointY ){
		
		var pointInMap = document.getElementById( 'mxPoint' ),
			pointInMapX = pointInMap.style.left = pointX - correctPosition + 'px',
			pointInMapY = pointInMap.style.top = pointY - correctPosition + 'px';

	}

};

/* -------------------------------- end view -------------------------------------------- */


/* ------------------------------- begin model ------------------------------------------ */

var model = {

	getPositionPoint: function( mxMap, event ){

		var blockMap = mxMap.getBoundingClientRect();

		return{
			pointPosX: ( event.clientX - blockMap.left ),
			pointPosY: ( event.clientY - blockMap.top )
		};

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

	// place a button on the map (CONTR)
	setCoordinatesPointInMap: function(){
		
		point = model.getPositionPoint( mapField, event );

		pointX = point.pointPosX;
		pointY = point.pointPosY;

		view.setPointInMap( pointX, pointY );
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

			mapField.onclick = function(){

				controller.getCoordinatesPoint();
				controller.setCoordinatesPointInMap();
				
			}

		}
	};

	start.init();

} )();

/* -------------------- anonymous initialize function ------------------------------------ */