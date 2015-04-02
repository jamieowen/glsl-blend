/**
 *
 * BlendLinearBurn
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendLinearBurn)