float colorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 colorBurn(vec3 base, vec3 blend) {
	return vec3(colorBurn(base.r,blend.r),colorBurn(base.g,blend.g),colorBurn(base.b,blend.b));
}

vec3 colorBurn(vec3 base, vec3 blend, float opacity) {
	return (colorBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(colorBurn)