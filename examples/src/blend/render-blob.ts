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
  vec2,
  div,
  $x,
  $y,
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
  TextureRepeat,
  TextureTarget,
} from "@thi.ng/webgl";
import { blendModeSelect3 } from "glsl-blend/ast";
import { aspectCorrectedUV } from "@thi.ng/shader-ast-stdlib";

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

      // const samp = aspectCorrectedUV($xy(gl.gl_FragCoord), vec2(512, 512));
      // const out3 = vec4($x(samp), 0, 0, 1);
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

export type RenderBlobOpts = {
  base_url: string;
  blend_url: string;
  mode: number;
  opacity: number;
};

export const createRenderBlobContext = () => {
  const { gl, quad, canvas, dispose } = createCanvasContext();

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

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  return {
    dispose: () => {
      imageCache.clear();
      dispose();
    },
    renderBlob: (opts: RenderBlobOpts) => {
      const { base_url, blend_url, mode = 0, opacity = 0.5 } = opts;

      /**
       * Create dispose on render context.
       * And move texture cache to context.
       * Unsubscribe all subscriptions..
       */
      return sync({
        src: {
          base: fromImage(opts.base_url) as Stream<Texture>,
          blend: fromImage(opts.blend_url) as Stream<Texture>,
        },
      }).subscribe(
        asyncMap(async ({ base, blend }) => {
          // await new Promise((res) => setTimeout(res, 100));

          const res = await new Promise<null | {
            blob: Blob;
            url: string;
            revoke: () => void;
          }>((res) => {
            requestIdleCallback(() => {
              requestAnimationFrame(() => {
                gl.clear(gl.COLOR_BUFFER_BIT);
                quad.textures = [base, blend];
                quad.uniforms!.opacity = opacity;
                quad.uniforms!.mode = mode;

                const scl = "fill";
                quad.uniforms!.scaleBase = computeAspectScale(base.size, scl);
                quad.uniforms!.scaleBlend = computeAspectScale(blend.size, scl);

                // console.log(quad.uniforms!.scaleBlend);
                // quad.uniforms!.scaleBlend = [1, 0.8];

                draw(quad);

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
          });

          return res;
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
