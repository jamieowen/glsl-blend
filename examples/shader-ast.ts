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
  $xyz,
  assign,
  defMain,
  float,
  sym,
  texture,
  vec4,
} from "@thi.ng/shader-ast";
import { stream, sync, fromDOMEvent } from "@thi.ng/rstream";
import { blendAdd } from "../src";

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
        // Specifying width/height here causes an ArrayBufferView error.
        // width: image.naturalWidth,
        // height: image.naturalHeight,
        filter: TextureFilter.LINEAR,
      });
      $.next(texture);
    });
  });

const domContainer = document.getElementById("container");
const domOpacity = document.getElementById("opacity");

const { gl } = glCanvas({
  width: 975,
  height: 1300,
  parent: domContainer,
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
    const add = blendAdd($xyz(base), $xyz(blend), unis.opacity);
    const out = vec4(add, 1.0);
    return [defMain(() => [base, blend, assign(gl.gl_FragColor, out)])];
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
    opacity: ["float", 0],
  },
});

compileModel(gl, model);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

sync({
  src: {
    base: fromImage(gl, "/image1.jpeg"),
    blend: fromImage(gl, "/image2.jpeg"),
    input: fromDOMEvent(domOpacity, "input"),
  },
}).subscribe({
  next: ({ base, blend, input }) => {
    model.textures = [base, blend];
    model.uniforms.opacity = (input.target as HTMLInputElement).valueAsNumber;
    draw(model);
  },
});

domOpacity.dispatchEvent(new Event("input"));
