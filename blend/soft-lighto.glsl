/**
 *
 * BlendSoftLighto
 *
 */

#pragma glslify: blendSoftLight = require(./soft-light)

vec3 blendSoftLighto(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendSoftLighto)