/**
 *
 * BlendHardLighto
 *
 */

#pragma glslify: blendHardLight = require(./hard-light)

vec3 blendHardLighto(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendHardLighto)