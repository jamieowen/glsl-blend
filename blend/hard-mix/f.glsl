/**
 *
 * BlendHardMixf
 *
 */

#pragma glslify: blendVividLightf = require(../vivid-light/f)

float blendHardMixf(float base, float blend) {
	return (blendVividLightf(base,blend)<0.5)?0.0:1.0;
}

#pragma glslify: export(blendHardMixf)