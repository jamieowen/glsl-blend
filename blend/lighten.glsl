/**
 *
 * BlendLighten
 *
 */

float blendLighten(float base, float blend) {
	// Note : Same implementation as BlendLightenf
	return max(blend,base);
}

#pragma glslify: export(blendLighten)