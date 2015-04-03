/**
 *
 * BlendAddf
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
 */

float blendSubstractf(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

#pragma glslify: export(blendSubstractf)


/**
 *
 * BlendLightenf
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
 */

float blendDarkenf(float base, float blend) {
	return min(blend,base);
}

#pragma glslify: export(blendDarkenf)


/**
 *
 * BlendLinearLightf
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
 */

float blendScreenf(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

#pragma glslify: export(blendScreenf)


/**
 *
 * BlendOverlayf
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
 */

float blendSoftLightf(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

#pragma glslify: export(blendSoftLightf)


/**
 *
 * BlendColorDodgef
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
 */

float blendColorBurnf(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

#pragma glslify: export(blendColorBurnf)


/**
 *
 * BlendVividLightf
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
 */

float blendReflectf(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

#pragma glslify: export(blendReflectf)


/**
 *
 * BlendNormal
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
 */

vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

#pragma glslify: export(blendMultiply)


/**
 *
 * BlendAverage
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
 */

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

#pragma glslify: export(blendAdd)


/**
 *
 * BlendSubstract
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
 */

vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

#pragma glslify: export(blendDifference)


/**
 *
 * BlendNegation
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
 */

vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

#pragma glslify: export(blendExclusion)


/**
 *
 * BlendScreen
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
 */

vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

#pragma glslify: export(blendPhoenix)


/**
 *
 * BlendLinearDodgef
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
 */

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

#pragma glslify: export(blendLinearBurn)


/**
 *
 * BlendNormalo
 *
 */

#pragma glslify: blendNormal = require(./normal)

vec3 blendNormalo(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendNormalo)


/**
 *
 * BlendMultiplyo
 *
 */

#pragma glslify: blendMultiply = require(./multiply)

vec3 blendMultiplyo(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendMultiplyo)


/**
 *
 * BlendAverageo
 *
 */

#pragma glslify: blendAverage = require(./average)

vec3 blendAverageo(vec3 base, vec3 blend, float opacity) {
	return (blendAverage(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendAverageo)


/**
 *
 * BlendAddo
 *
 */

#pragma glslify: blendAdd = require(./add)

vec3 blendAddo(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendAddo)


/**
 *
 * BlendSubstracto
 *
 */

#pragma glslify: blendSubstract = require(./substract)

vec3 blendSubstracto(vec3 base, vec3 blend, float opacity) {
	return (blendSubstract(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendSubstracto)


/**
 *
 * BlendDifferenceo
 *
 */

#pragma glslify: blendDifference = require(./difference)

vec3 blendDifferenceo(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendDifferenceo)


/**
 *
 * BlendNegationo
 *
 */

#pragma glslify: blendNegation = require(./negation)

vec3 blendNegationo(vec3 base, vec3 blend, float opacity) {
	return (blendNegation(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendNegationo)


/**
 *
 * BlendExclusiono
 *
 */

#pragma glslify: blendExclusion = require(./exclusion)

vec3 blendExclusiono(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendExclusiono)


/**
 *
 * BlendScreeno
 *
 */

#pragma glslify: blendScreen = require(./screen)

vec3 blendScreeno(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendScreeno)


/**
 *
 * BlendOverlayo
 *
 */

#pragma glslify: blendOverlay = require(./overlay)

vec3 blendOverlayo(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendOverlayo)


/**
 *
 * BlendSoftLighto
 *
 */

#pragma glslify: blendSoftLight = require(./soft-light)

vec3 blendSoftLighto(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendSoftLighto)


/**
 *
 * BlendHardLighto
 *
 */

#pragma glslify: blendHardLight = require(./hard-light)

vec3 blendHardLighto(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendHardLighto)


/**
 *
 * BlendColorDodgeo
 *
 */

#pragma glslify: blendColorDodge = require(./color-dodge)

vec3 blendColorDodgeo(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendColorDodgeo)


/**
 *
 * BlendColorBurno
 *
 */

#pragma glslify: blendColorBurn = require(./color-burn)

vec3 blendColorBurno(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendColorBurno)


/**
 *
 * BlendLinearLighto
 *
 */

#pragma glslify: blendLinearLight = require(./linear-light)

vec3 blendLinearLighto(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearLighto)


/**
 *
 * BlendVividLighto
 *
 */

#pragma glslify: blendVividLight = require(./vivid-light)

vec3 blendVividLighto(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendVividLighto)


/**
 *
 * BlendPinLighto
 *
 */

#pragma glslify: blendPinLight = require(./pin-light)

vec3 blendPinLighto(vec3 base, vec3 blend, float opacity) {
	return (blendPinLight(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendPinLighto)


/**
 *
 * BlendHardMixo
 *
 */

#pragma glslify: blendHardMix = require(./hard-mix)

vec3 blendHardMixo(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendHardMixo)


/**
 *
 * BlendReflecto
 *
 */

#pragma glslify: blendReflect = require(./reflect)

vec3 blendReflecto(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendReflecto)


/**
 *
 * BlendGlowo
 *
 */

#pragma glslify: blendGlow = require(./glow)

vec3 blendGlowo(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendGlowo)


/**
 *
 * BlendPhoenixo
 *
 */

#pragma glslify: blendPhoenix = require(./phoenix)

vec3 blendPhoenixo(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendPhoenixo)


/**
 *
 * BlendLinearDodgeo
 *
 */

#pragma glslify: blendLinearDodge = require(./linear-dodge)

vec3 blendLinearDodgeo(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearDodgeo)


/**
 *
 * BlendLinearBurno
 *
 */

#pragma glslify: blendLinearBurn = require(./linear-burn)

vec3 blendLinearBurno(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + blend * (1.0 - opacity));
}

#pragma glslify: export(blendLinearBurno)


