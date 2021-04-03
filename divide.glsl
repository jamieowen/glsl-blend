float blendDivide(float base, float blend) {
	return (blend==1.0)?blend:min(base/blend,1.0);
}

vec3 blendDivide(vec3 base, vec3 blend) {
	return vec3(blendDivide(base.r,blend.r),blendDivide(base.g,blend.g),blendDivide(base.b,blend.b));
}

vec3 blendDivide(vec3 base, vec3 blend, float opacity) {
	return (blendDivide(base, blend) * opacity + base * (1.0 - opacity));
}

#pragma glslify: export(blendDivide)
