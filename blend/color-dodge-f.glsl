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