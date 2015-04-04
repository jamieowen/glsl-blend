float darken(float base, float blend) {
	return min(blend,base);
}

float darken(float base, float blend) {
	// Note : Same implementation as BlendDarkenf
	return min(blend,base);
}

#pragma glslify: export(darken)