/**
 *
 * BlendSubstracto
 *
 */

#pragma glslify: blendSubstract = require(./substract)

vec3 blendSubstracto(vec3 base, vec3 blend, float opacity) {
	return (blendSubstract(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendSubstracto)