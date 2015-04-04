

var glslify = require('glslify');
var createShader = require( 'gl-shader' );
var modes = require( '../modes' );

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

    modeSelect.innerHTML = '';
    for( var mode in modes ){
        modeSelect.innerHTML += '<option style="margin:6px;" value="' + modes[mode] + '">' + mode + '</option>';
    }

    modeSelect.addEventListener( 'change', function(event){
        console.log( 'render render' );
        context.render();
    });

    document.body.style.margin = '0px';
    document.body.appendChild( modeSelect );
    document.body.appendChild(context.canvas);
});