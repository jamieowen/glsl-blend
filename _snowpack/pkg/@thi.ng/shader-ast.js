import { p as process, s as scope, g as gensym, a as sym, w as walk, b as allChildren, c as scopedChildren, i as isString, d as isNumber, e as isMat, f as isVec, h as float, n as numberWithMatchingType, j as illegalArgs } from '../common/item-3ed9024f.js';
export { F as FLOAT0, l as FLOAT05, m as FLOAT1, o as FLOAT2, h as float, k as int, a as sym, q as vec3, v as vec4 } from '../common/item-3ed9024f.js';
import { N as NO_OP } from '../common/map-fd6d0079.js';

/**
 * Takes a `test` result or predicate function without args and throws
 * error with given `msg` if test failed (i.e. is falsy).
 *
 * @remarks
 * The function is only enabled if `"production" != "production"`
 * or if the `UMBRELLA_ASSERTS` env var is set to 1.
 */
const assert = (() => {
    try {
        return ("production" !== "production" ||
            process.env.UMBRELLA_ASSERTS === "1");
    }
    catch (e) { }
    return false;
})()
    ? (test, msg = "assertion failed") => {
        if ((typeof test === "function" && !test()) || !test) {
            throw new Error(typeof msg === "function" ? msg() : msg);
        }
    }
    : NO_OP;

const assign = (l, r) => {
    assert(l.tag !== "swizzle" || l.val.tag === "sym", "can't assign to non-symbol swizzle");
    return {
        tag: "assign",
        type: l.type,
        l,
        r,
    };
};

const ifThen = (test, truthy, falsey) => ({
    tag: "if",
    type: "void",
    test,
    t: scope(truthy),
    f: falsey ? scope(falsey) : undefined,
});
const ternary = (test, t, f) => ({
    tag: "ternary",
    type: t.type,
    test,
    t,
    f,
});

const defArg = (a) => {
    const [type, id, opts] = isString(a) ? [a] : a;
    return {
        tag: "arg",
        type,
        id: id || gensym(),
        opts: Object.assign({ q: "in" }, opts),
    };
};
// prettier-ignore
function defn(type, id, _args, _body) {
    id = id || gensym();
    const args = _args.map(defArg);
    const body = (_body(...args.map((x) => sym(x.type, x.id, x.opts))).filter((x) => x != null));
    // count & check returns
    const returns = walk((n, t) => {
        if (t.tag === "ret") {
            assert(t.type === type, `wrong return type for function '${id}', expected ${type}, got ${t.type}`);
            n++;
        }
        return n;
    }, scopedChildren, 0, body);
    if (type !== "void" && !returns) {
        throw new Error(`function '${id}' must return a value of type ${type}`);
    }
    // verify all non-builtin functions called are also
    // provided as deps to ensure complete call graph later
    const deps = walk((acc, t) => {
        if (t.tag === "call" && t.fn) {
            acc.push(t.fn);
        }
        return acc;
    }, allChildren, [], body);
    const $ = (...xs) => funcall($, ...xs);
    return Object.assign($, {
        tag: "fn",
        type,
        id,
        args,
        deps,
        scope: scope(body)
    });
}
/**
 * Syntax sugar for defining `void main()` functions.
 *
 * @param body -
 */
const defMain = (body) => defn("void", "main", [], body);
function ret(val) {
    return {
        tag: "ret",
        type: val ? val.type : "void",
        val,
    };
}
// prettier-ignore
function funcall(fn, ...args) {
    return isString(fn)
        ? {
            tag: "call",
            type: args[0],
            id: fn,
            args: args.slice(1)
        }
        : {
            tag: "call",
            type: fn.type,
            id: fn.id,
            args,
            fn
        };
}
const builtinCall = (id, type, ...args) => ({
    tag: "call_i",
    type,
    id,
    args,
});

