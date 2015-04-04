/**
 *
 * BlendMultiply
 *
 */

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

#pragma glslify: export(blendMultiply)