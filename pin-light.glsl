#pragma glslify: lighten = require(./lighten)
#pragma glslify: darken = require(./darken)

float pinLight(float base, float blend) {
	return (blend<0.5)?darken(base,(2.0*blend)):lighten(base,(2.0*(blend-0.5)));
}

vec3 pinLight(vec3 base, vec3 blend) {
	return vec3(pinLight(base.r,blend.r),pinLight(base.g,blend.g),pinLight(base.b,blend.b));
}

vec3 pinLight(vec3 base, vec3 blend, float opacity) {
	return (pinLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(pinLight)