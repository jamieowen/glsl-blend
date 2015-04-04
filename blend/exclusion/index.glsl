/**
 *
 * BlendExclusion
 *
 */

vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

#pragma glslify: export(blendExclusion)