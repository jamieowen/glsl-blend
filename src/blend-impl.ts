import {
  abs,
  add,
  div,
  float,
  gte,
  lt,
  lte,
  max,
  min,
  mul,
  sub,
  ternary,
  vec3,
  vec4,
} from "@thi.ng/shader-ast";
import { BlendMode, BlendModeFloat, BlendModeVec } from "./api";

export const blendAddVec3: BlendModeVec<"vec3"> = (base, blend) =>
  min(add(base, blend), vec3(1.0));

export const blendAddVec4: BlendModeVec<"vec4"> = (base, blend) =>
  min(add(base, blend), vec4(1.0));

export const blendAverageVec: BlendModeVec<"vec3" | "vec4"> = (base, blend) =>
  div(add(base, blend), float(2.0));

export const blendColorBurnFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lte(blend, float(0.0)),
    blend,
    max(sub(float(1.0), div(sub(float(1.0), base), blend)), float(0.0))
  );

export const blendColorDodgeFloat: BlendModeFloat = (base, blend) =>
  ternary(
    gte(blend, float(1.0)),
    blend,
    min(div(base, sub(1.0, blend)), float(1.0))
  );

export const blendDarkenVec: BlendModeVec<"vec3" | "vec4"> = (base, blend) =>
  min(base, blend);

export const blendDifferenceVec: BlendModeVec<"vec3" | "vec4"> = (
  base,
  blend
) => abs(sub(base, blend));

export const blendExclusionVec: BlendModeVec<"vec3" | "vec4"> = (base, blend) =>
  add(base, sub(blend, mul(2.0, mul(base, blend))));

export const blendGlowFloat: BlendModeFloat = (base, blend) =>
  blendReflectFloat(blend, base);

export const blendHardLightFloat: BlendModeFloat = (base, blend) =>
  blendOverlayFloat(blend, base);

export const blendHardMixFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lt(blendVividLightFloat(base, blend), float(0.5)),
    float(0.0),
    float(1.0)
  );

export const blendOverlayFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lt(base, float(0.5)),
    mul(2.0, mul(base, blend)),
    sub(1.0, mul(2.0, mul(sub(1.0, base), sub(1.0, blend))))
  );

export const blendReflectFloat: BlendModeFloat = (base, blend) =>
  ternary(
    gte(blend, float(1.0)),
    blend,
    min(div(mul(base, base), sub(1.0, blend)), float(1.0))
  );

export const blendVividLightFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lt(base, float(0.5)),
    blendColorBurnFloat(base, mul(2.0, blend)),
    blendColorDodgeFloat(base, mul(2.0, sub(blend, 0.5)))
  );
