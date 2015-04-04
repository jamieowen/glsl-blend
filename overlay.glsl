float overlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 overlay(vec3 base, vec3 blend) {
	return vec3(overlay(base.r,blend.r),overlay(base.g,blend.g),overlay(base.b,blend.b));
}

vec3 overlay(vec3 base, vec3 blend, float opacity) {
	return (overlay(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(overlay)