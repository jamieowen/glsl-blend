/**
 *
 * BlendColorBurn
 *
 */

#pragma glslify: blendColorBurnf = require(./color-burn-f)

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurnf(base.r,blend.r),blendColorBurnf(base.g,blend.g),blendColorBurnf(base.b,blend.b));
}

#pragma glslify: export(blendColorBurn)