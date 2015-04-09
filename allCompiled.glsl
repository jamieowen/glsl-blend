#define GLSLIFY 1

float blendColorDodge_11_0(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge_11_0(vec3 base, vec3 blend) {
	return vec3(blendColorDodge_11_0(base.r,blend.r),blendColorDodge_11_0(base.g,blend.g),blendColorDodge_11_0(base.b,blend.b));
}

vec3 blendColorDodge_11_0(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge_11_0(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendColorBurn_12_1(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn_12_1(vec3 base, vec3 blend) {
	return vec3(blendColorBurn_12_1(base.r,blend.r),blendColorBurn_12_1(base.g,blend.g),blendColorBurn_12_1(base.b,blend.b));
}

vec3 blendColorBurn_12_1(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn_12_1(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendVividLight_2_2(float base, float blend) {
	return (blend<0.5)?blendColorBurn_12_1(base,(2.0*blend)):blendColorDodge_11_0(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight_2_2(vec3 base, vec3 blend) {
	return vec3(blendVividLight_2_2(base.r,blend.r),blendVividLight_2_2(base.g,blend.g),blendVividLight_2_2(base.b,blend.b));
}

vec3 blendVividLight_2_2(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight_2_2(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendHardMix_1_3(float base, float blend) {
	return (blendVividLight_2_2(base,blend)<0.5)?0.0:1.0;
}

vec3 blendHardMix_1_3(vec3 base, vec3 blend) {
	return vec3(blendHardMix_1_3(base.r,blend.r),blendHardMix_1_3(base.g,blend.g),blendHardMix_1_3(base.b,blend.b));
}

vec3 blendHardMix_1_3(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix_1_3(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendLinearDodge_13_4(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge_13_4(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge_13_4(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge_13_4(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendLinearBurn_14_5(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn_14_5(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn_14_5(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn_14_5(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendLinearLight_3_6(float base, float blend) {
	return blend<0.5?blendLinearBurn_14_5(base,(2.0*blend)):blendLinearDodge_13_4(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight_3_6(vec3 base, vec3 blend) {
	return vec3(blendLinearLight_3_6(base.r,blend.r),blendLinearLight_3_6(base.g,blend.g),blendLinearLight_3_6(base.b,blend.b));
}

vec3 blendLinearLight_3_6(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight_3_6(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendLighten_15_7(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten_15_7(vec3 base, vec3 blend) {
	return vec3(blendLighten_15_7(base.r,blend.r),blendLighten_15_7(base.g,blend.g),blendLighten_15_7(base.b,blend.b));
}

vec3 blendLighten_15_7(vec3 base, vec3 blend, float opacity) {
	return (blendLighten_15_7(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendDarken_16_8(float base, float blend) {
	return min(blend,base);
}

vec3 blendDarken_16_8(vec3 base, vec3 blend) {
	return vec3(blendDarken_16_8(base.r,blend.r),blendDarken_16_8(base.g,blend.g),blendDarken_16_8(base.b,blend.b));
}

vec3 blendDarken_16_8(vec3 base, vec3 blend, float opacity) {
	return (blendDarken_16_8(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendPinLight_4_9(float base, float blend) {
	return (blend<0.5)?blendDarken_16_8(base,(2.0*blend)):blendLighten_15_7(base,(2.0*(blend-0.5)));
}

vec3 blendPinLight_4_9(vec3 base, vec3 blend) {
	return vec3(blendPinLight_4_9(base.r,blend.r),blendPinLight_4_9(base.g,blend.g),blendPinLight_4_9(base.b,blend.b));
}

vec3 blendPinLight_4_9(vec3 base, vec3 blend, float opacity) {
	return (blendPinLight_4_9(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendReflect_17_10(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 blendReflect_17_10(vec3 base, vec3 blend) {
	return vec3(blendReflect_17_10(base.r,blend.r),blendReflect_17_10(base.g,blend.g),blendReflect_17_10(base.b,blend.b));
}

vec3 blendReflect_17_10(vec3 base, vec3 blend, float opacity) {
	return (blendReflect_17_10(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendGlow_5_11(vec3 base, vec3 blend) {
	return blendReflect_17_10(blend,base);
}

vec3 blendGlow_5_11(vec3 base, vec3 blend, float opacity) {
	return (blendGlow_5_11(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendOverlay_8_12(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay_8_12(vec3 base, vec3 blend) {
	return vec3(blendOverlay_8_12(base.r,blend.r),blendOverlay_8_12(base.g,blend.g),blendOverlay_8_12(base.b,blend.b));
}

vec3 blendOverlay_8_12(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay_8_12(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendHardLight_6_13(vec3 base, vec3 blend) {
	return blendOverlay_8_12(blend,base);
}

vec3 blendHardLight_6_13(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight_6_13(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendPhoenix_7_14(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

vec3 blendPhoenix_7_14(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix_7_14(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendNormal_9_15(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal_9_15(vec3 base, vec3 blend, float opacity) {
	return (blendNormal_9_15(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendNegation_10_16(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

vec3 blendNegation_10_16(vec3 base, vec3 blend, float opacity) {
	return (blendNegation_10_16(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendMultiply_18_17(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply_18_17(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply_18_17(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendAverage_19_18(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

vec3 blendAverage_19_18(vec3 base, vec3 blend, float opacity) {
	return (blendAverage_19_18(base, blend) * opacity + blend * (1.0 - opacity));
}




float blendScreen_20_19(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen_20_19(vec3 base, vec3 blend) {
	return vec3(blendScreen_20_19(base.r,blend.r),blendScreen_20_19(base.g,blend.g),blendScreen_20_19(base.b,blend.b));
}

vec3 blendScreen_20_19(vec3 base, vec3 blend, float opacity) {
	return (blendScreen_20_19(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendSoftLight_21_20(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight_21_20(vec3 base, vec3 blend) {
	return vec3(blendSoftLight_21_20(base.r,blend.r),blendSoftLight_21_20(base.g,blend.g),blendSoftLight_21_20(base.b,blend.b));
}

vec3 blendSoftLight_21_20(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight_21_20(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendSubstract_22_21(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

vec3 blendSubstract_22_21(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendSubstract_22_21(vec3 base, vec3 blend, float opacity) {
	return (blendSubstract_22_21(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendExclusion_23_22(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

vec3 blendExclusion_23_22(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion_23_22(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendDifference_24_23(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 blendDifference_24_23(vec3 base, vec3 blend, float opacity) {
	return (blendDifference_24_23(base, blend) * opacity + blend * (1.0 - opacity));
}





float blendAdd_25_24(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 blendAdd_25_24(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 blendAdd_25_24(vec3 base, vec3 blend, float opacity) {
	return (blendAdd_25_24(base, blend) * opacity + blend * (1.0 - opacity));
}





vec3 blendMode( int mode, vec3 base, vec3 blend ){
	if( mode == 1 ){
		return blendAdd_25_24( base, blend );
	}else
	if( mode == 2 ){
		return blendAverage_19_18( base, blend );
	}else
	if( mode == 3 ){
		return blendColorBurn_12_1( base, blend );
	}else
	if( mode == 4 ){
		return blendColorDodge_11_0( base, blend );
	}else
	if( mode == 5 ){
		return blendDarken_16_8( base, blend );
	}else
	if( mode == 6 ){
		return blendDifference_24_23( base, blend );
	}else
	if( mode == 7 ){
		return blendExclusion_23_22( base, blend );
	}else
	if( mode == 8 ){
		return blendGlow_5_11( base, blend );
	}else
	if( mode == 9 ){
		return blendHardLight_6_13( base, blend );
	}else
	if( mode == 10 ){
		return blendHardMix_1_3( base, blend );
	}else
	if( mode == 11 ){
		return blendLighten_15_7( base, blend );
	}else
	if( mode == 12 ){
		return blendLinearBurn_14_5( base, blend );
	}else
	if( mode == 13 ){
		return blendLinearDodge_13_4( base, blend );
	}else
	if( mode == 14 ){
		return blendLinearLight_3_6( base, blend );
	}else
	if( mode == 15 ){
		return blendMultiply_18_17( base, blend );
	}else
	if( mode == 16 ){
		return blendNegation_10_16( base, blend );
	}else
	if( mode == 17 ){
		return blendNormal_9_15( base, blend );
	}else
	if( mode == 18 ){
		return blendOverlay_8_12( base, blend );
	}else
	if( mode == 19 ){
		return blendPhoenix_7_14( base, blend );
	}else
	if( mode == 20 ){
		return blendPinLight_4_9( base, blend );
	}else
	if( mode == 21 ){
		return blendReflect_17_10( base, blend );
	}else
	if( mode == 22 ){
		return blendScreen_20_19( base, blend );
	}else
	if( mode == 23 ){
		return blendSoftLight_21_20( base, blend );
	}else
	if( mode == 24 ){
		return blendSubstract_22_21( base, blend );
	}else
	if( mode == 25 ){
		return blendVividLight_2_2( base, blend );
	}
}
