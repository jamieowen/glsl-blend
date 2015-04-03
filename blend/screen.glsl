/**
 *
 * BlendScreen
 *
 */

#pragma glslify: blendScreenf = require(./screen-f)

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreenf(base.r,blend.r),blendScreenf(base.g,blend.g),blendScreenf(base.b,blend.b));
}

#pragma glslify: export(blendScreen)