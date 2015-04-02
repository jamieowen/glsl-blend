/**
 *
 * BlendDarken
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendDarken(float base, float blend) {
	// Note : Same implementation as BlendDarkenf
	return min(blend,base);
}

#pragma glslify: export(blendDarken)