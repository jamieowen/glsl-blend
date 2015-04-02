/**
 *
 * BlendLightenf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLightenf(float base, float blend) {
	return max(blend,base);
}

#pragma glslify: export(blendLightenf)