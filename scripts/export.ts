console.log("ookok");

import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
// import { BLEND_MODES_3, BLEND_MODES_4, BlendModeDef3 } from "../src";
import { BlendModeDef3 } from "../src/api";
import { BLEND_MODES_3 } from "../src/constants";

const compileBlend3 = (blend: BlendModeDef3) => {
  const compile = targetGLSL({
    type: "vs",
    versionPragma: false,
    prelude: "",
    version: GLSLVersion.GLES_100,
  });
  const str = compile(blend);
  console.log(str);
};

Object.entries(BLEND_MODES_3).map(([_key, blend]) => compileBlend3(blend));
