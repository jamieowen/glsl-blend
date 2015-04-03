/**
 *
 * BlendDifferenceo
 *
 */

#pragma glslify: blendDifference = require(./difference)

vec3 blendDifferenceo(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendDifferenceo)