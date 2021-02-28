import {
  glCanvas,
  defQuadModel,
  defTexture,
  defShader,
  compileModel,
  draw,
  TextureFilter,
  TextureFormat,
  TextureTarget
} from "../_snowpack/pkg/@thi.ng/webgl.js";
import {
  $xy,
  $xyz,
  assign,
  defMain,
  float,
  sym,
  texture,
  vec4
} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
import {stream, sync, fromDOMEvent} from "../_snowpack/pkg/@thi.ng/rstream.js";
import {blendModeSelect3, BLEND_MODES_3} from "../src/index.js";
const fromImage = (gl2, url) => stream(($) => {
  const image = document.createElement("img");
  let texture2;
  image.src = url;
  image.decode().then(() => {
    console.log(image.width, image.height);
    console.log(image.naturalWidth, image.naturalHeight);
    texture2 = defTexture(gl2, {
      image,
      target: TextureTarget.TEXTURE_2D,
      format: TextureFormat.RGBA,
      flip: true,
      filter: TextureFilter.LINEAR
    });
    $.next(texture2);
    return () => {
      if (texture2) {
        texture2.release();
      }
    };
  });
});
const domContainer = document.getElementById("container");
const domOpacity = document.getElementById("opacityInput");
const domMode = document.getElementById("optionSelect");
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
  domMode.selectedIndex = ((domMode.selectedIndex - 1) % len + len) % len;
  domMode.dispatchEvent(new Event("change"));
};
const {gl} = glCanvas({
  width: 975,
  height: 1300,
  parent: domContainer
});
const model = defQuadModel({});
model.shader = defShader(gl, {
  vs: (gl2, _unis, inputs, vary) => {
    return [
      defMain(() => [
        assign(vary.vUv, inputs.uv),
        assign(gl2.gl_Position, vec4(inputs.position, float(0), float(1)))
      ])
    ];
  },
  fs: (gl2, unis, inputs) => {
    const base = sym(texture(unis.base, $xy(inputs.vUv)));
    const blend = sym(texture(unis.blend, $xy(inputs.vUv)));
    const out3 = vec4(blendModeSelect3(unis.mode, $xyz(base), $xyz(blend), unis.opacity), 1);
    return [defMain(() => [base, blend, assign(gl2.gl_FragColor, out3)])];
  },
  attribs: {
    position: "vec2",
    uv: "vec2"
  },
  varying: {
    vUv: "vec2"
  },
  uniforms: {
    base: ["sampler2D", 0],
    blend: ["sampler2D", 1],
    opacity: ["float", 0],
    mode: ["int", 0]
  }
});
compileModel(gl, model);
gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);
sync({
  src: {
    base: fromImage(gl, "/image1.jpeg"),
    blend: fromImage(gl, "/image2.jpeg"),
    input: fromDOMEvent(domOpacity, "input"),
    mode: fromDOMEvent(domMode, "change")
  }
}).subscribe({
  next: ({base, blend, input, mode}) => {
    model.textures = [base, blend];
    model.uniforms.opacity = input.target.valueAsNumber;
    model.uniforms.mode = mode.target.selectedIndex;
    draw(model);
  }
});
domOpacity.dispatchEvent(new Event("input"));
domMode.dispatchEvent(new Event("change"));
