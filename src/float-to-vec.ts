import { $w, $x, $y, $z, vec3, vec4 } from "@thi.ng/shader-ast";
import { BlendModeFloat, BlendModeVec } from "./api";

export const blendFloatToVec3 = (
  blendFloat: BlendModeFloat
): BlendModeVec<"vec3"> => (base, blend) =>
  vec3(
    blendFloat($x(base), $x(blend)),
    blendFloat($y(base), $y(blend)),
    blendFloat($z(base), $z(blend))
  );

export const blendFloatToVec4 = (
  blendFloat: BlendModeFloat
): BlendModeVec<"vec4"> => (base, blend) =>
  vec4(
    blendFloat($x(base), $x(blend)),
    blendFloat($y(base), $y(blend)),
    blendFloat($z(base), $z(blend)),
    blendFloat($w(base), $w(blend))
  );
