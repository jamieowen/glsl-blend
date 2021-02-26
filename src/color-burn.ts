import {
  div,
  float,
  ternary,
  lte,
  max,
  FloatTerm,
  sub,
} from "@thi.ng/shader-ast";
import { defBlendFn } from "./def-blend";

// (blend==0.0) ? blend : max((1.0-((1.0-base)/blend)),0.0);
export const blendColorBurnFn = (base: FloatTerm, blend: FloatTerm) =>
  ternary(
    lte(blend, float(0.0)),
    max(sub(float(1.0), div(sub(float(1.0), base), blend)), float(0.0)),
    base
  );

// export const blendColorBurn = defBlendFn();
