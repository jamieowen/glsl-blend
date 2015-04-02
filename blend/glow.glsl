/**
 *
 * BlendGlow
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendReflect = require(./reflect)

vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

#pragma glslify: export(blendGlow)