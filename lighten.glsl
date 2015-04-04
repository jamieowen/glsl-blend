float lighten(float base, float blend) {
	return max(blend,base);
}

float lighten(float base, float blend) {
	// Note : Same implementation as BlendLightenf
	return max(blend,base);
}

#pragma glslify: export(lighten)