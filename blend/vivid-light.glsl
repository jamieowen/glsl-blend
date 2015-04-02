/**
 *
 * BlendVividLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendVividLightf = require(./vivid-light-f)

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLightf(base.r,blend.r),blendVividLightf(base.g,blend.g),blendVividLightf(base.b,blend.b));
}

#pragma glslify: export(blendVividLight)