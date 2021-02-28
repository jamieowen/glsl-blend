import { Term } from "@thi.ng/shader-ast";
import { defBlendFn3, defBlendFn4 } from "./def-blend";
import {
  blendAdd3,
  blendAdd4,
  blendAverage3,
  blendAverage4,
  blendColorBurn3,
  blendColorBurn4,
  blendColorDodge3,
  blendColorDodge4,
  blendDarken3,
  blendDarken4,
  blendDifference3,
  blendDifference4,
  blendExclusion3,
  blendExclusion4,
  blendGlow3,
  blendGlow4,
  blendHardLight3,
  blendHardLight4,
  blendHardMix3,
  blendHardMix4,
  blendOverlay3,
  blendOverlay4,
  blendReflect3,
  blendReflect4,
  blendVividLight3,
  blendVividLight4,
} from "./def-export";

export type BlendMode =
  | "add"
  | "average"
  | "color-burn"
  | "color-dodge"
  | "darken"
  | "difference"
  | "exclusion"
  | "glow"
  | "hard-light"
  | "hard-mix"
  | "overlay"
  | "vivid-light"
  | "reflect";

export type BlendModeFloat = (
  base: Term<"float">,
  blend: Term<"float">
) => Term<"float">;

export type BlendModeVec<T extends "vec3" | "vec4"> = (
  base: Term<T>,
  blend: Term<T>
) => Term<T>;

export type BlendModeDef =
  | ReturnType<typeof defBlendFn3>
  | ReturnType<typeof defBlendFn4>;

export const BLEND_MODES_3: Record<BlendMode, BlendModeDef> = {
  add: blendAdd3,
  average: blendAverage3,
  "color-burn": blendColorBurn3,
  "color-dodge": blendColorDodge3,
  darken: blendDarken3,
  difference: blendDifference3,
  exclusion: blendExclusion3,
  glow: blendGlow3,
  "hard-light": blendHardLight3,
  "hard-mix": blendHardMix3,
  overlay: blendOverlay3,
  reflect: blendReflect3,
  "vivid-light": blendVividLight3,
};

export const BLEND_MODES_4: Record<BlendMode, BlendModeDef> = {
  add: blendAdd4,
  average: blendAverage4,
  "color-burn": blendColorBurn4,
  "color-dodge": blendColorDodge4,
  darken: blendDarken4,
  difference: blendDifference4,
  exclusion: blendExclusion4,
  glow: blendGlow4,
  "hard-light": blendHardLight4,
  "hard-mix": blendHardMix4,
  overlay: blendOverlay4,
  reflect: blendReflect4,
  "vivid-light": blendVividLight4,
};
