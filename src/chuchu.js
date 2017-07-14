//
// ChuChu ... a web canvas application to draw 
// model train layouts ...
// (eventually).

var cnv = document.querySelector( "canvas" );
var mnu = document.querySelector( "menu" );
cnv.width = window.innerWidth - 10 ;
cnv.height = window.innerHeight - 10 ;

// turn off the context menu ...
// cnv.oncontextmenu = (e) => e.preventDefault();
// cnv.oncontextmenu = function(e){
// 	console.log( e );
// 	e.preventDefault();
// }

var c = cnv.getContext( '2d' );

c.fillStyle = 'rgba( 0, 244, 128, 0.3 )';
c.fillRect( 100, 100, 100, 100 ) ;
c.fillRect( 200, 100, 100, 100 ) ;
c.fillRect( 200, 200, 100, 100 ) ;
//
//console.log( cnv.width, cnv.height ) ;
//
c.beginPath() ;
c.moveTo( 50, 300 );
c.lineTo( 300, 100 );
c.lineTo( 400, 300 );
c.strokeStyle = "#dedede";
c.stroke();
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

window.addEventListener('oncontextmenu', function(event){
	console.log( event );
});

window.addEventListener('mousemove', function(event){
	mouse.x = event.clientX ;
	mouse.y = event.clientY ;
});

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

//var circles = [] ;
//
//for( var i = 0 ; i < ballCount; i++ )
//{
//	var x = Math.random() * ( innerWidth - radius * 2 ) + radius ;
//	var y = Math.random() * ( innerHeight - radius * 2 ) + radius  ;
//	var dx = (Math.random() - 0.5 ) * 10 ;
//	var dy = (Math.random() - 0.5 ) * 10 ;
//	var radius = Math.random() * maxRadius ;
//
//	circles.push( new Circle( x, y, radius, dx, dy ) );
//}
//
//function animate() 
//{
//
//	requestAnimationFrame( animate );
//	c.clearRect( 0, 0, innerWidth, innerHeight ) ;
//	for( var i = 0; i < circles.length ; i++ )
//	{
//		circles[i].update() ;
//	}
//
//}
//
//animate() ;
