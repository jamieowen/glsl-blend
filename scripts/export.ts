// import * as prettier from "prettier";
import * as path from "path";
import * as fs from "fs-extra";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import {
  BLEND_MODES_3,
  BLEND_MODES_4,
  blendModeSelect3,
  blendModeSelect4,
} from "../src";

const OUTPUT = path.join(__dirname, "../");
const OUTPUT_AST = path.join(OUTPUT, "ast");
const OUTPUT_GLSL = path.join(OUTPUT, "glsl");
const OUTPUT_ESM = path.join(OUTPUT, "esm");

const compileBlendModes = () => {
  const compile = targetGLSL({
    type: "fs",
    versionPragma: false,
    prelude: "",
    version: GLSLVersion.GLES_100,
  });

  return {
    blend3: Object.entries(BLEND_MODES_3).map(([key, fn]) => ({
      key,
      src: compile(fn),
    })),
    blend4: Object.entries(BLEND_MODES_4).map(([key, fn]) => ({
      key,
      src: compile(fn),
    })),
    blend3All: compile(blendModeSelect3),
    blend4All: compile(blendModeSelect4),
  };
};

const composeGlslify = (blend3: string, blend4: string, fnName: string) => {
  return `
  ${blend3}
  ${blend4}
  #pragma glslify: export(${fnName});
  `;
};

Promise.resolve(compileBlendModes()).then(async (res) => {
  console.log("Await", res);

  await fs.ensureDir(OUTPUT_AST);
  await fs.ensureDir(OUTPUT_GLSL);
  await fs.ensureDir(OUTPUT_ESM);

  let i = 0;
  for (let blend of res.blend3) {
    // Write GLSL
    await fs.writeFile(
      path.join(OUTPUT_GLSL, `${blend.key}.glsl`),
      composeGlslify(blend.src, res.blend4[i].src, "")
    );
    // Write ESM

    i++;
  }
});

// blend.args[0].id = "base";
// blend.args[1].id = "blend";
// blend.args[2].id = "opacity";

// console.log( 'Prettier' ,prettier.format('var le', {
//   parser:'babel'
// }))
