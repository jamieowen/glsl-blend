/**
 *
 * Blendo
 *
 */

vec3 blendo(vec3 base, vec3 blend, float opacity) {
	return (blend(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendo)