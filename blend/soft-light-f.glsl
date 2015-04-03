/**
 *
 * BlendSoftLightf
 *
 */

float blendSoftLightf(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

#pragma glslify: export(blendSoftLightf)