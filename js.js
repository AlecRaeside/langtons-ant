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
		cellSize : 20,
		numHorizCells : 200,
		numVertCells : 200,
		frameRate: 60
	},
	mouseX:0,
	mouseY:0,
	theta:0,
	radius:800,
	onDocumentMouseMove:function(event) {

		LA.mouseX = ( event.clientX - windowHalfX ) * 6;
		LA.mouseY = ( event.clientY - windowHalfY ) * 6;

	},
	init : function() {

		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		//create canvas
		container = document.createElement( 'div' );
		document.body.appendChild( container );

		LA.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 20000 );
		LA.camera.position.z = 3000;


		LA.scene = new THREE.Scene();
		LA.scene.fog = new THREE.Fog( 0x000000, 1, 20000 );
		
		LA.light = new THREE.PointLight( 0xff5511 );
		LA.scene.add( LA.light );
		LA.light.position.z=300
		


		LA.geometry = new THREE.CubeGeometry( LA.config.cellSize, LA.config.cellSize,LA.config.cellSize);

				

		LA.material = new THREE.MeshLambertMaterial({color:0xffffff});

		
		
		//setup matrix for ant/trail tracking 
		//(see function definition for awesome array creation function)
		 //setup matrix for ant/trail tracking
		LA.matrix = {};
		
		//setup ant
		LA.ant.x = 0;
		LA.ant.y = 0;

		//initiate turn timer
		//timer = setInterval(LA.turn,1000/LA.config.frameRate);


		
		LA.renderer = new THREE.WebGLRenderer( { clearColor: 0x000000, clearAlpha: 1 } );
		LA.renderer.setSize( window.innerWidth, window.innerHeight );
		LA.renderer.sortObjects = false;

		container.appendChild( LA.renderer.domElement );
		LA.renderer.render( LA.scene, LA.camera );
		document.addEventListener( 'mousemove', LA.onDocumentMouseMove, false );
		requestAnimationFrame(LA.turn);

	},
	ant: {
		x:1,
		y:1,
		dir:0, //up
		turnLeft:function() {
			LA.ant.dir = (LA.ant.dir - 1).mod(4);
		},
		turnRight:function() {
			LA.ant.dir = (LA.ant.dir + 1).mod(4);
		}
	},
	turn : function() {
		requestAnimationFrame(LA.turn);
		//setTimeout(LA.turn,400);
		LA.key = LA.ant.y+","+LA.ant.x;
		LA.antCell = LA.matrix.hasOwnProperty(LA.key)
		
		if (LA.antCell) {
			//LA.antCell = LA.matrix[LA.key];
			
			LA.scene.remove(LA.matrix[LA.key])
			delete LA.matrix[LA.key];
		} else {
			LA.mesh = new THREE.Mesh( LA.geometry, LA.material );
			LA.scene.add(LA.mesh);
			LA.mesh.position.x = LA.ant.x * LA.config.cellSize;
			LA.mesh.position.y = LA.ant.y * LA.config.cellSize;
			LA.matrix[LA.key] = LA.mesh;

		}
		// 1. Turn left or right
		if (LA.antCell) {
			LA.ant.turnLeft();
		} else {
			LA.ant.turnRight();
		}

		
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
		LA.render();
	},
	render:function() {
		//debugger;
		LA.theta += 0.3;

				LA.camera.position.x = LA.radius * Math.sin( LA.theta * Math.PI / 360 );
				LA.camera.position.y = LA.radius * Math.sin( LA.theta * Math.PI / 360 );
				LA.camera.position.z = LA.radius * Math.cos( LA.theta * Math.PI / 360 );

				LA.light.position.x = LA.camera.position.x;
				LA.light.position.y = LA.camera.position.y;
				LA.light.position.z = LA.camera.position.z;

				LA.camera.lookAt( LA.scene.position );
		//LA.camera.position.x += ( LA.mouseX - LA.camera.position.x ) * .05;
		//LA.camera.position.y += ( - LA.mouseY - LA.camera.position.y ) * .05;
		
		

		LA.renderer.render( LA.scene, LA.camera );
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