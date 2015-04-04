vec3 exclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

vec3 exclusion(vec3 base, vec3 blend, float opacity) {
	return (exclusion(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(exclusion)