import { defn } from "@thi.ng/shader-ast";
import { stream } from "@thi.ng/rstream";

export interface IFnInput {
  fn: ReturnType<typeof defn>;
  name: string;
}

type TransformType = "glslify-1" | "glslify-1" | "esm-1" | "esm-2";

// output file/
export interface IShaderAstGenConfig {
  outDir: string;
  inputs: IFnInput[];
  transforms: TransformType[];
}

const fromConfig = stream;
export const shaderAstGen = (config: IShaderAstGenConfig) => {};
