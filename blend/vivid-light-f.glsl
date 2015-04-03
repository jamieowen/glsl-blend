/**
 *
 * BlendVividLightf
 *
 */

#pragma glslify: blendColorBurnf = require(./color-burn-f)
#pragma glslify: blendColorDodgef = require(./color-dodge-f)

float blendVividLightf(float base, float blend) {
	return (blend<0.5)?blendColorBurnf(base,(2.0*blend)):blendColorDodgef(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendVividLightf)