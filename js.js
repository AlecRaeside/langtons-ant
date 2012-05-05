window.onload=function() {



	//setInterval(tick,1000/60);
	LA.init()


}

//global Langtons Ant object
var LA = {
	config : {
		cellSize : 5,
		numHorizCells : 100,
		numVertCells : 80,
		frameRate: 6
	},

	init : function() {
		//create canvas
		var canvas = document.createElement("canvas");
		canvas.setAttribute("width",LA.config.cellSize * LA.config.numHorizCells);
		canvas.setAttribute("height",LA.config.cellSize * LA.config.numVertCells);
		document.body.appendChild(canvas);
		LA.ctx = canvas.getContext("2d");

		//setup matrix for ant/trail tracking 
		//(see function definition for awesome array creation function)
		LA.matrix = [].fillWith( 
						[].fillWith (0 , LA.config.numHorizCells ), //row
						LA.config.numVertCells 
					);
		
		//setup ant
		LA.ant.x = LA.config.numHorizCells / 2;
		LA.ant.y = LA.config.numVertCells / 2;

		//initiate turn timer
		setInterval(LA.turn,1000/LA.config.frameRate);
	},
	ant: {
		x:50,
		y:50,
		dir:"up",
	},
	turn : function() {
		var isAntCellBlack = LA.matrix[LA.ant.y][LA.ant.x]===1;

		LA.ctx.fillStyle = (isAntCellBlack) ? "black" : "white";
		if (isAntCellBlack) {

		}
	  	LA.ctx.fillRect(100,100,LA.config.cellSize, LA.config.cellSize);
	}
}
function log(v) {
	console.log(v);
}

//from http://stackoverflow.com/a/2044990
Array.prototype.fillWith = function(what, L){
	while(L) this[--L] = what;
	return this;
}