/**
 *
 * BlendScreenf
 *
 */

float blendScreenf(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendScreenf)