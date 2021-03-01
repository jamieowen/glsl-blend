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
  setLogger,
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
import { ConsoleLogger } from "@thi.ng/api";
import { stream, sync, fromDOMEvent } from "@thi.ng/rstream";
import { blendModeSelect3, blendModeSelect4, BLEND_MODES_3 } from "../src";

// enable logger to see generated GLSL output
setLogger(new ConsoleLogger("webgl"));

const fromImage = (gl: WebGLRenderingContext, url: string) =>
  stream<Texture>(($) => {
    const image = document.createElement("img");
    let texture: Texture;
    image.src = url;
    image.decode().then(() => {
      console.log(image.width, image.height);
      console.log(image.naturalWidth, image.naturalHeight);
      texture = defTexture(gl, {
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

      return () => {
        if (texture) {
          texture.release();
        }
      };
    });
  });

const domContainer = document.getElementById("container");
const domOpacity = document.getElementById("opacityInput");
const domMode = document.getElementById("optionSelect") as HTMLSelectElement;
const domNext = document.getElementById("nextButton");
const domPrev = document.getElementById("prevButton");

Object.keys(BLEND_MODES_3).forEach((key) => {
  const option = document.createElement("option");
  option.innerText = key;
  domMode.appendChild(option);
});
domNext.onclick = () => {
  domMode.selectedIndex = (domMode.selectedIndex + 1) % domMode.options.length;
  domMode.dispatchEvent(new Event("change"));
};
domPrev.onclick = () => {
  const len = domMode.options.length;
  domMode.selectedIndex = (((domMode.selectedIndex - 1) % len) + len) % len;
  domMode.dispatchEvent(new Event("change"));
};

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

    const out3 = vec4(
      blendModeSelect3(unis.mode, $xyz(base), $xyz(blend), unis.opacity),
      1.0
    );
    // const out4 = blendModeSelect4(unis.mode, base, blend, unis.opacity);

    return [defMain(() => [base, blend, assign(gl.gl_FragColor, out3)])];
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
    mode: ["int", 0],
  },
});

compileModel(gl, model);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

sync({
  src: {
    base: fromImage(gl, "image1.jpeg"),
    blend: fromImage(gl, "image2.jpeg"),
    input: fromDOMEvent(domOpacity, "input"),
    mode: fromDOMEvent(domMode, "change"),
  },
}).subscribe({
  next: ({ base, blend, input, mode }) => {
    model.textures = [base, blend];
    model.uniforms.opacity = (input.target as HTMLInputElement).valueAsNumber;
    model.uniforms.mode = (mode.target as HTMLSelectElement).selectedIndex;
    draw(model);
  },
});

domOpacity.dispatchEvent(new Event("input"));
domMode.dispatchEvent(new Event("change"));
