/**
 *
 * BlendLinearDodgeo
 *
 */

#pragma glslify: blendLinearDodge = require(./)

vec3 blendLinearDodgeo(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearDodgeo)