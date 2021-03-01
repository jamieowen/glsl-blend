import {
  abs,
  add,
  div,
  FLOAT0,
  FLOAT05,
  FLOAT1,
  FLOAT2,
  gte,
  lt,
  lte,
  max,
  min,
  mul,
  sub,
  Term,
  ternary,
  vec3,
  Vec3Term,
  vec4,
  Vec4Term,
} from "@thi.ng/shader-ast";
import type {
  BlendModeFloat,
  BlendModeVec3,
  BlendModeVec4,
  ColorTerm,
} from "./api";

export const blendAddVec3: BlendModeVec3 = (base, blend) =>
  min(add(base, blend), vec3(FLOAT1));

export const blendAddVec4: BlendModeVec4 = (base, blend) =>
  min(add(base, blend), vec4(FLOAT1));

export function blendAverageVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendAverageVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendAverageVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return div(add(base, blend), FLOAT2);
}

export const blendColorBurnFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lte(blend, FLOAT0),
    blend,
    max(sub(FLOAT1, div(sub(FLOAT1, base), blend)), FLOAT0)
  );

export const blendColorDodgeFloat: BlendModeFloat = (base, blend) =>
  ternary(
    gte(blend, FLOAT1),
    blend,
    min(div(base, sub(FLOAT1, blend)), FLOAT1)
  );

export function blendDarkenVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendDarkenVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendDarkenVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return min(base, blend);
}

export function blendDifferenceVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendDifferenceVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendDifferenceVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return abs(sub(base, blend));
}

export function blendExclusionVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendExclusionVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendExclusionVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return add(base, sub(blend, mul(FLOAT2, mul(base, blend))));
}

export const blendGlowFloat: BlendModeFloat = (base, blend) =>
  blendReflectFloat(blend, base);

export const blendHardLightFloat: BlendModeFloat = (base, blend) =>
  blendOverlayFloat(blend, base);

export const blendHardMixFloat: BlendModeFloat = (base, blend) =>
  ternary(lt(blendVividLightFloat(base, blend), FLOAT05), FLOAT0, FLOAT1);

export function blendLightenVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendLightenVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendLightenVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return max(base, blend);
}

// Linear Burn
// Linear Dodge
// Linear Light

export function blendMultiplyVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendMultiplyVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendMultiplyVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return mul(base, blend);
}

export function blendNegationVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendNegationVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendNegationVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return sub(FLOAT1, abs(sub(FLOAT1, sub(base, blend))));
}

export function blendNormalVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendNormalVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendNormalVec(_: ColorTerm, blend: ColorTerm): Term<any> {
  return blend;
}

export const blendOverlayFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lt(base, FLOAT05),
    mul(FLOAT2, mul(base, blend)),
    sub(FLOAT1, mul(FLOAT2, mul(sub(FLOAT1, base), sub(FLOAT1, blend))))
  );

export const blendReflectFloat: BlendModeFloat = (base, blend) =>
  ternary(
    gte(blend, FLOAT1),
    blend,
    min(div(mul(base, base), sub(FLOAT1, blend)), FLOAT1)
  );

export const blendVividLightFloat: BlendModeFloat = (base, blend) =>
  ternary(
    lt(base, FLOAT05),
    blendColorBurnFloat(base, mul(FLOAT2, blend)),
    blendColorDodgeFloat(base, mul(FLOAT2, sub(blend, FLOAT05)))
  );
