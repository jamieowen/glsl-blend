import { i as isString, a as sym, f as isVec, e as isMat, d as isNumber, m as isBoolean, o as itemType, q as equivArrayLike, r as program, t as input, u as uniform, x as output } from '../common/item-70461230.js';
import { d as defError, f as isArray } from '../common/map-fd6d0079.js';
import { N as NULL_LOGGER, i as isFunction } from '../common/is-function-a2f84a73.js';

/**
 * Returns true iff `x` implements {@link IDeref}.
 *
 * @param x
 */
const isDeref = (x) => x != null && typeof x["deref"] === "function";
/**
 * If `x` implements {@link IDeref}, returns its wrapped value, else
 * returns `x` itself.
 *
 * @param x -
 */
const deref = (x) => (isDeref(x) ? x.deref() : x);

/**
 * WebGL numeric type constants. Use {@link GL2TYPE} to convert, if needed.
 *
 * {@link Type}
 * {@link GL2TYPE}
 * {@link TYPE2GL}
 */
var GLType;
(function (GLType) {
    GLType[GLType["I8"] = 5120] = "I8";
    GLType[GLType["U8"] = 5121] = "U8";
    GLType[GLType["I16"] = 5122] = "I16";
    GLType[GLType["U16"] = 5123] = "U16";
    GLType[GLType["I32"] = 5124] = "I32";
    GLType[GLType["U32"] = 5125] = "U32";
    GLType[GLType["F32"] = 5126] = "F32";
})(GLType || (GLType = {}));
/**
 * Conversion from {@link GLType} to {@link Type} enums.
 */
({
    [GLType.I8]: "i8",
    [GLType.U8]: "u8",
    [GLType.I16]: "i16",
    [GLType.U16]: "u16",
    [GLType.I32]: "i32",
    [GLType.U32]: "u32",
    [GLType.F32]: "f32",
});
/**
 * Potentially lossy conversion from {@link Type} to {@link GLType} enums.
 *
 * Not all enums are mappable:
 *
 * - `F64` maps to `undefined`, since unsupported by WebGL
 * - `U8C` maps to "u8"
 */
const TYPE2GL = {
    i8: GLType.I8,
    u8: GLType.U8,
    u8c: GLType.U8,
    i16: GLType.I16,
    u16: GLType.U16,
    i32: GLType.I32,
    u32: GLType.U32,
    f32: GLType.F32,
    f64: undefined,
};
const FLOAT_ARRAY_CTORS = {
    f32: Float32Array,
    f64: Float64Array,
};
const INT_ARRAY_CTORS = {
    i8: Int8Array,
    i16: Int16Array,
    i32: Int32Array,
};
const UINT_ARRAY_CTORS = {
    u8: Uint8Array,
    u8c: Uint8ClampedArray,
    u16: Uint16Array,
    u32: Uint32Array,
};
Object.assign(Object.assign(Object.assign({}, FLOAT_ARRAY_CTORS), INT_ARRAY_CTORS), UINT_ARRAY_CTORS);
/**
 * Returns suitable {@link GLType} enum of `type`.
 *
 * @example
 * ```ts
 * asGLType("f32") => GLType.F32
 * asGLType(GLType.F32) => GLType.F32
 * ```
 *
 * @param type -
 */
const asGLType = (type) => {
    const t = TYPE2GL[type];
    return t !== undefined ? t : type;
};

const existsAndNotNull = (x) => x != null;

const UnsupportedOperationError = defError(() => "unsupported operation");
const unsupported = (msg) => {
    throw new UnsupportedOperationError(msg);
};

/**
 * Iterator which yields all values of given object's own properties
 * (Similar to `Object.values()`).
 *
 * @remarks
 * See also:
 * - {@link keys}
 * - {@link pairs}
 *
 * @param x -
 */
function* vals(x) {
    for (let k in x) {
        if (x.hasOwnProperty(k)) {
            yield x[k];
        }
    }
}

/**
 * Unique symbol used for registering a default / fallback
 * implementation.
 */
const DEFAULT = Symbol();
let LOGGER = NULL_LOGGER;

function defmulti(f, ancestors) {
    const impls = {};
    const rels = ancestors
        ? makeRels(ancestors)
        : {};
    const fn = (...args) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[DEFAULT];
        return g
            ? g(...args)
            : unsupported(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id, g) => {
        if (impls[id]) {
            LOGGER.warn(`overwriting '${id.toString()}' impl`);
        }
        impls[id] = g;
        return true;
    };
    fn.addAll = (_impls) => {
        let ok = true;
        for (let id in _impls) {
            ok = fn.add(id, _impls[id]) && ok;
        }
        return ok;
    };
    fn.remove = (id) => {
        if (!impls[id])
            return false;
        delete impls[id];
        return true;
    };
    fn.callable = (...args) => {
        const id = f(...args);
        return !!(impls[id] ||
            findImpl(impls, rels, id) ||
            impls[DEFAULT]);
    };
    fn.isa = (id, parent) => {
        let val = rels[id];
        !val && (rels[id] = val = new Set());
        val.add(parent);
    };
    fn.impls = () => {
        const res = new Set(Object.keys(impls));
        for (let id in rels) {
            findImpl(impls, rels, id) && res.add(id);
        }
        impls[DEFAULT] && res.add(DEFAULT);
        return res;
    };
    fn.rels = () => rels;
    fn.parents = (id) => rels[id];
    fn.ancestors = (id) => new Set(findAncestors([], rels, id));
    fn.dependencies = function* () {
        for (let a in rels) {
            for (let b of rels[a])
                yield [a, b];
        }
        for (let id in impls) {
            !rels[id] && (yield [id, undefined]);
        }
    };
    return fn;
}
const findImpl = (impls, rels, id) => {
    const parents = rels[id];
    if (!parents)
        return;
    for (let p of parents) {
        let impl = impls[p] || findImpl(impls, rels, p);
        if (impl)
            return impl;
    }
};
const findAncestors = (acc, rels, id) => {
    const parents = rels[id];
    if (parents) {
        for (let p of parents) {
            acc.push(p);
            findAncestors(acc, rels, p);
        }
    }
    return acc;
};
const makeRels = (spec) => {
    const rels = {};
    for (let k in spec) {
        const val = spec[k];
        rels[k] = val instanceof Set ? val : new Set(val);
    }
    return rels;
};

/**
 * Takes an object of code generator functions and returns a new code
 * generator / compile target function which serializes a given AST
 * using the provided node type implementations.
 *
 * {@link @thi.ng/shader-ast-glsl#targetGLSL}
 *
 * @param impls -
 */
const defTarget = (impls) => {
    const emit = defmulti((x) => x.tag);
    emit.add(DEFAULT, (t) => unsupported(`no impl for AST node type: '${t.tag}'`));
    emit.addAll(impls);
    return emit;
};

const GL_EXT_INFO = {
    WEBGL_draw_buffers: {
        gl: true,
        alias: "GL_EXT_draw_buffers",
    },
    OES_standard_derivatives: {
        gl: true,
        alias: "GL_OES_standard_derivatives",
    },
};

let LOGGER$1 = NULL_LOGGER;

