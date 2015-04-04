/**
 *
 * BlendExclusiono
 *
 */

#pragma glslify: blendExclusion = require(./)

vec3 blendExclusiono(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendExclusiono)