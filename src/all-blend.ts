import { defn, eq, ifThen, int, ret } from "@thi.ng/shader-ast";
import type { BlendMode, BlendModeDef, Color } from "./api";
import { BLEND_MODES_3, BLEND_MODES_4 } from "./constants";

const blendModeSelect = <T extends Color>(
  type: T,
  modes: Record<BlendMode, BlendModeDef<T>>
) =>
  defn(
    type,
    "blendModePick",
    ["int", type, type, "float"],
    (mode, base, blend, opacity) =>
      Object.values(modes).map((blendFn, i) =>
        ifThen(eq(mode, int(i)), [ret(blendFn(base, blend, opacity))])
      )
  );

export const blendModeSelect3 = blendModeSelect("vec3", BLEND_MODES_3);
export const blendModeSelect4 = blendModeSelect("vec4", BLEND_MODES_4);
