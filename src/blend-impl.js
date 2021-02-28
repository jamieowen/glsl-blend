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
  vec4
} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
export const blendAddVec3 = (base, blend) => min(add(base, blend), vec3(1));
export const blendAddVec4 = (base, blend) => min(add(base, blend), vec4(1));
export const blendAverageVec = (base, blend) => div(add(base, blend), float(2));
export const blendColorBurnFloat = (base, blend) => ternary(lte(blend, float(0)), blend, max(sub(float(1), div(sub(float(1), base), blend)), float(0)));
export const blendColorDodgeFloat = (base, blend) => ternary(gte(blend, float(1)), blend, min(div(base, sub(1, blend)), float(1)));
export const blendDarkenVec = (base, blend) => min(base, blend);
export const blendDifferenceVec = (base, blend) => abs(sub(base, blend));
export const blendExclusionVec = (base, blend) => add(base, sub(blend, mul(2, mul(base, blend))));
export const blendGlowFloat = (base, blend) => blendReflectFloat(blend, base);
export const blendHardLightFloat = (base, blend) => blendOverlayFloat(blend, base);
export const blendHardMixFloat = (base, blend) => ternary(lt(blendVividLightFloat(base, blend), float(0.5)), float(0), float(1));
export const blendLightenVec = (base, blend) => max(base, blend);
export const blendMultiplyVec = (base, blend) => mul(base, blend);
export const blendNegationVec = (base, blend) => sub(1, abs(sub(1, sub(base, blend))));
export const blendNormalVec = (base, blend) => blend;
export const blendOverlayFloat = (base, blend) => ternary(lt(base, float(0.5)), mul(2, mul(base, blend)), sub(1, mul(2, mul(sub(1, base), sub(1, blend)))));
export const blendReflectFloat = (base, blend) => ternary(gte(blend, float(1)), blend, min(div(mul(base, base), sub(1, blend)), float(1)));
export const blendVividLightFloat = (base, blend) => ternary(lt(base, float(0.5)), blendColorBurnFloat(base, mul(2, blend)), blendColorDodgeFloat(base, mul(2, sub(blend, 0.5))));
