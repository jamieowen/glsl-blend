/**
 *
 * BlendDarken
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendDarken(float base, float blend) {
	// Note : Same implementation as BlendDarkenf
	return min(blend,base);
}

#pragma glslify: export(blendDarken)