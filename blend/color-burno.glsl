/**
 *
 * BlendColorBurno
 *
 */

#pragma glslify: blendColorBurn = require(./color-burn)

vec3 blendColorBurno(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendColorBurno)