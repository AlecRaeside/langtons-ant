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
		LA.matrix = new Array(LA.config.numVertCells);
		for (var i=0; i<LA.config.numVertCells; i++) {
			var length = LA.config.numHorizCells;
			var row = new Array(length);

			for (var j=0;j<length;j++) {
				row[j]=0;
			}
			LA.matrix[i]=row;
		}

		//setup ant
		LA.ant.x = LA.config.numHorizCells / 2;
		LA.ant.y = LA.config.numVertCells / 2;

		//initiate turn timer
		setInterval(LA.turn,1000/LA.config.frameRate);
	},
	ant: {
		x:100,
		y:100
	}
	turn : function() {
		if ()
		LA.ctx.fillStyle = 'black';
	  	LA.ctx.fillRect(100,100,LA.config.cellSize, LA.config.cellSize);
	}
}
function log(v) {
	console.log(v);
}
Array.prototype.repeat= function(what, L){
 while(L) this[--L]= what;
 return this;
}