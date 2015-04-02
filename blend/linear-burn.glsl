/**
 *
 * BlendLinearBurn
 * 
 * Generated using the ../source/convert.js script.
 *
 */

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendLinearBurn)