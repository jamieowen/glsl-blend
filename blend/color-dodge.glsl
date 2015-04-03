/**
 *
 * BlendColorDodge
 *
 */

#pragma glslify: blendColorDodgef = require(./color-dodge-f)

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodgef(base.r,blend.r),blendColorDodgef(base.g,blend.g),blendColorDodgef(base.b,blend.b));
}

#pragma glslify: export(blendColorDodge)