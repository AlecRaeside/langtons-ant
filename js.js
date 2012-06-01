window.onload=function() {
	//setInterval(tick,1000/60);
	LA.init()
}
var tick =0;
var dirs = {
	UP:0,
	RIGHT:1,
	DOWN:2,
	LEFT:3

}

//global Langtons Ant object
var LA = {
	config : {
		cellSize : 3,
		numHorizCells : 200,
		numVertCells : 200,
		frameRate: 60
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
		timer = setInterval(LA.turn,1000/LA.config.frameRate);
	},
	ant: {
		x:50,
		y:50,
		dir:0, //up
		turnLeft:function() {
			LA.ant.dir = (LA.ant.dir - 1).mod(4);
		},
		turnRight:function() {
			LA.ant.dir = (LA.ant.dir + 1).mod(4);
		}
	},
	turn : function() {
		try {
			var antCell = LA.matrix[LA.ant.y][LA.ant.x];
		} catch (err) {
			clearInterval(timer);
			log("stopped");
		}

		// 1. Turn left or right
		if (antCell) {
			LA.ant.turnLeft();
		} else {
			LA.ant.turnRight()
		}
		
		
		//LA.ctx.shadowColor = 'blue';
		//LA.ctx.shadowBlur = 40;

		// 2. set colour based on cell state then flip colour
		LA.ctx.fillStyle = (antCell) ? "white" : "black";
		LA.ctx.fillRect(LA.ant.x * LA.config.cellSize, LA.ant.y * LA.config.cellSize ,LA.config.cellSize, LA.config.cellSize);
		LA.matrix[LA.ant.y][LA.ant.x] = !antCell;

		// 3. Move forward
		switch (LA.ant.dir) {
			case dirs.UP:
				LA.ant.y--;
				break;
			case dirs.RIGHT:
				LA.ant.x++;
				break;
			case dirs.DOWN:
				LA.ant.y++;
				break;
			case dirs.LEFT:
				LA.ant.x--;
				break;
		}
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

//There is a stupid JS modulus bug when dealing with negative numbers. I found function to fix here http://stackoverflow.com/a/4467559
Number.prototype.mod = function(n) {
return ((this%n)+n)%n;
}