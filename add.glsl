float add(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 add(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 add(vec3 base, vec3 blend, float opacity) {
	return (add(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(add)