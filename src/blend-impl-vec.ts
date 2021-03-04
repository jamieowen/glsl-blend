import {
  abs,
  add,
  div,
  FLOAT0,
  FLOAT05,
  FLOAT1,
  FLOAT2,
  FloatTerm,
  max,
  min,
  mix,
  mul,
  step,
  sub,
  Term,
  vec3,
  Vec3Term,
  vec4,
  Vec4Term,
  sqrt,
} from "@thi.ng/shader-ast";
import type { ColorTerm } from "./api";

const asVec = <T extends ColorTerm>(base: T, x: FloatTerm) =>
  (base.type === "vec3" ? vec3 : vec4)(x);

export function blendAddVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendAddVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendAddVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return min(add(base, blend), asVec(base, FLOAT1));
}

export function blendAverageVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendAverageVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendAverageVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return div(add(base, blend), FLOAT2);
}

export function blendColorBurnVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendColorBurnVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendColorBurnVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  const zero = asVec(base, FLOAT0);
  return mix(
    blend,
    max(sub(FLOAT1, div(sub(FLOAT1, base), blend)), zero),
    step(zero, blend)
  );
}

export function blendColorDodgeVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendColorDodgeVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendColorDodgeVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  const one = asVec(base, FLOAT1);
  return mix(min(div(base, sub(FLOAT1, blend)), one), blend, step(one, blend));
}

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

export function blendGlowVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendGlowVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendGlowVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return blendReflectVec(<any>blend, <any>base);
}

export function blendHardLightVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendHardLightVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendHardLightVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return blendOverlayVec(<any>blend, <any>base);
}

export function blendLightenVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendLightenVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendLightenVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return max(base, blend);
}

export function blendLinearBurnVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendLinearBurnVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendLinearBurnVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return max(sub(add(base, blend), FLOAT1), asVec(base, FLOAT0));
}

export function blendLinearDodgeVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendLinearDodgeVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendLinearDodgeVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return min(add(base, blend), asVec(base, FLOAT1));
}

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

export function blendOverlayVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendOverlayVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendOverlayVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return mix(
    mul(FLOAT2, mul(base, blend)),
    sub(FLOAT1, mul(FLOAT2, mul(sub(FLOAT1, base), sub(FLOAT1, blend)))),
    step(asVec(base, FLOAT05), base)
  );
}

export function blendPhoenixVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendPhoenixVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendPhoenixVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return add(sub(min(base, blend), max(base, blend)), FLOAT1);
}

export function blendReflectVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendReflectVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendReflectVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  const one = asVec(base, FLOAT1);
  return mix(
    min(div(mul(base, base), sub(FLOAT1, blend)), one),
    blend,
    step(one, blend)
  );
}

export function blendScreenVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendScreenVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendScreenVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  const one = asVec(base, FLOAT1);
  return sub(one, mul(sub(one, base), sub(one, blend)));
}

/**
 *
 * NOTE:
 * This was the direct translation, but produced banding on gradients.
 * The simplified one below produces the more accurate effect.
 * ( setting step to FLOAT1 and removing the second part of the mix )
 *
 * @param base
 * @param blend
 */
// export function blendSoftLightVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
// export function blendSoftLightVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
// export function blendSoftLightVec(
//   base: ColorTerm,
//   blend: ColorTerm
// ): Term<any> {
//   return mix(
//     add(
//       mul(FLOAT2, mul(base, blend)),
//       mul(mul(base, base), sub(FLOAT1, mul(FLOAT2, blend)))
//     ),
//     mul(
//       sqrt(base),
//       add(
//         sub(mul(FLOAT2, blend), FLOAT1),
//         mul(FLOAT2, mul(base, sub(FLOAT1, blend)))
//       )
//     ),
//     step(asVec(base, FLOAT05), blend)
//   );
// }

export function blendSoftLightVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendSoftLightVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendSoftLightVec(
  base: ColorTerm,
  blend: ColorTerm
): Term<any> {
  return add(
    mul(FLOAT2, mul(base, blend)),
    mul(mul(base, base), sub(FLOAT1, mul(FLOAT2, blend)))
  );
}

export function blendSubtractVec(base: Vec3Term, blend: Vec3Term): Vec3Term;
export function blendSubtractVec(base: Vec4Term, blend: Vec4Term): Vec4Term;
export function blendSubtractVec(base: ColorTerm, blend: ColorTerm): Term<any> {
  return max(sub(add(base, blend), FLOAT1), asVec(base, FLOAT0));
}
