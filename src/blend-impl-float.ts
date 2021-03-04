import {
  add,
  div,
  FLOAT0,
  FLOAT05,
  FLOAT1,
  FLOAT2,
  lt,
  max,
  min,
  mix,
  mul,
  ret,
  step,
  sub,
  ternary,
} from "@thi.ng/shader-ast";
import type { BlendModeFloat } from "./api";
import { defBlendFloat } from "./def-blend";

export const blendColorBurnFloat: BlendModeFloat = (base, blend) =>
  mix(
    blend,
    max(sub(FLOAT1, div(sub(FLOAT1, base), blend)), FLOAT0),
    step(FLOAT05, blend)
  );

export const blendColorDodgeFloat: BlendModeFloat = (base, blend) =>
  mix(min(div(base, sub(FLOAT1, blend)), FLOAT1), blend, step(FLOAT1, blend));

export const blendDarkenFloat: BlendModeFloat = (base, blend) =>
  min(base, blend);

export const blendLightenFloat: BlendModeFloat = (base, blend) =>
  max(base, blend);

export const blendLinearBurnFloat: BlendModeFloat = (base, blend) =>
  max(sub(add(base, blend), FLOAT1), FLOAT0);

export const blendLinearDodgeFloat: BlendModeFloat = (base, blend) =>
  min(add(base, blend), FLOAT1);

export const blendLinearLightFloat = defBlendFloat(
  "blendLinearLightFloat",
  (base, blend) => [
    ret(
      ternary(
        lt(base, FLOAT05),
        blendLinearBurnFloat(base, mul(FLOAT2, blend)),
        blendLinearDodgeFloat(base, mul(FLOAT2, sub(blend, FLOAT05)))
      )
    ),
  ]
);

export const blendPinLightFloat = defBlendFloat(
  "blendPinLightFloat",
  (base, blend) => [
    ret(
      ternary(
        lt(base, FLOAT05),
        blendLightenFloat(base, mul(FLOAT2, sub(blend, FLOAT05))),
        blendDarkenFloat(base, mul(FLOAT2, blend))
      )
    ),
  ]
);

export const blendVividLightFloat = defBlendFloat(
  "blendVividLightFloat",
  (base, blend) => [
    ret(
      ternary(
        lt(base, FLOAT05),
        blendColorBurnFloat(base, mul(FLOAT2, blend)),
        blendColorDodgeFloat(base, mul(FLOAT2, sub(blend, FLOAT05)))
      )
    ),
  ]
);

export const blendHardMixFloat = defBlendFloat(
  "blendHardMixFloat",
  (base, blend) => [ret(step(FLOAT05, blendVividLightFloat(base, blend)))]
);
