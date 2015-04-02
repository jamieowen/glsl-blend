/**
 *
 * BlendHardLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendOverlay = require(./overlay)

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

#pragma glslify: export(blendHardLight)