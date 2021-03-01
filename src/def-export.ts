import {
  blendAddVec3,
  blendAddVec4,
  blendAverageVec,
  blendColorBurnFloat,
  blendColorDodgeFloat,
  blendDarkenVec,
  blendDifferenceVec,
  blendExclusionVec,
  blendGlowFloat,
  blendHardLightFloat,
  blendHardMixFloat,
  blendLightenVec,
  blendMultiplyVec,
  blendNegationVec,
  blendNormalVec,
  blendOverlayFloat,
  blendReflectFloat,
  blendVividLightFloat,
} from "./blend-impl";
import { defBlendFnPair } from "./def-blend";
import { blendFloatToVec3, blendFloatToVec4 } from "./float-to-vec";
import { FN_NAMES } from "./fn-names";

export const [blendAdd3, blendAdd4] = defBlendFnPair(
  "add",
  blendAddVec3,
  blendAddVec4
);

export const [blendAverage3, blendAverage4] = defBlendFnPair(
  FN_NAMES.average,
  blendAverageVec,
  blendAverageVec
);

export const [blendColorBurn3, blendColorBurn4] = defBlendFnPair(
  FN_NAMES["color-burn"],
  blendFloatToVec3(blendColorBurnFloat),
  blendFloatToVec4(blendColorBurnFloat)
);

export const [blendColorDodge3, blendColorDodge4] = defBlendFnPair(
  FN_NAMES["color-dodge"],
  blendFloatToVec3(blendColorDodgeFloat),
  blendFloatToVec4(blendColorDodgeFloat)
);

export const [blendDarken3, blendDarken4] = defBlendFnPair(
  FN_NAMES.darken,
  blendDarkenVec,
  blendDarkenVec
);

export const [blendDifference3, blendDifference4] = defBlendFnPair(
  FN_NAMES.difference,
  blendDifferenceVec,
  blendDifferenceVec
);

export const [blendExclusion3, blendExclusion4] = defBlendFnPair(
  FN_NAMES.exclusion,
  blendExclusionVec,
  blendExclusionVec
);

export const [blendGlow3, blendGlow4] = defBlendFnPair(
  FN_NAMES.glow,
  blendFloatToVec3(blendGlowFloat),
  blendFloatToVec4(blendGlowFloat)
);

export const [blendHardLight3, blendHardLight4] = defBlendFnPair(
  FN_NAMES["hard-light"],
  blendFloatToVec3(blendHardLightFloat),
  blendFloatToVec4(blendHardLightFloat)
);

export const [blendHardMix3, blendHardMix4] = defBlendFnPair(
  FN_NAMES["hard-mix"],
  blendFloatToVec3(blendHardMixFloat),
  blendFloatToVec4(blendHardMixFloat)
);

export const [blendLighten3, blendLighten4] = defBlendFnPair(
  FN_NAMES.lighten,
  blendLightenVec,
  blendLightenVec
);

export const [blendMultiply3, blendMultiply4] = defBlendFnPair(
  FN_NAMES.multiply,
  blendMultiplyVec,
  blendMultiplyVec
);

export const [blendNegation3, blendNegation4] = defBlendFnPair(
  FN_NAMES.negation,
  blendNegationVec,
  blendNegationVec
);

export const [blendNormal3, blendNormal4] = defBlendFnPair(
  FN_NAMES.normal,
  blendNormalVec,
  blendNormalVec
);

export const [blendOverlay3, blendOverlay4] = defBlendFnPair(
  FN_NAMES.overlay,
  blendFloatToVec3(blendOverlayFloat),
  blendFloatToVec4(blendOverlayFloat)
);

export const [blendReflect3, blendReflect4] = defBlendFnPair(
  FN_NAMES.reflect,
  blendFloatToVec3(blendReflectFloat),
  blendFloatToVec4(blendReflectFloat)
);

export const [blendVividLight3, blendVividLight4] = defBlendFnPair(
  FN_NAMES["vivid-light"],
  blendFloatToVec3(blendVividLightFloat),
  blendFloatToVec4(blendVividLightFloat)
);
