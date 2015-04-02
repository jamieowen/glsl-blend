/**
 *
 * BlendOverlayf
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendOverlayf(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendOverlayf)