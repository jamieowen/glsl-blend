vec3 multiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 multiply(vec3 base, vec3 blend, float opacity) {
	return (multiply(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(multiply)