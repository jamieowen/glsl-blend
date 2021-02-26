import {
  min,
  add,
  Vec3Term,
  vec3,
  div,
  float,
  ternary,
  lte,
  max,
  FloatTerm,
  sub,
  gte,
  defn,
  ret,
  mul,
} from "@thi.ng/shader-ast";
import { BlendMode } from "./api";

export const defBlendFn = (blendFn: any, name: BlendMode) =>
  defn("vec3", name, ["vec3", "vec3", "float"], (base, blend, opacity) => [
    ret(
      add(
        mul(blendFn(base, blend), opacity),
        mul(base, sub(float(1.0), opacity))
      )
    ),
  ]);

// (blend>=1.0)?blend:min(base/(1.0-blend),1.0);
export const blendColorDodge = (base: FloatTerm, blend: FloatTerm) =>
  ternary(
    gte(blend, float(1.0)),
    blend,
    min(div(base, sub(float(1.0), blend)), float(1.0))
  );

export const blendDarken = (base: Vec3Term, blend: Vec3Term) =>
  min(blend, base);
