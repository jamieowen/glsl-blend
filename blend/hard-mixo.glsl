/**
 *
 * BlendHardMixo
 *
 */

#pragma glslify: blendHardMix = require(./hard-mix)

vec3 blendHardMixo(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendHardMixo)