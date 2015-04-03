/**
 *
 * BlendScreeno
 *
 */

#pragma glslify: blendScreen = require(./screen)

vec3 blendScreeno(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendScreeno)