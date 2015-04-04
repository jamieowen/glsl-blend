/**
 *
 * BlendColorBurnf
 *
 */

float blendColorBurnf(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

#pragma glslify: export(blendColorBurnf)