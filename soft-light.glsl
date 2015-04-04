float softLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 softLight(vec3 base, vec3 blend) {
	return vec3(softLight(base.r,blend.r),softLight(base.g,blend.g),softLight(base.b,blend.b));
}

vec3 softLight(vec3 base, vec3 blend, float opacity) {
	return (softLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(softLight)