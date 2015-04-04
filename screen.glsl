float screen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 screen(vec3 base, vec3 blend) {
	return vec3(screen(base.r,blend.r),screen(base.g,blend.g),screen(base.b,blend.b));
}

vec3 screen(vec3 base, vec3 blend, float opacity) {
	return (screen(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(screen)