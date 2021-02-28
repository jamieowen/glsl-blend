import { add, float, sub, defn, ret, mul, Term } from "@thi.ng/shader-ast";
import { BlendModeVec } from "./api";

export const blendLayerOpacity = (
  blendFn: BlendModeVec<"vec3" | "vec4">,
  base: Term<"vec3" | "vec4">,
  blend: Term<"vec3" | "vec4">,
  opacity: Term<"float">
) =>
  add(mul(blendFn(base, blend), opacity), mul(base, sub(float(1.0), opacity)));

export const defBlendFn3 = (blendFn: BlendModeVec<"vec3">, fnName: string) =>
  defn("vec3", fnName, ["vec3", "vec3", "float"], (base, blend, opacity) => [
    ret(blendLayerOpacity(blendFn, base, blend, opacity)),
  ]);

export const defBlendFn4 = (blendFn: BlendModeVec<"vec4">, fnName: string) =>
  defn("vec4", fnName, ["vec4", "vec4", "float"], (base, blend, opacity) => [
    ret(blendLayerOpacity(blendFn, base, blend, opacity)),
  ]);