var DrawMode;
(function (DrawMode) {
    DrawMode[DrawMode["POINTS"] = 0] = "POINTS";
    DrawMode[DrawMode["LINES"] = 1] = "LINES";
    DrawMode[DrawMode["LINE_LOOP"] = 2] = "LINE_LOOP";
    DrawMode[DrawMode["LINE_STRIP"] = 3] = "LINE_STRIP";
    DrawMode[DrawMode["TRIANGLES"] = 4] = "TRIANGLES";
    DrawMode[DrawMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
    DrawMode[DrawMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
})(DrawMode || (DrawMode = {}));

const DEFAULT_OUTPUT = { fragColor: ["vec4", 0] };

var TextureFormat;
(function (TextureFormat) {
    TextureFormat[TextureFormat["ALPHA"] = 6406] = "ALPHA";
    TextureFormat[TextureFormat["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
    TextureFormat[TextureFormat["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
    TextureFormat[TextureFormat["DEPTH_COMPONENT24"] = 33190] = "DEPTH_COMPONENT24";
    TextureFormat[TextureFormat["DEPTH_COMPONENT32F"] = 36012] = "DEPTH_COMPONENT32F";
    TextureFormat[TextureFormat["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
    TextureFormat[TextureFormat["DEPTH24_STENCIL8"] = 35056] = "DEPTH24_STENCIL8";
    TextureFormat[TextureFormat["DEPTH32F_STENCIL8"] = 36013] = "DEPTH32F_STENCIL8";
    TextureFormat[TextureFormat["LUMINANCE"] = 6409] = "LUMINANCE";
    TextureFormat[TextureFormat["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
    TextureFormat[TextureFormat["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
    TextureFormat[TextureFormat["R16F"] = 33325] = "R16F";
    TextureFormat[TextureFormat["R16I"] = 33331] = "R16I";
    TextureFormat[TextureFormat["R16UI"] = 33332] = "R16UI";
    TextureFormat[TextureFormat["R32F"] = 33326] = "R32F";
    TextureFormat[TextureFormat["R32I"] = 33333] = "R32I";
    TextureFormat[TextureFormat["R32UI"] = 33334] = "R32UI";
    TextureFormat[TextureFormat["R8"] = 33321] = "R8";
    TextureFormat[TextureFormat["R8_SNORM"] = 36756] = "R8_SNORM";
    TextureFormat[TextureFormat["R8I"] = 33329] = "R8I";
    TextureFormat[TextureFormat["R8UI"] = 33330] = "R8UI";
    TextureFormat[TextureFormat["RED"] = 6403] = "RED";
    TextureFormat[TextureFormat["RED_INTEGER"] = 36244] = "RED_INTEGER";
    TextureFormat[TextureFormat["RG"] = 33319] = "RG";
    TextureFormat[TextureFormat["RG_INTEGER"] = 33320] = "RG_INTEGER";
    TextureFormat[TextureFormat["RG16F"] = 33327] = "RG16F";
    TextureFormat[TextureFormat["RG16I"] = 33337] = "RG16I";
    TextureFormat[TextureFormat["RG16UI"] = 33338] = "RG16UI";
    TextureFormat[TextureFormat["RG32F"] = 33328] = "RG32F";
    TextureFormat[TextureFormat["RG32I"] = 33339] = "RG32I";
    TextureFormat[TextureFormat["RG32UI"] = 33340] = "RG32UI";
    TextureFormat[TextureFormat["RG8"] = 33323] = "RG8";
    TextureFormat[TextureFormat["RG8_SNORM"] = 36757] = "RG8_SNORM";
    TextureFormat[TextureFormat["RG8I"] = 33335] = "RG8I";
    TextureFormat[TextureFormat["RG8UI"] = 33336] = "RG8UI";
    TextureFormat[TextureFormat["RGB"] = 6407] = "RGB";
    TextureFormat[TextureFormat["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
    TextureFormat[TextureFormat["RGB10_A2"] = 32857] = "RGB10_A2";
    TextureFormat[TextureFormat["RGB10_A2UI"] = 36975] = "RGB10_A2UI";
    TextureFormat[TextureFormat["RGB16F"] = 34843] = "RGB16F";
    TextureFormat[TextureFormat["RGB16I"] = 36233] = "RGB16I";
    TextureFormat[TextureFormat["RGB16UI"] = 36215] = "RGB16UI";
    TextureFormat[TextureFormat["RGB32F"] = 34837] = "RGB32F";
    TextureFormat[TextureFormat["RGB32I"] = 36227] = "RGB32I";
    TextureFormat[TextureFormat["RGB32UI"] = 36209] = "RGB32UI";
    TextureFormat[TextureFormat["RGB5_A1"] = 32855] = "RGB5_A1";
    TextureFormat[TextureFormat["RGB565"] = 36194] = "RGB565";
    TextureFormat[TextureFormat["RGB8"] = 32849] = "RGB8";
    TextureFormat[TextureFormat["RGB8_SNORM"] = 36758] = "RGB8_SNORM";
    TextureFormat[TextureFormat["RGB8I"] = 36239] = "RGB8I";
    TextureFormat[TextureFormat["RGB8UI"] = 36221] = "RGB8UI";
    TextureFormat[TextureFormat["RGB9_E5"] = 35901] = "RGB9_E5";
    TextureFormat[TextureFormat["RGBA"] = 6408] = "RGBA";
    TextureFormat[TextureFormat["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
    TextureFormat[TextureFormat["RGBA16F"] = 34842] = "RGBA16F";
    TextureFormat[TextureFormat["RGBA16I"] = 36232] = "RGBA16I";
    TextureFormat[TextureFormat["RGBA16UI"] = 36214] = "RGBA16UI";
    TextureFormat[TextureFormat["RGBA32F"] = 34836] = "RGBA32F";
    TextureFormat[TextureFormat["RGBA32I"] = 36226] = "RGBA32I";
    TextureFormat[TextureFormat["RGBA32UI"] = 36208] = "RGBA32UI";
    TextureFormat[TextureFormat["RGBA4"] = 32854] = "RGBA4";
    TextureFormat[TextureFormat["RGBA8"] = 32856] = "RGBA8";
    TextureFormat[TextureFormat["RGBA8_SNORM"] = 36759] = "RGBA8_SNORM";
    TextureFormat[TextureFormat["RGBA8I"] = 36238] = "RGBA8I";
    TextureFormat[TextureFormat["RGBA8UI"] = 36220] = "RGBA8UI";
    TextureFormat[TextureFormat["SRGB8"] = 35905] = "SRGB8";
    TextureFormat[TextureFormat["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
})(TextureFormat || (TextureFormat = {}));
var TextureType;
(function (TextureType) {
    TextureType[TextureType["BYTE"] = 5120] = "BYTE";
    TextureType[TextureType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    TextureType[TextureType["SHORT"] = 5122] = "SHORT";
    TextureType[TextureType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    TextureType[TextureType["INT"] = 5124] = "INT";
    TextureType[TextureType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    TextureType[TextureType["FLOAT"] = 5126] = "FLOAT";
    TextureType[TextureType["HALF_FLOAT"] = 5131] = "HALF_FLOAT";
    TextureType[TextureType["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
    TextureType[TextureType["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
    TextureType[TextureType["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
    TextureType[TextureType["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
    TextureType[TextureType["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
    TextureType[TextureType["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
    TextureType[TextureType["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
    TextureType[TextureType["HALF_FLOAT_OES"] = 36193] = "HALF_FLOAT_OES";
    TextureType[TextureType["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
})(TextureType || (TextureType = {}));
var TextureTarget;
(function (TextureTarget) {
    TextureTarget[TextureTarget["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
    TextureTarget[TextureTarget["TEXTURE_3D"] = 32879] = "TEXTURE_3D";
    TextureTarget[TextureTarget["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
    TextureTarget[TextureTarget["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
})(TextureTarget || (TextureTarget = {}));
var TextureFilter;
(function (TextureFilter) {
    TextureFilter[TextureFilter["LINEAR"] = 9729] = "LINEAR";
    TextureFilter[TextureFilter["NEAREST"] = 9728] = "NEAREST";
    TextureFilter[TextureFilter["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
    TextureFilter[TextureFilter["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
    TextureFilter[TextureFilter["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
    TextureFilter[TextureFilter["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
})(TextureFilter || (TextureFilter = {}));
var TextureRepeat;
(function (TextureRepeat) {
    TextureRepeat[TextureRepeat["REPEAT"] = 10497] = "REPEAT";
    TextureRepeat[TextureRepeat["CLAMP"] = 33071] = "CLAMP";
    TextureRepeat[TextureRepeat["REPEAT_MIRROR"] = 33648] = "REPEAT_MIRROR";
})(TextureRepeat || (TextureRepeat = {}));
const $ = (format, types, num, render = false, filter = false, renderExt = render) => ({
    format,
    types,
    render,
    renderExt,
    filter,
    num,
});
const TEX_FORMATS = {
    [TextureFormat.ALPHA]: $(TextureFormat.ALPHA, [
        TextureType.UNSIGNED_BYTE,
        1,
        TextureType.HALF_FLOAT,
        2,
        TextureType.HALF_FLOAT_OES,
        2,
        TextureType.FLOAT,
        4,
    ], 1, true, true),
    [TextureFormat.DEPTH_COMPONENT]: $(TextureFormat.DEPTH_COMPONENT, [TextureType.UNSIGNED_SHORT, 2, TextureType.UNSIGNED_INT, 4], 1, true),
    [TextureFormat.DEPTH_COMPONENT16]: $(TextureFormat.DEPTH_COMPONENT, [TextureType.UNSIGNED_SHORT, 2, TextureType.UNSIGNED_INT, 4], 1, true),
    [TextureFormat.DEPTH_COMPONENT24]: $(TextureFormat.DEPTH_COMPONENT, [TextureType.UNSIGNED_INT, 4], 1, true),
    [TextureFormat.DEPTH_COMPONENT32F]: $(TextureFormat.DEPTH_COMPONENT, [TextureType.FLOAT, 4], 1, true),
    [TextureFormat.DEPTH_STENCIL]: $(TextureFormat.DEPTH_STENCIL, [TextureType.UNSIGNED_INT_24_8, 4], 1, true),
    [TextureFormat.DEPTH24_STENCIL8]: $(TextureFormat.DEPTH_STENCIL, [TextureType.UNSIGNED_INT_24_8, 4], 1, true),
    [TextureFormat.DEPTH32F_STENCIL8]: $(TextureFormat.DEPTH_STENCIL, [TextureType.FLOAT_32_UNSIGNED_INT_24_8_REV, 4], 1, true),
    [TextureFormat.LUMINANCE_ALPHA]: $(TextureFormat.LUMINANCE_ALPHA, [
        TextureType.UNSIGNED_BYTE,
        2,
        TextureType.HALF_FLOAT,
        4,
        TextureType.HALF_FLOAT_OES,
        4,
        TextureType.FLOAT,
        8,
    ], 2, true, true),
    [TextureFormat.LUMINANCE]: $(TextureFormat.LUMINANCE, [
        TextureType.UNSIGNED_BYTE,
        1,
        TextureType.HALF_FLOAT,
        2,
        TextureType.HALF_FLOAT_OES,
        2,
        TextureType.FLOAT,
        4,
    ], 1, true, true),
    [TextureFormat.R11F_G11F_B10F]: $(TextureFormat.RGB, [
        TextureType.FLOAT,
        12,
        TextureType.HALF_FLOAT,
        6,
        TextureType.UNSIGNED_INT_10F_11F_11F_REV,
        4,
    ], 3, false, true, true),
    [TextureFormat.R16F]: $(TextureFormat.RED, [TextureType.FLOAT, 4, TextureType.HALF_FLOAT, 2], 1, false, true, true),
    [TextureFormat.R16I]: $(TextureFormat.RED_INTEGER, [TextureType.SHORT, 2], 1, true),
    [TextureFormat.R16UI]: $(TextureFormat.RED_INTEGER, [TextureType.UNSIGNED_SHORT, 2], 1, true),
    [TextureFormat.R32F]: $(TextureFormat.RED, [TextureType.FLOAT, 4], 1, false, false, true),
    [TextureFormat.R32I]: $(TextureFormat.RED_INTEGER, [TextureType.INT, 4], 1, true),
    [TextureFormat.R32UI]: $(TextureFormat.RED_INTEGER, [TextureType.UNSIGNED_INT, 4], 1, true),
    [TextureFormat.R8_SNORM]: $(TextureFormat.RED, [TextureType.BYTE, 1], 1, false, true),
    [TextureFormat.R8]: $(TextureFormat.RED, [TextureType.UNSIGNED_BYTE, 1], 1, true, true),
    [TextureFormat.R8I]: $(TextureFormat.RED_INTEGER, [TextureType.BYTE, 1], 1, true),
    [TextureFormat.R8UI]: $(TextureFormat.RED_INTEGER, [TextureType.UNSIGNED_BYTE, 1], 1, true),
    [TextureFormat.RG16F]: $(TextureFormat.RG, [TextureType.FLOAT, 8, TextureType.HALF_FLOAT, 4], 2, false, true, true),
    [TextureFormat.RG16I]: $(TextureFormat.RG_INTEGER, [TextureType.SHORT, 4], 2, true),
    [TextureFormat.RG16UI]: $(TextureFormat.RG_INTEGER, [TextureType.UNSIGNED_SHORT, 4], 2, true),
    [TextureFormat.RG32F]: $(TextureFormat.RG, [TextureType.FLOAT, 8], 2, false, false, true),
    [TextureFormat.RG32I]: $(TextureFormat.RG_INTEGER, [TextureType.INT, 8], 2, true),
    [TextureFormat.RG32UI]: $(TextureFormat.RG_INTEGER, [TextureType.UNSIGNED_INT, 8], 2, true),
    [TextureFormat.RG8_SNORM]: $(TextureFormat.RG, [TextureType.BYTE, 2], 2, false, true),
    [TextureFormat.RG8]: $(TextureFormat.RG, [TextureType.UNSIGNED_BYTE, 2], 2, true, true),
    [TextureFormat.RG8I]: $(TextureFormat.RG_INTEGER, [TextureType.BYTE, 2], 2, true),
    [TextureFormat.RG8UI]: $(TextureFormat.RG_INTEGER, [TextureType.UNSIGNED_BYTE, 2], 2, true),
    [TextureFormat.RGB]: $(TextureFormat.RGB, [
        TextureType.UNSIGNED_BYTE,
        3,
        TextureType.HALF_FLOAT,
        6,
        TextureType.HALF_FLOAT_OES,
        6,
        TextureType.FLOAT,
        12,
        TextureType.UNSIGNED_SHORT_5_6_5,
        2,
    ], 3, true, true),
    [TextureFormat.RGB10_A2]: $(TextureFormat.RGBA, [TextureType.UNSIGNED_INT_2_10_10_10_REV, 4], 4, true, true),
    [TextureFormat.RGB10_A2UI]: $(TextureFormat.RGBA_INTEGER, [TextureType.UNSIGNED_INT_2_10_10_10_REV, 4], 4, true),
    [TextureFormat.RGB16F]: $(TextureFormat.RGB, [TextureType.FLOAT, 12, TextureType.HALF_FLOAT, 6], 3, false, true),
    [TextureFormat.RGB16I]: $(TextureFormat.RGB_INTEGER, [TextureType.SHORT, 6], 3),
    [TextureFormat.RGB16UI]: $(TextureFormat.RGB_INTEGER, [TextureType.UNSIGNED_SHORT, 6], 3),
    [TextureFormat.RGB32F]: $(TextureFormat.RGB, [TextureType.FLOAT, 12], 3),
    [TextureFormat.RGB32I]: $(TextureFormat.RGB_INTEGER, [TextureType.INT, 12], 3),
    [TextureFormat.RGB32UI]: $(TextureFormat.RGB_INTEGER, [TextureType.UNSIGNED_INT, 12], 3),
    [TextureFormat.RGB5_A1]: $(TextureFormat.RGBA, [
        TextureType.UNSIGNED_BYTE,
        4,
        TextureType.UNSIGNED_SHORT_5_5_5_1,
        2,
        TextureType.UNSIGNED_INT_2_10_10_10_REV,
        4,
    ], 4, true, true),
    [TextureFormat.RGB565]: $(TextureFormat.RGB, [TextureType.UNSIGNED_BYTE, 3, TextureType.UNSIGNED_SHORT_5_6_5, 2], 3, true, true),
    [TextureFormat.RGB8_SNORM]: $(TextureFormat.RGB, [TextureType.BYTE, 3], 3, false, true),
    [TextureFormat.RGB8]: $(TextureFormat.RGB, [TextureType.UNSIGNED_BYTE, 3], 3, true, true),
    [TextureFormat.RGB8I]: $(TextureFormat.RGB_INTEGER, [TextureType.BYTE, 3], 3),
    [TextureFormat.RGB8UI]: $(TextureFormat.RGB_INTEGER, [TextureType.UNSIGNED_BYTE, 3], 3),
    [TextureFormat.RGB9_E5]: $(TextureFormat.RGB, [
        TextureType.FLOAT,
        12,
        TextureType.HALF_FLOAT,
        6,
        TextureType.UNSIGNED_INT_5_9_9_9_REV,
        4,
    ], 3, false, true),
    [TextureFormat.RGBA]: $(TextureFormat.RGBA, [
        TextureType.UNSIGNED_BYTE,
        4,
        TextureType.HALF_FLOAT,
        8,
        TextureType.HALF_FLOAT_OES,
        8,
        TextureType.FLOAT,
        16,
        TextureType.UNSIGNED_SHORT_4_4_4_4,
        2,
        TextureType.UNSIGNED_SHORT_5_5_5_1,
        2,
    ], 4, true, true),
    [TextureFormat.RGBA16F]: $(TextureFormat.RGBA, [TextureType.FLOAT, 16, TextureType.HALF_FLOAT, 8], 4, false, true, true),
    [TextureFormat.RGBA16I]: $(TextureFormat.RGBA_INTEGER, [TextureType.SHORT, 8], 4, true),
    [TextureFormat.RGBA16UI]: $(TextureFormat.RGBA_INTEGER, [TextureType.UNSIGNED_SHORT, 8], 4, true),
    [TextureFormat.RGBA32F]: $(TextureFormat.RGBA, [TextureType.FLOAT, 16], 4, false, false, true),
    [TextureFormat.RGBA32I]: $(TextureFormat.RGBA_INTEGER, [TextureType.INT, 16], 4, true),
    [TextureFormat.RGBA32UI]: $(TextureFormat.RGBA_INTEGER, [TextureType.UNSIGNED_INT, 16], 4, true),
    [TextureFormat.RGBA4]: $(TextureFormat.RGBA, [TextureType.UNSIGNED_BYTE, 4, TextureType.UNSIGNED_SHORT_4_4_4_4, 2], 4, true, true),
    [TextureFormat.RGBA8_SNORM]: $(TextureFormat.RGBA, [TextureType.BYTE, 4], 4, false, true),
    [TextureFormat.RGBA8]: $(TextureFormat.RGBA, [TextureType.UNSIGNED_BYTE, 4], 4, true, true),
    [TextureFormat.RGBA8I]: $(TextureFormat.RGBA_INTEGER, [TextureType.BYTE, 4], 4, true),
    [TextureFormat.RGBA8UI]: $(TextureFormat.RGBA_INTEGER, [TextureType.UNSIGNED_BYTE, 4], 4, true),
    [TextureFormat.SRGB8_ALPHA8]: $(TextureFormat.RGBA, [TextureType.UNSIGNED_BYTE, 4], 4, true, true),
    [TextureFormat.SRGB8]: $(TextureFormat.RGB, [TextureType.UNSIGNED_BYTE, 3], 3, false, true),
};

const isGL2Context = (gl) => typeof WebGL2RenderingContext !== "undefined" &&
    gl instanceof WebGL2RenderingContext;

class WebGLError extends Error {
    constructor(msg) {
        super(`WebGL error ${msg ? ": " + msg : ""}`);
    }
}
const error = (msg) => {
    throw new WebGLError(msg);
};

class WebGLArrayBuffer {
    constructor(gl, data, target = gl.ARRAY_BUFFER, mode = gl.STATIC_DRAW) {
        this.gl = gl;
        this.buffer = gl.createBuffer() || error("error creating WebGL buffer");
        this.target = target;
        this.mode = mode;
        data && this.set(data);
    }
    bind() {
        this.gl.bindBuffer(this.target, this.buffer);
        return true;
    }
    unbind() {
        this.gl.bindBuffer(this.target, null);
        return true;
    }
    release() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            delete this.buffer;
        }
        return true;
    }
    set(data, mode = this.mode) {
        this.bind();
        this.gl.bufferData(this.target, data, mode);
    }
    setChunk(data, offset = 0) {
        this.bind();
        this.gl.bufferSubData(this.target, offset, data);
    }
}
const defBuffer = (gl, data, target = gl.ARRAY_BUFFER, mode = gl.STATIC_DRAW) => new WebGLArrayBuffer(gl, data, target, mode);
const compileModel = (gl, spec, mode = gl.STATIC_DRAW) => {
    if (spec.attribPool) {
        spec.attribs = compileAttribPool(gl, spec.attribPool, undefined, gl.ARRAY_BUFFER, mode);
    }
    else {
        compileAttribs(gl, spec.attribs, mode);
    }
    spec.instances && compileAttribs(gl, spec.instances.attribs, mode);
    compileIndices(gl, spec.indices, mode);
    spec.mode == null && (spec.mode = DrawMode.TRIANGLES);
    // TODO auto-create VAO & inject into model spec?
    return spec;
};
const initBuffer = (gl, src, type, mode) => {
    if (src.buffer) {
        src.data && src.buffer.set(src.data);
    }
    else {
        src.buffer = new WebGLArrayBuffer(gl, src.data, type, mode);
    }
};
const compileAttribs = (gl, attribs, mode) => {
    if (attribs) {
        for (let id in attribs) {
            initBuffer(gl, attribs[id], gl.ARRAY_BUFFER, mode);
        }
    }
    return attribs;
};
const compileIndices = (gl, index, mode = gl.STATIC_DRAW) => {
    if (index) {
        initBuffer(gl, index, gl.ELEMENT_ARRAY_BUFFER, mode);
    }
    return index;
};
const compileAttribPool = (gl, pool, ids, target = gl.ARRAY_BUFFER, mode = gl.STATIC_DRAW) => {
    const buf = defBuffer(gl, pool.bytes(), target, mode);
    const spec = {};
    for (let id of ids || Object.keys(pool.specs)) {
        const attr = pool.specs[id];
        spec[id] = {
            buffer: buf,
            size: attr.size,
            type: asGLType(attr.type),
            stride: pool.byteStride,
            offset: attr.byteOffset,
        };
    }
    return spec;
};

/**
 * Sets the canvas size to given `width` & `height` and adjusts style to
 * compensate for HDPI devices. Note: For 2D canvases, this will
 * automatically clear any prior canvas content.
 *
 * @param canvas -
 * @param width - uncompensated pixel width
 * @param height - uncompensated pixel height
 */
const adaptDPI = (canvas, width, height) => {
    const dpr = window.devicePixelRatio || 1;
    if (dpr != 1) {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    }
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    return dpr;
};

const defaultOpts = {
    alpha: true,
    antialias: true,
    depth: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false,
    stencil: false,
};
const glCanvas = (opts = {}) => {
    const canvas = opts.canvas
        ? isString(opts.canvas)
            ? document.getElementById(opts.canvas)
            : opts.canvas
        : document.createElement("canvas");
    opts.width && (canvas.width = opts.width);
    opts.height && (canvas.height = opts.height);
    opts.autoScale !== false && adaptDPI(canvas, canvas.width, canvas.height);
    opts.parent && opts.parent.appendChild(canvas);
    const gl = canvas.getContext(opts.version === 2 ? "webgl2" : "webgl", Object.assign(Object.assign({}, defaultOpts), opts.opts));
    if (!gl) {
        error("WebGL unavailable");
    }
    opts.onContextLost &&
        canvas.addEventListener("webglcontextlost", opts.onContextLost);
    return {
        canvas,
        gl,
        ext: getExtensions(gl, opts.ext),
    };
};
const getExtensions = (gl, ids, required = true) => {
    const ext = {};
    if (ids) {
        for (let id of ids) {
            ext[id] = gl.getExtension(id);
            required && !ext[id] && error(`extension ${id} not available`);
        }
    }
    return ext;
};

const $bind = (op) => (textures) => {
    if (!textures)
        return;
    for (let i = textures.length, tex; --i >= 0;) {
        (tex = textures[i]) && tex[op](i);
    }
};
const bindTextures = $bind("bind");
const unbindTextures = $bind("unbind");
class Texture {
    constructor(gl, opts = {}) {
        this.gl = gl;
        this.tex = gl.createTexture() || error("error creating WebGL texture");
        this.configure(Object.assign({ filter: TextureFilter.NEAREST, wrap: TextureRepeat.CLAMP }, opts));
    }
    configure(opts = {}, unbind = true) {
        const gl = this.gl;
        const target = opts.target || this.target || TextureTarget.TEXTURE_2D;
        const format = opts.format || this.format || TextureFormat.RGBA;
        const decl = TEX_FORMATS[format];
        const type = opts.type || this.type || decl.types[0];
        !this.target && (this.target = target);
        this.format = format;
        this.type = type;
        gl.bindTexture(this.target, this.tex);
        opts.flip !== undefined &&
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, opts.flip ? 1 : 0);
        opts.premultiply !== undefined &&
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, opts.premultiply ? 1 : 0);
        this.configureImage(target, opts);
        opts.mipmap && gl.generateMipmap(target);
        this.configureFilter(target, opts);
        this.configureWrap(target, opts);
        this.configureLOD(target, opts);
        this.configureLevels(target, opts);
        unbind && gl.bindTexture(this.target, null);
        return true;
    }
    configureImage(target, opts) {
        if (opts.image === undefined)
            return;
        target === TextureTarget.TEXTURE_3D
            ? this.configureImage3d(target, opts)
            : this.configureImage2d(target, opts);
    }
    configureImage2d(target, opts) {
        const level = opts.level || 0;
        const pos = opts.pos || [0, 0, 0];
        const { image, width, height } = opts;
        const decl = TEX_FORMATS[this.format];
        const baseFormat = decl.format;
        const { gl, type, format } = this;
        if (width && height) {
            if (opts.sub) {
                gl.texSubImage2D(target, level, pos[0], pos[1], width, height, baseFormat, type, image);
            }
            else {
                if (level === 0) {
                    this.size = [width, height];
                }
                gl.texImage2D(target, level, format, width, height, 0, baseFormat, type, image);
            }
        }
        else {
            if (opts.sub) {
                gl.texSubImage2D(target, level, pos[0], pos[1], baseFormat, type, image);
            }
            else {
                if (image != null && level === 0) {
                    this.size = [image.width, image.height];
                }
                gl.texImage2D(target, level, format, baseFormat, type, image);
            }
        }
    }
    configureImage3d(target, opts) {
        const { image, width, height, depth } = opts;
        if (!(width && height && depth))
            return;
        const level = opts.level || 0;
        const pos = opts.pos || [0, 0, 0];
        const decl = TEX_FORMATS[this.format];
        const baseFormat = decl.format;
        const { gl, type, format } = this;
        if (opts.sub) {
            gl.texSubImage3D(target, level, pos[0], pos[1], pos[2], width, height, depth, baseFormat, type, image);
        }
        else {
            if (level === 0) {
                this.size = [width, height, depth];
            }
            gl.texImage3D(target, level, format, width, height, depth, 0, baseFormat, type, image);
        }
    }
    configureFilter(target, opts) {
        const gl = this.gl;
        const flt = opts.filter || this.filter || TextureFilter.NEAREST;
        let t1, t2;
        if (isArray(flt)) {
            t1 = flt[0];
            t2 = flt[1] || t1;
            this.filter = [t1, t2];
        }
        else {
            this.filter = [flt, flt, flt];
            t1 = t2 = flt;
        }
        gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, t1);
        gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, t2);
    }
    configureWrap(target, opts) {
        const gl = this.gl;
        const wrap = opts.wrap || this.wrap || TextureRepeat.CLAMP;
        let t1, t2, t3;
        if (isArray(wrap)) {
            t1 = wrap[0];
            t2 = wrap[1] || t1;
            t3 = wrap[2] || t1;
            this.wrap = [t1, t2, t3];
        }
        else {
            t1 = t2 = t3 = wrap;
            this.wrap = [wrap, wrap, wrap];
        }
        gl.texParameteri(target, gl.TEXTURE_WRAP_S, t1);
        gl.texParameteri(target, gl.TEXTURE_WRAP_T, t2);
        isGL2Context(gl) &&
            target === gl.TEXTURE_3D &&
            gl.texParameteri(target, gl.TEXTURE_WRAP_R, t3);
    }
    configureLOD(target, opts) {
        const gl = this.gl;
        if (opts.lod) {
            const [t1, t2] = opts.lod;
            t1 &&
                gl.texParameterf(target, gl.TEXTURE_MIN_LOD, t1);
            t2 &&
                gl.texParameterf(target, gl.TEXTURE_MAX_LOD, t2);
        }
    }
    configureLevels(target, opts) {
        const gl = this.gl;
        if (opts.minMaxLevel) {
            const [t1, t2] = opts.minMaxLevel;
            gl.texParameteri(target, gl.TEXTURE_BASE_LEVEL, t1);
            gl.texParameteri(target, gl.TEXTURE_MAX_LEVEL, t2);
        }
    }
    bind(id = 0) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(this.target, this.tex);
        return true;
    }
    unbind(id = 0) {
        const gl = this.gl;
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(this.target, null);
        return true;
    }
    release() {
        if (this.tex) {
            this.gl.deleteTexture(this.tex);
            delete this.tex;
            delete this.gl;
            return true;
        }
        return false;
    }
}
const defTexture = (gl, opts) => new Texture(gl, opts);

const draw = (specs, opts = {}) => {
    const _specs = isArray(specs) ? specs : [specs];
    for (let i = 0, n = _specs.length; i < n; i++) {
        const spec = _specs[i];
        const indices = spec.indices;
        const gl = spec.shader.gl;
        opts.bindTex !== false && bindTextures(spec.textures);
        opts.shaderState !== false && spec.shader.prepareState();
        opts.bindShader !== false && spec.shader.bind(spec);
        if (indices && indices.buffer) {
            indices.buffer.bind();
            if (spec.instances) {
                drawInstanced(gl, spec);
            }
            else {
                gl.drawElements(spec.mode, spec.num, indices.data instanceof Uint32Array
                    ? gl.UNSIGNED_INT
                    : gl.UNSIGNED_SHORT, 0);
            }
        }
        else {
            if (spec.instances) {
                drawInstanced(gl, spec);
            }
            else {
                gl.drawArrays(spec.mode, 0, spec.num);
            }
        }
        opts.unbindShader !== false && spec.shader.unbind(null);
        opts.unbindTex && unbindTextures(spec.textures);
    }
};
const drawInstanced = (gl, spec) => {
    const isGL2 = isGL2Context(gl);
    const ext = !isGL2 ? gl.getExtension("ANGLE_instanced_arrays") : undefined;
    if (!(isGL2 || ext)) {
        error("instancing not supported");
    }
    const sattribs = spec.shader.attribs;
    const iattribs = spec.instances.attribs;
    spec.shader.bindAttribs(iattribs);
    for (let id in iattribs) {
        const attr = sattribs[id];
        if (attr) {
            let div = iattribs[id].divisor;
            div = div !== undefined ? div : 1;
            isGL2
                ? gl.vertexAttribDivisor(attr.loc, div)
                : ext.vertexAttribDivisorANGLE(attr.loc, div);
        }
    }
    if (spec.indices) {
        const type = spec.indices.data instanceof Uint32Array
            ? gl.UNSIGNED_INT
            : gl.UNSIGNED_SHORT;
        isGL2
            ? gl.drawElementsInstanced(spec.mode, spec.num, type, 0, spec.instances.num)
            : ext.drawElementsInstancedANGLE(spec.mode, spec.num, type, 0, spec.instances.num);
    }
    else {
        isGL2
            ? gl.drawArraysInstanced(spec.mode, 0, spec.num, spec.instances.num)
            : ext.drawArraysInstancedANGLE(spec.mode, 0, spec.num, spec.instances.num);
    }
    // reset attrib divisors to allow non-instanced draws later on
    for (let id in iattribs) {
        const attr = sattribs[id];
        attr &&
            (isGL2
                ? gl.vertexAttribDivisor(attr.loc, 0)
                : ext.vertexAttribDivisorANGLE(attr.loc, 0));
    }
    spec.shader.unbind(null);
};

const IDENT22 = Object.freeze([1, 0, 0, 1]);
Object.freeze([1, 0, 0, 1, 0, 0]);
//prettier-ignore
const IDENT33 = Object.freeze([
    1, 0, 0,
    0, 1, 0,
    0, 0, 1
]);
//prettier-ignore
const IDENT44 = Object.freeze([
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
]);

const mi = -Infinity;
const mx = Infinity;
Object.freeze([mi, mi]);
Object.freeze([mx, mx]);
Object.freeze([1, 1]);
const ZERO2 = Object.freeze([0, 0]);
Object.freeze([1, 0]);
Object.freeze([0, 1]);
Object.freeze([mi, mi, mi]);
Object.freeze([mx, mx, mx]);
Object.freeze([1, 1, 1]);
const ZERO3 = Object.freeze([0, 0, 0]);
Object.freeze([1, 0, 0]);
Object.freeze([0, 1, 0]);
Object.freeze([0, 0, 1]);
Object.freeze([mi, mi, mi, mi]);
Object.freeze([mx, mx, mx, mx]);
Object.freeze([1, 1, 1, 1]);
const ZERO4 = Object.freeze([0, 0, 0, 0]);
Object.freeze([1, 0, 0, 0]);
Object.freeze([0, 1, 0, 0]);
Object.freeze([0, 0, 1, 0]);
Object.freeze([0, 0, 0, 1]);

/**
 * Similar to {@link memoize1}, however optimized for side effects only, i.e.
 * functions which DO NOT return any result.
 *
 * @param fn
 * @param cache
 */
const doOnce = (fn, cache) => {
    !cache && (cache = new Map());
    return (x) => {
        if (!cache.has(x)) {
            cache.set(x, true);
            fn(x);
        }
    };
};

const defQuadModel = (opts) => {
    let { size, uv, center } = Object.assign({ size: 2, uv: true, center: true }, opts);
    size *= 0.5;
    const o = center ? 0 : size;
    return {
        attribs: Object.assign({ position: {
                data: new Float32Array([
                    o - size,
                    o - size,
                    o + size,
                    o - size,
                    o - size,
                    o + size,
                    o + size,
                    o + size,
                ]),
                size: 2,
            } }, (uv
            ? {
                uv: {
                    data: new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
                    size: 2,
                },
            }
            : null)),
        uniforms: {},
        shader: null,
        mode: DrawMode.TRIANGLE_STRIP,
        num: 4,
    };
};

var GLSLVersion;
(function (GLSLVersion) {
    GLSLVersion["GLES_100"] = "100";
    GLSLVersion["GLES_300"] = "300 es";
})(GLSLVersion || (GLSLVersion = {}));

const RE_SEMI = /[};]$/;
/**
 * GLSL code gen, targets GLSL ES 3.00 (WebGL2) by default.
 *
 * Use options object to configure shader type and GLSL version: `100`
 * for WebGL, 300 for WebGL2. Currently, the only differences in terms
 * of code generation, not correctness, are:
 *
 * - attribute, varying, uniform declarations
 * - texture lookup function naming
 *
 * Unsupported features in GLSL 100:
 *
 * - Fragment shader output vars
 *
 * @param opts -
 */
const targetGLSL = (opts) => {
    const _opts = Object.assign({ type: "fs", version: GLSLVersion.GLES_300, versionPragma: true, prelude: "" }, opts);
    const isVS = _opts.type === "vs";
    // TODO update once we have struct support
    const $type = (t) => t;
    const $list = (body, sep = ", ") => body.map(emit).join(sep);
    const $fn = (t) => `${t.id}(${$list(t.args)})`;
    const $decl = (sym, arg = false) => {
        const { id, type, opts, init } = sym;
        const res = [];
        if (opts.type) {
            let type;
            if (_opts.version < GLSLVersion.GLES_300) {
                if (isVS) {
                    type = {
                        in: "attribute",
                        out: "varying",
                        uni: "uniform",
                    }[opts.type];
                }
                else {
                    type = {
                        in: "varying",
                        out: null,
                        uni: "uniform",
                    }[opts.type];
                    !type &&
                        unsupported("GLSL 100 doesn't support fragment shader output variables");
                }
            }
            else {
                opts.loc != null && res.push(`layout(location=${opts.loc}) `);
                opts.smooth != null && res.push(opts.smooth + " ");
                type = opts.type === "uni" ? "uniform" : opts.type;
            }
            res.push(type + " ");
        }
        else {
            opts.const && res.push("const ");
            arg && opts.q && res.push(opts.q + " ");
        }
        opts.prec && res.push(opts.prec + " ");
        res.push($type(itemType(type)), " ", id);
        opts.num && res.push(`[${opts.num}]`);
        init && res.push(" = ", emit(init));
        return res.join("");
    };
    const emit = defTarget({
        arg: (t) => $decl(t, true),
        array_init: (t) => _opts.version >= GLSLVersion.GLES_300
            ? `${t.type}(${$list(t.init)})`
            : unsupported(`array initializers not available in GLSL ${_opts.version}`),
        assign: (t) => emit(t.l) + " = " + emit(t.r),
        ctrl: (t) => t.id,
        call: $fn,
        call_i: (t) => t.id === "texture" && _opts.version < GLSLVersion.GLES_300
            ? `${t.id}${t.args[0].type.substr(7)}(${$list(t.args)})`
            : $fn(t),
        decl: (t) => $decl(t.id),
        fn: (t) => `${$type(t.type)} ${t.id}(${$list(t.args)}) ${emit(t.scope)}`,
        for: (t) => `for(${t.init ? emit(t.init) : ""}; ${emit(t.test)}; ${t.iter ? emit(t.iter) : ""}) ${emit(t.scope)}`,
        idx: (t) => `${emit(t.val)}[${emit(t.id)}]`,
        if: (t) => {
            const res = `if (${emit(t.test)}) ` + emit(t.t);
            return t.f ? res + " else " + emit(t.f) : res;
        },
        lit: (t) => {
            const v = t.val;
            switch (t.type) {
                case "bool":
                    return isBoolean(v) ? String(v) : `bool(${emit(v)})`;
                case "float":
                    return isNumber(v)
                        ? v === Math.trunc(v)
                            ? v + ".0"
                            : String(v)
                        : `float(${emit(v)})`;
                case "int":
                case "uint":
                    return isNumber(v) ? String(v) : `${t.type}(${emit(v)})`;
                default: {
                    if (isVec(t) || isMat(t)) {
                        return `${t.type}(${$list(v)})`;
                    }
                    return unsupported(`unknown type: ${t.type}`);
                }
            }
        },
        op1: (t) => t.post ? `(${emit(t.val)}${t.op})` : `(${t.op}${emit(t.val)})`,
        op2: (t) => `(${emit(t.l)} ${t.op} ${emit(t.r)})`,
        ret: (t) => "return" + (t.val ? " " + emit(t.val) : ""),
        scope: (t) => {
            let res = t.body
                .map(emit)
                .reduce((acc, x) => (acc.push(RE_SEMI.test(x) ? x : x + ";"), acc), [])
                .join("\n");
            res += t.body.length && !RE_SEMI.test(res) ? ";" : "";
            if (!t.global) {
                return `{\n${res}\n}`;
            }
            if (_opts.prelude) {
                res = _opts.prelude + "\n" + res;
            }
            if (_opts.versionPragma) {
                res = `#version ${_opts.version}\n` + res;
            }
            return res;
        },
        swizzle: (t) => `${emit(t.val)}.${t.id}`,
        sym: (t) => t.id,
        ternary: (t) => `(${emit(t.test)} ? ${emit(t.t)} : ${emit(t.f)})`,
        while: (t) => `while (${emit(t.test)}) ${emit(t.scope)}`,
    });
    Object.assign(emit, {
        gl_FragColor: sym("vec4", "gl_FragColor"),
        gl_FragCoord: sym("vec4", "gl_FragCoord", { const: true }),
        gl_FragData: sym("vec4[]", "gl_FragData", { num: 1 }),
        gl_FrontFacing: sym("bool", "gl_FrontFacing", { const: true }),
        gl_PointCoord: sym("vec2", "gl_PointCoord", { const: true }),
        gl_PointSize: sym("float", "gl_PointSize"),
        gl_Position: sym("vec4", "gl_Position"),
    });
    return emit;
};

const NO_PREFIXES = {
    a: "",
    v: "",
    u: "",
    o: "",
};
/**
 * GLSL data declaration code generators.
 */
const SYNTAX = {
    /**
     * WebGL (GLSL ES 1.0)
     */
    [GLSLVersion.GLES_100]: {
        number: 100,
        attrib: (id, type, pre) => `attribute ${isArray(type) ? type[0] : type} ${pre.a}${id};`,
        varying: {
            vs: (id, type, pre) => arrayDecl("varying", type, pre.v + id),
            fs: (id, type, pre) => arrayDecl("varying", type, pre.v + id),
        },
        uniform: (id, u, pre) => arrayDecl("uniform", u, pre.u + id),
        output: (id, type, pre) => isArray(type)
            ? `#define ${pre.o}${id} gl_FragData[${type[1]}]`
            : "",
    },
    /**
     * WebGL 2 (GLSL ES 3)
     */
    [GLSLVersion.GLES_300]: {
        number: 300,
        attrib: (id, type, pre) => isArray(type)
            ? `layout(location=${type[1]}) in ${type[0]} ${pre.a}${id};`
            : `in ${type} ${pre.a}${id};`,
        varying: {
            vs: (id, type, pre) => arrayDecl("out", type, pre.v + id),
            fs: (id, type, pre) => arrayDecl("in", type, pre.v + id),
        },
        uniform: (id, u, pre) => arrayDecl("uniform", u, pre.u + id),
        output: (id, type, pre) => isArray(type)
            ? `layout(location=${type[1]}) out ${type[0]} ${pre.o}${id};`
            : `out ${type} ${pre.o}${id};`,
    },
};
const arrayDecl = (qualifier, decl, id) => {
    const type = isArray(decl) ? decl[0] : decl;
    return type.indexOf("[]") > 0
        ? `${qualifier} ${type.replace("[]", "")} ${id}[${decl[1]}];`
        : `${qualifier} ${type} ${id};`;
};
/**
 * Default GLSL prelude.
 */
const GLSL_HEADER = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp int;
precision highp float;
#else
precision mediump int;
precision mediump float;
#endif
#ifndef PI
#define PI 3.141592653589793
#endif
#ifndef TAU
#define TAU 6.283185307179586
#endif
#ifndef HALF_PI
#define HALF_PI 1.570796326794896
#endif
`;

const uniformS = (fn) => (gl, loc, defaultVal = 0) => {
    let prev;
    return (x) => {
        x = x === undefined ? defaultVal : x;
        if (x !== prev) {
            gl["uniform1" + fn](loc, x);
            prev = x;
        }
    };
};
const uniformV = (fn, sysDefault) => (gl, loc, defaultVal = sysDefault) => {
    let prev = [];
    return (x) => {
        x = x === undefined ? defaultVal : x;
        if (!equivArrayLike(prev, x)) {
            gl["uniform" + fn](loc, x);
            prev = [...x];
        }
    };
};
const uniformM = (fn, sysDefault) => (gl, loc, defaultVal = sysDefault) => {
    let prev = [];
    return (x) => {
        x = x === undefined ? defaultVal : x;
        if (!equivArrayLike(prev, x)) {
            gl["uniformMatrix" + fn](loc, false, x);
            prev = [...x];
        }
    };
};
const Z1 = [0];
const UNIFORM_SETTERS = {
    bool: uniformS("i"),
    float: uniformS("f"),
    int: uniformS("i"),
    uint: uniformS("ui"),
    bvec2: uniformV("2iv", ZERO2),
    bvec3: uniformV("3iv", ZERO3),
    bvec4: uniformV("4iv", ZERO4),
    ivec2: uniformV("2iv", ZERO2),
    ivec3: uniformV("3iv", ZERO3),
    ivec4: uniformV("4iv", ZERO4),
    vec2: uniformV("2fv", ZERO2),
    vec3: uniformV("3fv", ZERO3),
    vec4: uniformV("4fv", ZERO4),
    mat2: uniformM("2fv", IDENT22),
    mat3: uniformM("3fv", IDENT33),
    mat4: uniformM("4fv", IDENT44),
    sampler2D: uniformS("i"),
    sampler2DShadow: uniformS("i"),
    sampler3D: uniformS("i"),
    samplerCube: uniformS("i"),
    samplerCubeShadow: uniformS("i"),
    "bool[]": uniformV("1iv", Z1),
    "float[]": uniformV("1fv", Z1),
    "int[]": uniformV("1iv", Z1),
    "uint[]": uniformV("1uiv", Z1),
    "bvec2[]": uniformV("2iv", ZERO2),
    "bvec3[]": uniformV("3iv", ZERO3),
    "bvec4[]": uniformV("4iv", ZERO4),
    "ivec2[]": uniformV("2iv", ZERO2),
    "ivec3[]": uniformV("3iv", ZERO3),
    "ivec4[]": uniformV("4iv", ZERO4),
    "vec2[]": uniformV("2fv", ZERO2),
    "vec3[]": uniformV("3fv", ZERO3),
    "vec4[]": uniformV("4fv", ZERO4),
    "mat2[]": uniformM("2fv", ZERO2),
    "mat3[]": uniformM("3fv", ZERO3),
    "mat4[]": uniformM("4fv", ZERO4),
    "sampler2D[]": uniformV("1iv", Z1),
    "sampler2DShadow[]": uniformV("1iv", Z1),
    "sampler3D[]": uniformV("1iv", Z1),
    "samplerCube[]": uniformV("1iv", Z1),
    "samplerCubeShadow[]": uniformV("1iv", Z1),
};

const ERROR_REGEXP = /ERROR: \d+:(\d+): (.*)/;
class Shader {
    constructor(gl, program, attribs, uniforms, state) {
        this.warnAttrib = doOnce((id) => LOGGER$1.warn(`unknown attrib: ${id}`));
        this.warnUni = doOnce((id) => LOGGER$1.warn(`unknown uniform: ${id}`));
        this.gl = gl;
        this.program = program;
        this.attribs = attribs;
        this.uniforms = uniforms;
        this.state = state || {};
    }
    bind(spec) {
        if (this.program) {
            this.gl.useProgram(this.program);
            this.bindAttribs(spec.attribs);
            this.bindUniforms(spec.uniforms);
            return true;
        }
        return false;
    }
    unbind() {
        let shaderAttrib;
        for (let id in this.attribs) {
            if ((shaderAttrib = this.attribs[id])) {
                this.gl.disableVertexAttribArray(shaderAttrib.loc);
            }
        }
        this.gl.useProgram(null);
        return true;
    }
    release() {
        if (this.program) {
            this.gl.deleteProgram(this.program);
            delete this.program;
            return true;
        }
        return false;
    }
    bindAttribs(specAttribs) {
        const gl = this.gl;
        let shaderAttrib;
        for (let id in specAttribs) {
            if ((shaderAttrib = this.attribs[id])) {
                const attr = specAttribs[id];
                attr.buffer.bind();
                gl.enableVertexAttribArray(shaderAttrib.loc);
                gl.vertexAttribPointer(shaderAttrib.loc, attr.size || 3, asGLType(attr.type || gl.FLOAT), attr.normalized || false, attr.stride || 0, attr.offset || 0);
            }
            else {
                this.warnAttrib(id);
            }
        }
    }
    bindUniforms(specUnis = {}) {
        const shaderUnis = this.uniforms;
        for (let id in specUnis) {
            const u = shaderUnis[id];
            if (u) {
                let val = specUnis[id];
                val = isFunction(val) ? val(shaderUnis, specUnis) : deref(val);
                // console.log(id, val);
                u.setter(val);
            }
            else {
                this.warnUni(id);
            }
        }
        // apply defaults for non-specified uniforms in user spec
        for (let id in shaderUnis) {
            if (shaderUnis.hasOwnProperty(id) &&
                (!specUnis || !existsAndNotNull(specUnis[id]))) {
                const u = shaderUnis[id];
                const val = u.defaultFn
                    ? u.defaultFn(shaderUnis, specUnis)
                    : u.defaultVal;
                // console.log("default", id, val);
                u.setter(val);
            }
        }
    }
    prepareState(state = this.state) {
        const gl = this.gl;
        state.depth !== undefined && this.setState(gl.DEPTH_TEST, state.depth);
        if (state.cull !== undefined) {
            this.setState(gl.CULL_FACE, state.cull);
            state.cullMode && gl.cullFace(state.cullMode);
        }
        if (state.blend !== undefined) {
            this.setState(gl.BLEND, state.blend);
            state.blendFn && gl.blendFunc(state.blendFn[0], state.blendFn[1]);
            state.blendEq !== undefined && gl.blendEquation(state.blendEq);
        }
        if (state.stencil !== undefined) {
            this.setState(gl.STENCIL_TEST, state.stencil);
            state.stencilFn &&
                gl.stencilFunc(state.stencilFn[0], state.stencilFn[1], state.stencilFn[2]);
            state.stencilOp &&
                gl.stencilOp(state.stencilOp[0], state.stencilOp[1], state.stencilOp[2]);
            state.stencilMask !== undefined &&
                gl.stencilMask(state.stencilMask);
        }
    }
    setState(id, val) {
        if (val) {
            this.gl.enable(id);
        }
        else {
            this.gl.disable(id);
        }
    }
}
const defShader = (gl, spec) => {
    const version = isGL2Context(gl)
        ? GLSLVersion.GLES_300
        : GLSLVersion.GLES_100;
    const srcVS = isFunction(spec.vs)
        ? shaderSourceFromAST(spec, "vs", version)
        : prepareShaderSource(spec, "vs", version);
    const srcFS = isFunction(spec.fs)
        ? shaderSourceFromAST(spec, "fs", version)
        : prepareShaderSource(spec, "fs", version);
    LOGGER$1.debug(srcVS);
    LOGGER$1.debug(srcFS);
    initShaderExtensions(gl, spec.ext);
    const vs = compileShader(gl, gl.VERTEX_SHADER, srcVS);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, srcFS);
    const program = gl.createProgram() || error("error creating shader program");
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const attribs = initAttributes(gl, program, spec.attribs);
        const uniforms = initUniforms(gl, program, spec.uniforms);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return new Shader(gl, program, attribs, uniforms, spec.state);
    }
    throw new Error(`Error linking shader: ${gl.getProgramInfoLog(program)}`);
};
const compileVars = (attribs, syntax, prefixes) => {
    let decls = [];
    for (let id in attribs) {
        if (attribs.hasOwnProperty(id)) {
            decls.push(syntax(id, attribs[id], prefixes));
        }
    }
    decls.push("");
    return decls.join("\n");
};
const compileExtensionPragma = (id, behavior, version) => {
    const ext = GL_EXT_INFO[id];
    const gl2 = version === GLSLVersion.GLES_300;
    return ext && ((!gl2 && ext.gl) || (gl2 && ext.gl2))
        ? `#extension ${(ext && ext.alias) || id} : ${isBoolean(behavior) ? (behavior ? "enable" : "disable") : behavior}\n`
        : "";
};
const initShaderExtensions = (gl, exts) => {
    if (exts) {
        for (let id in exts) {
            const state = exts[id];
            if (state === true || state === "require") {
                getExtensions(gl, [id], state === "require");
            }
        }
    }
};
const compilePrelude = (spec, version) => {
    let prelude = spec.pre
        ? spec.replacePrelude
            ? spec.pre
            : spec.pre + "\n" + GLSL_HEADER
        : GLSL_HEADER;
    if (spec.ext) {
        for (let id in spec.ext) {
            prelude += compileExtensionPragma(id, spec.ext[id], version);
        }
    }
    return prelude;
};
const compileIODecls = (decl, src, dest) => {
    for (let id in src) {
        const a = src[id];
        dest[id] = isArray(a)
            ? decl(a[0], id, { loc: a[1] })
            : decl(a, id);
    }
};
const varyingOpts = (v) => {
    const [vtype, opts] = isArray(v)
        ? [v[0], { num: v[1] }]
        : [v, {}];
    /(u?int|[ui]vec[234])/.test(vtype) && (opts.smooth = "flat");
    return [vtype, opts];
};
const compileVaryingDecls = (spec, decl, acc) => {
    for (let id in spec.varying) {
        const [vtype, opts] = varyingOpts(spec.varying[id]);
        acc[id] = decl(vtype, id, opts);
    }
};
const compileUniformDecls = (spec, acc) => {
    for (let id in spec.uniforms) {
        const u = spec.uniforms[id];
        acc[id] = isArray(u)
            ? uniform(u[0], id, u[0].indexOf("[]") > 0 ? { num: u[1] } : undefined)
            : uniform(u, id);
    }
};
const shaderSourceFromAST = (spec, type, version) => {
    let prelude = compilePrelude(spec, version);
    const inputs = {};
    const outputs = {};
    const outputAliases = {};
    const unis = {};
    spec.uniforms && compileUniformDecls(spec, unis);
    if (type === "vs") {
        compileIODecls(input, spec.attribs, inputs);
        spec.varying && compileVaryingDecls(spec, output, outputs);
    }
    else {
        spec.varying && compileVaryingDecls(spec, input, inputs);
        const outs = spec.outputs || DEFAULT_OUTPUT;
        if (version >= GLSLVersion.GLES_300) {
            compileIODecls(output, outs, outputs);
        }
        else {
            for (let id in outs) {
                const o = outs[id];
                if (isArray(o) && o[0] === "vec4") {
                    prelude += `#define ${id} gl_FragData[${o[1]}]\n`;
                    outputAliases[id] = sym("vec4", id);
                }
                else {
                    unsupported(`GLSL ${version} doesn't support output vars`);
                }
            }
        }
    }
    const target = targetGLSL({
        type,
        version,
        prelude,
    });
    return (target(program([
        ...vals(unis),
        ...vals(inputs),
        ...vals(outputs),
        ...spec[type](target, unis, inputs, Object.assign(Object.assign({}, outputs), outputAliases)),
    ])) + (spec.post ? "\n" + spec.post : ""));
};
const prepareShaderSource = (spec, type, version) => {
    const syntax = SYNTAX[version];
    const prefixes = Object.assign(Object.assign({}, NO_PREFIXES), spec.declPrefixes);
    const isVS = type === "vs";
    let src = "";
    src += `#version ${version}\n`;
    src += compilePrelude(spec, version);
    if (spec.generateDecls !== false) {
        src += isVS
            ? compileVars(spec.attribs, syntax.attrib, prefixes)
            : compileVars(spec.outputs || DEFAULT_OUTPUT, syntax.output, prefixes);
        src += compileVars(spec.varying, syntax.varying[type], prefixes);
        src += compileVars(spec.uniforms, syntax.uniform, prefixes);
    }
    src += spec[type];
    spec.post && (src += "\n" + spec.post);
    return src;
};
const compileShader = (gl, type, src) => {
    const shader = gl.createShader(type) || error("error creating shader");
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        return shader;
    }
    return parseAndThrowShaderError(gl, shader, src);
};
const parseAndThrowShaderError = (gl, shader, src) => {
    const lines = src.split("\n");
    const log = gl.getShaderInfoLog(shader).split("\n");
    const errors = log
        .map((line) => {
        const matches = ERROR_REGEXP.exec(line);
        const ln = matches ? matches[1] : null;
        if (ln) {
            return `line ${ln}: ${matches[2]}\n${lines[parseInt(ln) - 1]}`;
        }
    })
        .filter(existsAndNotNull)
        .join("\n");
    return error(`Error compiling shader:\n${errors}`);
};
const initAttributes = (gl, prog, attribs) => {
    const res = {};
    for (let id in attribs) {
        const val = attribs[id];
        const [type, loc] = isArray(val) ? val : [val, null];
        const aid = id;
        if (loc != null) {
            gl.bindAttribLocation(prog, loc, aid);
            res[id] = { type, loc };
        }
        else {
            res[id] = {
                type,
                loc: gl.getAttribLocation(prog, aid),
            };
        }
    }
    return res;
};
const initUniforms = (gl, prog, uniforms = {}) => {
    const res = {};
    for (let id in uniforms) {
        const val = uniforms[id];
        let type;
        let t1, t2, defaultVal, defaultFn;
        if (isArray(val)) {
            [type, t1, t2] = val;
            defaultVal = type.indexOf("[]") < 0 ? t1 : t2;
            if (isFunction(defaultVal)) {
                defaultFn = defaultVal;
                defaultVal = undefined;
            }
        }
        else {
            type = val;
        }
        const loc = gl.getUniformLocation(prog, id);
        if (loc != null) {
            const setter = UNIFORM_SETTERS[type];
            if (setter) {
                res[id] = {
                    loc,
                    setter: setter(gl, loc, defaultVal),
                    defaultFn,
                    defaultVal,
                    type,
                };
            }
            else {
                error(`invalid uniform type: ${type}`);
            }
        }
        else {
            LOGGER$1.warn(`unknown uniform: ${id}`);
        }
    }
    return res;
};

export { TextureFilter, TextureFormat, TextureTarget, compileModel, defQuadModel, defShader, defTexture, draw, glCanvas };
