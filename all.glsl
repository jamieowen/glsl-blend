#pragma glslify: add = require(./add);
#pragma glslify: average = require(./average);
#pragma glslify: colorBurn = require(./color-burn);
#pragma glslify: colorDodge = require(./color-dodge);
#pragma glslify: darken = require(./darken);
#pragma glslify: difference = require(./difference);
#pragma glslify: exclusion = require(./exclusion);
#pragma glslify: glow = require(./glow);
#pragma glslify: hardLight = require(./hard-light);
#pragma glslify: hardMix = require(./hard-mix);
#pragma glslify: lighten = require(./lighten);
#pragma glslify: linearBurn = require(./linear-burn);
#pragma glslify: linearDodge = require(./linear-dodge);
#pragma glslify: linearLight = require(./linear-light);
#pragma glslify: multiply = require(./multiply);
#pragma glslify: negation = require(./negation);
#pragma glslify: normal = require(./normal);
#pragma glslify: overlay = require(./overlay);
#pragma glslify: phoenix = require(./phoenix);
#pragma glslify: pinLight = require(./pin-light);
#pragma glslify: reflect = require(./reflect);
#pragma glslify: screen = require(./screen);
#pragma glslify: softLight = require(./soft-light);
#pragma glslify: substract = require(./substract);
#pragma glslify: vividLight = require(./vivid-light);


vec3 blendMode( int mode, vec3 base, vec3 blend ){
	if( mode == 1 ){
		return add( base, blend );
	}else{
	if( mode == 2 ){
		return average( base, blend );
	}else{
	if( mode == 3 ){
		return colorBurn( base, blend );
	}else{
	if( mode == 4 ){
		return colorDodge( base, blend );
	}else{
	if( mode == 5 ){
		return darken( base, blend );
	}else{
	if( mode == 6 ){
		return difference( base, blend );
	}else{
	if( mode == 7 ){
		return exclusion( base, blend );
	}else{
	if( mode == 8 ){
		return glow( base, blend );
	}else{
	if( mode == 9 ){
		return hardLight( base, blend );
	}else{
	if( mode == 10 ){
		return hardMix( base, blend );
	}else{
	if( mode == 11 ){
		return lighten( base, blend );
	}else{
	if( mode == 12 ){
		return linearBurn( base, blend );
	}else{
	if( mode == 13 ){
		return linearDodge( base, blend );
	}else{
	if( mode == 14 ){
		return linearLight( base, blend );
	}else{
	if( mode == 15 ){
		return multiply( base, blend );
	}else{
	if( mode == 16 ){
		return negation( base, blend );
	}else{
	if( mode == 17 ){
		return normal( base, blend );
	}else{
	if( mode == 18 ){
		return overlay( base, blend );
	}else{
	if( mode == 19 ){
		return phoenix( base, blend );
	}else{
	if( mode == 20 ){
		return pinLight( base, blend );
	}else{
	if( mode == 21 ){
		return reflect( base, blend );
	}else{
	if( mode == 22 ){
		return screen( base, blend );
	}else{
	if( mode == 23 ){
		return softLight( base, blend );
	}else{
	if( mode == 24 ){
		return substract( base, blend );
	}else{
	if( mode == 25 ){
		return vividLight( base, blend );
	}
}
#pragma glslify:export(blendMode)