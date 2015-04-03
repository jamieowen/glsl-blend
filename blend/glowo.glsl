/**
 *
 * BlendGlowo
 *
 */

#pragma glslify: blendGlow = require(./glow)

vec3 blendGlowo(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendGlowo)