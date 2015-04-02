/**
 *
 * BlendScreen
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendScreenf = require(./screen-f)

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreenf(base.r,blend.r),blendScreenf(base.g,blend.g),blendScreenf(base.b,blend.b));
}

#pragma glslify: export(blendScreen)