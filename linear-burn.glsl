float linearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}

vec3 linearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 linearBurn(vec3 base, vec3 blend, float opacity) {
	return (linearBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(linearBurn)