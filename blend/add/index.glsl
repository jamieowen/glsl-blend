/**
 *
 * BlendAdd
 *
 */

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

#pragma glslify: export(blendAdd)