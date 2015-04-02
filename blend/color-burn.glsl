/**
 *
 * BlendColorBurn
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendColorBurnf = require(./color-burn-f)

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurnf(base.r,blend.r),blendColorBurnf(base.g,blend.g),blendColorBurnf(base.b,blend.b));
}

#pragma glslify: export(blendColorBurn)