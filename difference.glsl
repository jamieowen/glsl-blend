vec3 difference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 difference(vec3 base, vec3 blend, float opacity) {
	return (difference(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(difference)