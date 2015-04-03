/**
 *
 * BlendOverlay
 *
 */

#pragma glslify: blendOverlayf = require(./overlay-f)

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlayf(base.r,blend.r),blendOverlayf(base.g,blend.g),blendOverlayf(base.b,blend.b));
}

#pragma glslify: export(blendOverlay)