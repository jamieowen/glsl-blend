/**
 *
 * BlendLinearLightf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendLinearBurnf = require(./linear-burn-f)
#pragma glslify: blendLinearDodgef = require(./linear-dodge-f)

float blendLinearLightf(float base, float blend) {
	return blend<0.5?blendLinearBurnf(base,(2.0*blend)):blendLinearDodgef(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendLinearLightf)