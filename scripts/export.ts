import * as prettier from 'prettier';
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { BLEND_MODES_3, BLEND_MODES_4, BlendModeDef3, blendModeSelect3, blendModeSelect4 } from "../ast";


const compileBlendModes = ()=>{

  const compile = targetGLSL({
    type: "fs",
    versionPragma: false,
    prelude: "",
    version: GLSLVersion.GLES_100,
  });

  return {
    blend3: Object.entries(BLEND_MODES_3).map(([key,fn])=>({ key, src: compile(fn)})),
    blend4: Object.entries(BLEND_MODES_4).map(([key,fn])=>({ key, src: compile(fn)})),
    blend3All: compile(blendModeSelect3),
    blend4All: compile(blendModeSelect4)
  }

}

// const compileBlend3 = (blend: BlendModeDef3) => {
Promise.resolve(compileBlendModes()).then(async (res)=>{
  console.log( 'Await', res );
  
})
  // console.log(blend);
  // blend.args[0].id = "base";
  // blend.args[1].id = "blend";
  // blend.args[2].id = "opacity";
  // const str = compile(blend);
  // console.log(str);
  // const form = prettier.format(str,{
  //   parser: 'babel'
  // });
  // console.log( form );
// };


// const composeGlslify = ( src:string, fnName:string )=>{
//   return `
//   ${src}
//   #pragma glslify: export(${fnName});
//   `;
// }

// const composeEsmLiteral = ( src:string )

// Promise.resolve( async ()=>{
//   console.log( 'okok' );
// });

// Object.entries(BLEND_MODES_3).map(([_key, blend]) => compileBlend3(blend));

// console.log( 'Prettier' ,prettier.format('var le', {
//   parser:'babel'
// }))
