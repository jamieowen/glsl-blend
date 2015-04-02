/**
 *
 * BlendAddf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendAddf(float base, float blend) {
	return min(base+blend,1.0);
}

#pragma glslify: export(blendAddf)


/**
 *
 * BlendSubstractf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendSubstractf(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

#pragma glslify: export(blendSubstractf)


/**
 *
 * BlendLightenf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLightenf(float base, float blend) {
	return max(blend,base);
}

#pragma glslify: export(blendLightenf)


/**
 *
 * BlendDarkenf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendDarkenf(float base, float blend) {
	return min(blend,base);
}

#pragma glslify: export(blendDarkenf)


/**
 *
 * BlendLinearLightf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendLinearBurnf = require(./linear-burn-f)
#pragma glslify: blendLinearDodgef = require(./linear-dodge-f)

float blendLinearLightf(float base, float blend) {
	return blend<0.5?blendLinearBurnf(base,(2.0*blend)):blendLinearDodgef(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendLinearLightf)


/**
 *
 * BlendScreenf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendScreenf(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendScreenf)


/**
 *
 * BlendOverlayf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendOverlayf(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendOverlayf)


/**
 *
 * BlendSoftLightf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendSoftLightf(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

#pragma glslify: export(blendSoftLightf)


/**
 *
 * BlendColorDodgef
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendColorDodgef(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

#pragma glslify: export(blendColorDodgef)


/**
 *
 * BlendColorBurnf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendColorBurnf(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

#pragma glslify: export(blendColorBurnf)


/**
 *
 * BlendVividLightf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendColorBurnf = require(./color-burn-f)
#pragma glslify: blendColorDodgef = require(./color-dodge-f)

float blendVividLightf(float base, float blend) {
	return (blend<0.5)?blendColorBurnf(base,(2.0*blend)):blendColorDodgef(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendVividLightf)


/**
 *
 * BlendPinLightf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendDarkenf = require(./darken-f)
#pragma glslify: blendLightenf = require(./lighten-f)

float blendPinLightf(float base, float blend) {
	return (blend<0.5)?blendDarkenf(base,(2.0*blend)):blendLightenf(base,(2.0*(blend-0.5)));
}

#pragma glslify: export(blendPinLightf)


/**
 *
 * BlendHardMixf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendVividLightf = require(./vivid-light-f)

float blendHardMixf(float base, float blend) {
	return (blendVividLightf(base,blend)<0.5)?0.0:1.0;
}

#pragma glslify: export(blendHardMixf)


/**
 *
 * BlendReflectf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendReflectf(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

#pragma glslify: export(blendReflectf)


/**
 *
 * BlendNormal
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

#pragma glslify: export(blendNormal)


/**
 *
 * BlendMultiply
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

#pragma glslify: export(blendMultiply)


/**
 *
 * BlendAverage
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendAverage(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

#pragma glslify: export(blendAverage)


/**
 *
 * BlendAdd
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

#pragma glslify: export(blendAdd)


/**
 *
 * BlendSubstract
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendSubstract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendSubstract)


/**
 *
 * BlendDifference
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

#pragma glslify: export(blendDifference)


/**
 *
 * BlendNegation
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendNegation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

#pragma glslify: export(blendNegation)


/**
 *
 * BlendExclusion
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

#pragma glslify: export(blendExclusion)


/**
 *
 * BlendScreen
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendScreenf = require(./screen-f)

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreenf(base.r,blend.r),blendScreenf(base.g,blend.g),blendScreenf(base.b,blend.b));
}

#pragma glslify: export(blendScreen)


/**
 *
 * BlendOverlay
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendOverlayf = require(./overlay-f)

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlayf(base.r,blend.r),blendOverlayf(base.g,blend.g),blendOverlayf(base.b,blend.b));
}

#pragma glslify: export(blendOverlay)


/**
 *
 * BlendSoftLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendSoftLightf = require(./soft-light-f)

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLightf(base.r,blend.r),blendSoftLightf(base.g,blend.g),blendSoftLightf(base.b,blend.b));
}

#pragma glslify: export(blendSoftLight)


/**
 *
 * BlendHardLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendOverlay = require(./overlay)

vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

#pragma glslify: export(blendHardLight)


/**
 *
 * BlendColorDodge
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendColorDodgef = require(./color-dodge-f)

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodgef(base.r,blend.r),blendColorDodgef(base.g,blend.g),blendColorDodgef(base.b,blend.b));
}

#pragma glslify: export(blendColorDodge)


/**
 *
 * BlendColorBurn
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendColorBurnf = require(./color-burn-f)

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurnf(base.r,blend.r),blendColorBurnf(base.g,blend.g),blendColorBurnf(base.b,blend.b));
}

#pragma glslify: export(blendColorBurn)


/**
 *
 * BlendLinearLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendLinearLightf = require(./linear-light-f)

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLightf(base.r,blend.r),blendLinearLightf(base.g,blend.g),blendLinearLightf(base.b,blend.b));
}

#pragma glslify: export(blendLinearLight)


/**
 *
 * BlendVividLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendVividLightf = require(./vivid-light-f)

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLightf(base.r,blend.r),blendVividLightf(base.g,blend.g),blendVividLightf(base.b,blend.b));
}

#pragma glslify: export(blendVividLight)


/**
 *
 * BlendPinLight
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendPinLightf = require(./pin-light-f)

vec3 blendPinLight(vec3 base, vec3 blend) {
	return vec3(blendPinLightf(base.r,blend.r),blendPinLightf(base.g,blend.g),blendPinLightf(base.b,blend.b));
}

#pragma glslify: export(blendPinLight)


/**
 *
 * BlendHardMix
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendHardMixf = require(./hard-mix-f)

vec3 blendHardMix(vec3 base, vec3 blend) {
	return vec3(blendHardMixf(base.r,blend.r),blendHardMixf(base.g,blend.g),blendHardMixf(base.b,blend.b));
}

#pragma glslify: export(blendHardMix)


/**
 *
 * BlendReflect
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendReflectf = require(./reflect-f)

vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflectf(base.r,blend.r),blendReflectf(base.g,blend.g),blendReflectf(base.b,blend.b));
}

#pragma glslify: export(blendReflect)


/**
 *
 * BlendGlow
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

#pragma glslify: blendReflect = require(./reflect)

vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

#pragma glslify: export(blendGlow)


/**
 *
 * BlendPhoenix
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

#pragma glslify: export(blendPhoenix)


/**
 *
 * BlendLinearDodgef
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLinearDodgef(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

#pragma glslify: export(blendLinearDodgef)


/**
 *
 * BlendLinearBurnf
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLinearBurnf(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}

#pragma glslify: export(blendLinearBurnf)


/**
 *
 * BlendLighten
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendLighten(float base, float blend) {
	// Note : Same implementation as BlendLightenf
	return max(blend,base);
}

#pragma glslify: export(blendLighten)


/**
 *
 * BlendDarken
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

float blendDarken(float base, float blend) {
	// Note : Same implementation as BlendDarkenf
	return min(blend,base);
}

#pragma glslify: export(blendDarken)


/**
 *
 * BlendLinearDodge
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

#pragma glslify: export(blendLinearDodge)


/**
 *
 * BlendLinearBurn
 * 
 * The code here is generated using the ../source/convert.js script.
 * Modify that file to update.
 * Alternative implementations could be tried, for example : https://github.com/mattdesl/glsl-blend-soft-light
 *
 */

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendLinearBurn)


