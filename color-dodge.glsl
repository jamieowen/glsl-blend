float colorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 colorDodge(vec3 base, vec3 blend) {
	return vec3(colorDodge(base.r,blend.r),colorDodge(base.g,blend.g),colorDodge(base.b,blend.b));
}

vec3 colorDodge(vec3 base, vec3 blend, float opacity) {
	return (colorDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(colorDodge)