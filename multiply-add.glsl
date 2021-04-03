float blendMultiplyAdd(float base, float blend) {
	return min(base*blend+base,1.0);
}

vec3 blendMultiplyAdd(vec3 base, vec3 blend) {
	return min(base*blend+base,vec3(1.0));
}

vec3 blendMultiplyAdd(vec3 base, vec3 blend, float opacity) {
	return (blendMultiplyAdd(base, blend) * opacity + base * (1.0 - opacity));
}

#pragma glslify: export(blendMultiplyAdd)
