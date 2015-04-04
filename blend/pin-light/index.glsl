/**
 *
 * BlendPinLight
 *
 */

#pragma glslify: blendPinLightf = require(./f)

vec3 blendPinLight(vec3 base, vec3 blend) {
	return vec3(blendPinLightf(base.r,blend.r),blendPinLightf(base.g,blend.g),blendPinLightf(base.b,blend.b));
}

#pragma glslify: export(blendPinLight)