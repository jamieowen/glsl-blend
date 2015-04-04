float linearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 linearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 linearDodge(vec3 base, vec3 blend, float opacity) {
	return (linearDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(linearDodge)