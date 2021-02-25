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

export const defBlendFn = (blendFn: any) =>
  defn(
    "vec3",
    "blendFunc",
    ["vec3", "vec3", "float"],
    (base, blend, opacity) => [
      // ret(
      //   mul(
      //     blendFn(base, blend),
      //     mul(add(opacity, base), sub(float(1.0), opacity))
      //   )
      // ),
      ret(
        add(
          mul(blendFn(base, blend), opacity),
          mul(base, sub(float(1.0), opacity))
        )
        // ret(vec3(1.0, 1.0, 0.0)),
      ),
    ]
  );

export const blendAverage = (base: Vec3Term, blend: Vec3Term) =>
  div(add(base, blend), float(2.0));

// (blend==0.0) ? blend : max((1.0-((1.0-base)/blend)),0.0);
export const blendColorBurn = (base: FloatTerm, blend: FloatTerm) =>
  ternary(
    lte(blend, float(0.0)),
    max(sub(float(1.0), div(sub(float(1.0), base), blend)), float(0.0)),
    base
  );

// (blend>=1.0)?blend:min(base/(1.0-blend),1.0);
export const blendColorDodge = (base: FloatTerm, blend: FloatTerm) =>
  ternary(
    gte(blend, float(1.0)),
    blend,
    min(div(base, sub(float(1.0), blend)), float(1.0))
  );

export const blendDarken = (base: Vec3Term, blend: Vec3Term) =>
  min(blend, base);
