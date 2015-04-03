/**
 *
 * BlendPhoenixo
 *
 */

#pragma glslify: blendPhoenix = require(./phoenix)

vec3 blendPhoenixo(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendPhoenixo)