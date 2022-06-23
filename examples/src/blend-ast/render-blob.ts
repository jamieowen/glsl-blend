import { CloseMode, Stream, stream, Subscription, sync } from "@thi.ng/rstream";
import {
  assign,
  defMain,
  vec4,
  FLOAT0,
  FLOAT1,
  sym,
  texture,
  $xy,
  $xyz,
  sub,
  add,
  mul,
} from "@thi.ng/shader-ast";
import {
  compileModel,
  defQuadModel,
  defShader,
  defTexture,
  draw,
  glCanvas,
  Texture,
  TextureFilter,
  TextureFormat,
  TextureTarget,
} from "@thi.ng/webgl";
import { blendModeSelect3 } from "glsl-blend/ast";

/**
 * Create a square GL canvas with prepared quad to
 * render a blend mode with a base & blend image.
 */
const createCanvasContext = () => {
  const { canvas, ext, gl } = glCanvas({
    width: 512,
    height: 512,
    opts: {
      preserveDrawingBuffer: true,
    },
  });

  const quad = defQuadModel({});
  quad.shader = defShader(gl, {
    vs: (gl, _unis, inputs, vary) => {
      return [
        defMain(() => [
          assign(vary.vUv, inputs.uv),
          assign(gl.gl_Position, vec4(inputs.position, FLOAT0, FLOAT1)),
        ]),
      ];
    },
    fs: (gl, unis, inputs) => {
      const uvBase = add(mul(unis.scaleBase, sub($xy(inputs.vUv), 0.5)), 0.5);
      const uvBlend = add(mul(unis.scaleBlend, sub($xy(inputs.vUv), 0.5)), 0.5);

      const base = sym(texture(unis.base, uvBase));
      const blend = sym(texture(unis.blend, uvBlend));

      const out3 = vec4(
        blendModeSelect3(unis.mode, $xyz(base), $xyz(blend), unis.opacity),
        1.0
      );

      // const out4 = vec4(
      //   blendModeSelect3(unis.mode, $xyz(base), $xyz(blend), unis.opacity),
      //   1.0
      // );

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
      scaleBase: ["vec2", [1, 1]],
      scaleBlend: ["vec2", [1, 1]],
    },
  });

  compileModel(gl, quad);

  return {
    gl,
    canvas,
    quad,
    ext,
    dispose: () => {
      quad.shader.release();
      console.log("dispose canvas");
    },
  };
};

export const textureFromImage = (src: string, gl: WebGLRenderingContext) => {
  return stream<Texture>(
    (s) => {
      const image = document.createElement("img");
      image.crossOrigin = "";
      image.src = src;
      let texture: Texture;
      image.decode().then((res) => {
        texture = defTexture(gl, {
          image,
          target: TextureTarget.TEXTURE_2D,
          format: TextureFormat.RGBA,
          flip: true,
          filter: TextureFilter.LINEAR,
          // wrap: TextureRepeat.REPEAT_MIRROR,
          // Specifying width/height here causes an ArrayBufferView error.
          // width: image.naturalWidth,
          // height: image.naturalHeight,
        });
        s.next(texture);
      });

      return () => {
        console.log("Close Stream");
        if (texture) {
          texture.release();
          image.src = "";
        }
      };
    },
    {
      closeOut: CloseMode.LAST,
      // closeIn: CloseMode.NEVER,
    }
  );
};

export type RenderBlobContext = ReturnType<typeof createRenderBlobContext>;
export type RenderBlobStream = ReturnType<RenderBlobContext["renderBlob"]>;
export type RenderBlobResult = { url: string; blob: Blob; revoke: () => void };
export type RenderCanvasResult = {
  canvas: HTMLCanvasElement;
  dispose: () => void;
};

export type RenderBlobOpts = {
  base_url: string;
  blend_url: string;
  mode: number;
  opacity: number;
};

