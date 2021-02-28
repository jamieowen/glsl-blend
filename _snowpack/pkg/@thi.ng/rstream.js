import { N as NULL_LOGGER, i as isFunction } from '../common/is-function-a2f84a73.js';
import { d as defError, i as illegalArity, e as ensureTransducer, a as isIterable, b as iterator1, m as map, $ as $iter, c as iterator, f as isArray, g as isReduced, S as SEMAPHORE, p as push, h as isPlainObject, j as implementsFunction, u as unreduced } from '../common/map-fd6d0079.js';

var State;
(function (State) {
    State[State["IDLE"] = 0] = "IDLE";
    State[State["ACTIVE"] = 1] = "ACTIVE";
    State[State["DONE"] = 2] = "DONE";
    State[State["ERROR"] = 3] = "ERROR";
    State[State["DISABLED"] = 4] = "DISABLED";
})(State || (State = {}));
/**
 * Closing behaviors.
 */
var CloseMode;
(function (CloseMode) {
    /**
     * Never close, even if no more inputs/outputs.
     */
    CloseMode[CloseMode["NEVER"] = 0] = "NEVER";
    /**
     * Close when first input/output is done / removed.
     */
    CloseMode[CloseMode["FIRST"] = 1] = "FIRST";
    /**
     * Close when last input/output is done / removed.
     */
    CloseMode[CloseMode["LAST"] = 2] = "LAST";
})(CloseMode || (CloseMode = {}));
let LOGGER = NULL_LOGGER;

const IllegalStateError = defError(() => "illegal state");
const illegalState = (msg) => {
    throw new IllegalStateError(msg);
};

function comp(...fns) {
    let [a, b, c, d, e, f, g, h, i, j] = fns;
    switch (fns.length) {
        case 0:
            illegalArity(0);
        case 1:
            return a;
        case 2:
            return (...xs) => a(b(...xs));
        case 3:
            return (...xs) => a(b(c(...xs)));
        case 4:
            return (...xs) => a(b(c(d(...xs))));
        case 5:
            return (...xs) => a(b(c(d(e(...xs)))));
        case 6:
            return (...xs) => a(b(c(d(e(f(...xs))))));
        case 7:
            return (...xs) => a(b(c(d(e(f(g(...xs)))))));
        case 8:
            return (...xs) => a(b(c(d(e(f(g(h(...xs))))))));
        case 9:
            return (...xs) => a(b(c(d(e(f(g(h(i(...xs)))))))));
        case 10:
        default:
            const fn = (...xs) => a(b(c(d(e(f(g(h(i(j(...xs))))))))));
            return fns.length === 10 ? fn : comp(fn, ...fns.slice(10));
    }
}

const identity = (x) => x;

/**
 * Returns first element of given array or `undefined` if array is empty.
 *
 * @param buf - array
 */
/**
 * Returns last element of given array or `undefined` if array is empty.
 *
 * @param buf - array
 */
const peek = (buf) => buf[buf.length - 1];

function comp$1(...fns) {
    fns = fns.map(ensureTransducer);
    return comp.apply(null, fns);
}

function labeled(id, src) {
    return isIterable(src)
        ? iterator1(labeled(id), src)
        : map(isFunction(id) ? (x) => [id(x), x] : (x) => [id, x]);
}

function mapVals(...args) {
    const iter = $iter(mapVals, args);
    if (iter) {
        return iter;
    }
    const fn = args[0];
    const copy = args[1] !== false;
    return map((x) => {
        const res = copy ? {} : x;
        for (let k in x) {
            res[k] = fn(x[k]);
        }
        return res;
    });
}

