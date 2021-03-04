import {
  blendAddVec,
  blendAverageVec,
  blendColorBurnVec,
  blendColorDodgeVec,
  blendDarkenVec,
  blendDifferenceVec,
  blendExclusionVec,
  blendGlowVec,
  blendHardLightVec,
  blendLightenVec,
  blendLinearBurnVec,
  blendLinearDodgeVec,
  blendMultiplyVec,
  blendNegationVec,
  blendNormalVec,
  blendOverlayVec,
  blendPhoenixVec,
  blendReflectVec,
  blendScreenVec,
  blendSoftLightVec,
  blendSubtractVec,
} from "./blend-impl-vec";
import {
  blendHardMixFloat,
  blendLinearLightFloat,
  blendPinLightFloat,
  blendVividLightFloat,
} from "./blend-impl-float";
import { defBlendFnPair } from "./def-blend";
import { blendFloatToVec3, blendFloatToVec4 } from "./float-to-vec";
import { FN_NAMES } from "./fn-names";

export const [blendAdd3, blendAdd4] = defBlendFnPair("add", blendAddVec);

export const [blendAverage3, blendAverage4] = defBlendFnPair(
  FN_NAMES.average,
  blendAverageVec
);

export const [blendColorBurn3, blendColorBurn4] = defBlendFnPair(
  FN_NAMES["color-burn"],
  blendColorBurnVec
);

export const [blendColorDodge3, blendColorDodge4] = defBlendFnPair(
  FN_NAMES["color-dodge"],
  blendColorDodgeVec
);

export const [blendDarken3, blendDarken4] = defBlendFnPair(
  FN_NAMES.darken,
  blendDarkenVec
);

export const [blendDifference3, blendDifference4] = defBlendFnPair(
  FN_NAMES.difference,
  blendDifferenceVec
);

export const [blendExclusion3, blendExclusion4] = defBlendFnPair(
  FN_NAMES.exclusion,
  blendExclusionVec
);

export const [blendGlow3, blendGlow4] = defBlendFnPair(
  FN_NAMES.glow,
  blendGlowVec
);

export const [blendHardLight3, blendHardLight4] = defBlendFnPair(
  FN_NAMES["hard-light"],
  blendHardLightVec
);

export const [blendHardMix3, blendHardMix4] = defBlendFnPair(
  FN_NAMES["hard-mix"],
  blendFloatToVec3(blendHardMixFloat),
  blendFloatToVec4(blendHardMixFloat)
);

export const [blendLighten3, blendLighten4] = defBlendFnPair(
  FN_NAMES.lighten,
  blendLightenVec
);

export const [blendLinearBurn3, blendLinearBurn4] = defBlendFnPair(
  FN_NAMES["linear-burn"],
  blendLinearBurnVec
);

export const [blendLinearDodge3, blendLinearDodge4] = defBlendFnPair(
  FN_NAMES["linear-dodge"],
  blendLinearDodgeVec
);

export const [blendLinearLight3, blendLinearLight4] = defBlendFnPair(
  FN_NAMES["linear-light"],
  blendFloatToVec3(blendLinearLightFloat),
  blendFloatToVec4(blendLinearLightFloat)
);

export const [blendMultiply3, blendMultiply4] = defBlendFnPair(
  FN_NAMES.multiply,
  blendMultiplyVec
);

export const [blendNegation3, blendNegation4] = defBlendFnPair(
  FN_NAMES.negation,
  blendNegationVec
);

export const [blendNormal3, blendNormal4] = defBlendFnPair(
  FN_NAMES.normal,
  blendNormalVec
);

export const [blendOverlay3, blendOverlay4] = defBlendFnPair(
  FN_NAMES.overlay,
  blendOverlayVec
);

export const [blendPinLight3, blendPinLight4] = defBlendFnPair(
  FN_NAMES["pin-light"],
  blendFloatToVec3(blendPinLightFloat),
  blendFloatToVec4(blendPinLightFloat)
);

export const [blendPhoenix3, blendPhoenix4] = defBlendFnPair(
  FN_NAMES.phoenix,
  blendPhoenixVec
);

export const [blendReflect3, blendReflect4] = defBlendFnPair(
  FN_NAMES.reflect,
  blendReflectVec
);

export const [blendScreen3, blendScreen4] = defBlendFnPair(
  FN_NAMES.screen,
  blendScreenVec
);

export const [blendSoftLight3, blendSoftLight4] = defBlendFnPair(
  FN_NAMES["soft-light"],
  blendSoftLightVec
);

export const [blendSubtract3, blendSubtract4] = defBlendFnPair(
  FN_NAMES["subtract"],
  blendSubtractVec
);

export const [blendVividLight3, blendVividLight4] = defBlendFnPair(
  FN_NAMES["vivid-light"],
  blendFloatToVec3(blendVividLightFloat),
  blendFloatToVec4(blendVividLightFloat)
);
