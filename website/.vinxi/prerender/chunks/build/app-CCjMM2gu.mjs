import { createComponent, ssr, ssrHydrationKey, isServer, escape, getRequestEvent, delegateEvents } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { I, k } from './index-Dps0aSs2.mjs';
import { F as Ft } from '../_/nitro.mjs';
import { Suspense, createSignal, onCleanup, children, createMemo, getOwner, untrack, Show, on, createRoot } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { A } from './components-DYk6YKKa.mjs';
import { A as Ae, M as Me, b as be, y as ye, I as Ie, q as qe, a as D, Y, B as Be, G, p as pe, _ as _e } from './routing-DSdRzhF_.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/destr/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/h3/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/hookable/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ofetch/dist/node.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/node-mock-http/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ufo/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/klona/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/defu/dist/defu.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/scule/dist/index.mjs';
import 'node:async_hooks';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unctx/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/radix3/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-fetch.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-manifest.js';
import 'node:fs';
import 'node:url';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/pathe/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/cookie-es/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval/dist/esm/production/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval-plugins/dist/esm/production/web.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ohash/dist/index.mjs';

const q = (t) => (r) => {
  const { base: i } = r, n = children(() => r.children), e = createMemo(() => Ae(n(), r.base || ""));
  let s;
  const c = Me(t, e, () => s, { base: i, singleFlight: r.singleFlight, transformUrl: r.transformUrl });
  return t.create && t.create(c), createComponent(be.Provider, { value: c, get children() {
    return createComponent(at, { routerState: c, get root() {
      return r.root;
    }, get load() {
      return r.rootLoad;
    }, get children() {
      return [(s = getOwner()) && null, createComponent(ot, { routerState: c, get branches() {
        return e();
      } })];
    } });
  } });
};
function at(t) {
  const r = t.routerState.location, i = t.routerState.params, n = createMemo(() => t.load && untrack(() => {
    t.load({ params: i, location: r, intent: Ie() || "initial" });
  }));
  return createComponent(Show, { get when() {
    return t.root;
  }, keyed: true, get fallback() {
    return t.children;
  }, children: (e) => createComponent(e, { params: i, location: r, get data() {
    return n();
  }, get children() {
    return t.children;
  } }) });
}
function ot(t) {
  if (isServer) {
    const e = getRequestEvent();
    if (e && e.router && e.router.dataOnly) {
      it(e, t.routerState, t.branches);
      return;
    }
    e && ((e.router || (e.router = {})).matches || (e.router.matches = t.routerState.matches().map(({ route: s, path: c, params: h }) => ({ path: s.originalPath, pattern: s.pattern, match: c, params: h, info: s.info }))));
  }
  const r = [];
  let i;
  const n = createMemo(on(t.routerState.matches, (e, s, c) => {
    let h = s && e.length === s.length;
    const f = [];
    for (let l = 0, b = e.length; l < b; l++) {
      const g = s && s[l], w = e[l];
      c && g && w.route.key === g.route.key ? f[l] = c[l] : (h = false, r[l] && r[l](), createRoot((v) => {
        r[l] = v, f[l] = qe(t.routerState, f[l - 1] || t.routerState.base, O(() => n()[l + 1]), () => t.routerState.matches()[l]);
      }));
    }
    return r.splice(e.length).forEach((l) => l()), c && h ? c : (i = f[0], f);
  }));
  return O(() => n() && i)();
}
const O = (t) => () => createComponent(Show, { get when() {
  return t();
}, keyed: true, children: (r) => createComponent(Y.Provider, { value: r, get children() {
  return r.outlet();
} }) });
function it(t, r, i) {
  const n = new URL(t.request.url), e = D(i, new URL(t.router.previousUrl || t.request.url).pathname), s = D(i, n.pathname);
  for (let c = 0; c < s.length; c++) {
    (!e[c] || s[c].route !== e[c].route) && (t.router.dataOnly = true);
    const { route: h, params: f } = s[c];
    h.load && h.load({ params: f, location: r.location, intent: "preload" });
  }
}
function st([t, r], i, n) {
  return [t, n ? (e) => r(n(e)) : r];
}
function ut(t) {
  if (t === "#") return null;
  try {
    return document.querySelector(t);
  } catch {
    return null;
  }
}
function ct(t) {
  let r = false;
  const i = (e) => typeof e == "string" ? { value: e } : e, n = st(createSignal(i(t.get()), { equals: (e, s) => e.value === s.value && e.state === s.state }), void 0, (e) => (!r && t.set(e), e));
  return t.init && onCleanup(t.init((e = t.get()) => {
    r = true, n[1](i(e)), r = false;
  })), q({ signal: n, create: t.create, utils: t.utils });
}
function lt(t, r, i) {
  return t.addEventListener(r, i), () => t.removeEventListener(r, i);
}
function dt(t, r) {
  const i = ut(`#${t}`);
  i ? i.scrollIntoView() : r && window.scrollTo(0, 0);
}
function mt(t) {
  const r = new URL(t);
  return r.pathname + r.search;
}
function ht(t) {
  let r;
  const i = t.url || (r = getRequestEvent()) && mt(r.request.url) || "", n = { value: t.transformUrl ? t.transformUrl(i) : i };
  return q({ signal: [() => n, (e) => Object.assign(n, e)] })(t);
}
const ft = /* @__PURE__ */ new Map();
function gt(t = true, r = false, i = "/_server", n) {
  return (e) => {
    const s = e.base.path(), c = e.navigatorFactory(e.base);
    let h = {};
    function f(a) {
      return a.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function l(a) {
      if (a.defaultPrevented || a.button !== 0 || a.metaKey || a.altKey || a.ctrlKey || a.shiftKey) return;
      const o = a.composedPath().find((C) => C instanceof Node && C.nodeName.toUpperCase() === "A");
      if (!o || r && !o.hasAttribute("link")) return;
      const d = f(o), u = d ? o.href.baseVal : o.href;
      if ((d ? o.target.baseVal : o.target) || !u && !o.hasAttribute("state")) return;
      const p = (o.getAttribute("rel") || "").split(/\s+/);
      if (o.hasAttribute("download") || p && p.includes("external")) return;
      const y = d ? new URL(u, document.baseURI) : new URL(u);
      if (!(y.origin !== window.location.origin || s && y.pathname && !y.pathname.toLowerCase().startsWith(s.toLowerCase()))) return [o, y];
    }
    function b(a) {
      const o = l(a);
      if (!o) return;
      const [d, u] = o, E = e.parsePath(u.pathname + u.search + u.hash), p = d.getAttribute("state");
      a.preventDefault(), c(E, { resolve: false, replace: d.hasAttribute("replace"), scroll: !d.hasAttribute("noscroll"), state: p && JSON.parse(p) });
    }
    function g(a) {
      const o = l(a);
      if (!o) return;
      const [d, u] = o;
      typeof n == "function" && (u.pathname = n(u.pathname)), h[u.pathname] || e.preloadRoute(u, { preloadData: d.getAttribute("preload") !== "false" });
    }
    function w(a) {
      const o = l(a);
      if (!o) return;
      const [d, u] = o;
      typeof n == "function" && (u.pathname = n(u.pathname)), !h[u.pathname] && (h[u.pathname] = setTimeout(() => {
        e.preloadRoute(u, { preloadData: d.getAttribute("preload") !== "false" }), delete h[u.pathname];
      }, 200));
    }
    function v(a) {
      const o = l(a);
      if (!o) return;
      const [, d] = o;
      typeof n == "function" && (d.pathname = n(d.pathname)), h[d.pathname] && (clearTimeout(h[d.pathname]), delete h[d.pathname]);
    }
    function A(a) {
      if (a.defaultPrevented) return;
      let o = a.submitter && a.submitter.hasAttribute("formaction") ? a.submitter.getAttribute("formaction") : a.target.getAttribute("action");
      if (!o) return;
      if (!o.startsWith("https://action/")) {
        const u = new URL(o, ye);
        if (o = e.parsePath(u.pathname + u.search), !o.startsWith(i)) return;
      }
      if (a.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const d = ft.get(o);
      if (d) {
        a.preventDefault();
        const u = new FormData(a.target);
        a.submitter && a.submitter.name && u.append(a.submitter.name, a.submitter.value), d.call({ r: e, f: a.target }, u);
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", b), t && (document.addEventListener("mouseover", w), document.addEventListener("mouseout", v), document.addEventListener("focusin", g), document.addEventListener("touchstart", g)), document.addEventListener("submit", A), onCleanup(() => {
      document.removeEventListener("click", b), t && (document.removeEventListener("mouseover", w), document.removeEventListener("mouseout", v), document.removeEventListener("focusin", g), document.removeEventListener("touchstart", g)), document.removeEventListener("submit", A);
    });
  };
}
function pt(t) {
  if (isServer) return ht(t);
  const r = () => {
    const n = window.location.pathname + window.location.search;
    return { value: t.transformUrl ? t.transformUrl(n) + window.location.hash : n + window.location.hash, state: window.history.state };
  }, i = pe();
  return ct({ get: r, set({ value: n, replace: e, scroll: s, state: c }) {
    e ? window.history.replaceState(Be(c), "", n) : window.history.pushState(c, "", n), dt(decodeURIComponent(window.location.hash.slice(1)), s), G();
  }, init: (n) => lt(window, "popstate", _e(n, (e) => {
    if (e && e < 0) return !i.confirm(e);
    {
      const s = r();
      return !i.confirm(s.value, { state: s.state });
    }
  })), create: gt(t.preload, t.explicitLinks, t.actionBase, t.transformUrl), utils: { go: (n) => window.history.go(n), beforeLeave: i } })(t);
}
var bt = ["<div", ' class="h-10 w-10 rounded-full bg-primary/10 border border-border flex items-center justify-center text-primary font-bold">CMK</div>'], wt = ["<span", ' class="font-heading text-xl font-bold tracking-tight text-foreground">CentrMark</span>'], vt = ["<header", ' class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-6 shadow-sm"><div class="flex h-16 items-center justify-between max-w-5xl mx-auto"><div class="flex items-center gap-3">', '</div><nav class="hidden md:flex items-center gap-6"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></nav></div></header>"];
function yt() {
  return ssr(vt, ssrHydrationKey(), escape(createComponent(A, { href: "/", class: "flex items-center gap-2", get children() {
    return [ssr(bt, ssrHydrationKey()), ssr(wt, ssrHydrationKey())];
  } })), escape(createComponent(A, { href: "/", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Home" })), escape(createComponent(A, { href: "/examples", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Examples" })), escape(createComponent(A, { href: "/docs", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Docs" })));
}
var xt = ["<div", ">Loading...</div>"];
function qt() {
  return createComponent(pt, { root: (t) => createComponent(I, { get children() {
    return [createComponent(k, { children: "Food Truck Nerdz" }), createComponent(k, { children: "CentrMark" }), createComponent(yt, {}), createComponent(Suspense, { get fallback() {
      return ssr(xt, ssrHydrationKey());
    }, get children() {
      return t.children;
    } })];
  } }), get children() {
    return createComponent(Ft, {});
  } });
}

export { qt as default };
//# sourceMappingURL=app-CCjMM2gu.mjs.map
