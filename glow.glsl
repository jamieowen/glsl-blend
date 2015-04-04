#pragma glslify: reflect = require(./reflect)

vec3 glow(vec3 base, vec3 blend) {
	return reflect(blend,base);
}

vec3 glow(vec3 base, vec3 blend, float opacity) {
	return (glow(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(glow)