/**
 *
 * BlendLightenf
 *
 */

float blendLightenf(float base, float blend) {
	return max(blend,base);
}

#pragma glslify: export(blendLightenf)