import {
  add,
  defn,
  mul,
  ret,
  sub
} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
export const defBlendFloat = (name, body) => defn("float", name, ["float", "float"], body);
export const defBlendFn = (type, blendFn, fnName) => defn(type, fnName, [type, type, "float"], (base, blend, opacity) => [
  ret(add(mul(blendFn(base, blend), opacity), mul(base, sub(1, opacity))))
]);
export const defBlendFnPair = (fnName, blend3, blend4 = blend3) => [
  defBlendFn("vec3", blend3, fnName),
  defBlendFn("vec4", blend4, fnName)
];
