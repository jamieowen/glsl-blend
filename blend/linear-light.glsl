/**
 *
 * BlendLinearLight
 *
 */

#pragma glslify: blendLinearLightf = require(./linear-light-f)

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLightf(base.r,blend.r),blendLinearLightf(base.g,blend.g),blendLinearLightf(base.b,blend.b));
}

#pragma glslify: export(blendLinearLight)