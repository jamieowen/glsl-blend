import { Term, Vec3Term } from "@thi.ng/shader-ast";
import { blendAdd } from "./add";
import { blendAverage } from "./average";
import { defBlendFn } from "./def-blend";

export type BlendMode = "add" | "average";
export type BlendModeFn = (base: Vec3Term, blend: Vec3Term) => Term<"vec3">;
export type BlendModeDef = ReturnType<typeof defBlendFn>;

export const BLEND_MODES: Record<BlendMode, BlendModeDef> = {
  add: blendAdd,
  average: blendAverage,
};
