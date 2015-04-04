vec3 negation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

vec3 negation(vec3 base, vec3 blend, float opacity) {
	return (negation(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(negation)