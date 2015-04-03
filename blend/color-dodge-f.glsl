/**
 *
 * BlendColorDodgef
 *
 */

float blendColorDodgef(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

#pragma glslify: export(blendColorDodgef)