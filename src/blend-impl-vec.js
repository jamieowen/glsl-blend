import {
  abs,
  add,
  div,
  FLOAT0,
  FLOAT05,
  FLOAT1,
  FLOAT2,
  max,
  min,
  mix,
  mul,
  step,
  sub,
  vec3,
  vec4
} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
const asVec = (base, x) => (base.type === "vec3" ? vec3 : vec4)(x);
export function blendAddVec(base, blend) {
  return min(add(base, blend), asVec(base, FLOAT1));
}
export function blendAverageVec(base, blend) {
  return div(add(base, blend), FLOAT2);
}
export function blendColorBurnVec(base, blend) {
  const zero = asVec(base, FLOAT0);
  return mix(blend, max(sub(FLOAT1, div(sub(FLOAT1, base), blend)), zero), step(zero, blend));
}
export function blendColorDodgeVec(base, blend) {
  const one = asVec(base, FLOAT1);
  return mix(min(div(base, sub(FLOAT1, blend)), one), blend, step(one, blend));
}
export function blendDarkenVec(base, blend) {
  return min(base, blend);
}
export function blendDifferenceVec(base, blend) {
  return abs(sub(base, blend));
}
export function blendExclusionVec(base, blend) {
  return add(base, sub(blend, mul(FLOAT2, mul(base, blend))));
}
export function blendGlowVec(base, blend) {
  return blendReflectVec(blend, base);
}
export function blendHardLightVec(base, blend) {
  return blendOverlayVec(blend, base);
}
export function blendLightenVec(base, blend) {
  return max(base, blend);
}
export function blendLinearBurnVec(base, blend) {
  return max(sub(add(base, blend), FLOAT1), asVec(base, FLOAT0));
}
export function blendLinearDodgeVec(base, blend) {
  return min(add(base, blend), asVec(base, FLOAT1));
}
export function blendMultiplyVec(base, blend) {
  return mul(base, blend);
}
export function blendNegationVec(base, blend) {
  return sub(FLOAT1, abs(sub(FLOAT1, sub(base, blend))));
}
export function blendNormalVec(_, blend) {
  return blend;
}
export function blendOverlayVec(base, blend) {
  return mix(mul(FLOAT2, mul(base, blend)), sub(FLOAT1, mul(FLOAT2, mul(sub(FLOAT1, base), sub(FLOAT1, blend)))), step(asVec(base, FLOAT05), base));
}
export function blendPhoenixVec(base, blend) {
  return add(sub(min(base, blend), max(base, blend)), FLOAT1);
}
export function blendReflectVec(base, blend) {
  const one = asVec(base, FLOAT1);
  return mix(min(div(mul(base, base), sub(FLOAT1, blend)), one), blend, step(one, blend));
}
export function blendScreenVec(base, blend) {
  const one = asVec(base, FLOAT1);
  return sub(one, mul(sub(one, base), sub(one, blend)));
}
export function blendSoftLightVec(base, blend) {
  return add(mul(FLOAT2, mul(base, blend)), mul(mul(base, base), sub(FLOAT1, mul(FLOAT2, blend))));
}
export function blendSubtractVec(base, blend) {
  return max(sub(add(base, blend), FLOAT1), asVec(base, FLOAT0));
}