export const createRenderBlobContext = () => {
  const { gl, quad, canvas, dispose } = createCanvasContext();
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  const imageCache = new Map<any, Stream<any>>();
  const fromImage = (src: string) => {
    if (imageCache.has(src)) {
      return imageCache.get(src)!;
    } else {
      const $image = textureFromImage(src, gl);
      imageCache.set(src, $image);
      return $image;
    }
  };

  const fromImages = (opts: RenderBlobOpts) => {
    const { base_url, blend_url } = opts;
    return sync({
      src: {
        base: fromImage(base_url) as Stream<Texture>,
        blend: fromImage(blend_url) as Stream<Texture>,
      },
    });
  };

  const render = (base: Texture, blend: Texture, opts: RenderBlobOpts) => {
    const { mode = 0, opacity = 0.5 } = opts;

    gl.clear(gl.COLOR_BUFFER_BIT);
    quad.textures = [base, blend];
    quad.uniforms!.opacity = opacity;
    quad.uniforms!.mode = mode;

    const scl = "fill";
    quad.uniforms!.scaleBase = computeAspectScale(base.size, scl);
    quad.uniforms!.scaleBlend = computeAspectScale(blend.size, scl);

    draw(quad);

    return canvas;
  };

  return {
    dispose: () => {
      imageCache.clear();
      dispose();
    },
    renderBlob: (opts: RenderBlobOpts) => {
      return fromImages(opts).subscribe(
        asyncMap(async ({ base, blend }) => {
          return new Promise<RenderBlobResult | null>((res) => {
            requestAnimationFrame(async () => {
              render(base, blend, opts);
              canvas.toBlob((blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  res({
                    url,
                    blob,
                    revoke: () => URL.revokeObjectURL(url),
                  } as RenderBlobResult);
                } else {
                  res(null);
                }
              });
            });
          });
        })
      );
    },

    renderCanvas: (opts: RenderBlobOpts) => {
      return fromImages(opts).subscribe(
        asyncMap(async ({ base, blend }) => {
          return new Promise<RenderCanvasResult | null>((res) => {
            requestAnimationFrame(async () => {
              render(base, blend, opts);
              const copy = document.createElement("canvas");
              copy.width = canvas.width;
              copy.height = canvas.height;
              const ctx = copy.getContext("2d");
              ctx?.drawImage(canvas, 0, 0);
              res({
                canvas: copy,
                dispose: () => {
                  // canvas.dose
                },
              });
            });
          });
        })
      );
    },
  };
};

// landscape "Aspect Fit": vec2(1.0, aspect).
// portrait "Aspect Fill": vec2(1.0, aspect).

// landscape "Aspect Fill": vec2(1.0/aspect, 1.0).
// portrait "Aspect Fit": vec2(1.0/aspect, 1.0).

/**
 * Based on this link, but with different aspect corrections below.
 * ( along with shader offsets above )
 * https://stackoverflow.com/questions/62821286/aspect-fit-and-aspect-fill-content-mode-with-opengl-es-2-0
 **/
const computeAspectScale = (
  size: number[],
  scale: "fit" | "fill" | "scale"
): [number, number] => {
  const aspect = size[1] / size[0];
  const landscape = size[0] > size[1];
  if (scale === "fit") {
    if (landscape) {
      return [1, 1 / aspect]; // Correct :)
    } else {
      return [aspect, 1]; // Correct :)
    }
  } else if (scale === "fill") {
    if (landscape) {
      return [aspect, 1]; // Correct :)
    } else {
      return [1, 1 / aspect]; // Correct :)
    }
  } else {
    return [1, 1];
  }
};

type AsyncMapFn<I, O> = (input: I) => Promise<O>;

class AsyncMap<I, O> extends Subscription<I, O> {
  constructor(private _map: AsyncMapFn<I, O>) {
    super({}, {});
  }

  next(x: I): void {
    (async () => {
      await this._map(x).then((res) => {
        this.dispatch(res);
      });
    })();
  }
}

const asyncMap = <I, O>(map: AsyncMapFn<I, O>) => new AsyncMap(map);
