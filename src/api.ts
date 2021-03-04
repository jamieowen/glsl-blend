import type { FloatTerm, TaggedFn3, Term } from "@thi.ng/shader-ast";

export type Color = "vec3" | "vec4";
export type ColorTerm = Term<Color>;

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
  | "linear-burn"
  | "linear-dodge"
  | "linear-light"
  | "multiply"
  | "negation"
  | "normal"
  | "overlay"
  | "phoenix"
  | "pin-light"
  | "reflect"
  | "screen"
  | "soft-light"
  | "subtract"
  | "vivid-light";

export type BlendModeFloat = (base: FloatTerm, blend: FloatTerm) => FloatTerm;

export type BlendModeVec<A extends Color, B extends A = A> = (
  base: Term<A>,
  blend: Term<B>
) => Term<A>;

export type BlendModeVec3 = BlendModeVec<"vec3">;
export type BlendModeVec4 = BlendModeVec<"vec4">;

export type BlendModeDef<T extends Color> = TaggedFn3<T, T, "float", T>;

export type BlendModeDef3 = BlendModeDef<"vec3">;
export type BlendModeDef4 = BlendModeDef<"vec4">;

export default {};
