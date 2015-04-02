/**
 *
 * BlendLinearDodgef
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendLinearDodgef(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

#pragma glslify: export(blendLinearDodgef)