function partitionSync(...args) {
    const iter = $iter(partitionSync, args, iterator);
    if (iter)
        return iter;
    const { key, mergeOnly, reset, all, backPressure } = Object.assign({ key: identity, mergeOnly: false, reset: true, all: true, backPressure: 0 }, args[1]);
    const requiredKeys = isArray(args[0])
        ? new Set(args[0])
        : args[0];
    const currKeys = new Set();
    const cache = new Map();
    let curr = {};
    const xform = ([init, complete, reduce]) => {
        let first = true;
        if (mergeOnly || backPressure < 1) {
            return [
                init,
                (acc) => {
                    if ((reset && all && currKeys.size > 0) ||
                        (!reset && first)) {
                        acc = reduce(acc, curr);
                        curr = {};
                        currKeys.clear();
                        first = false;
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    const k = key(x);
                    if (requiredKeys.has(k)) {
                        curr[k] = x;
                        currKeys.add(k);
                        if (mergeOnly ||
                            requiredInputs(requiredKeys, currKeys)) {
                            acc = reduce(acc, curr);
                            first = false;
                            if (reset) {
                                curr = {};
                                currKeys.clear();
                            }
                            else {
                                curr = Object.assign({}, curr);
                            }
                        }
                    }
                    return acc;
                },
            ];
        }
        else {
            // with backpressure / caching...
            return [
                init,
                (acc) => {
                    if (all && currKeys.size > 0) {
                        acc = reduce(acc, collect(cache, currKeys));
                        cache.clear();
                        currKeys.clear();
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    const k = key(x);
                    if (requiredKeys.has(k)) {
                        let slot = cache.get(k);
                        !slot && cache.set(k, (slot = []));
                        slot.length >= backPressure &&
                            illegalState(`max back pressure (${backPressure}) exceeded for input: ${String(k)}`);
                        slot.push(x);
                        currKeys.add(k);
                        while (requiredInputs(requiredKeys, currKeys)) {
                            acc = reduce(acc, collect(cache, currKeys));
                            first = false;
                            if (isReduced(acc))
                                break;
                        }
                    }
                    return acc;
                },
            ];
        }
    };
    xform.keys = () => requiredKeys;
    xform.clear = () => {
        cache.clear();
        requiredKeys.clear();
        currKeys.clear();
        curr = {};
    };
    xform.add = (id) => {
        requiredKeys.add(id);
    };
    xform.delete = (id, clean = true) => {
        cache.delete(id);
        requiredKeys.delete(id);
        if (clean) {
            currKeys.delete(id);
            delete curr[id];
        }
    };
    return xform;
}
const requiredInputs = (required, curr) => {
    if (curr.size < required.size)
        return false;
    for (let id of required) {
        if (!curr.has(id))
            return false;
    }
    return true;
};
const collect = (cache, currKeys) => {
    const curr = {};
    for (let id of currKeys) {
        const slot = cache.get(id);
        curr[id] = slot.shift();
        !slot.length && currKeys.delete(id);
    }
    return curr;
};

let NEXT_ID = 0;
const nextID = () => NEXT_ID++;
const optsWithID = (prefix, opts) => ((!opts || !opts.id ? Object.assign(Object.assign({}, opts), { id: prefix + "-" + nextID() }) : opts));

/**
 * Creates a new {@link Subscription} instance, the fundamental datatype
 * and building block provided by this package.
 *
 * @remarks
 * Most other types in rstream, including {@link Stream}s, are
 * `Subscription`s and all can be:
 *
 * - connected into directed graphs (sync or async & not necessarily
 *   DAGs)
 * - transformed using transducers (incl. support for early termination)
 * - can have any number of subscribers (optionally each w/ their own
 *   transducers)
 * - recursively unsubscribe themselves from parent after their last
 *   subscriber unsubscribed (configurable)
 * - will go into a non-recoverable error state if none of the
 *   subscribers has an error handler itself
 * - implement the {@link @thi.ng/api#IDeref} interface
 *
 * If a transducer is provided (via the `xform` option), all received
 * values will be first processed by the transducer and only its
 * transformed result(s) (if any) will be passed to downstream
 * subscribers. Any uncaught errors *inside* the transducer will cause
 * this subscription's error handler to be called and will stop this
 * subscription from receiving any further values (by default, unless
 * overridden).
 *
 * Subscription behavior can be customized via the additional (optional)
 * options arg. See {@link CommonOpts} and {@link SubscriptionOpts} for
 * further details.
 *
 * @example
 * ```ts
 * // as reactive value mechanism (same as with stream() above)
 * s = subscription();
 * s.subscribe(trace("s1"));
 * s.subscribe(trace("s2"), { xform: tx.filter((x) => x > 25) });
 *
 * // external trigger
 * s.next(23);
 * // s1 23
 * s.next(42);
 * // s1 42
 * // s2 42
 * ```
 *
 * @param sub -
 * @param opts -
 */
const subscription = (sub, opts) => new Subscription(sub, opts);
class Subscription {
    constructor(sub, opts = {}) {
        this.state = State.IDLE;
        this.parent = opts.parent;
        this.closeIn =
            opts.closeIn !== undefined ? opts.closeIn : CloseMode.LAST;
        this.closeOut =
            opts.closeOut !== undefined ? opts.closeOut : CloseMode.LAST;
        this.cacheLast = opts.cache !== false;
        this.id = opts.id || `sub-${nextID()}`;
        this.last = SEMAPHORE;
        this.subs = [];
        if (sub) {
            this.subs.push(sub);
        }
        if (opts.xform) {
            this.xform = opts.xform(push());
        }
    }
    deref() {
        return this.last !== SEMAPHORE ? this.last : undefined;
    }
    getState() {
        return this.state;
    }
    subscribe(...args) {
        this.ensureState();
        let sub;
        !peek(args) && args.pop();
        const opts = args.length > 1 && isPlainObject(peek(args))
            ? Object.assign({}, args.pop()) : {};
        switch (args.length) {
            case 1:
                if (isFunction(args[0])) {
                    opts.xform = args[0];
                    !opts.id && (opts.id = `xform-${nextID()}`);
                }
                else {
                    sub = args[0];
                }
                break;
            case 2:
                sub = args[0];
                opts.xform = args[1];
                break;
            default:
                illegalArity(args.length);
        }
        if (implementsFunction(sub, "subscribe") && !opts.xform) {
            sub.parent = this;
        }
        else {
            // FIXME inherit options from this sub or defaults?
            sub = subscription(sub, Object.assign({ parent: this }, opts));
        }
        this.last !== SEMAPHORE && sub.next(this.last);
        return this.addWrapped(sub);
    }
    /**
     * Returns array of new child subscriptions for all given
     * subscribers.
     *
     * @param subs -
     */
    subscribeAll(...subs) {
        const wrapped = [];
        for (let s of subs) {
            wrapped.push(this.subscribe(s));
        }
        return wrapped;
    }
    transform(...xf) {
        const n = xf.length - 1;
        return isPlainObject(xf[n])
            ? this.subscribe(comp$1(...xf.slice(0, n)), xf[n])
            : this.subscribe(comp$1(...xf));
    }
    /**
     * Syntax sugar for {@link Subscription.transform} when using a
     * single {@link @thi.ng/transducers#map} transducer only. The given
     * function `fn` is used as `map`'s transformation fn.
     *
     * @param fn
     * @param opts
     */
    map(fn, opts) {
        return this.subscribe(map(fn), opts);
    }
    /**
     * If called without arg, removes this subscription from parent (if
     * any), cleans up internal state and goes into DONE state. If
     * called with arg, removes the sub from internal pool and if no
     * other subs are remaining also cleans up itself and goes into DONE
     * state.
     *
     * @param sub -
     */
    unsubscribe(sub) {
        LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");
        if (!sub) {
            let res = true;
            if (this.parent) {
                res = this.parent.unsubscribe(this);
            }
            this.state = State.DONE;
            this.cleanup();
            return res;
        }
        LOGGER.debug(this.id, "unsub child", sub.id);
        const idx = this.subs.indexOf(sub);
        if (idx >= 0) {
            this.subs.splice(idx, 1);
            if (this.closeOut === CloseMode.FIRST ||
                (!this.subs.length && this.closeOut !== CloseMode.NEVER)) {
                this.unsubscribe();
            }
            return true;
        }
        return false;
    }
    next(x) {
        if (this.state < State.DONE) {
            if (this.xform) {
                let acc;
                try {
                    acc = this.xform[2]([], x);
                }
                catch (e) {
                    this.error(e);
                    return;
                }
                const uacc = unreduced(acc);
                const n = uacc.length;
                for (let i = 0; i < n; i++) {
                    this.dispatch(uacc[i]);
                }
                isReduced(acc) && this.done();
            }
            else {
                this.dispatch(x);
            }
        }
    }
    done() {
        LOGGER.debug(this.id, "entering done()");
        if (this.state < State.DONE) {
            try {
                if (this.xform) {
                    const acc = this.xform[1]([]);
                    const uacc = unreduced(acc);
                    const n = uacc.length;
                    for (let i = 0; i < n; i++) {
                        this.dispatch(uacc[i]);
                    }
                }
            }
            catch (e) {
                this.error(e);
                return;
            }
            this.state = State.DONE;
            for (let s of this.subs.slice()) {
                try {
                    s.done && s.done();
                }
                catch (e) {
                    s.error ? s.error(e) : this.error(e);
                }
            }
            this.unsubscribe();
            LOGGER.debug(this.id, "exiting done()");
        }
    }
    error(e) {
        this.state = State.ERROR;
        const subs = this.subs;
        let notified = false;
        if (subs.length) {
            for (let s of subs.slice()) {
                if (s.error) {
                    s.error(e);
                    notified = true;
                }
            }
        }
        if (!notified) {
            LOGGER.warn(this.id, "unhandled error:", e);
            if (this.parent) {
                LOGGER.debug(this.id, "unsubscribing...");
                this.unsubscribe();
                this.state = State.ERROR;
            }
        }
    }
    addWrapped(wrapped) {
        this.subs.push(wrapped);
        this.state = State.ACTIVE;
        return wrapped;
    }
    dispatch(x) {
        // LOGGER.debug(this.id, "dispatch", x);
        this.cacheLast && (this.last = x);
        const subs = this.subs;
        let n = subs.length;
        let s;
        if (n === 1) {
            s = subs[0];
            try {
                s.next && s.next(x);
            }
            catch (e) {
                s.error ? s.error(e) : this.error(e);
            }
        }
        else {
            for (; --n >= 0;) {
                s = subs[n];
                try {
                    s.next && s.next(x);
                }
                catch (e) {
                    s.error ? s.error(e) : this.error(e);
                }
            }
        }
    }
    ensureState() {
        if (this.state >= State.DONE) {
            illegalState(`operation not allowed in state ${this.state}`);
        }
    }
    cleanup() {
        LOGGER.debug(this.id, "cleanup");
        this.subs.length = 0;
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}

/**
 * Returns true if mode is FIRST, or if mode is LAST *and* `num = 0`.
 *
 * @internal
 */
const isFirstOrLastInput = (mode, num) => mode === CloseMode.FIRST || (mode === CloseMode.LAST && !num);

/**
 * Similar to {@link StreamMerge}, but with extra synchronization of inputs.
 * Before emitting any new values, {@link StreamSync} collects values until at
 * least one has been received from *all* inputs. Once that's the case, the
 * collected values are sent as labeled tuple object to downstream subscribers.
 *
 * @remarks
 * Each value in the emitted tuple objects is stored under their input stream's
 * ID. Only the last value received from each input is passed on. After the
 * initial tuple has been emitted, you can choose from two possible behaviors:
 *
 * 1) Any future change in any input will produce a new result tuple. These
 *    tuples will retain the most recently read values from other inputs. This
 *    behavior is the default and illustrated in the above schematic.
 * 2) If the `reset` option is `true`, every input will have to provide at least
 *    one new value again until another result tuple is produced.
 *
 * Any done inputs are automatically removed. By default, `StreamSync` calls
 * {@link ISubscriber.done} when the last active input is done, but this
 * behavior can be overridden via the provided options.
 *
 * Input streams can be added and removed dynamically and the emitted tuple size
 * adjusts to the current number of inputs (the next time a value is received
 * from any input). After an input is removed (or done) its last received value
 * can also be removed from the result tuple. This behavior can be configured
 * via the `clean` option given to `sync()` (disabled by default).
 *
 * If the `reset` option is enabled, the last emitted tuple is allowed to be
 * incomplete, by default. To only allow complete tuples, also set the `all`
 * option to `false`.
 *
 * The synchronization is done via the
 * {@link @thi.ng/transducers#(partitionSync:1)} transducer from the
 * {@link @thi.ng/transducers# | @thi.ng/transducers} package. See this
 * function's docs for further details.
 *
 * @example
 * ```ts
 * const a = stream();
 * const b = stream();
 * s = sync({ src: { a, b } }).subscribe(trace("result: "));
 * a.next(1);
 * b.next(2);
 * // result: { a: 1, b: 2 }
 * ```
 *
 * Also see: {@link StreamSyncOpts}
 *
 * @param opts -
 */
const sync = (opts) => new StreamSync(opts);
class StreamSync extends Subscription {
    constructor(opts) {
        const psync = partitionSync(new Set(), {
            key: (x) => x[0],
            mergeOnly: opts.mergeOnly === true,
            reset: opts.reset === true,
            all: opts.all !== false,
            backPressure: opts.backPressure || 0,
        });
        const mapv = mapVals((x) => x[1]);
        super(undefined, optsWithID("streamsync", Object.assign(Object.assign({}, opts), { xform: opts.xform
                ? comp$1(psync, mapv, opts.xform)
                : comp$1(psync, mapv) })));
        this.sources = new Map();
        this.realSourceIDs = new Map();
        this.invRealSourceIDs = new Map();
        this.idSources = new Map();
        this.psync = psync;
        this.clean = !!opts.clean;
        opts.src && this.addAll(opts.src);
    }
    add(src, id) {
        id || (id = src.id);
        this.ensureState();
        this.psync.add(id);
        this.realSourceIDs.set(id, src.id);
        this.invRealSourceIDs.set(src.id, id);
        this.idSources.set(src.id, src);
        this.sources.set(src, src.subscribe({
            next: (x) => 
            // if received value is sub, add it as source
            x[1] instanceof Subscription
                ? this.add(x[1])
                : this.next(x),
            done: () => this.markDone(src),
            __owner: this,
        }, labeled(id), { id: `in-${id}` }));
    }
    addAll(src) {
        // pre-add all source ids for partitionSync
        for (let id in src) {
            this.psync.add(id);
        }
        for (let id in src) {
            this.add(src[id], id);
        }
    }
    remove(src) {
        const sub = this.sources.get(src);
        if (sub) {
            const id = this.invRealSourceIDs.get(src.id);
            LOGGER.info(`removing src: ${src.id} (${id})`);
            this.psync.delete(id, this.clean);
            this.realSourceIDs.delete(id);
            this.invRealSourceIDs.delete(src.id);
            this.idSources.delete(src.id);
            this.sources.delete(src);
            sub.unsubscribe();
            return true;
        }
        return false;
    }
    removeID(id) {
        const src = this.getSourceForID(id);
        return src ? this.remove(src) : false;
    }
    removeAll(src) {
        // pre-remove all source ids for partitionSync
        for (let s of src) {
            this.psync.delete(this.invRealSourceIDs.get(s.id));
        }
        let ok = true;
        for (let s of src) {
            ok = this.remove(s) && ok;
        }
        return ok;
    }
    removeAllIDs(ids) {
        let ok = true;
        for (let id of ids) {
            ok = this.removeID(id) && ok;
        }
        return ok;
    }
    getSourceForID(id) {
        return this.idSources.get(this.realSourceIDs.get(id));
    }
    getSources() {
        const res = {};
        for (let [id, src] of this.idSources) {
            res[this.invRealSourceIDs.get(id)] = src;
        }
        return res;
    }
    unsubscribe(sub) {
        if (!sub) {
            for (let s of this.sources.values()) {
                s.unsubscribe();
            }
            this.state = State.DONE;
            this.sources.clear();
            this.psync.clear();
            this.realSourceIDs.clear();
            this.invRealSourceIDs.clear();
            this.idSources.clear();
        }
        return super.unsubscribe(sub);
    }
    markDone(src) {
        this.remove(src);
        isFirstOrLastInput(this.closeIn, this.sources.size) && this.done();
    }
}

function stream(src, opts) {
    return new Stream(src, opts);
}
class Stream extends Subscription {
    // prettier-ignore
    constructor(src, opts) {
        const [_src, _opts] = isFunction(src) ? [src, opts] : [undefined, src];
        super(undefined, optsWithID("stream", _opts));
        this.src = _src;
        this._inited = false;
    }
    subscribe(...args) {
        const wrapped = super.subscribe.apply(this, args);
        if (!this._inited) {
            this._cancel = (this.src && this.src(this)) || (() => void 0);
            this._inited = true;
        }
        return wrapped;
    }
    unsubscribe(sub) {
        const res = super.unsubscribe(sub);
        if (res &&
            (!sub ||
                ((!this.subs || !this.subs.length) &&
                    this.closeOut !== CloseMode.NEVER))) {
            this.cancel();
        }
        return res;
    }
    done() {
        this.cancel();
        super.done();
        delete this.src;
        delete this._cancel;
    }
    error(e) {
        super.error(e);
        this.cancel();
    }
    cancel() {
        if (this._cancel) {
            LOGGER.debug(this.id, "cancel");
            const f = this._cancel;
            delete this._cancel;
            f();
        }
    }
}

/**
 * Creates a {@link Stream} of events attached to given element / event
 * target and using given event listener options (same as supported by
 * `addEventListener()`, default: false).
 *
 * @param src - event target
 * @param name - event name
 * @param listenerOpts - listener opts
 * @param streamOpts - stream opts
 */
const fromEvent = (src, name, listenerOpts = false, streamOpts) => new Stream((stream) => {
    let listener = (e) => stream.next(e);
    src.addEventListener(name, listener, listenerOpts);
    return () => src.removeEventListener(name, listener, listenerOpts);
}, optsWithID(`event-${name}`, streamOpts));
/**
 * Same as {@link fromEvent}, however only supports well-known DOM event
 * names. Returned stream instance will use corresponding concrete event
 * type in its type signature, whereas {@link fromEvent} will only use the
 * generic `Event`.
 *
 * @example
 * ```ts
 * fromDOMEvent(document.body, "mousemove"); // Stream<MouseEvent>
 * fromEvent(document.body, "mousemove"); // Stream<Event>
 * ```
 *
 * Also see: {@link fromEvent}
 *
 * @param src -
 * @param name -
 * @param listenerOpts -
 * @param streamOpts -
 */
const fromDOMEvent = (src, name, listenerOpts = false, streamOpts) => fromEvent(src, name, listenerOpts, streamOpts);

export { fromDOMEvent, stream, sync };
