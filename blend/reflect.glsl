/**
 *
 * BlendReflect
 * 
 * Generated using the ../source/convert.js script.
 *
 */

#pragma glslify: blendReflectf = require(./reflect-f)

vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflectf(base.r,blend.r),blendReflectf(base.g,blend.g),blendReflectf(base.b,blend.b));
}

#pragma glslify: export(blendReflect)