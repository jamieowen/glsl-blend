import { ifThen, defn, int, eq, ret } from "@thi.ng/shader-ast";
import { BLEND_MODES_3, BLEND_MODES_4 } from "./api";

export const blendModeSelect3 = defn(
  "vec3",
  "blendModePick",
  ["int", "vec3", "vec3", "float"],
  (mode, base, blend, opacity) => {
    const select = Object.values(BLEND_MODES_3).map((blendFn, i) =>
      ifThen(eq(mode, int(i)), [ret(blendFn(base, blend, opacity))])
    );
    return [...select];
  }
);

export const blendModeSelect4 = defn(
  "vec4",
  "blendModePick",
  ["int", "vec4", "vec4", "float"],
  (mode, base, blend, opacity) => {
    const select = Object.values(BLEND_MODES_4).map((blendFn, i) =>
      ifThen(eq(mode, int(i)), [ret(blendFn(base, blend, opacity))])
    );
    return [...select];
  }
);
