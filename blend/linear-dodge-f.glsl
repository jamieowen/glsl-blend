/**
 *
 * BlendLinearDodgef
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLinearDodgef(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

#pragma glslify: export(blendLinearDodgef)