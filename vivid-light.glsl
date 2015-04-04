#pragma glslify: colorDodge = require(./color-dodge)
#pragma glslify: colorBurn = require(./color-burn)

float vividLight(float base, float blend) {
	return (blend<0.5)?colorBurn(base,(2.0*blend)):colorDodge(base,(2.0*(blend-0.5)));
}

vec3 vividLight(vec3 base, vec3 blend) {
	return vec3(vividLight(base.r,blend.r),vividLight(base.g,blend.g),vividLight(base.b,blend.b));
}

vec3 vividLight(vec3 base, vec3 blend, float opacity) {
	return (vividLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(vividLight)