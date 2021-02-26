import { ifThen, defn, int, eq, ret } from "@thi.ng/shader-ast";
import { BLEND_MODES } from "./api";

export const blendModeSelect = defn(
  "vec3",
  "blendModePick",
  ["int", "vec3", "vec3", "float"],
  (mode, base, blend, opacity) => {
    const select = Object.values(BLEND_MODES).map((blendFn, i) =>
      ifThen(eq(mode, int(i)), [ret(blendFn(base, blend, opacity))])
    );
    return [...select];
  }
);
