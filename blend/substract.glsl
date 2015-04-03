/**
 *
 * BlendSubstract
 *
 */

vec3 blendSubstract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendSubstract)