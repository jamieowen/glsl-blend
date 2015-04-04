

var glslify = require('glslify');
var createShader = require( 'gl-shader' );

var createBlendShader = function( gl ){
    return createShader( gl,
        glslify( './blend.vert' ),
        glslify( './blend.frag' )
    );
};

//create our WebGL test example
var context = require('./gl-blend-demo')({
    shader: createBlendShader
});

//add to DOM
require('domready')(function() {

    var modeSelect = document.createElement( 'select' );
    modeSelect.style.display = 'block';
    modeSelect.style.margin = '6x';
    var modes = { 'Multiply': 1, 'Darken':2, 'Lighten':3, 'Screen':4 };
    modeSelect.innerHTML = '';
    for( var mode in modes ){
        modeSelect.innerHTML += '<option value="' + modes[mode] + '">' + mode + '</option>';
    }

    modeSelect.addEventListener( 'change', function(event){
        console.log( 'change' );
    });

    document.body.style.margin = '0';
    document.body.appendChild( modeSelect );
    document.body.appendChild(context.canvas);

    console.log( context );
});