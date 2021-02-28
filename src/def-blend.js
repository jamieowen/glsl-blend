import {add, float, sub, defn, ret, mul} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
export const blendLayerOpacity = (blendFn, base, blend, opacity) => add(mul(blendFn(base, blend), opacity), mul(base, sub(float(1), opacity)));
export const defBlendFn3 = (blendFn, fnName) => defn("vec3", fnName, ["vec3", "vec3", "float"], (base, blend, opacity) => [
  ret(blendLayerOpacity(blendFn, base, blend, opacity))
]);
export const defBlendFn4 = (blendFn, fnName) => defn("vec4", fnName, ["vec4", "vec4", "float"], (base, blend, opacity) => [
  ret(blendLayerOpacity(blendFn, base, blend, opacity))
]);
