/**
 *
 * BlendAverageo
 *
 */

#pragma glslify: blendAverage = require(./)

vec3 blendAverageo(vec3 base, vec3 blend, float opacity) {
	return (blendAverage(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendAverageo)