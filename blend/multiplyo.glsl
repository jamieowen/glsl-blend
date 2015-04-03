/**
 *
 * BlendMultiplyo
 *
 */

#pragma glslify: blendMultiply = require(./multiply)

vec3 blendMultiplyo(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendMultiplyo)