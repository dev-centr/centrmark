import { createMemo, createSignal, createRenderEffect, on, useContext, runWithOwner, createContext, getOwner, startTransition, resetErrorBoundaries, batch, untrack, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { isServer, getRequestEvent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';

function pe() {
  let e = /* @__PURE__ */ new Set();
  function t(r) {
    return e.add(r), () => e.delete(r);
  }
  let n = false;
  function s(r, o) {
    if (n) return !(n = false);
    const i = { to: r, options: o, defaultPrevented: false, preventDefault: () => i.defaultPrevented = true };
    for (const c of e) c.listener({ ...i, from: c.location, retry: (l) => {
      l && (n = true), c.navigate(r, { ...o, resolve: false });
    } });
    return !i.defaultPrevented;
  }
  return { subscribe: t, confirm: s };
}
let I;
function G() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), I = window.history.state._depth;
}
isServer || G();
function Be(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function _e(e, t) {
  let n = false;
  return () => {
    const s = I;
    G();
    const r = s == null ? null : I - s;
    if (n) {
      n = false;
      return;
    }
    r && t(r) ? (n = true, window.history.go(-r)) : e();
  };
}
const me = /^(?:[a-z0-9]+:)?\/\//i, ge = /^\/+|(\/)\/+$/g, ye = "http://sr";
function E(e, t = false) {
  const n = e.replace(ge, "$1");
  return n ? t || /^[?#]/.test(n) ? n : "/" + n : "";
}
function B(e, t, n) {
  if (me.test(t)) return;
  const s = E(e), r = n && E(n);
  let o = "";
  return !r || t.startsWith("/") ? o = s : r.toLowerCase().indexOf(s.toLowerCase()) !== 0 ? o = s + r : o = r, (o || "/") + E(t, !o);
}
function ve(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function we(e, t) {
  return E(e).replace(/\/*(\*.*)?$/g, "") + E(t);
}
function J(e) {
  const t = {};
  return e.searchParams.forEach((n, s) => {
    t[s] = n;
  }), t;
}
function Re(e, t, n) {
  const [s, r] = e.split("/*", 2), o = s.split("/").filter(Boolean), i = o.length;
  return (c) => {
    const l = c.split("/").filter(Boolean), f = l.length - i;
    if (f < 0 || f > 0 && r === void 0 && !t) return null;
    const h = { path: i ? "" : "/", params: {} }, m = (p) => n === void 0 ? void 0 : n[p];
    for (let p = 0; p < i; p++) {
      const d = o[p], w = l[p], R = d[0] === ":", C = R ? d.slice(1) : d;
      if (R && k(w, m(C))) h.params[C] = w;
      else if (R || !k(w, d)) return null;
      h.path += `/${w}`;
    }
    if (r) {
      const p = f ? l.slice(-f).join("/") : "";
      if (k(p, m(r))) h.params[r] = p;
      else return null;
    }
    return h;
  };
}
function k(e, t) {
  const n = (s) => s.localeCompare(e, void 0, { sensitivity: "base" }) === 0;
  return t === void 0 ? true : typeof t == "string" ? n(t) : typeof t == "function" ? t(e) : Array.isArray(t) ? t.some(n) : t instanceof RegExp ? t.test(e) : false;
}
function Pe(e) {
  const [t, n] = e.pattern.split("/*", 2), s = t.split("/").filter(Boolean);
  return s.reduce((r, o) => r + (o.startsWith(":") ? 2 : 3), s.length - (n === void 0 ? 0 : 1));
}
function Q(e) {
  const t = /* @__PURE__ */ new Map(), n = getOwner();
  return new Proxy({}, { get(s, r) {
    return t.has(r) || runWithOwner(n, () => t.set(r, createMemo(() => e()[r]))), t.get(r)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(e());
  } });
}
function V(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index), s = e.slice(t.index + t[0].length);
  const r = [n, n += t[1]];
  for (; t = /^(\/\:[^\/]+)\?/.exec(s); ) r.push(n += t[1]), s = s.slice(t[0].length);
  return V(s).reduce((o, i) => [...o, ...r.map((c) => c + i)], []);
}
const xe = 100, be = createContext(), Y = createContext(), _ = () => ve(useContext(be), "<A> and 'use' router primitives can be only used inside a Route."), Ee = () => useContext(Y) || _().base, Fe = (e) => {
  const t = Ee();
  return createMemo(() => t.resolvePath(e()));
}, $e = (e) => {
  const t = _();
  return createMemo(() => {
    const n = e();
    return n !== void 0 ? t.renderPath(n) : n;
  });
}, ke = () => _().location, De = () => _().params;
function Ce(e, t = "") {
  const { component: n, load: s, children: r, info: o } = e, i = !r || Array.isArray(r) && !r.length, c = { key: e, component: n, load: s, info: o };
  return Z(e.path).reduce((l, f) => {
    for (const h of V(f)) {
      const m = we(t, h);
      let p = i ? m : m.split("/*", 1)[0];
      p = p.split("/").map((d) => d.startsWith(":") || d.startsWith("*") ? d : encodeURIComponent(d)).join("/"), l.push({ ...c, originalPath: f, pattern: p, matcher: Re(p, !i, e.matchFilters) });
    }
    return l;
  }, []);
}
function Se(e, t = 0) {
  return { routes: e, score: Pe(e[e.length - 1]) * 1e4 - t, matcher(n) {
    const s = [];
    for (let r = e.length - 1; r >= 0; r--) {
      const o = e[r], i = o.matcher(n);
      if (!i) return null;
      s.unshift({ ...i, route: o });
    }
    return s;
  } };
}
function Z(e) {
  return Array.isArray(e) ? e : [e];
}
function Ae(e, t = "", n = [], s = []) {
  const r = Z(e);
  for (let o = 0, i = r.length; o < i; o++) {
    const c = r[o];
    if (c && typeof c == "object") {
      c.hasOwnProperty("path") || (c.path = "");
      const l = Ce(c, t);
      for (const f of l) {
        n.push(f);
        const h = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !h) Ae(c.children, f.pattern, n, s);
        else {
          const m = Se([...n], s.length);
          s.push(m);
        }
        n.pop();
      }
    }
  }
  return n.length ? s : s.sort((o, i) => i.score - o.score);
}
function D(e, t) {
  for (let n = 0, s = e.length; n < s; n++) {
    const r = e[n].matcher(t);
    if (r) return r;
  }
  return [];
}
function Le(e, t) {
  const n = new URL(ye), s = createMemo((l) => {
    const f = e();
    try {
      return new URL(f, n);
    } catch {
      return console.error(`Invalid path ${f}`), l;
    }
  }, n, { equals: (l, f) => l.href === f.href }), r = createMemo(() => s().pathname), o = createMemo(() => s().search, true), i = createMemo(() => s().hash), c = () => "";
  return { get pathname() {
    return r();
  }, get search() {
    return o();
  }, get hash() {
    return i();
  }, get state() {
    return t();
  }, get key() {
    return c();
  }, query: Q(on(o, () => J(s()))) };
}
let x;
function Ie() {
  return x;
}
function Me(e, t, n, s = {}) {
  const { signal: [r, o], utils: i = {} } = e, c = i.parsePath || ((a) => a), l = i.renderPath || ((a) => a), f = i.beforeLeave || pe(), h = B("", s.base || "");
  if (h === void 0) throw new Error(`${h} is not a valid base path`);
  h && !r().value && o({ value: h, replace: true, scroll: false });
  const [m, p] = createSignal(false);
  let d;
  const w = (a, u) => {
    u.value === R() && u.state === S() || (d === void 0 && p(true), x = a, d = u, startTransition(() => {
      d === u && (C(d.value), ee(d.state), resetErrorBoundaries(), isServer || q[1]([]));
    }).finally(() => {
      d === u && batch(() => {
        x = void 0, a === "navigate" && se(d), p(false), d = void 0;
      });
    }));
  }, [R, C] = createSignal(r().value), [S, ee] = createSignal(r().state), F = Le(R, S), A = [], q = createSignal(isServer ? ae() : []), U = createMemo(() => typeof s.transformUrl == "function" ? D(t(), s.transformUrl(F.pathname)) : D(t(), F.pathname)), te = Q(() => {
    const a = U(), u = {};
    for (let g = 0; g < a.length; g++) Object.assign(u, a[g].params);
    return u;
  }), W = { pattern: h, path: () => h, outlet: () => null, resolvePath(a) {
    return B(h, a);
  } };
  return createRenderEffect(on(r, (a) => w("native", a), { defer: true })), { base: W, location: F, params: te, isRouting: m, renderPath: l, parsePath: c, navigatorFactory: re, matches: U, beforeLeave: f, preloadRoute: oe, singleFlight: s.singleFlight === void 0 ? true : s.singleFlight, submissions: q };
  function ne(a, u, g) {
    untrack(() => {
      if (typeof u == "number") {
        u && (i.go ? i.go(u) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const { replace: L, resolve: $, scroll: P, state: b } = { replace: false, resolve: true, scroll: true, ...g }, y = $ ? a.resolvePath(u) : B("", u);
      if (y === void 0) throw new Error(`Path '${u}' is not a routable path`);
      if (A.length >= xe) throw new Error("Too many redirects");
      const z = R();
      if (y !== z || b !== S()) if (isServer) {
        const H = getRequestEvent();
        H && (H.response = { status: 302, headers: new Headers({ Location: y }) }), o({ value: y, replace: L, scroll: P, state: b });
      } else f.confirm(y, g) && (A.push({ value: z, replace: L, scroll: P, state: S() }), w("navigate", { value: y, state: b }));
    });
  }
  function re(a) {
    return a = a || useContext(Y) || W, (u, g) => ne(a, u, g);
  }
  function se(a) {
    const u = A[0];
    u && (o({ ...a, replace: u.replace, scroll: u.scroll }), A.length = 0);
  }
  function oe(a, u = {}) {
    const g = D(t(), a.pathname), L = x;
    x = "preload";
    for (let $ in g) {
      const { route: P, params: b } = g[$];
      P.component && P.component.preload && P.component.preload();
      const { load: y } = P;
      u.preloadData && y && runWithOwner(n(), () => y({ params: b, location: { pathname: a.pathname, search: a.search, hash: a.hash, query: J(a), state: null, key: "" }, intent: "preload" }));
    }
    x = L;
  }
  function ae() {
    const a = getRequestEvent();
    return a && a.router && a.router.submission ? [a.router.submission] : [];
  }
}
function qe(e, t, n, s) {
  const { base: r, location: o, params: i } = e, { pattern: c, component: l, load: f } = s().route, h = createMemo(() => s().path);
  l && l.preload && l.preload();
  const m = f ? f({ params: i, location: o, intent: x || "initial" }) : void 0;
  return { parent: t, pattern: c, path: h, outlet: () => l ? createComponent(l, { params: i, location: o, data: m, get children() {
    return n();
  } }) : n(), resolvePath(d) {
    return B(r.path(), d, h());
  } };
}

export { $e as $, Ae as A, Be as B, De as D, E, Fe as F, G, Ie as I, Me as M, Y, _e as _, D as a, be as b, ke as k, pe as p, qe as q, ye as y };
//# sourceMappingURL=routing-DSdRzhF_.mjs.map
