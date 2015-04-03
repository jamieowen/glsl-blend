/**
 *
 * BlendPinLightf
 *
 */

#pragma glslify: blendDarkenf = require(./darken-f)
#pragma glslify: blendLightenf = require(./lighten-f)

float blendPinLightf(float base, float blend) {
	return (blend<0.5)?blendDarkenf(base,(2.0*blend)):blendLightenf(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendPinLightf)