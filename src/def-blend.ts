import { add, defn, mul, ret, sub } from "@thi.ng/shader-ast";
import type {
  BlendModeDef3,
  BlendModeDef4,
  BlendModeVec,
  BlendModeVec3,
  BlendModeVec4,
  Color,
} from "./api";

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
  blend3: BlendModeVec3,
  blend4: BlendModeVec4
): [BlendModeDef3, BlendModeDef4] => [
  defBlendFn("vec3", blend3, fnName),
  defBlendFn("vec4", blend4, fnName),
];
