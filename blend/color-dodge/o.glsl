/**
 *
 * BlendColorDodgeo
 *
 */

#pragma glslify: blendColorDodge = require(./)

vec3 blendColorDodgeo(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendColorDodgeo)