/**
 *
 * BlendPhoenix
 *
 */

vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

#pragma glslify: export(blendPhoenix)