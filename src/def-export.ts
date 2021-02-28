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
  blendOverlayFloat,
  blendReflectFloat,
  blendVividLightFloat,
} from "./blend-impl";
import { defBlendFn3, defBlendFn4 } from "./def-blend";
import { blendFloatToVec3, blendFloatToVec4 } from "./float-to-vec";

export const blendAdd3 = defBlendFn3(blendAddVec3, "add");
export const blendAdd4 = defBlendFn4(blendAddVec4, "add");

export const blendAverage3 = defBlendFn3(
  blendAverageVec as BlendModeVec<"vec3">,
  "average"
);
export const blendAverage4 = defBlendFn4(
  blendAverageVec as BlendModeVec<"vec4">,
  "average"
);

export const blendColorBurn3 = defBlendFn3(
  blendFloatToVec3(blendColorBurnFloat),
  "colorBurn"
);

export const blendColorBurn4 = defBlendFn4(
  blendFloatToVec4(blendColorBurnFloat),
  "colorBurn"
);

export const blendColorDodge3 = defBlendFn3(
  blendFloatToVec3(blendColorDodgeFloat),
  "colorDodge"
);

export const blendColorDodge4 = defBlendFn4(
  blendFloatToVec4(blendColorDodgeFloat),
  "colorDodge"
);

export const blendDarken3 = defBlendFn3(
  blendDarkenVec as BlendModeVec<"vec3">,
  "darken"
);
export const blendDarken4 = defBlendFn4(
  blendDarkenVec as BlendModeVec<"vec4">,
  "darken"
);

export const blendDifference3 = defBlendFn3(
  blendDifferenceVec as BlendModeVec<"vec3">,
  "difference"
);
export const blendDifference4 = defBlendFn4(
  blendDifferenceVec as BlendModeVec<"vec4">,
  "difference"
);

export const blendExclusion3 = defBlendFn3(
  blendExclusionVec as BlendModeVec<"vec3">,
  "exclusion"
);
export const blendExclusion4 = defBlendFn4(
  blendExclusionVec as BlendModeVec<"vec4">,
  "exclusion"
);

export const blendGlow3 = defBlendFn3(blendFloatToVec3(blendGlowFloat), "glow");
export const blendGlow4 = defBlendFn4(blendFloatToVec4(blendGlowFloat), "glow");

export const blendHardLight3 = defBlendFn3(
  blendFloatToVec3(blendHardLightFloat),
  "hardLight"
);
export const blendHardLight4 = defBlendFn4(
  blendFloatToVec4(blendHardLightFloat),
  "hardLight"
);

export const blendHardMix3 = defBlendFn3(
  blendFloatToVec3(blendHardMixFloat),
  "hardMix"
);
export const blendHardMix4 = defBlendFn4(
  blendFloatToVec4(blendHardMixFloat),
  "hardMix"
);

export const blendOverlay3 = defBlendFn3(
  blendFloatToVec3(blendOverlayFloat),
  "overlay"
);

export const blendOverlay4 = defBlendFn4(
  blendFloatToVec4(blendOverlayFloat),
  "overlay"
);

export const blendReflect3 = defBlendFn3(
  blendFloatToVec3(blendReflectFloat),
  "reflect"
);

export const blendReflect4 = defBlendFn4(
  blendFloatToVec4(blendReflectFloat),
  "reflect"
);

export const blendVividLight3 = defBlendFn3(
  blendFloatToVec3(blendVividLightFloat),
  "vividLight"
);

export const blendVividLight4 = defBlendFn4(
  blendFloatToVec4(blendVividLightFloat),
  "vividLight"
);
