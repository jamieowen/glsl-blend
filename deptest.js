var deps = require( 'glslify-deps');
var path = require( 'path' );
var base = path.resolve( './' );

var bundle = require( 'glslify-bundle' );


var depper = deps({cwd:base});

depper.on( 'file', function(file){
	//console.log( file );
});

var addedDep = function(err,tree){
	//console.log( 'addedDep', tree ); 
	console.log( tree );

	console.log( bundle( tree) );

}

var file = path.resolve( base, 'allError.glsl' );

depper.add( file, addedDep );