const OP_INFO = {
    mave: "mv",
    vema: "vm",
    vefl: "vn",
    mafl: "vn",
    flve: "nv",
    flma: "nv",
    ivin: "vn",
    iniv: "nv",
    uvui: "vn",
    uiuv: "nv",
};
const op2 = (op, _l, _r, rtype, info) => {
    const nl = isNumber(_l);
    const nr = isNumber(_r);
    let type;
    let l;
    let r;
    if (nl) {
        if (nr) {
            // (number, number)
            l = float(_l);
            r = float(_r);
            type = "float";
        }
        else {
            // (number, term)
            r = _r;
            l = numberWithMatchingType(r, _l);
            type = r.type;
        }
    }
    else if (nr) {
        // (term, number)
        l = _l;
        r = numberWithMatchingType(l, _r);
        type = l.type;
    }
    else {
        // (term, term)
        l = _l;
        r = _r;
        type =
            rtype ||
                (isVec(l)
                    ? l.type
                    : isVec(r)
                        ? r.type
                        : isMat(r)
                            ? r.type
                            : l.type);
    }
    return {
        tag: "op2",
        type: rtype || type,
        info: info || OP_INFO[l.type.substr(0, 2) + r.type.substr(0, 2)],
        op,
        l: l,
        r: r,
    };
};
// prettier-ignore
function add(l, r) {
    return op2("+", l, r);
}
function sub(l, r) {
    return op2("-", l, r);
}
function mul(l, r) {
    return op2("*", l, r, !isNumber(l) && !isNumber(r) && isMat(l) && isVec(r)
        ? r.type
        : undefined);
}
function div(l, r) {
    return op2("/", l, r);
}
const cmp = (op) => (a, b) => op2(op, a, b, "bool");
const eq = cmp("==");
const lt = cmp("<");

function $(val, id) {
    const type = val.type[0];
    const rtype = (a, b) => id.length === 1 ? a : (b + id.length);
    return {
        tag: "swizzle",
        type: type === "i"
            ? rtype("int", "ivec")
            : type === "u"
                ? rtype("uint", "uvec")
                : type === "b"
                    ? rtype("bool", "bvec")
                    : rtype("float", "vec"),
        val,
        id,
    };
}
const $x = (val) => $(val, "x");
const $y = (val) => $(val, "y");
const $z = (val) => $(val, "z");
const $w = (val) => $(val, "w");
function $xy(val) {
    return $(val, "xy");
}
function $xyz(val) {
    return $(val, "xyz");
}

const primOp1 = (name) => (a) => builtinCall(name, a.type, a);
const primOp2 = (name) => (a, b) => builtinCall(name, a.type, a, b);
const min = primOp2("min");
const max = primOp2("max");
const step = primOp2("step");
const abs = primOp1("abs");
function mix(a, b, c) {
    const f = builtinCall("mix", a.type, a, b, c);
    c.type === "float" && (f.info = "n");
    return f;
}

const texRetType = (sampler) => {
    const t = sampler.type[0];
    const shadow = sampler.type.indexOf("Shadow") > 0;
    return t === "s"
        ? shadow
            ? "float"
            : "vec4"
        : t === "i"
            ? shadow
                ? "int"
                : "ivec4"
            : t === "u"
                ? shadow
                    ? "uint"
                    : "uvec4"
                : illegalArgs(`unknown sampler type ${sampler.type}`);
};
const $call = (name, sampler, uv, bias) => {
    const f = bias
        ? builtinCall(name, texRetType(sampler), sampler, uv, bias)
        : builtinCall(name, texRetType(sampler), sampler, uv);
    !isVec(f) && (f.info = "n");
    return f;
};
// prettier-ignore
function texture(sampler, uv, bias) {
    return $call("texture", sampler, uv, bias);
}

export { $w, $x, $xy, $xyz, $y, $z, abs, add, assign, defMain, defn, div, eq, ifThen, lt, max, min, mix, mul, ret, step, sub, ternary, texture };
