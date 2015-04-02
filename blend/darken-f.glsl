/**
 *
 * BlendDarkenf
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendDarkenf(float base, float blend) {
	return min(blend,base);
}

#pragma glslify: export(blendDarkenf)