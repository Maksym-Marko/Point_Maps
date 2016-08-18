var e,
	pointPosX,
	pointPosY;
/* -------------------------------- begin view -------------------------------------------- */

var view = {	

	getFielfMap: function( pointX, pointY ){	
		
		var mapField = document.getElementById( 'mapField' ),
			inputX = document.getElementById( 'coordinates_x' ),
			inputY = document.getElementById( 'coordinates_y' );

			inputX.value = pointX;
			inputY.value = pointY;

	}	

};

/* -------------------------------- end view -------------------------------------------- */


/* ------------------------------- begin model ------------------------------------------ */

var model = {

	pointPosX: 0,
	pointPosY: 0,

	eventVar: function(){

		e = window.event;

	},
	getPositionPointX: function(){

		this.eventVar();
		this.pointPosX = e.clientX;	
		return this.pointPosX;

	},
	getPositionPointY: function(){

		this.eventVar();
		this.pointPosY = e.clientY;
		return this.pointPosY;

	}
	
};

/* ------------------------------- end model ------------------------------------------ */


/* --------------------------- begin controller ---------------------------------------- */

var controller = {

	getCoordinatesPoint: function(){

		var pointX = model.getPositionPointX(),
			pointY = model.getPositionPointY();

		view.getFielfMap( pointX, pointY );

	}	

};

/* ---------------------------- end controller ----------------------------------------- */


/* -------------------- anonymous initialize function------------------------------------ */

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
				
			}

		}
	};

	start.init();

} )();
/* -------------------- anonymous initialize function------------------------------------ */