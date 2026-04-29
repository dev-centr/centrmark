import { ssrElement, mergeProps as mergeProps$1 } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { mergeProps, splitProps, createMemo } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { F as Fe, $ as $e, k as ke, E } from './routing-DSdRzhF_.mjs';

function A(t) {
  t = mergeProps({ inactiveClass: "inactive", activeClass: "active" }, t);
  const [, r] = splitProps(t, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), i = Fe(() => t.href), o = $e(i), l = ke(), a = createMemo(() => {
    const n = i();
    if (n === void 0) return [false, false];
    const e = E(n.split(/[?#]/, 1)[0]).toLowerCase(), s = E(l.pathname).toLowerCase();
    return [t.end ? e === s : s.startsWith(e + "/") || s === e, e === s];
  });
  return ssrElement("a", mergeProps$1(r, { get href() {
    return o() || t.href;
  }, get state() {
    return JSON.stringify(t.state);
  }, get classList() {
    return { ...t.class && { [t.class]: true }, [t.inactiveClass]: !a()[0], [t.activeClass]: a()[0], ...r.classList };
  }, link: true, get "aria-current"() {
    return a()[1] ? "page" : void 0;
  } }), void 0, true);
}

export { A };
//# sourceMappingURL=components-DYk6YKKa.mjs.map
