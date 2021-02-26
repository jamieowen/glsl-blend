import { add, min, vec3, div, float, Vec3Term } from "@thi.ng/shader-ast";
import { defBlendFn } from "./def-blend";

export const blendAverageFn = (base: Vec3Term, blend: Vec3Term) =>
  div(add(base, blend), float(2.0));

export const blendAverage = defBlendFn(blendAverageFn, "average");
