import {
  CloseMode,
  fromPromise,
  reactive,
  sidechainPartition,
  Stream,
  stream,
  Subscription,
  sync,
} from "@thi.ng/rstream";
import {
  assign,
  defMain,
  float,
  vec4,
  FLOAT0,
  FLOAT1,
  sym,
  texture,
  $xy,
  $xyz,
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

const imageCache = new Map<any, any>();

export const fromImage = (src: string, context: BlendRenderContext) => {
  if (imageCache.has(src)) {
    return imageCache.get(src);
  }
  const $image = stream<Texture>(
    (s) => {
      const image = document.createElement("img");
      image.crossOrigin = "";
      image.src = src;
      image.decode().then((res) => {
        const texture = defTexture(context.gl, {
          image,
          target: TextureTarget.TEXTURE_2D,
          format: TextureFormat.RGBA,
          flip: true,
          filter: TextureFilter.LINEAR,
          // Specifying width/height here causes an ArrayBufferView error.
          // width: image.naturalWidth,
          // height: image.naturalHeight,
        });

        s.next(texture);
      });

      return () => {
        console.log("Close Stream");
      };
    },
    {
      // closeOut: CloseMode.LAST,
    }
  );
  imageCache.set(src, $image);
  return $image;
};

export const toTexture = (image: HTMLImageElement) => {};

export const createRenderContext = () => {
  const { canvas, ext, gl } = glCanvas({
    width: 1000,
    height: 1000,
    opts: {},
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

  compileModel(gl, quad);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    canvas,
    quad,
    ext,
    gl,
    render: (
      base: Texture,
      blend: Texture,
      opacity: number = 0.5,
      mode: number = 0
    ) => {
      quad.textures = [base, blend];
      quad.uniforms!.opacity = opacity;
      quad.uniforms!.mode = mode;
      draw(quad);
    },
  };
};

export type BlendRenderContext = ReturnType<typeof createRenderContext>;

export const renderBlob = (
  baseUrl: string,
  blendUrl: string,
  context: BlendRenderContext
) => {
  const s = stream();
  return sync({
    src: {
      base: fromImage(baseUrl, context),
      blend: fromImage(blendUrl, context),
      context: reactive(context),
    },
  })
    .subscribe(
      asyncMap(async ({ base, blend }) => {
        // await new Promise((res) => setTimeout(res, 100));

        const res = await new Promise<null | {
          blob: Blob;
          url: string;
          revoke: () => void;
        }>((res) => {
          requestIdleCallback(() => {
            requestAnimationFrame(() => {
              context.render(base, blend, 0.5, 0);
              context.canvas.toBlob((blob) => {
                console.log("Create Blob");
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  res({ url, blob, revoke: () => URL.revokeObjectURL(url) });
                } else {
                  res(null);
                }
              });
            });
          });
        });

        return res;
      })
    )
    .subscribe({
      next: (s) => {
        console.log("AFTER ASYNC", s?.url);
      },
    });

  // .map(({ base, blend, context }) => {
  //   context.render(base, blend, 0.5, 0);
  // context.canvas.toBlob((blob) => {
  // console.log("Create Blob", blob);
  //   if (blob) {
  //     const url = URL.createObjectURL(blob);
  //     console.log(url);
  //   }
  // });
  // return { base, blend };
  // }); //.subscribe()
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
