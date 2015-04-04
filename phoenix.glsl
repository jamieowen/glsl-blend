vec3 phoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

vec3 phoenix(vec3 base, vec3 blend, float opacity) {
	return (phoenix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(phoenix)