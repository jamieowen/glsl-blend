#pragma glslify: vividLight = require(./vivid-light)

float hardMix(float base, float blend) {
	return (vividLight(base,blend)<0.5)?0.0:1.0;
}

vec3 hardMix(vec3 base, vec3 blend) {
	return vec3(hardMix(base.r,blend.r),hardMix(base.g,blend.g),hardMix(base.b,blend.b));
}

vec3 hardMix(vec3 base, vec3 blend, float opacity) {
	return (hardMix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(hardMix)