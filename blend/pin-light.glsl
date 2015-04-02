/**
 *
 * BlendPinLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendPinLightf = require(./pin-light-f)

vec3 blendPinLight(vec3 base, vec3 blend) {
	return vec3(blendPinLightf(base.r,blend.r),blendPinLightf(base.g,blend.g),blendPinLightf(base.b,blend.b));
}

#pragma glslify: export(blendPinLight)