/**
 *
 * BlendOpacityo
 *
 */

vec3 blendOpacityo(vec3 base, vec3 blend, float opacity) {
	return (blendOpacity(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendOpacityo)