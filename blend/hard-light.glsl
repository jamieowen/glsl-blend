/**
 *
 * BlendHardLight
 * 
 * Generated using the ../source/convert.js script.
 *
 */

#pragma glslify: blendOverlay = require(./overlay)

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

#pragma glslify: export(blendHardLight)