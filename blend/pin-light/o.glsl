/**
 *
 * BlendPinLighto
 *
 */

#pragma glslify: blendPinLight = require(./)

vec3 blendPinLighto(vec3 base, vec3 blend, float opacity) {
	return (blendPinLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendPinLighto)