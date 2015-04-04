/**
 *
 * BlendOverlayo
 *
 */

#pragma glslify: blendOverlay = require(./)

vec3 blendOverlayo(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendOverlayo)