/**
 *
 * BlendAddo
 *
 */

#pragma glslify: blendAdd = require(./add)

vec3 blendAddo(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendAddo)