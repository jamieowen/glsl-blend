float add(float base, float blend) {
	return min(base+blend,1.0);
}


float substract(float base, float blend) {
	return max(base+blend-1.0,0.0);
}


float lighten(float base, float blend) {
	return max(blend,base);
}


float darken(float base, float blend) {
	return min(blend,base);
}


float linearLight(float base, float blend) {
	return blend<0.5?linearBurn(base,(2.0*blend)):linearDodge(base,(2.0*(blend-0.5)));
}


float screen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}


float overlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}


float softLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}


float colorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}


float colorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}


float vividLight(float base, float blend) {
	return (blend<0.5)?colorBurn(base,(2.0*blend)):colorDodge(base,(2.0*(blend-0.5)));
}


float pinLight(float base, float blend) {
	return (blend<0.5)?darken(base,(2.0*blend)):lighten(base,(2.0*(blend-0.5)));
}


float hardMix(float base, float blend) {
	return (vividLight(base,blend)<0.5)?0.0:1.0;
}


float reflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}


vec3 normal(vec3 base, vec3 blend) {
	return blend;
}


vec3 multiply(vec3 base, vec3 blend) {
	return base*blend;
}


vec3 average(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}


vec3 add(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}


vec3 substract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}


vec3 difference(vec3 base, vec3 blend) {
	return abs(base-blend);
}


vec3 negation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}


vec3 exclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}


vec3 screen(vec3 base, vec3 blend) {
	return vec3(screen(base.r,blend.r),screen(base.g,blend.g),screen(base.b,blend.b));
}


vec3 overlay(vec3 base, vec3 blend) {
	return vec3(overlay(base.r,blend.r),overlay(base.g,blend.g),overlay(base.b,blend.b));
}


vec3 softLight(vec3 base, vec3 blend) {
	return vec3(softLight(base.r,blend.r),softLight(base.g,blend.g),softLight(base.b,blend.b));
}


vec3 hardLight(vec3 base, vec3 blend) {
	return overlay(blend,base);
}


vec3 colorDodge(vec3 base, vec3 blend) {
	return vec3(colorDodge(base.r,blend.r),colorDodge(base.g,blend.g),colorDodge(base.b,blend.b));
}


vec3 colorBurn(vec3 base, vec3 blend) {
	return vec3(colorBurn(base.r,blend.r),colorBurn(base.g,blend.g),colorBurn(base.b,blend.b));
}


vec3 linearLight(vec3 base, vec3 blend) {
	return vec3(linearLight(base.r,blend.r),linearLight(base.g,blend.g),linearLight(base.b,blend.b));
}


vec3 vividLight(vec3 base, vec3 blend) {
	return vec3(vividLight(base.r,blend.r),vividLight(base.g,blend.g),vividLight(base.b,blend.b));
}


vec3 pinLight(vec3 base, vec3 blend) {
	return vec3(pinLight(base.r,blend.r),pinLight(base.g,blend.g),pinLight(base.b,blend.b));
}


vec3 hardMix(vec3 base, vec3 blend) {
	return vec3(hardMix(base.r,blend.r),hardMix(base.g,blend.g),hardMix(base.b,blend.b));
}


vec3 reflect(vec3 base, vec3 blend) {
	return vec3(reflect(base.r,blend.r),reflect(base.g,blend.g),reflect(base.b,blend.b));
}


vec3 glow(vec3 base, vec3 blend) {
	return reflect(blend,base);
}


vec3 phoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}


float linearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}


float linearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubstractf
	return max(base+blend-1.0,0.0);
}


float lighten(float base, float blend) {
	// Note : Same implementation as BlendLightenf
	return max(blend,base);
}


float darken(float base, float blend) {
	// Note : Same implementation as BlendDarkenf
	return min(blend,base);
}


vec3 linearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}


vec3 linearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubstract
	return max(base+blend-vec3(1.0),vec3(0.0));
}


vec3 normal(vec3 base, vec3 blend, float opacity) {
	return (normal(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 multiply(vec3 base, vec3 blend, float opacity) {
	return (multiply(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 average(vec3 base, vec3 blend, float opacity) {
	return (average(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 add(vec3 base, vec3 blend, float opacity) {
	return (add(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 substract(vec3 base, vec3 blend, float opacity) {
	return (substract(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 difference(vec3 base, vec3 blend, float opacity) {
	return (difference(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 negation(vec3 base, vec3 blend, float opacity) {
	return (negation(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 exclusion(vec3 base, vec3 blend, float opacity) {
	return (exclusion(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 screen(vec3 base, vec3 blend, float opacity) {
	return (screen(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 overlay(vec3 base, vec3 blend, float opacity) {
	return (overlay(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 softLight(vec3 base, vec3 blend, float opacity) {
	return (softLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 hardLight(vec3 base, vec3 blend, float opacity) {
	return (hardLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 colorDodge(vec3 base, vec3 blend, float opacity) {
	return (colorDodge(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 colorBurn(vec3 base, vec3 blend, float opacity) {
	return (colorBurn(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 linearLight(vec3 base, vec3 blend, float opacity) {
	return (linearLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 vividLight(vec3 base, vec3 blend, float opacity) {
	return (vividLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 pinLight(vec3 base, vec3 blend, float opacity) {
	return (pinLight(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 hardMix(vec3 base, vec3 blend, float opacity) {
	return (hardMix(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 reflect(vec3 base, vec3 blend, float opacity) {
	return (reflect(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 glow(vec3 base, vec3 blend, float opacity) {
	return (glow(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 phoenix(vec3 base, vec3 blend, float opacity) {
	return (phoenix(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 linearDodge(vec3 base, vec3 blend, float opacity) {
	return (linearDodge(base, blend) * opacity + blend * (1.0 - opacity));
}


vec3 linearBurn(vec3 base, vec3 blend, float opacity) {
	return (linearBurn(base, blend) * opacity + blend * (1.0 - opacity));
}


