import {$w, $x, $y, $z, vec3, vec4} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
export const blendFloatToVec3 = (blendFloat) => (base, blend) => vec3(blendFloat($x(base), $x(blend)), blendFloat($y(base), $y(blend)), blendFloat($z(base), $z(blend)));
export const blendFloatToVec4 = (blendFloat) => (base, blend) => vec4(blendFloat($x(base), $x(blend)), blendFloat($y(base), $y(blend)), blendFloat($z(base), $z(blend)), blendFloat($w(base), $w(blend)));
