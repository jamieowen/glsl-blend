/**
 *
 * BlendSoftLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendSoftLightf = require(./soft-light-f)

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLightf(base.r,blend.r),blendSoftLightf(base.g,blend.g),blendSoftLightf(base.b,blend.b));
}

#pragma glslify: export(blendSoftLight)