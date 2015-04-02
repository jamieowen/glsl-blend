/**
 *
 * BlendGlow
 * 
 * Generated using the ../source/convert.js script.
 *
 */

#pragma glslify: blendReflect = require(./reflect)

vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

#pragma glslify: export(blendGlow)