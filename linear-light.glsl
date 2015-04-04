#pragma glslify: linearDodge = require(./linear-dodge)
#pragma glslify: linearBurn = require(./linear-burn)

float linearLight(float base, float blend) {
	return blend<0.5?linearBurn(base,(2.0*blend)):linearDodge(base,(2.0*(blend-0.5)));
}

vec3 linearLight(vec3 base, vec3 blend) {
	return vec3(linearLight(base.r,blend.r),linearLight(base.g,blend.g),linearLight(base.b,blend.b));
}

vec3 linearLight(vec3 base, vec3 blend, float opacity) {
	return (linearLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(linearLight)