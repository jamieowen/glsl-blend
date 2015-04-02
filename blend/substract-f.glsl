/**
 *
 * BlendSubstractf
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendSubstractf(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

#pragma glslify: export(blendSubstractf)