import { BlendMode } from "./api";

export const FN_NAMES: Record<BlendMode, string> = {
  add: "blendAdd",
  average: "blendAverage",
  "color-burn": "blendColorBurn",
  "color-dodge": "blendColorDodge",
  darken: "blendDarken",
  difference: "blendDifference",
  exclusion: "blendExclusion",
  glow: "blendGlow",
  "hard-light": "blendHardLight",
  "hard-mix": "blendHardMix",
  lighten: "blendLighten",
  multiply: "blendMultiply",
  negation: "blendNegation",
  normal: "blendNormal",
  overlay: "blendOverlay",
  reflect: "blendReflect",
  "vivid-light": "blendVividLight",
};
