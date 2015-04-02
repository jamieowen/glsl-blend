/**
 *
 * BlendScreenf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendScreenf(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendScreenf)