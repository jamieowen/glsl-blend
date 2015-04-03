/**
 *
 * BlendLinearBurnf
 *
 */

float blendLinearBurnf(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}

#pragma glslify: export(blendLinearBurnf)