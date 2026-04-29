import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import destr from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/destr/dist/index.mjs';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestURL, setResponseStatus, getResponseHeader, setResponseHeaders, send, getRequestHeader, removeResponseHeader, createError, appendResponseHeader, setResponseHeader, H3Event, getRequestIP, parseCookies, getResponseStatus, getResponseStatusText, getCookie, setCookie, getResponseHeaders, getRequestWebStream, setHeader, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/h3/dist/index.mjs';
import { createHooks } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/node-mock-http/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ufo/dist/index.mjs';
import { klona } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/scule/dist/index.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { getContext } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/radix3/dist/index.mjs';
import _AiV2ZJiA1v6GX9NNv8KVUB3BqVOw0LX_jmO5c8_gaGY from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-fetch.js';
import _YTn6k064ZdgCts63xA5IlwvpNT9znzXCG9kltSEP_M from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-manifest.js';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/pathe/dist/index.mjs';
import { parseSetCookie } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/cookie-es/dist/index.mjs';
import { sharedConfig, lazy, createComponent, createUniqueId, useContext, createRenderEffect, onCleanup, createContext, createMemo, createSignal, on, runWithOwner, getOwner, startTransition, resetErrorBoundaries, batch, untrack, mergeProps as mergeProps$1, splitProps, catchError, ErrorBoundary, Suspense, children, Show, createRoot } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { renderToString, isServer, getRequestEvent, ssrElement, escape, mergeProps, ssr, createComponent as createComponent$1, useAssets, spread, renderToStream, ssrHydrationKey, NoHydration, Hydration, ssrAttribute, HydrationScript, delegateEvents } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { provideRequestEvent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/storage/dist/storage.js';
import { fromJSON, Feature, crossSerializeStream, getCrossReferenceHeader, toCrossJSONStream } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval/dist/esm/production/index.mjs';
import { AbortSignalPlugin, CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval-plugins/dist/esm/production/web.mjs';
import { createStorage, prefixStorage } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47fs_45lite from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs-lite.mjs';
import { digest } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ohash/dist/index.mjs';

const serverAssets = [{"baseName":"server","dir":"Z:/code/github.com/dev-centr/centrmark/website/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"./.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"Z:/code/github.com/dev-centr/centrmark/website"}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"Z:/code/github.com/dev-centr/centrmark/website"}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi"}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi/cache"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {};



const appConfig$1 = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/"
  },
  "nitro": {
    "routeRules": {
      "/_build/assets/**": {
        "headers": {
          "cache-control": "public, immutable, max-age=31536000"
        }
      }
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  {
    return _sharedRuntimeConfig;
  }
}
_deepFreeze(klona(appConfig$1));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const nitroAsyncContext = getContext("nitro-app", {
  asyncContext: true,
  AsyncLocalStorage: AsyncLocalStorage 
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$0 = defineNitroErrorHandler(
  function defaultNitroErrorHandler(error, event) {
    const res = defaultHandler(error, event);
    setResponseHeaders(event, res.headers);
    setResponseStatus(event, res.status, res.statusText);
    return send(event, JSON.stringify(res.body, null, 2));
  }
);
function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    console.error(`[request error] ${tags} [${event.method}] ${url}
`, error);
  }
  const headers = {
    "content-type": "application/json",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'none'; frame-ancestors 'none';"
  };
  setResponseStatus(event, statusCode, statusMessage);
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = {
    error: true,
    url: url.href,
    statusCode,
    statusMessage,
    message: isSensitive ? "Server Error" : error.message,
    data: isSensitive ? void 0 : error.data
  };
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}

const errorHandlers = [errorHandler$0];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const appConfig = {"name":"vinxi","routers":[{"name":"public","type":"static","base":"/","dir":"./public","root":"Z:\\code\\github.com\\dev-centr\\centrmark\\website","order":0,"outDir":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi/build/public"},{"name":"ssr","type":"http","link":{"client":"client"},"handler":"src/entry-server.tsx","extensions":["js","jsx","ts","tsx"],"target":"server","root":"Z:\\code\\github.com\\dev-centr\\centrmark\\website","base":"/","outDir":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi/build/ssr","order":1},{"name":"client","type":"client","base":"/_build","handler":"src/entry-client.tsx","extensions":["js","jsx","ts","tsx"],"target":"browser","root":"Z:\\code\\github.com\\dev-centr\\centrmark\\website","outDir":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi/build/client","order":2},{"name":"server-fns","type":"http","base":"/_server","handler":"node_modules/@solidjs/start/dist/runtime/server-handler.js","target":"server","root":"Z:\\code\\github.com\\dev-centr\\centrmark\\website","outDir":"Z:/code/github.com/dev-centr/centrmark/website/.vinxi/build/server-fns","order":3}],"server":{"compressPublicAssets":{"brotli":true},"routeRules":{"/_build/assets/**":{"headers":{"cache-control":"public, immutable, max-age=31536000"}}},"experimental":{"asyncContext":true},"preset":"static","prerender":{"crawlLinks":true}},"root":"Z:\\code\\github.com\\dev-centr\\centrmark\\website"};
					const buildManifest = {"ssr":{"_components-DYk6YKKa.js":{"file":"assets/components-DYk6YKKa.js","name":"components","imports":["_routing-DSdRzhF_.js"]},"_index-Dps0aSs2.js":{"file":"assets/index-Dps0aSs2.js","name":"index"},"_routing-DSdRzhF_.js":{"file":"assets/routing-DSdRzhF_.js","name":"routing"},"src/routes/attributions.tsx?pick=default&pick=$css":{"file":"attributions.js","name":"attributions","src":"src/routes/attributions.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/contact.tsx?pick=default&pick=$css":{"file":"contact.js","name":"contact","src":"src/routes/contact.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/docs/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/docs/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"]},"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/examples/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/examples/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/privacy.tsx?pick=default&pick=$css":{"file":"privacy.js","name":"privacy","src":"src/routes/privacy.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/terms.tsx?pick=default&pick=$css":{"file":"terms.js","name":"terms","src":"src/routes/terms.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"virtual:$vinxi/handler/ssr":{"file":"ssr.js","name":"ssr","src":"virtual:$vinxi/handler/ssr","isEntry":true,"imports":["_index-Dps0aSs2.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"],"dynamicImports":["src/routes/attributions.tsx?pick=default&pick=$css","src/routes/attributions.tsx?pick=default&pick=$css","src/routes/contact.tsx?pick=default&pick=$css","src/routes/contact.tsx?pick=default&pick=$css","src/routes/docs/index.tsx?pick=default&pick=$css","src/routes/docs/index.tsx?pick=default&pick=$css","src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","src/routes/examples/index.tsx?pick=default&pick=$css","src/routes/examples/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/privacy.tsx?pick=default&pick=$css","src/routes/privacy.tsx?pick=default&pick=$css","src/routes/terms.tsx?pick=default&pick=$css","src/routes/terms.tsx?pick=default&pick=$css"],"css":["assets/ssr-BraCDX5r.css"]}},"client":{"_components-B6qYTb_G.js":{"file":"assets/components-B6qYTb_G.js","name":"components","imports":["_index-CxAJ_eRV.js","_routing-XnwpqLN0.js"]},"_index-CxAJ_eRV.js":{"file":"assets/index-CxAJ_eRV.js","name":"index"},"_routing-XnwpqLN0.js":{"file":"assets/routing-XnwpqLN0.js","name":"routing","imports":["_index-CxAJ_eRV.js"]},"src/routes/attributions.tsx?pick=default&pick=$css":{"file":"assets/attributions-BIRKsBvD.js","name":"attributions","src":"src/routes/attributions.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js"]},"src/routes/contact.tsx?pick=default&pick=$css":{"file":"assets/contact-DH3a2aSA.js","name":"contact","src":"src/routes/contact.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js"]},"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css":{"file":"assets/index-D514_ysT.js","name":"index","src":"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js","_routing-XnwpqLN0.js"]},"src/routes/docs/index.tsx?pick=default&pick=$css":{"file":"assets/index-Br3UY0GW.js","name":"index","src":"src/routes/docs/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js","_components-B6qYTb_G.js","_routing-XnwpqLN0.js"]},"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css":{"file":"assets/index-C4mQmNNj.js","name":"index","src":"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js","_routing-XnwpqLN0.js"]},"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css":{"file":"assets/index-CvbR9_pW.js","name":"index","src":"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js","_routing-XnwpqLN0.js"]},"src/routes/examples/index.tsx?pick=default&pick=$css":{"file":"assets/index-DoKKIVDy.js","name":"index","src":"src/routes/examples/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js","_components-B6qYTb_G.js","_routing-XnwpqLN0.js"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"assets/index-BlnIEVMJ.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js"]},"src/routes/privacy.tsx?pick=default&pick=$css":{"file":"assets/privacy-B9hLWDVh.js","name":"privacy","src":"src/routes/privacy.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js"]},"src/routes/terms.tsx?pick=default&pick=$css":{"file":"assets/terms-wbcD8h0o.js","name":"terms","src":"src/routes/terms.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-CxAJ_eRV.js"]},"virtual:$vinxi/handler/client":{"file":"assets/client-5soQxLt1.js","name":"client","src":"virtual:$vinxi/handler/client","isEntry":true,"imports":["_index-CxAJ_eRV.js","_components-B6qYTb_G.js","_routing-XnwpqLN0.js"],"dynamicImports":["src/routes/attributions.tsx?pick=default&pick=$css","src/routes/contact.tsx?pick=default&pick=$css","src/routes/docs/index.tsx?pick=default&pick=$css","src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","src/routes/examples/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/privacy.tsx?pick=default&pick=$css","src/routes/terms.tsx?pick=default&pick=$css"],"css":["assets/client-BraCDX5r.css"]}},"server-fns":{"_components-DYk6YKKa.js":{"file":"assets/components-DYk6YKKa.js","name":"components","imports":["_routing-DSdRzhF_.js"]},"_index-Dps0aSs2.js":{"file":"assets/index-Dps0aSs2.js","name":"index"},"_routing-DSdRzhF_.js":{"file":"assets/routing-DSdRzhF_.js","name":"routing"},"_server-fns-CQR_ej8Q.js":{"file":"assets/server-fns-CQR_ej8Q.js","name":"server-fns","dynamicImports":["src/routes/attributions.tsx?pick=default&pick=$css","src/routes/attributions.tsx?pick=default&pick=$css","src/routes/contact.tsx?pick=default&pick=$css","src/routes/contact.tsx?pick=default&pick=$css","src/routes/docs/index.tsx?pick=default&pick=$css","src/routes/docs/index.tsx?pick=default&pick=$css","src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","src/routes/examples/index.tsx?pick=default&pick=$css","src/routes/examples/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/index.tsx?pick=default&pick=$css","src/routes/privacy.tsx?pick=default&pick=$css","src/routes/privacy.tsx?pick=default&pick=$css","src/routes/terms.tsx?pick=default&pick=$css","src/routes/terms.tsx?pick=default&pick=$css","src/app.tsx"]},"src/app.tsx":{"file":"assets/app-G0nMzLL-.js","name":"app","src":"src/app.tsx","isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_server-fns-CQR_ej8Q.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"],"css":["assets/app-BraCDX5r.css"]},"src/routes/attributions.tsx?pick=default&pick=$css":{"file":"attributions.js","name":"attributions","src":"src/routes/attributions.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/contact.tsx?pick=default&pick=$css":{"file":"contact.js","name":"contact","src":"src/routes/contact.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css":{"file":"index2.js","name":"index","src":"src/routes/docs/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/docs/index.tsx?pick=default&pick=$css":{"file":"index.js","name":"index","src":"src/routes/docs/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"]},"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css":{"file":"index4.js","name":"index","src":"src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css":{"file":"index5.js","name":"index","src":"src/routes/examples/[slug]/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_routing-DSdRzhF_.js"]},"src/routes/examples/index.tsx?pick=default&pick=$css":{"file":"index3.js","name":"index","src":"src/routes/examples/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js","_components-DYk6YKKa.js","_routing-DSdRzhF_.js"]},"src/routes/index.tsx?pick=default&pick=$css":{"file":"index6.js","name":"index","src":"src/routes/index.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/privacy.tsx?pick=default&pick=$css":{"file":"privacy.js","name":"privacy","src":"src/routes/privacy.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"src/routes/terms.tsx?pick=default&pick=$css":{"file":"terms.js","name":"terms","src":"src/routes/terms.tsx?pick=default&pick=$css","isEntry":true,"isDynamicEntry":true,"imports":["_index-Dps0aSs2.js"]},"virtual:$vinxi/handler/server-fns":{"file":"server-fns.js","name":"server-fns","src":"virtual:$vinxi/handler/server-fns","isEntry":true,"imports":["_server-fns-CQR_ej8Q.js"]}}};

					const routeManifest = {"ssr":{},"client":{},"server-fns":{}};

        function createProdApp(appConfig) {
          return {
            config: { ...appConfig, buildManifest, routeManifest },
            getRouter(name) {
              return appConfig.routers.find(router => router.name === name)
            }
          }
        }

        function plugin(app) {
          const prodApp = createProdApp(appConfig);
          globalThis.app = prodApp;
        }

const chunks = {};
			 



			 function app() {
				 globalThis.$$chunks = chunks;
			 }

const plugins = [
  plugin,
_AiV2ZJiA1v6GX9NNv8KVUB3BqVOw0LX_jmO5c8_gaGY,
_YTn6k064ZdgCts63xA5IlwvpNT9znzXCG9kltSEP_M,
app
];

const assets = {
  "/assets/ssr-BraCDX5r.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"2805-42rLhWL/CFcTLFq9PSFuaFbAiFI\"",
    "mtime": "2026-04-29T09:52:46.875Z",
    "size": 10245,
    "path": "../../.output/public/assets/ssr-BraCDX5r.css"
  },
  "/assets/ssr-BraCDX5r.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"9b8-XiG4c3qqUbCttMaHJm0+UCHCrqY\"",
    "mtime": "2026-04-29T09:52:51.966Z",
    "size": 2488,
    "path": "../../.output/public/assets/ssr-BraCDX5r.css.br"
  },
  "/assets/ssr-BraCDX5r.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b29-d7fgwrOPApRK7HdVUmERNnUaoY8\"",
    "mtime": "2026-04-29T09:52:51.946Z",
    "size": 2857,
    "path": "../../.output/public/assets/ssr-BraCDX5r.css.gz"
  },
  "/docs/CERTIFICATION.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"bdb-19K90g/kXq2x0/F7rxUThKvhEwU\"",
    "mtime": "2026-04-29T07:37:10.609Z",
    "size": 3035,
    "path": "../../.output/public/docs/CERTIFICATION.adoc"
  },
  "/docs/CERTIFICATION.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"476-EkFngpG8aeS9nG4I6qSgAwDm/ns\"",
    "mtime": "2026-04-29T09:52:51.946Z",
    "size": 1142,
    "path": "../../.output/public/docs/CERTIFICATION.adoc.br"
  },
  "/docs/CERTIFICATION.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"588-/aFkv37tBm6iTb69kXxKszZU8Vw\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 1416,
    "path": "../../.output/public/docs/CERTIFICATION.adoc.gz"
  },
  "/docs/changelog.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"22c-DORYa3AZkcb5sI4EoyAQGTYUB6c\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 556,
    "path": "../../.output/public/docs/changelog.adoc.br"
  },
  "/docs/changelog.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"5da-SxUC3nER5lTugPlpnGJWt6iE7Pc\"",
    "mtime": "2026-04-29T08:15:35.795Z",
    "size": 1498,
    "path": "../../.output/public/docs/changelog.adoc"
  },
  "/docs/changelog.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2d4-OceDf/k5MflABmA6UKfrGpRQNuc\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 724,
    "path": "../../.output/public/docs/changelog.adoc.gz"
  },
  "/docs/COMMERCIAL-LICENSE.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"738-AlEh7VY54l6HGC9HRxooB9Dex5A\"",
    "mtime": "2026-04-29T07:38:54.545Z",
    "size": 1848,
    "path": "../../.output/public/docs/COMMERCIAL-LICENSE.adoc"
  },
  "/docs/COMMERCIAL-LICENSE.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"280-gZXvpj7G0cCOHjRSrJcO8v2WCq4\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 640,
    "path": "../../.output/public/docs/COMMERCIAL-LICENSE.adoc.br"
  },
  "/docs/formal_grammar.ebnf": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"e88-zRbIsYmqnWeYBlrtrN10w0Mytgk\"",
    "mtime": "2026-03-14T03:28:06.337Z",
    "size": 3720,
    "path": "../../.output/public/docs/formal_grammar.ebnf"
  },
  "/docs/formal_grammar.ebnf.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"48a-v9puy5Anis2IhHYSbF05wWtwTs0\"",
    "mtime": "2026-04-29T09:52:51.947Z",
    "size": 1162,
    "path": "../../.output/public/docs/formal_grammar.ebnf.br"
  },
  "/docs/COMMERCIAL-LICENSE.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"38f-qPteFMKh6mTFNjkCpPJUte1RaEA\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 911,
    "path": "../../.output/public/docs/COMMERCIAL-LICENSE.adoc.gz"
  },
  "/docs/formal_grammar.ebnf.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"574-3GAUaXa+4fI8vX8YLcSrIxFERDo\"",
    "mtime": "2026-04-29T09:52:51.945Z",
    "size": 1396,
    "path": "../../.output/public/docs/formal_grammar.ebnf.gz"
  },
  "/docs/informal.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"1f4e-ro/2vvtBoUpS06pJzGyCglKR86U\"",
    "mtime": "2026-03-14T05:11:12.981Z",
    "size": 8014,
    "path": "../../.output/public/docs/informal.adoc"
  },
  "/docs/informal.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"bec-b4cWuqTvE23wjtw9FneV2/Yi2Yo\"",
    "mtime": "2026-04-29T09:52:51.966Z",
    "size": 3052,
    "path": "../../.output/public/docs/informal.adoc.br"
  },
  "/docs/LICENSING.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"7d6-L06gbGv6QM7wp1PBxdUMV+m8250\"",
    "mtime": "2026-04-29T07:38:19.396Z",
    "size": 2006,
    "path": "../../.output/public/docs/LICENSING.adoc"
  },
  "/docs/informal.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"eb8-GVSjlLCsAE3b1Knyx94B1+4BaI0\"",
    "mtime": "2026-04-29T09:52:51.965Z",
    "size": 3768,
    "path": "../../.output/public/docs/informal.adoc.gz"
  },
  "/docs/LICENSING.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"300-09M9DbGgSBEJNXoq7t6vhYVO33c\"",
    "mtime": "2026-04-29T09:52:51.965Z",
    "size": 768,
    "path": "../../.output/public/docs/LICENSING.adoc.br"
  },
  "/docs/README.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"169a-yKoTRNq1fh8WvfuWZpsWcgF9yno\"",
    "mtime": "2026-04-29T09:51:36.750Z",
    "size": 5786,
    "path": "../../.output/public/docs/README.adoc"
  },
  "/docs/README.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"900-pzV7sZPoagxr6d77jiastO5woeE\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 2304,
    "path": "../../.output/public/docs/README.adoc.br"
  },
  "/docs/LICENSING.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"431-pZl50pFD3tWxEluxTuERsyB1xc0\"",
    "mtime": "2026-04-29T09:52:51.964Z",
    "size": 1073,
    "path": "../../.output/public/docs/LICENSING.adoc.gz"
  },
  "/docs/TRADEMARK.adoc": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"833-UW46aZSTIVtcIkL7GG+d+m2rrp0\"",
    "mtime": "2026-04-29T07:36:56.515Z",
    "size": 2099,
    "path": "../../.output/public/docs/TRADEMARK.adoc"
  },
  "/docs/README.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b24-ssIwdRvCL+Tq1Yo1dprQ6yJVPCg\"",
    "mtime": "2026-04-29T09:52:51.978Z",
    "size": 2852,
    "path": "../../.output/public/docs/README.adoc.gz"
  },
  "/examples/literate-programming.ast.json": {
    "type": "application/json",
    "encoding": null,
    "etag": "\"17d9-XYAP7lbFlSaVI54ukULITXB3wjA\"",
    "mtime": "2026-04-29T09:02:25.368Z",
    "size": 6105,
    "path": "../../.output/public/examples/literate-programming.ast.json"
  },
  "/docs/TRADEMARK.adoc.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"30c-eMh2CW5iIjVWctacrnvOL2GSMw0\"",
    "mtime": "2026-04-29T09:52:51.978Z",
    "size": 780,
    "path": "../../.output/public/docs/TRADEMARK.adoc.br"
  },
  "/docs/TRADEMARK.adoc.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"407-X4k9CIaWEE7sGKJEAoCuTVs5VAg\"",
    "mtime": "2026-04-29T09:52:51.978Z",
    "size": 1031,
    "path": "../../.output/public/docs/TRADEMARK.adoc.gz"
  },
  "/examples/literate-programming.ast.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"52b-ic0JkBJvl2/EKt5nnUKhrzw8Fx0\"",
    "mtime": "2026-04-29T09:52:52.010Z",
    "size": 1323,
    "path": "../../.output/public/examples/literate-programming.ast.json.br"
  },
  "/examples/literate-programming.ast.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"672-hevcO7PQs8WrHuuAiRyRYCGKTrE\"",
    "mtime": "2026-04-29T09:52:51.990Z",
    "size": 1650,
    "path": "../../.output/public/examples/literate-programming.ast.json.gz"
  },
  "/examples/literate-programming.cmk": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"ab6-nacchDh04JgvY8iqirivSAXkGZk\"",
    "mtime": "2026-03-28T07:01:11.886Z",
    "size": 2742,
    "path": "../../.output/public/examples/literate-programming.cmk"
  },
  "/examples/showcase.ast.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"b3b-oG4xhoEgaot7V2RUSvJbIEcxOac\"",
    "mtime": "2026-04-29T09:52:52.022Z",
    "size": 2875,
    "path": "../../.output/public/examples/showcase.ast.json.br"
  },
  "/examples/literate-programming.cmk.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"435-STnY45B8GSuPmb+iobFvFwaCpa8\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 1077,
    "path": "../../.output/public/examples/literate-programming.cmk.br"
  },
  "/examples/literate-programming.cmk.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"561-f4x1mYr/GBG01H0Rx4hxd/GcPWU\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 1377,
    "path": "../../.output/public/examples/literate-programming.cmk.gz"
  },
  "/examples/showcase.ast.json": {
    "type": "application/json",
    "encoding": null,
    "etag": "\"62da-Zjfu8SvQs/cYIy2RowwySWS/cu0\"",
    "mtime": "2026-04-29T09:50:30.211Z",
    "size": 25306,
    "path": "../../.output/public/examples/showcase.ast.json"
  },
  "/examples/showcase.ast.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"d23-OgTbCz8SacvyIcZFowEHDogF1vg\"",
    "mtime": "2026-04-29T09:52:51.990Z",
    "size": 3363,
    "path": "../../.output/public/examples/showcase.ast.json.gz"
  },
  "/examples/showcase.cmk": {
    "type": "text/plain; charset=utf-8",
    "encoding": null,
    "etag": "\"1533-ePH2XQNZltGx2qst3bDYTFpx+gw\"",
    "mtime": "2026-04-29T09:49:23.200Z",
    "size": 5427,
    "path": "../../.output/public/examples/showcase.cmk"
  },
  "/examples/showcase.cmk.br": {
    "type": "text/plain; charset=utf-8",
    "encoding": "br",
    "etag": "\"861-IXVU/Tq6geYgV4wT7VFc9lJVd6E\"",
    "mtime": "2026-04-29T09:52:51.991Z",
    "size": 2145,
    "path": "../../.output/public/examples/showcase.cmk.br"
  },
  "/images/checklist.svg": {
    "type": "image/svg+xml",
    "encoding": null,
    "etag": "\"574-AvHAHYXrmWOf4YE07LY/BKICLn4\"",
    "mtime": "2026-04-29T09:50:18.875Z",
    "size": 1396,
    "path": "../../.output/public/images/checklist.svg"
  },
  "/examples/showcase.cmk.gz": {
    "type": "text/plain; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"a6b-1cLxBwhL2NNulGgZslduOUbjhmk\"",
    "mtime": "2026-04-29T09:52:51.987Z",
    "size": 2667,
    "path": "../../.output/public/examples/showcase.cmk.gz"
  },
  "/images/checklist.svg.br": {
    "type": "image/svg+xml",
    "encoding": "br",
    "etag": "\"199-MhWTXJr49qgv50chmkPrI+Ew4Dc\"",
    "mtime": "2026-04-29T09:52:51.978Z",
    "size": 409,
    "path": "../../.output/public/images/checklist.svg.br"
  },
  "/images/feature-tabs.svg": {
    "type": "image/svg+xml",
    "encoding": null,
    "etag": "\"819-LSJ1jVN4YUKsQWuX8HwdrkPljLY\"",
    "mtime": "2026-04-29T09:49:58.638Z",
    "size": 2073,
    "path": "../../.output/public/images/feature-tabs.svg"
  },
  "/images/checklist.svg.gz": {
    "type": "image/svg+xml",
    "encoding": "gzip",
    "etag": "\"1e6-jM5UPYBmtqYtYmyaUtxrEpJZRZM\"",
    "mtime": "2026-04-29T09:52:51.978Z",
    "size": 486,
    "path": "../../.output/public/images/checklist.svg.gz"
  },
  "/images/feature-tabs.svg.br": {
    "type": "image/svg+xml",
    "encoding": "br",
    "etag": "\"1cd-aaa9kSW9QfOM1rJTaasFv9S0SYU\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 461,
    "path": "../../.output/public/images/feature-tabs.svg.br"
  },
  "/images/feature-tabs.svg.gz": {
    "type": "image/svg+xml",
    "encoding": "gzip",
    "etag": "\"22c-BbUPUbu97VmoBcjWh0xMOXq0FoM\"",
    "mtime": "2026-04-29T09:52:51.979Z",
    "size": 556,
    "path": "../../.output/public/images/feature-tabs.svg.gz"
  },
  "/silktide/silktide-consent-init.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"92f-j6X55JCZucDnmaUo9z3eQqXEVV8\"",
    "mtime": "2026-04-27T06:09:47.860Z",
    "size": 2351,
    "path": "../../.output/public/silktide/silktide-consent-init.js"
  },
  "/silktide/silktide-consent-init.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3a5-s89bN3SPGWWXTch2bbYEcHUPJBk\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 933,
    "path": "../../.output/public/silktide/silktide-consent-init.js.gz"
  },
  "/silktide/silktide-consent-init.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2bf-lOG3awx1LtwCJQWFSddPOsRDYFQ\"",
    "mtime": "2026-04-29T09:52:51.988Z",
    "size": 703,
    "path": "../../.output/public/silktide/silktide-consent-init.js.br"
  },
  "/silktide/silktide-consent-manager.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"2dd8-RDOBX0BpeqinZ97zv0hrHseoMWM\"",
    "mtime": "2026-04-27T06:09:21.465Z",
    "size": 11736,
    "path": "../../.output/public/silktide/silktide-consent-manager.css"
  },
  "/silktide/silktide-consent-manager.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"81a-0dyBbXKE3o28M/4s/Dvdr1ctScY\"",
    "mtime": "2026-04-29T09:52:52.010Z",
    "size": 2074,
    "path": "../../.output/public/silktide/silktide-consent-manager.css.br"
  },
  "/silktide/silktide-consent-manager.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"98d-x5Vps3lowievgVbGKJeMYKStfOE\"",
    "mtime": "2026-04-29T09:52:52.010Z",
    "size": 2445,
    "path": "../../.output/public/silktide/silktide-consent-manager.css.gz"
  },
  "/silktide/silktide-consent-manager.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"d240-NHVNtH/bWmkhsZCZF6QTe0IAmIw\"",
    "mtime": "2026-04-27T06:09:21.433Z",
    "size": 53824,
    "path": "../../.output/public/silktide/silktide-consent-manager.js"
  },
  "/silktide/silktide-consent-manager.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3181-rarTNtwTHKqIN3CBdLgLJt9Q4+o\"",
    "mtime": "2026-04-29T09:52:52.048Z",
    "size": 12673,
    "path": "../../.output/public/silktide/silktide-consent-manager.js.gz"
  },
  "/silktide/silktide-consent-manager.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"28e6-MfFniP1zSfjzy9LzhaCU7YDwgt8\"",
    "mtime": "2026-04-29T09:52:52.111Z",
    "size": 10470,
    "path": "../../.output/public/silktide/silktide-consent-manager.js.br"
  },
  "/silktide/silktide-ftn-overrides.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1dc-L2gqxBT3KI6XiRDj0FMagB31m9c\"",
    "mtime": "2026-04-27T06:09:48.354Z",
    "size": 476,
    "path": "../../.output/public/silktide/silktide-ftn-overrides.css"
  },
  "/docs/changelog-details/2026-03-14 - centrmark-inauguration.adoc": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"264-qZhSgwwBWcnyxxPI7U3o2naEvnc\"",
    "mtime": "2026-03-14T05:17:54.410Z",
    "size": 612,
    "path": "../../.output/public/docs/changelog-details/2026-03-14 - centrmark-inauguration.adoc"
  },
  "/docs/changelog-details/2026-04-29 - agpl-and-trademark.adoc": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1bc-ax+vf8lrs5/KGdZewZEcLncHR1c\"",
    "mtime": "2026-04-29T07:25:47.925Z",
    "size": 444,
    "path": "../../.output/public/docs/changelog-details/2026-04-29 - agpl-and-trademark.adoc"
  },
  "/docs/changelog-details/2026-04-29 - centrmark-certification-program.adoc": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1f7-nGXTq/VAmaaBnPY4vs2AqMPPXNQ\"",
    "mtime": "2026-04-29T07:36:08.720Z",
    "size": 503,
    "path": "../../.output/public/docs/changelog-details/2026-04-29 - centrmark-certification-program.adoc"
  },
  "/docs/changelog-details/2026-04-29 - commercial-licensing-lane.adoc": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"1a3-2eDhkFjMzbiuOiI97lkxLMcp0xA\"",
    "mtime": "2026-04-29T07:38:32.463Z",
    "size": 419,
    "path": "../../.output/public/docs/changelog-details/2026-04-29 - commercial-licensing-lane.adoc"
  },
  "/docs/changelog-details/2026-04-29 - mvp-d-reference-implementation.adoc": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"185-GJfZNhiUYYMvCggNS+3SkjmnIfA\"",
    "mtime": "2026-04-29T08:15:27.276Z",
    "size": 389,
    "path": "../../.output/public/docs/changelog-details/2026-04-29 - mvp-d-reference-implementation.adoc"
  },
  "/_server/assets/app-BraCDX5r.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"2805-42rLhWL/CFcTLFq9PSFuaFbAiFI\"",
    "mtime": "2026-04-29T09:52:51.640Z",
    "size": 10245,
    "path": "../../.output/public/_server/assets/app-BraCDX5r.css"
  },
  "/_server/assets/app-BraCDX5r.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"9b8-XiG4c3qqUbCttMaHJm0+UCHCrqY\"",
    "mtime": "2026-04-29T09:52:52.137Z",
    "size": 2488,
    "path": "../../.output/public/_server/assets/app-BraCDX5r.css.br"
  },
  "/_server/assets/app-BraCDX5r.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b29-d7fgwrOPApRK7HdVUmERNnUaoY8\"",
    "mtime": "2026-04-29T09:52:52.132Z",
    "size": 2857,
    "path": "../../.output/public/_server/assets/app-BraCDX5r.css.gz"
  },
  "/_build/.vite/manifest.json.br": {
    "type": "application/json",
    "encoding": "br",
    "etag": "\"217-5n4dBDG10RdOELHdEeJ+q1JONn0\"",
    "mtime": "2026-04-29T09:52:52.048Z",
    "size": 535,
    "path": "../../.output/public/_build/.vite/manifest.json.br"
  },
  "/_build/.vite/manifest.json.gz": {
    "type": "application/json",
    "encoding": "gzip",
    "etag": "\"25c-zRXRTG5HAtAOojAEWRWlFL57iQg\"",
    "mtime": "2026-04-29T09:52:52.039Z",
    "size": 604,
    "path": "../../.output/public/_build/.vite/manifest.json.gz"
  },
  "/_build/.vite/manifest.json": {
    "type": "application/json",
    "encoding": null,
    "etag": "\"11ab-MGguoxR+QkyMTldNErrwJQvXXKE\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 4523,
    "path": "../../.output/public/_build/.vite/manifest.json"
  },
  "/_build/assets/attributions-BIRKsBvD.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"511-TO9iqjYnrTW49D8shOPE9WrozbU\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1297,
    "path": "../../.output/public/_build/assets/attributions-BIRKsBvD.js"
  },
  "/_build/assets/attributions-BIRKsBvD.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"257-t3QvW/Vq2pFlhDWsOkgeKAl9BWc\"",
    "mtime": "2026-04-29T09:52:52.048Z",
    "size": 599,
    "path": "../../.output/public/_build/assets/attributions-BIRKsBvD.js.br"
  },
  "/_build/assets/attributions-BIRKsBvD.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2eb-avTWY8/M29j4UeMELqBnBZm/dzw\"",
    "mtime": "2026-04-29T09:52:52.048Z",
    "size": 747,
    "path": "../../.output/public/_build/assets/attributions-BIRKsBvD.js.gz"
  },
  "/_build/assets/client-5soQxLt1.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"4cf5-gxNH3+H73s9VQSdpL7fMawpJakw\"",
    "mtime": "2026-04-29T09:52:49.395Z",
    "size": 19701,
    "path": "../../.output/public/_build/assets/client-5soQxLt1.js"
  },
  "/_build/assets/client-5soQxLt1.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1857-NwCGs6WWyeBa8QsO90jCrwBBtFI\"",
    "mtime": "2026-04-29T09:52:52.102Z",
    "size": 6231,
    "path": "../../.output/public/_build/assets/client-5soQxLt1.js.br"
  },
  "/_build/assets/client-5soQxLt1.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"1b35-ZzMy3LzCcArtr9qqBDoDDwz1g7w\"",
    "mtime": "2026-04-29T09:52:52.086Z",
    "size": 6965,
    "path": "../../.output/public/_build/assets/client-5soQxLt1.js.gz"
  },
  "/_build/assets/client-BraCDX5r.css": {
    "type": "text/css; charset=utf-8",
    "encoding": null,
    "etag": "\"2805-42rLhWL/CFcTLFq9PSFuaFbAiFI\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 10245,
    "path": "../../.output/public/_build/assets/client-BraCDX5r.css"
  },
  "/_build/assets/client-BraCDX5r.css.br": {
    "type": "text/css; charset=utf-8",
    "encoding": "br",
    "etag": "\"9b8-XiG4c3qqUbCttMaHJm0+UCHCrqY\"",
    "mtime": "2026-04-29T09:52:52.076Z",
    "size": 2488,
    "path": "../../.output/public/_build/assets/client-BraCDX5r.css.br"
  },
  "/_build/assets/client-BraCDX5r.css.gz": {
    "type": "text/css; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"b29-d7fgwrOPApRK7HdVUmERNnUaoY8\"",
    "mtime": "2026-04-29T09:52:52.048Z",
    "size": 2857,
    "path": "../../.output/public/_build/assets/client-BraCDX5r.css.gz"
  },
  "/_build/assets/components-B6qYTb_G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"33f-w+DUdTB1TSSDB8+/fJcL5Hhhv4w\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 831,
    "path": "../../.output/public/_build/assets/components-B6qYTb_G.js"
  },
  "/_build/assets/contact-DH3a2aSA.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"511-GK+HAWcV5EGWRgO7jUQGX7s0Vpg\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1297,
    "path": "../../.output/public/_build/assets/contact-DH3a2aSA.js"
  },
  "/_build/assets/contact-DH3a2aSA.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"290-h0BC3PVHnX7ULXPDAjTjWl5JdK0\"",
    "mtime": "2026-04-29T09:52:52.076Z",
    "size": 656,
    "path": "../../.output/public/_build/assets/contact-DH3a2aSA.js.gz"
  },
  "/_build/assets/contact-DH3a2aSA.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"200-T7tg10sguQsL3GsCssijEJgW2GM\"",
    "mtime": "2026-04-29T09:52:52.077Z",
    "size": 512,
    "path": "../../.output/public/_build/assets/contact-DH3a2aSA.js.br"
  },
  "/_build/assets/index-BlnIEVMJ.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"437-bBQzl/HLj+k+FCuGdpeZCOPpv3A\"",
    "mtime": "2026-04-29T09:52:52.063Z",
    "size": 1079,
    "path": "../../.output/public/_build/assets/index-BlnIEVMJ.js.br"
  },
  "/_build/assets/index-BlnIEVMJ.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"b00-FVW+7poORTr8DANGIxdfQLgd+pY\"",
    "mtime": "2026-04-29T09:52:49.399Z",
    "size": 2816,
    "path": "../../.output/public/_build/assets/index-BlnIEVMJ.js"
  },
  "/_build/assets/index-BlnIEVMJ.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"4fd-mPF1JqBJAlQlKqVHe/QvG62nvq0\"",
    "mtime": "2026-04-29T09:52:52.063Z",
    "size": 1277,
    "path": "../../.output/public/_build/assets/index-BlnIEVMJ.js.gz"
  },
  "/_build/assets/index-Br3UY0GW.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"5ee-txPS96AZgzEAOke5d+8gRObYXgc\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1518,
    "path": "../../.output/public/_build/assets/index-Br3UY0GW.js"
  },
  "/_build/assets/index-Br3UY0GW.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2b4-zV55TqbXkw28GoC4eLxsc52jffs\"",
    "mtime": "2026-04-29T09:52:52.085Z",
    "size": 692,
    "path": "../../.output/public/_build/assets/index-Br3UY0GW.js.br"
  },
  "/_build/assets/index-C4mQmNNj.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"4f8-bNuqm0nTHMOHkMtSTbmfv9Vduwo\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1272,
    "path": "../../.output/public/_build/assets/index-C4mQmNNj.js"
  },
  "/_build/assets/index-Br3UY0GW.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"338-oetzpa30QK95NQGWNwn9//Yz6TU\"",
    "mtime": "2026-04-29T09:52:52.085Z",
    "size": 824,
    "path": "../../.output/public/_build/assets/index-Br3UY0GW.js.gz"
  },
  "/_build/assets/index-C4mQmNNj.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"30a-cHWGc7K69f3iB1DHa/7JXNRgSJw\"",
    "mtime": "2026-04-29T09:52:52.076Z",
    "size": 778,
    "path": "../../.output/public/_build/assets/index-C4mQmNNj.js.gz"
  },
  "/_build/assets/index-C4mQmNNj.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"293-7a7CJXObWHK6bXXWQS5mosjkNIw\"",
    "mtime": "2026-04-29T09:52:52.076Z",
    "size": 659,
    "path": "../../.output/public/_build/assets/index-C4mQmNNj.js.br"
  },
  "/_build/assets/index-CvbR9_pW.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"509-k/HRBl/8ScSblWuLoUQDY++dScw\"",
    "mtime": "2026-04-29T09:52:49.399Z",
    "size": 1289,
    "path": "../../.output/public/_build/assets/index-CvbR9_pW.js"
  },
  "/_build/assets/index-CvbR9_pW.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"2a2-4VKutF/RaS3KXvi9j0O7p+vuk+8\"",
    "mtime": "2026-04-29T09:52:52.109Z",
    "size": 674,
    "path": "../../.output/public/_build/assets/index-CvbR9_pW.js.br"
  },
  "/_build/assets/index-CvbR9_pW.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"30d-NuCMugGBHeT6Dsyl8ESP+CKh/+Q\"",
    "mtime": "2026-04-29T09:52:52.109Z",
    "size": 781,
    "path": "../../.output/public/_build/assets/index-CvbR9_pW.js.gz"
  },
  "/_build/assets/index-CxAJ_eRV.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"6e3d-vFcQhZ8DmXjrmiLn2LmhrYhJEUA\"",
    "mtime": "2026-04-29T09:52:49.399Z",
    "size": 28221,
    "path": "../../.output/public/_build/assets/index-CxAJ_eRV.js"
  },
  "/_build/assets/index-CxAJ_eRV.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"266f-T+gSw8HdVF/uV7IBqzLK9/Gv+OA\"",
    "mtime": "2026-04-29T09:52:52.145Z",
    "size": 9839,
    "path": "../../.output/public/_build/assets/index-CxAJ_eRV.js.br"
  },
  "/_build/assets/index-CxAJ_eRV.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"2a44-+xZXdDj8UVFT0RFdQU+BrPPR/vc\"",
    "mtime": "2026-04-29T09:52:52.120Z",
    "size": 10820,
    "path": "../../.output/public/_build/assets/index-CxAJ_eRV.js.gz"
  },
  "/_build/assets/index-D514_ysT.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"680-uloM/Hpf8+AFWd/gfBUba8xgXuQ\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1664,
    "path": "../../.output/public/_build/assets/index-D514_ysT.js"
  },
  "/_build/assets/index-D514_ysT.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3a5-vlcbolJ05JO7toaW1uB6ox3NYng\"",
    "mtime": "2026-04-29T09:52:52.111Z",
    "size": 933,
    "path": "../../.output/public/_build/assets/index-D514_ysT.js.gz"
  },
  "/_build/assets/index-D514_ysT.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"32a-bemdJ8ZvOJlkGMYgcdrhIZVwW9M\"",
    "mtime": "2026-04-29T09:52:52.116Z",
    "size": 810,
    "path": "../../.output/public/_build/assets/index-D514_ysT.js.br"
  },
  "/_build/assets/index-DoKKIVDy.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"7aa-b8POHqXGnXH/XzI77CYii9d1QeM\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1962,
    "path": "../../.output/public/_build/assets/index-DoKKIVDy.js"
  },
  "/_build/assets/index-DoKKIVDy.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"30b-aYqJnNSyxJtIXbajGg9mJIZnlBs\"",
    "mtime": "2026-04-29T09:52:52.120Z",
    "size": 779,
    "path": "../../.output/public/_build/assets/index-DoKKIVDy.js.br"
  },
  "/_build/assets/index-DoKKIVDy.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"3a3-RKAUpZ6JobA5+n9DWzhJAmk6kcQ\"",
    "mtime": "2026-04-29T09:52:52.117Z",
    "size": 931,
    "path": "../../.output/public/_build/assets/index-DoKKIVDy.js.gz"
  },
  "/_build/assets/privacy-B9hLWDVh.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"40a-jK/CGAuCYaimTIUxRlFuGqox0SM\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 1034,
    "path": "../../.output/public/_build/assets/privacy-B9hLWDVh.js"
  },
  "/_build/assets/privacy-B9hLWDVh.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"1eb-BROrUWBJGd9GALled2Ypsbs1L6k\"",
    "mtime": "2026-04-29T09:52:52.132Z",
    "size": 491,
    "path": "../../.output/public/_build/assets/privacy-B9hLWDVh.js.br"
  },
  "/_build/assets/routing-XnwpqLN0.js": {
    "type": "text/javascript; charset=utf-8",
    "encoding": null,
    "etag": "\"1c3f-hNEFCgcjBCMmfOBwllf9EvMSYTQ\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 7231,
    "path": "../../.output/public/_build/assets/routing-XnwpqLN0.js"
  },
  "/_build/assets/privacy-B9hLWDVh.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"289-2H3n9u0Ew0kaIcMiSgXD7PVsuzE\"",
    "mtime": "2026-04-29T09:52:52.132Z",
    "size": 649,
    "path": "../../.output/public/_build/assets/privacy-B9hLWDVh.js.gz"
  },
  "/_build/assets/routing-XnwpqLN0.js.br": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "br",
    "etag": "\"c27-egK8iO4VZchW+FSPUnPJEmpsnvs\"",
    "mtime": "2026-04-29T09:52:52.132Z",
    "size": 3111,
    "path": "../../.output/public/_build/assets/routing-XnwpqLN0.js.br"
  },
  "/_build/assets/routing-XnwpqLN0.js.gz": {
    "type": "text/javascript; charset=utf-8",
    "encoding": "gzip",
    "etag": "\"d49-2A+yKoJtqf8dHPtPCt49Alil/nc\"",
    "mtime": "2026-04-29T09:52:52.120Z",
    "size": 3401,
    "path": "../../.output/public/_build/assets/routing-XnwpqLN0.js.gz"
  },
  "/_build/assets/terms-wbcD8h0o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3e5-oDbbb6y4omDw/pcI80geXcW1stc\"",
    "mtime": "2026-04-29T09:52:49.398Z",
    "size": 997,
    "path": "../../.output/public/_build/assets/terms-wbcD8h0o.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _To0tmL = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
function _e$1(e) {
  let r;
  const t = _$2(e), n = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(t, { ...n, body: e.node.req.body }) : new Request(t, { ...n, get body() {
    return r || (r = Xe(e), r);
  } });
}
function Ne(e) {
  var _a;
  return (_a = e.web) != null ? _a : e.web = { request: _e$1(e), url: _$2(e) }, e.web.request;
}
function Me$1() {
  return Qe();
}
const U = /* @__PURE__ */ Symbol("$HTTPEvent");
function je(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[U]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function u(e) {
  return function(...r) {
    var _a;
    let t = r[0];
    if (je(t)) r[0] = t instanceof H3Event || t.__is_event__ ? t : t[U];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (t = Me$1(), !t) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      r.unshift(t);
    }
    return e(...r);
  };
}
const _$2 = u(getRequestURL), De$1 = u(getRequestIP), b = u(setResponseStatus), T = u(getResponseStatus), We = u(getResponseStatusText), R = u(getResponseHeaders), E$2 = u(getResponseHeader), Be$1 = u(setResponseHeader), N = u(appendResponseHeader), Ze = u(parseCookies), ze = u(getCookie), Je = u(setCookie), m = u(setHeader), Xe = u(getRequestWebStream), Ge = u(removeResponseHeader), Ke = u(Ne);
function Ve() {
  var _a;
  return getContext("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function Qe() {
  return Ve().use().event;
}
const x$1 = "Invariant Violation", { setPrototypeOf: Ye = function(e, r) {
  return e.__proto__ = r, e;
} } = Object;
let k$2 = class k extends Error {
  constructor(r = x$1) {
    super(typeof r == "number" ? `${x$1}: ${r} (see https://github.com/apollographql/invariant-packages)` : r);
    __publicField$1(this, "framesToPop", 1);
    __publicField$1(this, "name", x$1);
    Ye(this, k.prototype);
  }
};
function et(e, r) {
  if (!e) throw new k$2(r);
}
const w$1 = "solidFetchEvent";
function tt(e) {
  return { request: Ke(e), response: ot$1(e), clientAddress: De$1(e), locals: {}, nativeEvent: e };
}
function rt(e) {
  return { ...e };
}
function st$1(e) {
  if (!e.context[w$1]) {
    const r = tt(e);
    e.context[w$1] = r;
  }
  return e.context[w$1];
}
function q$1(e, r) {
  for (const [t, n] of r.entries()) N(e, t, n);
}
let nt$1 = class nt {
  constructor(r) {
    __publicField$1(this, "event");
    this.event = r;
  }
  get(r) {
    const t = E$2(this.event, r);
    return Array.isArray(t) ? t.join(", ") : t || null;
  }
  has(r) {
    return this.get(r) !== null;
  }
  set(r, t) {
    return Be$1(this.event, r, t);
  }
  delete(r) {
    return Ge(this.event, r);
  }
  append(r, t) {
    N(this.event, r, t);
  }
  getSetCookie() {
    const r = E$2(this.event, "Set-Cookie");
    return Array.isArray(r) ? r : [r];
  }
  forEach(r) {
    return Object.entries(R(this.event)).forEach(([t, n]) => r(Array.isArray(n) ? n.join(", ") : n, t, this));
  }
  entries() {
    return Object.entries(R(this.event)).map(([r, t]) => [r, Array.isArray(t) ? t.join(", ") : t])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(R(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(R(this.event)).map((r) => Array.isArray(r) ? r.join(", ") : r)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
};
function ot$1(e) {
  return { get status() {
    return T(e);
  }, set status(r) {
    b(e, r);
  }, get statusText() {
    return We(e);
  }, set statusText(r) {
    b(e, T(e), r);
  }, headers: new nt$1(e) };
}
const M$1 = [{ page: true, $component: { src: "src/routes/attributions.tsx?pick=default&pick=$css", build: () => import('../build/attributions.mjs'), import: () => import('../build/attributions.mjs') }, path: "/attributions", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/attributions.tsx" }, { page: true, $component: { src: "src/routes/contact.tsx?pick=default&pick=$css", build: () => import('../build/contact.mjs'), import: () => import('../build/contact.mjs') }, path: "/contact", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/contact.tsx" }, { page: true, $component: { src: "src/routes/docs/index.tsx?pick=default&pick=$css", build: () => import('../build/index.mjs'), import: () => import('../build/index.mjs') }, path: "/docs/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/docs/index.tsx" }, { page: true, $component: { src: "src/routes/docs/[slug]/index.tsx?pick=default&pick=$css", build: () => import('../build/index2.mjs'), import: () => import('../build/index2.mjs') }, path: "/docs/:slug/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/docs/[slug]/index.tsx" }, { page: true, $component: { src: "src/routes/examples/index.tsx?pick=default&pick=$css", build: () => import('../build/index3.mjs'), import: () => import('../build/index3.mjs') }, path: "/examples/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/index.tsx" }, { page: true, $component: { src: "src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css", build: () => import('../build/index4.mjs'), import: () => import('../build/index4.mjs') }, path: "/examples/:slug/ast/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/[slug]/ast/index.tsx" }, { page: true, $component: { src: "src/routes/examples/[slug]/index.tsx?pick=default&pick=$css", build: () => import('../build/index5.mjs'), import: () => import('../build/index5.mjs') }, path: "/examples/:slug/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/[slug]/index.tsx" }, { page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index6.mjs'), import: () => import('../build/index6.mjs') }, path: "/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/privacy.tsx?pick=default&pick=$css", build: () => import('../build/privacy.mjs'), import: () => import('../build/privacy.mjs') }, path: "/privacy", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/privacy.tsx" }, { page: true, $component: { src: "src/routes/terms.tsx?pick=default&pick=$css", build: () => import('../build/terms.mjs'), import: () => import('../build/terms.mjs') }, path: "/terms", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/terms.tsx" }], at$1 = it$1(M$1.filter((e) => e.page));
function it$1(e) {
  function r(t, n, o, a) {
    const i = Object.values(t).find((c) => o.startsWith(c.id + "/"));
    return i ? (r(i.children || (i.children = []), n, o.slice(i.id.length)), t) : (t.push({ ...n, id: o, path: o.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), t);
  }
  return e.sort((t, n) => t.path.length - n.path.length).reduce((t, n) => r(t, n, n.path, n.path), []);
}
function ct$1(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
createRouter({ routes: M$1.reduce((e, r) => {
  if (!ct$1(r)) return e;
  let t = r.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (n, o) => `**:${o}`).split("/").map((n) => n.startsWith(":") || n.startsWith("*") ? n : encodeURIComponent(n)).join("/");
  if (/:[^/]*\?/g.test(t)) throw new Error(`Optional parameters are not supported in API routes: ${t}`);
  if (e[t]) throw new Error(`Duplicate API routes for "${t}" found at "${e[t].route.path}" and "${r.path}"`);
  return e[t] = { route: r }, e;
}, {}) });
var lt$1 = " ";
const pt$1 = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(lt$1), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function dt$1(e, r) {
  let { tag: t, attrs: { key: n, ...o } = { key: void 0 }, children: a } = e;
  return pt$1[t]({ attrs: { ...o, nonce: r }, key: n, children: a });
}
function ft$1(e, r, t, n = "default") {
  return lazy(async () => {
    var _a;
    {
      const a = (await e.import())[n], c = (await ((_a = r.inputs) == null ? void 0 : _a[e.src].assets())).filter((l) => l.tag === "style" || l.attrs.rel === "stylesheet");
      return { default: (l) => [...c.map((h) => dt$1(h)), createComponent(a, l)] };
    }
  });
}
function j() {
  function e(t) {
    return { ...t, ...t.$$route ? t.$$route.require().route : void 0, info: { ...t.$$route ? t.$$route.require().route.info : {}, filesystem: true }, component: t.$component && ft$1(t.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: t.children ? t.children.map(e) : void 0 };
  }
  return at$1.map(e);
}
let H;
const Ft$1 = isServer ? () => getRequestEvent().routes : () => H || (H = j());
function mt$1(e) {
  const r = ze(e.nativeEvent, "flash");
  if (r) try {
    let t = JSON.parse(r);
    if (!t || !t.result) return;
    const n = [...t.input.slice(0, -1), new Map(t.input[t.input.length - 1])], o = t.error ? new Error(t.result) : t.result;
    return { input: n, url: t.url, pending: false, result: t.thrown ? void 0 : o, error: t.thrown ? o : void 0 };
  } catch (t) {
    console.error(t);
  } finally {
    Je(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function ht$1(e) {
  const r = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await r.json(), assets: [...await r.inputs[r.handler].assets()], router: { submission: mt$1(e) }, routes: j(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const gt$1 = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function yt$1(e) {
  return e.status && gt$1.has(e.status) ? e.status : 302;
}
const Rt$1 = {}, P = [AbortSignalPlugin, CustomEventPlugin, DOMExceptionPlugin, EventPlugin, FormDataPlugin, HeadersPlugin, ReadableStreamPlugin, RequestPlugin, ResponsePlugin, URLSearchParamsPlugin, URLPlugin], bt$1 = 64, D$1 = Feature.RegExp;
function W(e) {
  const r = new TextEncoder().encode(e), t = r.length, n = t.toString(16), o = "00000000".substring(0, 8 - n.length) + n, a = new TextEncoder().encode(`;0x${o};`), i = new Uint8Array(12 + t);
  return i.set(a), i.set(r, 12), i;
}
function A$2(e, r) {
  return new ReadableStream({ start(t) {
    crossSerializeStream(r, { scopeId: e, plugins: P, onSerialize(n, o) {
      t.enqueue(W(o ? `(${getCrossReferenceHeader(e)},${n})` : n));
    }, onDone() {
      t.close();
    }, onError(n) {
      t.error(n);
    } });
  } });
}
function St$1(e) {
  return new ReadableStream({ start(r) {
    toCrossJSONStream(e, { disabledFeatures: D$1, depthLimit: bt$1, plugins: P, onParse(t) {
      r.enqueue(W(JSON.stringify(t)));
    }, onDone() {
      r.close();
    }, onError(t) {
      r.error(t);
    } });
  } });
}
async function C(e) {
  return fromJSON(JSON.parse(e), { plugins: P, disabledFeatures: D$1 });
}
async function xt$1(e) {
  const r = st$1(e), t = r.request, n = t.headers.get("X-Server-Id"), o = t.headers.get("X-Server-Instance"), a = t.headers.has("X-Single-Flight"), i = new URL(t.url);
  let c, d;
  if (n) et(typeof n == "string", "Invalid server function"), [c, d] = decodeURIComponent(n).split("#");
  else if (c = i.searchParams.get("id"), d = i.searchParams.get("name"), !c || !d) return new Response(null, { status: 404 });
  const l = Rt$1[c];
  let h;
  if (!l) return new Response(null, { status: 404 });
  h = await l.importer();
  const B = h[l.functionName];
  let f = [];
  if (!o || e.method === "GET") {
    const s = i.searchParams.get("args");
    if (s) {
      const p = await C(s);
      for (const g of p) f.push(g);
    }
  }
  if (e.method === "POST") {
    const s = t.headers.get("content-type"), p = e.node.req, g = p instanceof ReadableStream, Z = p.body instanceof ReadableStream, z = g && p.locked || Z && p.body.locked, J = g ? p : p.body, S = z ? t : new Request(t, { ...t, body: J });
    t.headers.get("x-serialized") ? f = await C(await S.text()) : (s == null ? void 0 : s.startsWith("multipart/form-data")) || (s == null ? void 0 : s.startsWith("application/x-www-form-urlencoded")) ? f.push(await S.formData()) : (s == null ? void 0 : s.startsWith("application/json")) && (f = await S.json());
  }
  try {
    let s = await provideRequestEvent(r, async () => (sharedConfig.context = { event: r }, r.locals.serverFunctionMeta = { id: c + "#" + d }, B(...f)));
    if (a && o && (s = await L$1(r, s)), s instanceof Response) {
      if (s.headers && s.headers.has("X-Content-Raw")) return s;
      o && (s.headers && q$1(e, s.headers), s.status && (s.status < 300 || s.status >= 400) && b(e, s.status), s.customBody ? s = await s.customBody() : s.body == null && (s = null));
    }
    if (!o) return F$1(s, t, f);
    return m(e, "x-serialized", "true"), m(e, "content-type", "text/javascript"), A$2(o, s);
    return St$1(s);
  } catch (s) {
    if (s instanceof Response) a && o && (s = await L$1(r, s)), s.headers && q$1(e, s.headers), s.status && (!o || s.status < 300 || s.status >= 400) && b(e, s.status), s.customBody ? s = s.customBody() : s.body == null && (s = null), m(e, "X-Error", "true");
    else if (o) {
      const p = s instanceof Error ? s.message : typeof s == "string" ? s : "true";
      m(e, "X-Error", p.replace(/[\r\n]+/g, ""));
    } else s = F$1(s, t, f, true);
    return o ? (m(e, "x-serialized", "true"), m(e, "content-type", "text/javascript"), A$2(o, s)) : s;
  }
}
function F$1(e, r, t, n) {
  const o = new URL(r.url), a = e instanceof Error;
  let i = 302, c;
  return e instanceof Response ? (c = new Headers(e.headers), e.headers.has("Location") && (c.set("Location", new URL(e.headers.get("Location"), o.origin + "").toString()), i = yt$1(e))) : c = new Headers({ Location: new URL(r.headers.get("referer")).toString() }), e && c.append("Set-Cookie", `flash=${encodeURIComponent(JSON.stringify({ url: o.pathname + o.search, result: a ? e.message : e, thrown: n, error: a, input: [...t.slice(0, -1), [...t[t.length - 1].entries()]] }))}; Secure; HttpOnly;`), new Response(null, { status: i, headers: c });
}
let $;
function wt$1(e) {
  var _a;
  const r = new Headers(e.request.headers), t = Ze(e.nativeEvent), n = e.response.headers.getSetCookie();
  r.delete("cookie");
  let o = false;
  return ((_a = e.nativeEvent.node) == null ? void 0 : _a.req) && (o = true, e.nativeEvent.node.req.headers.cookie = ""), n.forEach((a) => {
    if (!a) return;
    const { maxAge: i, expires: c, name: d, value: l } = parseSetCookie(a);
    if (i != null && i <= 0) {
      delete t[d];
      return;
    }
    if (c != null && c.getTime() <= Date.now()) {
      delete t[d];
      return;
    }
    t[d] = l;
  }), Object.entries(t).forEach(([a, i]) => {
    r.append("cookie", `${a}=${i}`), o && (e.nativeEvent.node.req.headers.cookie += `${a}=${i};`);
  }), r;
}
async function L$1(e, r) {
  let t, n = new URL(e.request.headers.get("referer")).toString();
  r instanceof Response && (r.headers.has("X-Revalidate") && (t = r.headers.get("X-Revalidate").split(",")), r.headers.has("Location") && (n = new URL(r.headers.get("Location"), new URL(e.request.url).origin + "").toString()));
  const o = rt(e);
  return o.request = new Request(n, { headers: wt$1(e) }), await provideRequestEvent(o, async () => {
    await ht$1(o), $ || ($ = (await import('../build/app-G0nMzLL-.mjs')).default), o.router.dataOnly = t || true, o.router.previousUrl = e.request.headers.get("referer");
    try {
      renderToString(() => {
        sharedConfig.context.event = o, $();
      });
    } catch (c) {
      console.log(c);
    }
    const a = o.router.data;
    if (!a) return r;
    let i = false;
    for (const c in a) a[c] === void 0 ? delete a[c] : i = true;
    return i && (r instanceof Response ? r.customBody && (a._$value = r.customBody()) : (a._$value = r, r = new Response(null, { status: 200 })), r.customBody = () => a, r.headers.set("X-Single-Flight", "true")), r;
  });
}
const Lt$1 = eventHandler(xt$1);

const y = createContext(), v = ["title", "meta"], p = [], f = ["name", "http-equiv", "content", "charset", "media"].concat(["property"]), l = (n, t) => {
  const e = Object.fromEntries(Object.entries(n.props).filter(([r]) => t.includes(r)).sort());
  return (Object.hasOwn(e, "name") || Object.hasOwn(e, "property")) && (e.name = e.name || e.property, delete e.property), n.tag + JSON.stringify(e);
};
function E$1() {
  if (!sharedConfig.context) {
    const e = document.head.querySelectorAll("[data-sm]");
    Array.prototype.forEach.call(e, (r) => r.parentNode.removeChild(r));
  }
  const n = /* @__PURE__ */ new Map();
  function t(e) {
    if (e.ref) return e.ref;
    let r = document.querySelector(`[data-sm="${e.id}"]`);
    return r ? (r.tagName.toLowerCase() !== e.tag && (r.parentNode && r.parentNode.removeChild(r), r = document.createElement(e.tag)), r.removeAttribute("data-sm")) : r = document.createElement(e.tag), r;
  }
  return { addTag(e) {
    if (v.indexOf(e.tag) !== -1) {
      const i = e.tag === "title" ? p : f, a = l(e, i);
      n.has(a) || n.set(a, []);
      let s = n.get(a), u = s.length;
      s = [...s, e], n.set(a, s);
      let c = t(e);
      e.ref = c, spread(c, e.props);
      let d = null;
      for (var r = u - 1; r >= 0; r--) if (s[r] != null) {
        d = s[r];
        break;
      }
      return c.parentNode != document.head && document.head.appendChild(c), d && d.ref && d.ref.parentNode && document.head.removeChild(d.ref), u;
    }
    let o = t(e);
    return e.ref = o, spread(o, e.props), o.parentNode != document.head && document.head.appendChild(o), -1;
  }, removeTag(e, r) {
    const o = e.tag === "title" ? p : f, i = l(e, o);
    if (e.ref) {
      const a = n.get(i);
      if (a) {
        if (e.ref.parentNode) {
          e.ref.parentNode.removeChild(e.ref);
          for (let s = r - 1; s >= 0; s--) a[s] != null && document.head.appendChild(a[s].ref);
        }
        a[r] = null, n.set(i, a);
      } else e.ref.parentNode && e.ref.parentNode.removeChild(e.ref);
    }
  } };
}
function w() {
  const n = [];
  return useAssets(() => ssr(S(n))), { addTag(t) {
    if (v.indexOf(t.tag) !== -1) {
      const e = t.tag === "title" ? p : f, r = l(t, e), o = n.findIndex((i) => i.tag === t.tag && l(i, e) === r);
      o !== -1 && n.splice(o, 1);
    }
    return n.push(t), n.length;
  }, removeTag(t, e) {
  } };
}
const I$2 = (n) => {
  const t = isServer ? w() : E$1();
  return createComponent$1(y.Provider, { value: t, get children() {
    return n.children;
  } });
}, A$1 = (n, t, e) => (M({ tag: n, props: t, setting: e, id: createUniqueId(), get name() {
  return t.name || t.property;
} }), null);
function M(n) {
  const t = useContext(y);
  if (!t) throw new Error("<MetaProvider /> should be in the tree");
  createRenderEffect(() => {
    const e = t.addTag(n);
    onCleanup(() => t.removeTag(n, e));
  });
}
function S(n) {
  return n.map((t) => {
    var _a, _b;
    const r = Object.keys(t.props).map((i) => i === "children" ? "" : ` ${i}="${escape(t.props[i], true)}"`).join("");
    let o = t.props.children;
    return Array.isArray(o) && (o = o.join("")), ((_a = t.setting) == null ? void 0 : _a.close) ? `<${t.tag} data-sm="${t.id}"${r}>${((_b = t.setting) == null ? void 0 : _b.escape) ? escape(o) : o || ""}</${t.tag}>` : `<${t.tag} data-sm="${t.id}"${r}/>`;
  }).join("");
}
const k$1 = (n) => A$1("title", n, { escape: true, close: true });

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
let I$1;
function G$1() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), I$1 = window.history.state._depth;
}
isServer || G$1();
function Be(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function _e(e, t) {
  let n = false;
  return () => {
    const s = I$1;
    G$1();
    const r = s == null ? null : I$1 - s;
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
function B$1(e, t, n) {
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
function J$1(e) {
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
function V$1(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index), s = e.slice(t.index + t[0].length);
  const r = [n, n += t[1]];
  for (; t = /^(\/\:[^\/]+)\?/.exec(s); ) r.push(n += t[1]), s = s.slice(t[0].length);
  return V$1(s).reduce((o, i) => [...o, ...r.map((c) => c + i)], []);
}
const xe = 100, be = createContext(), Y$1 = createContext(), _$1 = () => ve(useContext(be), "<A> and 'use' router primitives can be only used inside a Route."), Ee = () => useContext(Y$1) || _$1().base, Fe = (e) => {
  const t = Ee();
  return createMemo(() => t.resolvePath(e()));
}, $e = (e) => {
  const t = _$1();
  return createMemo(() => {
    const n = e();
    return n !== void 0 ? t.renderPath(n) : n;
  });
}, ke = () => _$1().location, De = () => _$1().params;
function Ce(e, t = "") {
  const { component: n, load: s, children: r, info: o } = e, i = !r || Array.isArray(r) && !r.length, c = { key: e, component: n, load: s, info: o };
  return Z$1(e.path).reduce((l, f) => {
    for (const h of V$1(f)) {
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
function Z$1(e) {
  return Array.isArray(e) ? e : [e];
}
function Ae(e, t = "", n = [], s = []) {
  const r = Z$1(e);
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
  }, query: Q(on(o, () => J$1(s()))) };
}
let x;
function Ie() {
  return x;
}
function Me(e, t, n, s = {}) {
  const { signal: [r, o], utils: i = {} } = e, c = i.parsePath || ((a) => a), l = i.renderPath || ((a) => a), f = i.beforeLeave || pe(), h = B$1("", s.base || "");
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
    return B$1(h, a);
  } };
  return createRenderEffect(on(r, (a) => w("native", a), { defer: true })), { base: W, location: F, params: te, isRouting: m, renderPath: l, parsePath: c, navigatorFactory: re, matches: U, beforeLeave: f, preloadRoute: oe, singleFlight: s.singleFlight === void 0 ? true : s.singleFlight, submissions: q };
  function ne(a, u, g) {
    untrack(() => {
      if (typeof u == "number") {
        u && (i.go ? i.go(u) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const { replace: L, resolve: $, scroll: P, state: b } = { replace: false, resolve: true, scroll: true, ...g }, y = $ ? a.resolvePath(u) : B$1("", u);
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
    return a = a || useContext(Y$1) || W, (u, g) => ne(a, u, g);
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
      u.preloadData && y && runWithOwner(n(), () => y({ params: b, location: { pathname: a.pathname, search: a.search, hash: a.hash, query: J$1(a), state: null, key: "" }, intent: "preload" }));
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
    return B$1(r.path(), d, h());
  } };
}

function A(t) {
  t = mergeProps$1({ inactiveClass: "inactive", activeClass: "active" }, t);
  const [, r] = splitProps(t, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), i = Fe(() => t.href), o = $e(i), l = ke(), a = createMemo(() => {
    const n = i();
    if (n === void 0) return [false, false];
    const e = E(n.split(/[?#]/, 1)[0]).toLowerCase(), s = E(l.pathname).toLowerCase();
    return [t.end ? e === s : s.startsWith(e + "/") || s === e, e === s];
  });
  return ssrElement("a", mergeProps(r, { get href() {
    return o() || t.href;
  }, get state() {
    return JSON.stringify(t.state);
  }, get classList() {
    return { ...t.class && { [t.class]: true }, [t.inactiveClass]: !a()[0], [t.activeClass]: a()[0], ...r.classList };
  }, link: true, get "aria-current"() {
    return a()[1] ? "page" : void 0;
  } }), void 0, true);
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, key + "" , value);
function nt(e) {
  let t;
  const r = te(e), s = { duplex: "half", method: e.method, headers: e.headers };
  return e.node.req.body instanceof ArrayBuffer ? new Request(r, { ...s, body: e.node.req.body }) : new Request(r, { ...s, get body() {
    return t || (t = ht(e), t);
  } });
}
function st(e) {
  var _a;
  return (_a = e.web) != null ? _a : e.web = { request: nt(e), url: te(e) }, e.web.request;
}
function ot() {
  return yt();
}
const ee = /* @__PURE__ */ Symbol("$HTTPEvent");
function at(e) {
  return typeof e == "object" && (e instanceof H3Event || (e == null ? void 0 : e[ee]) instanceof H3Event || (e == null ? void 0 : e.__is_event__) === true);
}
function g(e) {
  return function(...t) {
    var _a;
    let r = t[0];
    if (at(r)) t[0] = r instanceof H3Event || r.__is_event__ ? r : r[ee];
    else {
      if (!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext)) throw new Error("AsyncLocalStorage was not enabled. Use the `server.experimental.asyncContext: true` option in your app configuration to enable it. Or, pass the instance of HTTPEvent that you have as the first argument to the function.");
      if (r = ot(), !r) throw new Error("No HTTPEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.");
      t.unshift(r);
    }
    return e(...t);
  };
}
const te = g(getRequestURL), it = g(getRequestIP), I = g(setResponseStatus), B = g(getResponseStatus), ct = g(getResponseStatusText), L = g(getResponseHeaders), Z = g(getResponseHeader), ut = g(setResponseHeader), lt = g(appendResponseHeader), z = g(sendRedirect), dt = g(getCookie), pt = g(setCookie), mt = g(setHeader), ht = g(getRequestWebStream), ft = g(removeResponseHeader), gt = g(st);
function bt() {
  var _a;
  return getContext("nitro-app", { asyncContext: !!((_a = globalThis.app.config.server.experimental) == null ? void 0 : _a.asyncContext), AsyncLocalStorage: AsyncLocalStorage });
}
function yt() {
  return bt().use().event;
}
const re = [{ page: true, $component: { src: "src/routes/attributions.tsx?pick=default&pick=$css", build: () => import('../build/attributions2.mjs'), import: () => import('../build/attributions2.mjs') }, path: "/attributions", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/attributions.tsx" }, { page: true, $component: { src: "src/routes/contact.tsx?pick=default&pick=$css", build: () => import('../build/contact2.mjs'), import: () => import('../build/contact2.mjs') }, path: "/contact", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/contact.tsx" }, { page: true, $component: { src: "src/routes/docs/index.tsx?pick=default&pick=$css", build: () => import('../build/index7.mjs'), import: () => import('../build/index7.mjs') }, path: "/docs/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/docs/index.tsx" }, { page: true, $component: { src: "src/routes/docs/[slug]/index.tsx?pick=default&pick=$css", build: () => import('../build/index22.mjs'), import: () => import('../build/index22.mjs') }, path: "/docs/:slug/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/docs/[slug]/index.tsx" }, { page: true, $component: { src: "src/routes/examples/index.tsx?pick=default&pick=$css", build: () => import('../build/index32.mjs'), import: () => import('../build/index32.mjs') }, path: "/examples/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/index.tsx" }, { page: true, $component: { src: "src/routes/examples/[slug]/ast/index.tsx?pick=default&pick=$css", build: () => import('../build/index42.mjs'), import: () => import('../build/index42.mjs') }, path: "/examples/:slug/ast/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/[slug]/ast/index.tsx" }, { page: true, $component: { src: "src/routes/examples/[slug]/index.tsx?pick=default&pick=$css", build: () => import('../build/index52.mjs'), import: () => import('../build/index52.mjs') }, path: "/examples/:slug/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/examples/[slug]/index.tsx" }, { page: true, $component: { src: "src/routes/index.tsx?pick=default&pick=$css", build: () => import('../build/index62.mjs'), import: () => import('../build/index62.mjs') }, path: "/", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/index.tsx" }, { page: true, $component: { src: "src/routes/privacy.tsx?pick=default&pick=$css", build: () => import('../build/privacy2.mjs'), import: () => import('../build/privacy2.mjs') }, path: "/privacy", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/privacy.tsx" }, { page: true, $component: { src: "src/routes/terms.tsx?pick=default&pick=$css", build: () => import('../build/terms2.mjs'), import: () => import('../build/terms2.mjs') }, path: "/terms", filePath: "Z:/code/github.com/dev-centr/centrmark/website/src/routes/terms.tsx" }], vt = wt(re.filter((e) => e.page));
function wt(e) {
  function t(r, s, n, o) {
    const a = Object.values(r).find((i) => n.startsWith(i.id + "/"));
    return a ? (t(a.children || (a.children = []), s, n.slice(a.id.length)), r) : (r.push({ ...s, id: n, path: n.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/") }), r);
  }
  return e.sort((r, s) => r.path.length - s.path.length).reduce((r, s) => t(r, s, s.path, s.path), []);
}
function xt(e, t) {
  const r = Rt.lookup(e);
  if (r && r.route) {
    const s = r.route, n = t === "HEAD" ? s.$HEAD || s.$GET : s[`$${t}`];
    if (n === void 0) return;
    const o = s.page === true && s.$component !== void 0;
    return { handler: n, params: r.params, isPage: o };
  }
}
function $t(e) {
  return e.$HEAD || e.$GET || e.$POST || e.$PUT || e.$PATCH || e.$DELETE;
}
const Rt = createRouter({ routes: re.reduce((e, t) => {
  if (!$t(t)) return e;
  let r = t.path.replace(/\([^)/]+\)/g, "").replace(/\/+/g, "/").replace(/\*([^/]*)/g, (s, n) => `**:${n}`).split("/").map((s) => s.startsWith(":") || s.startsWith("*") ? s : encodeURIComponent(s)).join("/");
  if (/:[^/]*\?/g.test(r)) throw new Error(`Optional parameters are not supported in API routes: ${r}`);
  if (e[r]) throw new Error(`Duplicate API routes for "${r}" found at "${e[r].route.path}" and "${t.path}"`);
  return e[r] = { route: t }, e;
}, {}) }), q = "solidFetchEvent";
function kt(e) {
  return { request: gt(e), response: At(e), clientAddress: it(e), locals: {}, nativeEvent: e };
}
function St(e) {
  if (!e.context[q]) {
    const t = kt(e);
    e.context[q] = t;
  }
  return e.context[q];
}
class Et {
  constructor(t) {
    __publicField(this, "event");
    this.event = t;
  }
  get(t) {
    const r = Z(this.event, t);
    return Array.isArray(r) ? r.join(", ") : r || null;
  }
  has(t) {
    return this.get(t) !== null;
  }
  set(t, r) {
    return ut(this.event, t, r);
  }
  delete(t) {
    return ft(this.event, t);
  }
  append(t, r) {
    lt(this.event, t, r);
  }
  getSetCookie() {
    const t = Z(this.event, "Set-Cookie");
    return Array.isArray(t) ? t : [t];
  }
  forEach(t) {
    return Object.entries(L(this.event)).forEach(([r, s]) => t(Array.isArray(s) ? s.join(", ") : s, r, this));
  }
  entries() {
    return Object.entries(L(this.event)).map(([t, r]) => [t, Array.isArray(r) ? r.join(", ") : r])[Symbol.iterator]();
  }
  keys() {
    return Object.keys(L(this.event))[Symbol.iterator]();
  }
  values() {
    return Object.values(L(this.event)).map((t) => Array.isArray(t) ? t.join(", ") : t)[Symbol.iterator]();
  }
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}
function At(e) {
  return { get status() {
    return B(e);
  }, set status(t) {
    I(e, t);
  }, get statusText() {
    return ct(e);
  }, set statusText(t) {
    I(e, B(e), t);
  }, headers: new Et(e) };
}
var Ct = " ";
const Pt = { style: (e) => ssrElement("style", e.attrs, () => e.children, true), link: (e) => ssrElement("link", e.attrs, void 0, true), script: (e) => e.attrs.src ? ssrElement("script", mergeProps(() => e.attrs, { get id() {
  return e.key;
} }), () => ssr(Ct), true) : null, noscript: (e) => ssrElement("noscript", e.attrs, () => escape(e.children), true) };
function _(e, t) {
  let { tag: r, attrs: { key: s, ...n } = { key: void 0 }, children: o } = e;
  return Pt[r]({ attrs: { ...n, nonce: t }, key: s, children: o });
}
function Lt(e, t, r, s = "default") {
  return lazy(async () => {
    var _a;
    {
      const o = (await e.import())[s], i = (await ((_a = t.inputs) == null ? void 0 : _a[e.src].assets())).filter((u) => u.tag === "style" || u.attrs.rel === "stylesheet");
      return { default: (u) => [...i.map((v) => _(v)), createComponent(o, u)] };
    }
  });
}
function ne() {
  function e(r) {
    return { ...r, ...r.$$route ? r.$$route.require().route : void 0, info: { ...r.$$route ? r.$$route.require().route.info : {}, filesystem: true }, component: r.$component && Lt(r.$component, globalThis.MANIFEST.client, globalThis.MANIFEST.ssr), children: r.children ? r.children.map(e) : void 0 };
  }
  return vt.map(e);
}
let K;
const Ht = isServer ? () => getRequestEvent().routes : () => K || (K = ne());
function qt(e) {
  const t = dt(e.nativeEvent, "flash");
  if (t) try {
    let r = JSON.parse(t);
    if (!r || !r.result) return;
    const s = [...r.input.slice(0, -1), new Map(r.input[r.input.length - 1])], n = r.error ? new Error(r.result) : r.result;
    return { input: s, url: r.url, pending: false, result: r.thrown ? void 0 : n, error: r.thrown ? n : void 0 };
  } catch (r) {
    console.error(r);
  } finally {
    pt(e.nativeEvent, "flash", "", { maxAge: 0 });
  }
}
async function Ot(e) {
  const t = globalThis.MANIFEST.client;
  return globalThis.MANIFEST.ssr, e.response.headers.set("Content-Type", "text/html"), Object.assign(e, { manifest: await t.json(), assets: [...await t.inputs[t.handler].assets()], router: { submission: qt(e) }, routes: ne(), complete: false, $islands: /* @__PURE__ */ new Set() });
}
const It = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
function F(e) {
  return e.status && It.has(e.status) ? e.status : 302;
}
function _t(e, t, r = {}, s) {
  return eventHandler({ handler: (n) => {
    const o = St(n);
    return provideRequestEvent(o, async () => {
      const a = xt(new URL(o.request.url).pathname, o.request.method);
      if (a) {
        const f = await a.handler.import(), w = o.request.method === "HEAD" ? f.HEAD || f.GET : f[o.request.method];
        o.params = a.params || {}, sharedConfig.context = { event: o };
        const c = await w(o);
        if (c !== void 0) return c;
        if (o.request.method !== "GET") throw new Error(`API handler for ${o.request.method} "${o.request.url}" did not return a response.`);
        if (!a.isPage) return;
      }
      const i = await t(o), p = typeof r == "function" ? await r(i) : { ...r }, u = p.mode || "stream";
      if (p.nonce && (i.nonce = p.nonce), u === "sync") {
        const f = renderToString(() => (sharedConfig.context.event = i, e(i)), p);
        if (i.complete = true, i.response && i.response.headers.get("Location")) {
          const w = F(i.response);
          return z(n, i.response.headers.get("Location"), w);
        }
        return f;
      }
      if (p.onCompleteAll) {
        const f = p.onCompleteAll;
        p.onCompleteAll = (w) => {
          J(i)(w), f(w);
        };
      } else p.onCompleteAll = J(i);
      if (p.onCompleteShell) {
        const f = p.onCompleteShell;
        p.onCompleteShell = (w) => {
          G(i, n)(), f(w);
        };
      } else p.onCompleteShell = G(i, n);
      const v = renderToStream(() => (sharedConfig.context.event = i, e(i)), p);
      if (i.response && i.response.headers.get("Location")) {
        const f = F(i.response);
        return z(n, i.response.headers.get("Location"), f);
      }
      if (u === "async") return v;
      const { writable: $, readable: R } = new TransformStream();
      return v.pipeTo($), R;
    });
  } });
}
function G(e, t) {
  return () => {
    if (e.response && e.response.headers.get("Location")) {
      const r = F(e.response);
      I(t, r), mt(t, "Location", e.response.headers.get("Location"));
    }
  };
}
function J(e) {
  return ({ write: t }) => {
    e.complete = true;
    const r = e.response && e.response.headers.get("Location");
    r && t(`<script>window.location="${r}"<\/script>`);
  };
}
function Ft(e, t, r) {
  return _t(e, Ot, t);
}
const se = (e) => (t) => {
  const { base: r } = t, s = children(() => t.children), n = createMemo(() => Ae(s(), t.base || ""));
  let o;
  const a = Me(e, n, () => o, { base: r, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(a), createComponent$1(be.Provider, { value: a, get children() {
    return createComponent$1(Mt, { routerState: a, get root() {
      return t.root;
    }, get load() {
      return t.rootLoad;
    }, get children() {
      return [(o = getOwner()) && null, createComponent$1(Ut, { routerState: a, get branches() {
        return n();
      } })];
    } });
  } });
};
function Mt(e) {
  const t = e.routerState.location, r = e.routerState.params, s = createMemo(() => e.load && untrack(() => {
    e.load({ params: r, location: t, intent: Ie() || "initial" });
  }));
  return createComponent$1(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (n) => createComponent$1(n, { params: r, location: t, get data() {
    return s();
  }, get children() {
    return e.children;
  } }) });
}
function Ut(e) {
  if (isServer) {
    const n = getRequestEvent();
    if (n && n.router && n.router.dataOnly) {
      Nt(n, e.routerState, e.branches);
      return;
    }
    n && ((n.router || (n.router = {})).matches || (n.router.matches = e.routerState.matches().map(({ route: o, path: a, params: i }) => ({ path: o.originalPath, pattern: o.pattern, match: a, params: i, info: o.info }))));
  }
  const t = [];
  let r;
  const s = createMemo(on(e.routerState.matches, (n, o, a) => {
    let i = o && n.length === o.length;
    const p = [];
    for (let u = 0, v = n.length; u < v; u++) {
      const $ = o && o[u], R = n[u];
      a && $ && R.route.key === $.route.key ? p[u] = a[u] : (i = false, t[u] && t[u](), createRoot((f) => {
        t[u] = f, p[u] = qe(e.routerState, p[u - 1] || e.routerState.base, V(() => s()[u + 1]), () => e.routerState.matches()[u]);
      }));
    }
    return t.splice(n.length).forEach((u) => u()), a && i ? a : (r = p[0], p);
  }));
  return V(() => s() && r)();
}
const V = (e) => () => createComponent$1(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent$1(Y$1.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function Nt(e, t, r) {
  const s = new URL(e.request.url), n = D(r, new URL(e.router.previousUrl || e.request.url).pathname), o = D(r, s.pathname);
  for (let a = 0; a < o.length; a++) {
    (!n[a] || o[a].route !== n[a].route) && (e.router.dataOnly = true);
    const { route: i, params: p } = o[a];
    i.load && i.load({ params: p, location: t.location, intent: "preload" });
  }
}
function jt([e, t], r, s) {
  return [e, s ? (n) => t(s(n)) : t];
}
function Dt(e) {
  if (e === "#") return null;
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function Wt(e) {
  let t = false;
  const r = (n) => typeof n == "string" ? { value: n } : n, s = jt(createSignal(r(e.get()), { equals: (n, o) => n.value === o.value && n.state === o.state }), void 0, (n) => (!t && e.set(n), n));
  return e.init && onCleanup(e.init((n = e.get()) => {
    t = true, s[1](r(n)), t = false;
  })), se({ signal: s, create: e.create, utils: e.utils });
}
function Bt(e, t, r) {
  return e.addEventListener(t, r), () => e.removeEventListener(t, r);
}
function Zt(e, t) {
  const r = Dt(`#${e}`);
  r ? r.scrollIntoView() : t && window.scrollTo(0, 0);
}
function zt(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function Kt(e) {
  let t;
  const r = e.url || (t = getRequestEvent()) && zt(t.request.url) || "", s = { value: e.transformUrl ? e.transformUrl(r) : r };
  return se({ signal: [() => s, (n) => Object.assign(s, n)] })(e);
}
const Gt = /* @__PURE__ */ new Map();
function Jt(e = true, t = false, r = "/_server", s) {
  return (n) => {
    const o = n.base.path(), a = n.navigatorFactory(n.base);
    let i = {};
    function p(c) {
      return c.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function u(c) {
      if (c.defaultPrevented || c.button !== 0 || c.metaKey || c.altKey || c.ctrlKey || c.shiftKey) return;
      const l = c.composedPath().find((j) => j instanceof Node && j.nodeName.toUpperCase() === "A");
      if (!l || t && !l.hasAttribute("link")) return;
      const h = p(l), m = h ? l.href.baseVal : l.href;
      if ((h ? l.target.baseVal : l.target) || !m && !l.hasAttribute("state")) return;
      const k = (l.getAttribute("rel") || "").split(/\s+/);
      if (l.hasAttribute("download") || k && k.includes("external")) return;
      const A = h ? new URL(m, document.baseURI) : new URL(m);
      if (!(A.origin !== window.location.origin || o && A.pathname && !A.pathname.toLowerCase().startsWith(o.toLowerCase()))) return [l, A];
    }
    function v(c) {
      const l = u(c);
      if (!l) return;
      const [h, m] = l, N = n.parsePath(m.pathname + m.search + m.hash), k = h.getAttribute("state");
      c.preventDefault(), a(N, { resolve: false, replace: h.hasAttribute("replace"), scroll: !h.hasAttribute("noscroll"), state: k && JSON.parse(k) });
    }
    function $(c) {
      const l = u(c);
      if (!l) return;
      const [h, m] = l;
      typeof s == "function" && (m.pathname = s(m.pathname)), i[m.pathname] || n.preloadRoute(m, { preloadData: h.getAttribute("preload") !== "false" });
    }
    function R(c) {
      const l = u(c);
      if (!l) return;
      const [h, m] = l;
      typeof s == "function" && (m.pathname = s(m.pathname)), !i[m.pathname] && (i[m.pathname] = setTimeout(() => {
        n.preloadRoute(m, { preloadData: h.getAttribute("preload") !== "false" }), delete i[m.pathname];
      }, 200));
    }
    function f(c) {
      const l = u(c);
      if (!l) return;
      const [, h] = l;
      typeof s == "function" && (h.pathname = s(h.pathname)), i[h.pathname] && (clearTimeout(i[h.pathname]), delete i[h.pathname]);
    }
    function w(c) {
      if (c.defaultPrevented) return;
      let l = c.submitter && c.submitter.hasAttribute("formaction") ? c.submitter.getAttribute("formaction") : c.target.getAttribute("action");
      if (!l) return;
      if (!l.startsWith("https://action/")) {
        const m = new URL(l, ye);
        if (l = n.parsePath(m.pathname + m.search), !l.startsWith(r)) return;
      }
      if (c.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const h = Gt.get(l);
      if (h) {
        c.preventDefault();
        const m = new FormData(c.target);
        c.submitter && c.submitter.name && m.append(c.submitter.name, c.submitter.value), h.call({ r: n, f: c.target }, m);
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", v), e && (document.addEventListener("mouseover", R), document.addEventListener("mouseout", f), document.addEventListener("focusin", $), document.addEventListener("touchstart", $)), document.addEventListener("submit", w), onCleanup(() => {
      document.removeEventListener("click", v), e && (document.removeEventListener("mouseover", R), document.removeEventListener("mouseout", f), document.removeEventListener("focusin", $), document.removeEventListener("touchstart", $)), document.removeEventListener("submit", w);
    });
  };
}
function Vt(e) {
  if (isServer) return Kt(e);
  const t = () => {
    const s = window.location.pathname + window.location.search;
    return { value: e.transformUrl ? e.transformUrl(s) + window.location.hash : s + window.location.hash, state: window.history.state };
  }, r = pe();
  return Wt({ get: t, set({ value: s, replace: n, scroll: o, state: a }) {
    n ? window.history.replaceState(Be(a), "", s) : window.history.pushState(a, "", s), Zt(decodeURIComponent(window.location.hash.slice(1)), o), G$1();
  }, init: (s) => Bt(window, "popstate", _e(s, (n) => {
    if (n && n < 0) return !r.confirm(n);
    {
      const o = t();
      return !r.confirm(o.value, { state: o.state });
    }
  })), create: Jt(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (s) => window.history.go(s), beforeLeave: r } })(e);
}
var Yt = ["<div", ' class="h-10 w-10 rounded-full bg-primary/10 border border-border flex items-center justify-center text-primary font-bold">CMK</div>'], Qt = ["<span", ' class="font-heading text-xl font-bold tracking-tight text-foreground">CentrMark</span>'], Xt = ["<header", ' class="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-6 shadow-sm"><div class="flex h-16 items-center justify-between max-w-5xl mx-auto"><div class="flex items-center gap-3">', '</div><nav class="hidden md:flex items-center gap-6"><!--$-->', "<!--/--><!--$-->", "<!--/--><!--$-->", "<!--/--></nav></div></header>"];
function er() {
  return ssr(Xt, ssrHydrationKey(), escape(createComponent$1(A, { href: "/", class: "flex items-center gap-2", get children() {
    return [ssr(Yt, ssrHydrationKey()), ssr(Qt, ssrHydrationKey())];
  } })), escape(createComponent$1(A, { href: "/", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Home" })), escape(createComponent$1(A, { href: "/examples", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Examples" })), escape(createComponent$1(A, { href: "/docs", class: "text-sm font-medium text-muted-foreground hover:text-primary transition-colors", children: "Docs" })));
}
var tr = ["<div", ">Loading...</div>"];
function rr() {
  return createComponent$1(Vt, { root: (e) => createComponent$1(I$2, { get children() {
    return [createComponent$1(k$1, { children: "Food Truck Nerdz" }), createComponent$1(k$1, { children: "CentrMark" }), createComponent$1(er, {}), createComponent$1(Suspense, { get fallback() {
      return ssr(tr, ssrHydrationKey());
    }, get children() {
      return e.children;
    } })];
  } }), get children() {
    return createComponent$1(Ht, {});
  } });
}
const oe = isServer ? (e) => {
  const t = getRequestEvent();
  return t.response.status = e.code, t.response.statusText = e.text, onCleanup(() => !t.nativeEvent.handled && !t.complete && (t.response.status = 200)), null;
} : (e) => null;
var nr = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">', "</span>"], sr = ["<span", ' style="font-size:1.5em;text-align:center;position:fixed;left:0px;bottom:55%;width:100%;">500 | Internal Server Error</span>'];
const or = (e) => {
  const t = isServer ? "500 | Internal Server Error" : "Error | Uncaught Client Exception";
  return createComponent$1(ErrorBoundary, { fallback: (r) => (console.error(r), [ssr(nr, ssrHydrationKey(), escape(t)), createComponent$1(oe, { code: 500 })]), get children() {
    return e.children;
  } });
}, ar = (e) => {
  let t = false;
  const r = catchError(() => e.children, (s) => {
    console.error(s), t = !!s;
  });
  return t ? [ssr(sr, ssrHydrationKey()), createComponent$1(oe, { code: 500 })] : r;
};
var Y = ["<script", ">", "<\/script>"], ir = ["<script", ' type="module"', " async", "><\/script>"], cr = ["<script", ' type="module" async', "><\/script>"];
const ur = ssr("<!DOCTYPE html>");
function ae(e, t, r = []) {
  for (let s = 0; s < t.length; s++) {
    const n = t[s];
    if (n.path !== e[0].path) continue;
    let o = [...r, n];
    if (n.children) {
      const a = e.slice(1);
      if (a.length === 0 || (o = ae(a, n.children, o), !o)) continue;
    }
    return o;
  }
}
function lr(e) {
  const t = getRequestEvent(), r = t.nonce;
  let s = [];
  return Promise.resolve().then(async () => {
    let n = [];
    if (t.router && t.router.matches) {
      const o = [...t.router.matches];
      for (; o.length && (!o[0].info || !o[0].info.filesystem); ) o.shift();
      const a = o.length && ae(o, t.routes);
      if (a) {
        const i = globalThis.MANIFEST.client.inputs;
        for (let p = 0; p < a.length; p++) {
          const u = a[p], v = i[u.$component.src];
          n.push(v.assets());
        }
      }
    }
    s = await Promise.all(n).then((o) => [...new Map(o.flat().map((a) => [a.attrs.key, a])).values()].filter((a) => a.attrs.rel === "modulepreload" && !t.assets.find((i) => i.attrs.key === a.attrs.key)));
  }), useAssets(() => s.length ? s.map((n) => _(n)) : void 0), createComponent$1(NoHydration, { get children() {
    return [ur, createComponent$1(ar, { get children() {
      return createComponent$1(e.document, { get assets() {
        return [createComponent$1(HydrationScript, {}), t.assets.map((n) => _(n, r))];
      }, get scripts() {
        return r ? [ssr(Y, ssrHydrationKey() + ssrAttribute("nonce", escape(r, true), false), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(ir, ssrHydrationKey(), ssrAttribute("nonce", escape(r, true), false), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))] : [ssr(Y, ssrHydrationKey(), `window.manifest = ${JSON.stringify(t.manifest)}`), ssr(cr, ssrHydrationKey(), ssrAttribute("src", escape(globalThis.MANIFEST.client.inputs[globalThis.MANIFEST.client.handler].output.path, true), false))];
      }, get children() {
        return createComponent$1(Hydration, { get children() {
          return createComponent$1(or, { get children() {
            return createComponent$1(rr, {});
          } });
        } });
      } });
    } })];
  } });
}
var dr = ['<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.ico"><link rel="stylesheet" href="/silktide/silktide-consent-manager.css"><link rel="stylesheet" href="/silktide/silktide-ftn-overrides.css">', "</head>"], pr = ["<html", ' lang="en">', '<body><div id="app">', '</div><script src="/silktide/silktide-consent-manager.js"><\/script><script src="/silktide/silktide-consent-init.js"><\/script><!--$-->', "<!--/--></body></html>"];
const Rr = Ft(() => createComponent$1(lr, { document: ({ assets: e, children: t, scripts: r }) => ssr(pr, ssrHydrationKey(), createComponent$1(NoHydration, { get children() {
  return ssr(dr, escape(e));
} }), escape(t), escape(r)) }));

const handlers = [
  { route: '', handler: _To0tmL, lazy: false, middleware: true, method: undefined },
  { route: '/_server', handler: Lt$1, lazy: false, middleware: true, method: undefined },
  { route: '/', handler: Rr, lazy: false, middleware: true, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  {
    const _handler = h3App.handler;
    h3App.handler = (event) => {
      const ctx = { event };
      return nitroAsyncContext.callAsync(ctx, () => _handler(event));
    };
  }
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp = createNitroApp();
function useNitroApp() {
  return nitroApp;
}
runNitroPlugins(nitroApp);

export { A, De as D, Ft$1 as F, k$1 as k, trapUnhandledNodeErrors as t, useNitroApp as u };
//# sourceMappingURL=nitro.mjs.map
