//
// ChuChu ... a web canvas application to draw 
// model train layouts ...
// (eventually).

var debug = true;

var cnv = document.querySelector( "canvas" );
var mnu = document.querySelector( "menu" );
cnv.width = window.innerWidth ;
cnv.height = window.innerHeight ;

// turn off the context menu ...
// cnv.oncontextmenu = (e) => e.preventDefault();
// cnv.oncontextmenu = function(e){
// 	console.log( e );
// 	e.preventDefault();
// }

var c = cnv.getContext( '2d' );

// c.fillStyle = 'rgba( 0, 244, 128, 0.3 )';
// c.fillRect( 100, 100, 100, 100 ) ;
// c.fillRect( 200, 100, 100, 100 ) ;
// c.fillRect( 200, 200, 100, 100 ) ;
//
//console.log( cnv.width, cnv.height ) ;
//
// c.beginPath() ;
// c.moveTo( 50, 300 );
// c.lineTo( 300, 100 );
// c.lineTo( 400, 300 );
// c.strokeStyle = "#dedede";
// c.stroke();
//
//c.beginPath() ;
//c.arc( 300, 300, 30, 0, Math.PI * 2, false );
//c.strokeStyle = "blue";
//c.stroke();
//
//for( var i = 0 ; i < 180 ; i++ )
//{
//	var x = Math.random() * window.innerWidth ;
//	var y = Math.random() * window.innerHeight ;
//	c.beginPath();
//	c.arc( x, y, 30, 0, Math.PI * 2, false ) ;
//	c.strokeStyle = 'blue' ;
//	c.stroke() ;
//}

function fullscreen(){
	if( cnv.webkitRequestFullScreen) {
		 cnv.webkitRequestFullScreen();
	} else {
		cnv.mozRequestFullScreen();
	}            
}

function randomColour() {
	var color = "#";
	for (k = 0; k < 3; k++) {
	    color += ("0" + (Math.random()*256|0).toString(16)).substr(-2);
	}
	return color ;
}

var ballCount = 400 ;
var proximity = 100 ;
var maxRadius = 80 ;
var minRadius = 2 ;
var mouse = {
	x: undefined,
	y: undefined
};

function Circle(x, y, radius, dx, dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius ;
	this.minRadius = Math.random() * 10 ;
	this.colour = randomColour() ;

	this.draw = function() {
		c.beginPath();
		c.arc( this.x, this.y, this.radius, 0, Math.PI * 2, false ) ;
		c.strokeStyle = 'blue' ;
		c.fillStyle = this.colour ;
		c.stroke() ;
		c.fill() ;
	}

	this.update = function() {

		if( this.x + this.radius > innerWidth ||
			this.x - this.radius < 0 ) {
			this.dx = -this.dx ;
		}

		if( this.y + this.radius > innerHeight ||
			this.y - this.radius < 0 ) {
			this.dy = -this.dy ;
		}

		this.x += this.dx ;
		this.y += this.dy ;

		// check against mouse pos ...
		if( ( (mouse.x - this.x) < proximity && (mouse.x - this.x) > -proximity )
				&& ( (mouse.y - this.y) < proximity && (mouse.y - this.y) > -proximity ) ) 
		{
			if( this.radius < maxRadius ) 
				this.radius += 1 ;
		} else if( this.radius > minRadius ) {
			this.radius -= 1 ;
		}

		this.draw();

	}
}

function line( x, y, orientation, length ){
}

function turnOut( x, y, orientation, direction ){
}

function clearRect( x, y, a, b ){
	c.clearRect( x, y, a, b ) ;
}

function drawTxt( x, y, txt ){
	c.font = "8px Sans-Serif";
	c.textBaseline = "top";
	c.fillStyle = "#000000";
	c.fillText (txt, x, y);
}

function drawBox( x, y, h, w ){
	c.lineWidth = 2;
	c.strokeStyle = '#000000';
	c.strokeRect( x,y,h,w );
}

function drawBoxAtMouse( ev ) {
	if( ev.which != 3 )
	{
		var height = 10;
		var width = 10;
		drawBox( mouse.x, mouse.y, height, width );
	}
}

window.addEventListener( 'load', fullscreen );

window.addEventListener( 'mousedown', drawBoxAtMouse );

window.addEventListener('oncontextmenu', function(event){
	console.log( event );
});

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX ;
	mouse.y = event.clientY ;
	if( debug == true )
	{
		clearRect( 0, 0, 200, 20 );
		drawTxt( 8, 8, '(' + mouse.x + ',' + mouse.y + ')' );
	}
});


