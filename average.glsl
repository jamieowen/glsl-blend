vec3 average(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

vec3 average(vec3 base, vec3 blend, float opacity) {
	return (average(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(average)