/**
 *
 * BlendReflectf
 * 
 * Generated using the ../source/convert.js script.
 *
 */

float blendReflectf(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

#pragma glslify: export(blendReflectf)