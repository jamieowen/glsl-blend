/**
 *
 * BlendDarkenf
 *
 */

float blendDarkenf(float base, float blend) {
	return min(blend,base);
}

#pragma glslify: export(blendDarkenf)