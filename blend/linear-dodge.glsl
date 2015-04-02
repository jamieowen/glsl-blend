/**
 *
 * BlendLinearDodge
 * 
 * Generated using the ../source/convert.js script.
 *
 */

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

#pragma glslify: export(blendLinearDodge)