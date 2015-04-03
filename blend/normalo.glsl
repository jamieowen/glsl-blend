/**
 *
 * BlendNormalo
 *
 */

#pragma glslify: blendNormal = require(./normal)

vec3 blendNormalo(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendNormalo)