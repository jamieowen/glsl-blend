
var THREE = require( 'three' );
var OrbitControls = require( 'orbit-controls' );
var glslify = require( 'glslify' );
var modes = require( '../modes' );

window.onload = function(){

	document.body.style.margin = '0px';
	document.body.style.overflow = 'hidden';

	var loadQ = [ 'lena.png', 'baboon.png' ];
	var textures = [];

	var load = function(){
		if( loadQ.length ){
			var item = loadQ.shift();
			var loader = new THREE.TextureLoader();
			var texture = loader.load( item, load );
			textures.push( texture );
		}else{
			startup();
		}
	};

	load();

	var startup = function(){

		var renderer = new THREE.WebGLRenderer({antialias:true});
		var scene = new THREE.Scene();
		var camera = new THREE.PerspectiveCamera();

		document.body.appendChild( renderer.domElement );

		var controls = OrbitControls({
			distance: 100,
			parent: renderer.domElement
		});
		var target = new THREE.Vector3();
		var geometry = new THREE.PlaneBufferGeometry(1,1,1,1);
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation(0.5,0.5,0) );

		var mesh,material,x,y;
		var i = 0;
		var cols = 5;
		var size = 10;
		var spacing = 1;
		var w2 = ( ( cols * size ) + ( (cols-1)*spacing ) ) / 2;
		var h2 = w2;

		var sharedOpacityUniform = { type: 'f', value: 0.8 };

		for( var key in modes ){

			x = ( i % cols );
			y = Math.floor( i++ / cols );

			material = new THREE.RawShaderMaterial({
				vertexShader: glslify( './three-blend.vert' ),
				fragmentShader: glslify( './three-blend.frag' ),
				side: THREE.DoubleSide,
				uniforms: {
					opacity: sharedOpacityUniform,
					base: { type: 't', value: textures[0] },
					blend: { type: 't', value: textures[1] },
					mode: { type: 'i', value: modes[key] }
				}
			});

			mesh = new THREE.Mesh( geometry,material );
			mesh.scale.set( size,size,1 );
			mesh.position.set(
				( x * size ) + ( x * spacing ) - w2,
				( y * size ) + ( y * spacing ) - h2,
				0
			);

			scene.add( mesh );

		}

		var update = function(){

			controls.update();
			camera.position.fromArray(controls.position);
			camera.up.fromArray(controls.up);
			camera.lookAt(target.fromArray(controls.direction));
			renderer.render( scene, camera );
			requestAnimationFrame(update);

		};

		var size = function(){

			renderer.setSize( window.innerWidth, window.innerHeight );
			camera.aspect = window.innerWidth/window.innerHeight;
			camera.near = 1;
			camera.far = 1000;
			camera.perspective = 45;
			camera.updateProjectionMatrix();

		};

		size();
		update();

		window.onresize = size;

		var element = document.createElement( 'div' );
		element.innerHTML = '' +
			'<div style="position:absolute;top:10px;left:10px;color:#efefef;font-family: Arial; font-size:10px;">' +
				'<p>opacity:</p>' +
				'<input id="opacity-slider" type="range" min="0" max="1" step="0.001" style="width:200px;"></input>' +
			'</div>';

		document.body.appendChild( element );

		var slider = document.getElementById( 'opacity-slider' );
		slider.setAttribute( 'value', sharedOpacityUniform.value.toString() );
		slider.oninput = function(){
			sharedOpacityUniform.value = parseFloat( slider.value );
		}
	};

};