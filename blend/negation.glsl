/**
 *
 * BlendNegation
 *
 */

vec3 blendNegation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

#pragma glslify: export(blendNegation)