// @ts-check
import { shaderAstGen } from "shader-ast-gen";
import { BLEND_MODES_3, BLEND_MODES_4, FN_NAMES } from "./ast";

/** @type { import('shader-ast-gen').IFnInput[] } */
const blend3Inputs = Object.keys(FN_NAMES).map((mode) => {
  return {
    fn: BLEND_MODES_3[mode],
    group: mode,
    astOpts: {
      argRen: ["base", "blend", "opacity"],
      idRen: (s) => `${s}3`,
    },
  };
});

/** @type { import('shader-ast-gen').IFnInput[] } */
const blend4Inputs = Object.keys(FN_NAMES).map((mode) => {
  return {
    fn: BLEND_MODES_4[mode],
    group: mode,
    astOpts: {
      argRen: ["base", "blend", "opacity"],
      idRen: (s) => `${s}4`,
    },
  };
});

shaderAstGen({
  outDir: "",
  inputs: [...blend3Inputs, ...blend4Inputs],
});
