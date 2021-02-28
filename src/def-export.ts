import { BlendModeVec } from "./api";
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
import { FN_NAMES } from "./fn-names";
import { defBlendFn3, defBlendFn4 } from "./def-blend";
import { blendFloatToVec3, blendFloatToVec4 } from "./float-to-vec";

export const blendAdd3 = defBlendFn3(blendAddVec3, "add");
export const blendAdd4 = defBlendFn4(blendAddVec4, "add");

export const blendAverage3 = defBlendFn3(
  blendAverageVec as BlendModeVec<"vec3">,
  FN_NAMES.average
);
export const blendAverage4 = defBlendFn4(
  blendAverageVec as BlendModeVec<"vec4">,
  FN_NAMES.average
);

export const blendColorBurn3 = defBlendFn3(
  blendFloatToVec3(blendColorBurnFloat),
  FN_NAMES["color-burn"]
);

export const blendColorBurn4 = defBlendFn4(
  blendFloatToVec4(blendColorBurnFloat),
  FN_NAMES["color-burn"]
);

export const blendColorDodge3 = defBlendFn3(
  blendFloatToVec3(blendColorDodgeFloat),
  FN_NAMES["color-dodge"]
);

export const blendColorDodge4 = defBlendFn4(
  blendFloatToVec4(blendColorDodgeFloat),
  FN_NAMES["color-dodge"]
);

export const blendDarken3 = defBlendFn3(
  blendDarkenVec as BlendModeVec<"vec3">,
  FN_NAMES.darken
);
export const blendDarken4 = defBlendFn4(
  blendDarkenVec as BlendModeVec<"vec4">,
  FN_NAMES.darken
);

export const blendDifference3 = defBlendFn3(
  blendDifferenceVec as BlendModeVec<"vec3">,
  FN_NAMES.difference
);
export const blendDifference4 = defBlendFn4(
  blendDifferenceVec as BlendModeVec<"vec4">,
  FN_NAMES.difference
);

export const blendExclusion3 = defBlendFn3(
  blendExclusionVec as BlendModeVec<"vec3">,
  FN_NAMES.exclusion
);
export const blendExclusion4 = defBlendFn4(
  blendExclusionVec as BlendModeVec<"vec4">,
  FN_NAMES.exclusion
);

export const blendGlow3 = defBlendFn3(
  blendFloatToVec3(blendGlowFloat),
  FN_NAMES.glow
);
export const blendGlow4 = defBlendFn4(
  blendFloatToVec4(blendGlowFloat),
  FN_NAMES.glow
);

export const blendHardLight3 = defBlendFn3(
  blendFloatToVec3(blendHardLightFloat),
  FN_NAMES["hard-light"]
);
export const blendHardLight4 = defBlendFn4(
  blendFloatToVec4(blendHardLightFloat),
  FN_NAMES["hard-light"]
);

export const blendHardMix3 = defBlendFn3(
  blendFloatToVec3(blendHardMixFloat),
  FN_NAMES["hard-mix"]
);
export const blendHardMix4 = defBlendFn4(
  blendFloatToVec4(blendHardMixFloat),
  FN_NAMES["hard-mix"]
);

export const blendLighten3 = defBlendFn3(
  blendLightenVec as BlendModeVec<"vec3">,
  FN_NAMES.lighten
);
export const blendLighten4 = defBlendFn4(
  blendLightenVec as BlendModeVec<"vec4">,
  FN_NAMES.lighten
);

export const blendMultiply3 = defBlendFn3(
  blendMultiplyVec as BlendModeVec<"vec3">,
  FN_NAMES.multiply
);
export const blendMultiply4 = defBlendFn4(
  blendMultiplyVec as BlendModeVec<"vec4">,
  FN_NAMES.multiply
);

export const blendNegation3 = defBlendFn3(
  blendNegationVec as BlendModeVec<"vec3">,
  FN_NAMES.negation
);

export const blendNegation4 = defBlendFn4(
  blendNegationVec as BlendModeVec<"vec4">,
  FN_NAMES.negation
);

export const blendNormal3 = defBlendFn3(
  blendNormalVec as BlendModeVec<"vec3">,
  FN_NAMES.normal
);

export const blendNormal4 = defBlendFn4(
  blendNormalVec as BlendModeVec<"vec4">,
  FN_NAMES.normal
);

export const blendOverlay3 = defBlendFn3(
  blendFloatToVec3(blendOverlayFloat),
  FN_NAMES.overlay
);

export const blendOverlay4 = defBlendFn4(
  blendFloatToVec4(blendOverlayFloat),
  FN_NAMES.overlay
);

export const blendReflect3 = defBlendFn3(
  blendFloatToVec3(blendReflectFloat),
  FN_NAMES.reflect
);

export const blendReflect4 = defBlendFn4(
  blendFloatToVec4(blendReflectFloat),
  FN_NAMES.reflect
);

export const blendVividLight3 = defBlendFn3(
  blendFloatToVec3(blendVividLightFloat),
  FN_NAMES["vivid-light"]
);

export const blendVividLight4 = defBlendFn4(
  blendFloatToVec4(blendVividLightFloat),
  FN_NAMES["vivid-light"]
);
