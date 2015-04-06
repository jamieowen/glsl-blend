#define GLSLIFY 1

float blendAdd_1_0(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 blendAdd_1_0(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 blendAdd_1_0(vec3 base, vec3 blend, float opacity) {
	return (blendAdd_1_0(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendAverage_2_1(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

vec3 blendAverage_2_1(vec3 base, vec3 blend, float opacity) {
	return (blendAverage_2_1(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendColorBurn_3_2(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn_3_2(vec3 base, vec3 blend) {
	return vec3(blendColorBurn_3_2(base.r,blend.r),blendColorBurn_3_2(base.g,blend.g),blendColorBurn_3_2(base.b,blend.b));
}

vec3 blendColorBurn_3_2(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn_3_2(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendColorDodge_4_3(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge_4_3(vec3 base, vec3 blend) {
	return vec3(blendColorDodge_4_3(base.r,blend.r),blendColorDodge_4_3(base.g,blend.g),blendColorDodge_4_3(base.b,blend.b));
}

vec3 blendColorDodge_4_3(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge_4_3(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendDarken_5_4(float base, float blend) {
	return min(blend,base);
}

vec3 blendDarken_5_4(vec3 base, vec3 blend) {
	return vec3(blendDarken_5_4(base.r,blend.r),blendDarken_5_4(base.g,blend.g),blendDarken_5_4(base.b,blend.b));
}

vec3 blendDarken_5_4(vec3 base, vec3 blend, float opacity) {
	return (blendDarken_5_4(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendDifference_6_5(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 blendDifference_6_5(vec3 base, vec3 blend, float opacity) {
	return (blendDifference_6_5(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendExclusion_7_6(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

vec3 blendExclusion_7_6(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion_7_6(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendReflect_17_7(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 blendReflect_17_7(vec3 base, vec3 blend) {
	return vec3(blendReflect_17_7(base.r,blend.r),blendReflect_17_7(base.g,blend.g),blendReflect_17_7(base.b,blend.b));
}

vec3 blendReflect_17_7(vec3 base, vec3 blend, float opacity) {
	return (blendReflect_17_7(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendGlow_8_8(vec3 base, vec3 blend) {
	return blendReflect_17_7(blend,base);
}

vec3 blendGlow_8_8(vec3 base, vec3 blend, float opacity) {
	return (blendGlow_8_8(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendOverlay_18_9(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay_18_9(vec3 base, vec3 blend) {
	return vec3(blendOverlay_18_9(base.r,blend.r),blendOverlay_18_9(base.g,blend.g),blendOverlay_18_9(base.b,blend.b));
}

vec3 blendOverlay_18_9(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay_18_9(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendHardLight_9_10(vec3 base, vec3 blend) {
	return blendOverlay_18_9(blend,base);
}

vec3 blendHardLight_9_10(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight_9_10(base, blend) * opacity + blend * (1.0 - opacity));
}





float blendVividLight_19_11(float base, float blend) {
	return (blend<0.5)?blendColorBurn_3_2_19_12(base,(2.0*blend)):blendColorDodge_4_3_19_13(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight_19_11(vec3 base, vec3 blend) {
	return vec3(blendVividLight_19_11(base.r,blend.r),blendVividLight_19_11(base.g,blend.g),blendVividLight_19_11(base.b,blend.b));
}

vec3 blendVividLight_19_11(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight_19_11(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendHardMix_10_14(float base, float blend) {
	return (blendVividLight_19_11(base,blend)<0.5)?0.0:1.0;
}

vec3 blendHardMix_10_14(vec3 base, vec3 blend) {
	return vec3(blendHardMix_10_14(base.r,blend.r),blendHardMix_10_14(base.g,blend.g),blendHardMix_10_14(base.b,blend.b));
}

vec3 blendHardMix_10_14(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix_10_14(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendLighten_11_15(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten_11_15(vec3 base, vec3 blend) {
	return vec3(blendLighten_11_15(base.r,blend.r),blendLighten_11_15(base.g,blend.g),blendLighten_11_15(base.b,blend.b));
}

vec3 blendLighten_11_15(vec3 base, vec3 blend, float opacity) {
	return (blendLighten_11_15(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendLinearBurn_12_16(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn_12_16(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn_12_16(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn_12_16(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendLinearDodge_13_17(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge_13_17(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge_13_17(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge_13_17(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendMultiply_14_18(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply_14_18(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply_14_18(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendNegation_15_19(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

vec3 blendNegation_15_19(vec3 base, vec3 blend, float opacity) {
	return (blendNegation_15_19(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 blendNormal_16_20(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal_16_20(vec3 base, vec3 blend, float opacity) {
	return (blendNormal_16_20(base, blend) * opacity + blend * (1.0 - opacity));
}



vec3 blendPhoenix_20_21(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

vec3 blendPhoenix_20_21(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix_20_21(base, blend) * opacity + blend * (1.0 - opacity));
}



float blendScreen_21_22(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen_21_22(vec3 base, vec3 blend) {
	return vec3(blendScreen_21_22(base.r,blend.r),blendScreen_21_22(base.g,blend.g),blendScreen_21_22(base.b,blend.b));
}

vec3 blendScreen_21_22(vec3 base, vec3 blend, float opacity) {
	return (blendScreen_21_22(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendSoftLight_22_23(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight_22_23(vec3 base, vec3 blend) {
	return vec3(blendSoftLight_22_23(base.r,blend.r),blendSoftLight_22_23(base.g,blend.g),blendSoftLight_22_23(base.b,blend.b));
}

vec3 blendSoftLight_22_23(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight_22_23(base, blend) * opacity + blend * (1.0 - opacity));
}


float blendSubstract_23_24(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

vec3 blendSubstract_23_24(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendSubstract_23_24(vec3 base, vec3 blend, float opacity) {
	return (blendSubstract_23_24(base, blend) * opacity + blend * (1.0 - opacity));
}




vec3 blendMode( int mode, vec3 base, vec3 blend ){
	if( mode == 1 ){
		return blendAdd_1_0( base, blend );
	}else
	if( mode == 2 ){
		return blendAverage_2_1( base, blend );
	}else
	if( mode == 3 ){
		return blendColorBurn_3_2( base, blend );
	}else
	if( mode == 4 ){
		return blendColorDodge_4_3( base, blend );
	}else
	if( mode == 5 ){
		return blendDarken_5_4( base, blend );
	}else
	if( mode == 6 ){
		return blendDifference_6_5( base, blend );
	}else
	if( mode == 7 ){
		return blendExclusion_7_6( base, blend );
	}else
	if( mode == 8 ){
		return blendGlow_8_8( base, blend );
	}else
	if( mode == 9 ){
		return blendHardLight_9_10( base, blend );
	}else
	if( mode == 10 ){
		return blendHardMix_10_14( base, blend );
	}else
	if( mode == 11 ){
		return blendLighten_11_15( base, blend );
	}else
	if( mode == 12 ){
		return blendLinearBurn_12_16( base, blend );
	}else
	if( mode == 13 ){
		return blendLinearDodge_13_17( base, blend );
	}else
	if( mode == 14 ){
		// ( problem with this ) return blendLinearLight( base, blend );
	}else
	if( mode == 15 ){
		return blendMultiply_14_18( base, blend );
	}else
	if( mode == 16 ){
		return blendNegation_15_19( base, blend );
	}else
	if( mode == 17 ){
		return blendNormal_16_20( base, blend );
	}else
	if( mode == 18 ){
		return blendOverlay_18_9( base, blend );
	}else
	if( mode == 19 ){
		return blendPhoenix_20_21( base, blend );
	}else
	if( mode == 20 ){
		// ( problem with this ) return blendPinLight( base, blend );
	}else
	if( mode == 21 ){
		return blendReflect_17_7( base, blend );
	}else
	if( mode == 22 ){
		return blendScreen_21_22( base, blend );
	}else
	if( mode == 23 ){
		return blendSoftLight_22_23( base, blend );
	}else
	if( mode == 24 ){
		return blendSubstract_23_24( base, blend );
	}else
	if( mode == 25 ){
		// ( problem with this ) return blendVividLight( base, blend );
	}
}
