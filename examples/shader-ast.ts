import {
  glCanvas,
  defQuadModel,
  defTexture,
  defShader,
  compileModel,
  draw,
  TextureFilter,
  Texture,
  TextureFormat,
  TextureTarget,
} from "@thi.ng/webgl";
import {
  $xy,
  assign,
  defMain,
  float,
  sym,
  texture,
  vec4,
} from "@thi.ng/shader-ast";
import { stream, sync } from "@thi.ng/rstream";
import { defBlendFn } from "../src/core";

console.log(defBlendFn);

const fromImage = (gl: WebGLRenderingContext, url: string) =>
  stream<Texture>(($) => {
    const image = document.createElement("img");
    image.src = url;
    image.decode().then(() => {
      console.log(image.width, image.height);
      console.log(image.naturalWidth, image.naturalHeight);
      const texture = defTexture(gl, {
        image,
        target: TextureTarget.TEXTURE_2D,
        format: TextureFormat.RGBA,
        flip: true,
        // Specifying width/heigh here causes an ArrayBufferView error.
        // width: image.naturalWidth,
        // height: image.naturalHeight,
        filter: TextureFilter.LINEAR,
      });
      $.next(texture);
    });
  });

const { gl } = glCanvas({
  width: 975,
  height: 1300,
  parent: document.body,
});

const model = defQuadModel({});
model.shader = defShader(gl, {
  vs: (gl, _unis, inputs, vary) => {
    return [
      defMain(() => [
        assign(vary.vUv, inputs.uv),
        assign(gl.gl_Position, vec4(inputs.position, float(0), float(1))),
      ]),
    ];
  },
  fs: (gl, unis, inputs) => {
    const base = sym(texture(unis.base, $xy(inputs.vUv)));
    const blend = sym(texture(unis.blend, $xy(inputs.vUv)));
    return [defMain(() => [base, blend, assign(gl.gl_FragColor, base)])];
  },
  attribs: {
    position: "vec2",
    uv: "vec2",
  },
  varying: {
    vUv: "vec2",
  },
  uniforms: {
    base: ["sampler2D", 0],
    blend: ["sampler2D", 1],
  },
});

compileModel(gl, model);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

sync({
  src: {
    base: fromImage(gl, "/image1.jpeg"),
    blend: fromImage(gl, "/image2.jpeg"),
  },
}).subscribe({
  next: ({ base, blend }) => {
    console.log("Loaded..");
    console.log(base, blend);

    model.textures = [base, blend];
    draw(model);
  },
});
