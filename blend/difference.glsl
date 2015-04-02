/**
 *
 * BlendDifference
 * 
 * Generated using the ../source/convert.js script.
 *
 */

vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

#pragma glslify: export(blendDifference)