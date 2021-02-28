import { Term } from "@thi.ng/shader-ast";
import { defBlendFn3, defBlendFn4 } from "./def-blend";

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
  | "lighten"
  | "multiply"
  | "negation"
  | "normal"
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

export type BlendModeDef3 = ReturnType<typeof defBlendFn3>;
export type BlendModeDef4 = ReturnType<typeof defBlendFn4>;

export default {};
