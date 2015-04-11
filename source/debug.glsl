float blendAdd(float base, float blend) {
	return min(base+blend,1.0);
}


float blendSubtract(float base, float blend) {
	return max(base+blend-1.0,0.0);
}


float blendLighten(float base, float blend) {
	return max(blend,base);
}


float blendDarken(float base, float blend) {
	return min(blend,base);
}


float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}


float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}


float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}


float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}


float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}


float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}


float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}


float blendPinLight(float base, float blend) {
	return (blend<0.5)?blendDarken(base,(2.0*blend)):blendLighten(base,(2.0*(blend-0.5)));
}


float blendHardMix(float base, float blend) {
	return (blendVividLight(base,blend)<0.5)?0.0:1.0;
}


float blendReflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}


vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}


vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}


vec3 blendDarken(vec3 base, vec3 blend) {
	return vec3(blendDarken(base.r,blend.r),blendDarken(base.g,blend.g),blendDarken(base.b,blend.b));
}


vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}


vec3 blendAverage(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}


vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}


vec3 blendSubtract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}


vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}


vec3 blendNegation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}


vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}


vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}


vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}


vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}


vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}


vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}


vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}


vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}


vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}


vec3 blendPinLight(vec3 base, vec3 blend) {
	return vec3(blendPinLight(base.r,blend.r),blendPinLight(base.g,blend.g),blendPinLight(base.b,blend.b));
}


vec3 blendHardMix(vec3 base, vec3 blend) {
	return vec3(blendHardMix(base.r,blend.r),blendHardMix(base.g,blend.g),blendHardMix(base.b,blend.b));
}


vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflect(base.r,blend.r),blendReflect(base.g,blend.g),blendReflect(base.b,blend.b));
}


vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}


vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}


float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}


float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}


vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}


vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}


vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendDarken(vec3 base, vec3 blend, float opacity) {
	return (blendDarken(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendAverage(vec3 base, vec3 blend, float opacity) {
	return (blendAverage(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendSubtract(vec3 base, vec3 blend, float opacity) {
	return (blendSubtract(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendDifference(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendNegation(vec3 base, vec3 blend, float opacity) {
	return (blendNegation(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendExclusion(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendPinLight(vec3 base, vec3 blend, float opacity) {
	return (blendPinLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendHardMix(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendReflect(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendGlow(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendPhoenix(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + blend * (1.0 - opacity));
}


