/**
 *
 * BlendLinearBurno
 *
 */

#pragma glslify: blendLinearBurn = require(./)

vec3 blendLinearBurno(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearBurno)