/**
 *
 * BlendHardMixf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendVividLightf = require(./vivid-light-f)

float blendHardMixf(float base, float blend) {
	return (blendVividLightf(base,blend)<0.5)?0.0:1.0;
}

#pragma glslify: export(blendHardMixf)