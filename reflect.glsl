float reflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 reflect(vec3 base, vec3 blend) {
	return vec3(reflect(base.r,blend.r),reflect(base.g,blend.g),reflect(base.b,blend.b));
}

vec3 reflect(vec3 base, vec3 blend, float opacity) {
	return (reflect(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(reflect)