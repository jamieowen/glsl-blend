/**
 *
 * BlendVividLighto
 *
 */

#pragma glslify: blendVividLight = require(./)

vec3 blendVividLighto(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendVividLighto)