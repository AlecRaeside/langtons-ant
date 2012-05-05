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
		cellSize : 5,
		numHorizCells : 100,
		numVertCells : 100,
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
		setInterval(LA.turn,1000/LA.config.frameRate);
	},
	ant: {
		x:50,
		y:50,
		dir:0 //up
	},
	turn : function() {
		tick++;
		//debugger
		// 1. Flip colour
		

		// 2. Turn left or right
		var dirChange = LA.matrix[LA.ant.y][LA.ant.x] ? -1 : 1;
		LA.ctx.fillStyle = (LA.matrix[LA.ant.y][LA.ant.x]) ? "black" : "red";
		LA.ant.dir = (LA.ant.dir + dirChange).mod(4);
		
		LA.ctx.fillRect(LA.ant.x * LA.config.cellSize, LA.ant.y * LA.config.cellSize ,LA.config.cellSize, LA.config.cellSize);

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

	  	
	  	//console.log(LA.ant.x,LA.ant.y,LA.matrix[LA.ant.y][LA.ant.x])

	  	if (LA.matrix[LA.ant.y][LA.ant.x]) {
			LA.matrix[LA.ant.y][LA.ant.x]=false;
		} else {
			LA.matrix[LA.ant.y][LA.ant.x]=true;
		}
		if (tick%60===0) {
			log("second")
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