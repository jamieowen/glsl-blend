/**
 *
 * BlendLinearLighto
 *
 */

#pragma glslify: blendLinearLight = require(./)

vec3 blendLinearLighto(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearLighto)