float substract(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

vec3 substract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 substract(vec3 base, vec3 blend, float opacity) {
	return (substract(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(substract)