#pragma glslify: overlay = require(./overlay)

vec3 hardLight(vec3 base, vec3 blend) {
	return overlay(blend,base);
}

vec3 hardLight(vec3 base, vec3 blend, float opacity) {
	return (hardLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(hardLight)