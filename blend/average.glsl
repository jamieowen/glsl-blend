/**
 *
 * BlendAverage
 * 
 * Generated using the ../source/convert.js script.
 *
 */

vec3 blendAverage(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

#pragma glslify: export(blendAverage)