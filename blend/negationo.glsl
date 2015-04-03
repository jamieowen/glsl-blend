/**
 *
 * BlendNegationo
 *
 */

#pragma glslify: blendNegation = require(./negation)

vec3 blendNegationo(vec3 base, vec3 blend, float opacity) {
	return (blendNegation(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendNegationo)