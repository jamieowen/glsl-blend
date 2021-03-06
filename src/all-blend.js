import {defn, eq, ifThen, int, ret} from "../_snowpack/pkg/@thi.ng/shader-ast.js";
import {BLEND_MODES_3, BLEND_MODES_4} from "./constants.js";
const blendModeSelect = (type, modes) => defn(type, "blendModePick", ["int", type, type, "float"], (mode, base, blend, opacity) => Object.values(modes).map((blendFn, i) => ifThen(eq(mode, int(i)), [ret(blendFn(base, blend, opacity))])));
export const blendModeSelect3 = blendModeSelect("vec3", BLEND_MODES_3);
export const blendModeSelect4 = blendModeSelect("vec4", BLEND_MODES_4);
