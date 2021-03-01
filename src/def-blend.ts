import type { Fn2 } from "@thi.ng/api";
import {
  add,
  defn,
  FloatSym,
  mul,
  ret,
  ScopeBody,
  sub,
} from "@thi.ng/shader-ast";
import type {
  BlendModeDef3,
  BlendModeDef4,
  BlendModeVec,
  BlendModeVec3,
  BlendModeVec4,
  Color,
} from "./api";

export const defBlendFloat = (
  name: string,
  body: Fn2<FloatSym, FloatSym, ScopeBody>
) => defn("float", name, ["float", "float"], body);

export const defBlendFn = <T extends Color>(
  type: T,
  blendFn: BlendModeVec<T>,
  fnName: string
) =>
  defn(type, fnName, [type, type, "float"], (base, blend, opacity) => [
    ret(add(mul(blendFn(base, blend), opacity), mul(base, sub(1, opacity)))),
  ]);

export const defBlendFnPair = (
  fnName: string,
  blend3: BlendModeVec<Color>,
  blend4: BlendModeVec<Color> = blend3
): [BlendModeDef3, BlendModeDef4] => [
  defBlendFn("vec3", <BlendModeVec3>blend3, fnName),
  defBlendFn("vec4", <BlendModeVec4>blend4, fnName),
];
