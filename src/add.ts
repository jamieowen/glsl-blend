import { add, min, vec3, Vec3Term } from "@thi.ng/shader-ast";
import { defBlendFn } from "./def-blend";

export const blendAddFn = (base: Vec3Term, blend: Vec3Term) =>
  min(add(base, blend), vec3(1.0));

export const blendAdd = defBlendFn(blendAddFn, "add");
