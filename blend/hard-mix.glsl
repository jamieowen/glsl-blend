/**
 *
 * BlendHardMix
 *
 */

#pragma glslify: blendHardMixf = require(./hard-mix-f)

vec3 blendHardMix(vec3 base, vec3 blend) {
	return vec3(blendHardMixf(base.r,blend.r),blendHardMixf(base.g,blend.g),blendHardMixf(base.b,blend.b));
}

#pragma glslify: export(blendHardMix)