vec3 normal(vec3 base, vec3 blend) {
	return blend;
}

vec3 normal(vec3 base, vec3 blend, float opacity) {
	return (normal(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(normal)