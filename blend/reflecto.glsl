/**
 *
 * BlendReflecto
 *
 */

#pragma glslify: blendReflect = require(./reflect)

vec3 blendReflecto(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendReflecto)