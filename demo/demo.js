

var glslify = require('glslify');
var createShader = require( 'gl-shader' );
var modes = require( '../modes' );

var createBlendShader = function( gl ){
    var shader = createShader( gl,
        glslify( './blend.vert' ),
        glslify( './blend.frag' )
    );

    shader.bind();
    shader.uniforms.blendMode = 1;
    return shader;
};

//create our WebGL test example
var blendDemo = require('gl-blend-demo')({
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
        blendDemo.shader.uniforms.blendMode = event.target.value;
        blendDemo.render();
    });

    document.body.style.margin = '0px';
    document.body.appendChild( modeSelect );
    document.body.appendChild(blendDemo.canvas);
});