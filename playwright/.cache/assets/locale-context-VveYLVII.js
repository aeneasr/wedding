import { r as requireJsxRuntime, j as jsxRuntimeExports } from './jsx-runtime-CmNvG13l.js';
import { a as requireReact, g as getDefaultExportFromCjs, r as reactExports } from './index-DULTPS0E.js';

var link$2 = {exports: {}};

var _interop_require_wildcard = {};

var hasRequired_interop_require_wildcard;

function require_interop_require_wildcard () {
	if (hasRequired_interop_require_wildcard) return _interop_require_wildcard;
	hasRequired_interop_require_wildcard = 1;
	"use strict";

	function _getRequireWildcardCache(nodeInterop) {
	    if (typeof WeakMap !== "function") return null;

	    var cacheBabelInterop = new WeakMap();
	    var cacheNodeInterop = new WeakMap();

	    return (_getRequireWildcardCache = function(nodeInterop) {
	        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
	    })(nodeInterop);
	}
	function _interop_require_wildcard$1(obj, nodeInterop) {
	    if (!nodeInterop && obj && obj.__esModule) return obj;
	    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };

	    var cache = _getRequireWildcardCache(nodeInterop);

	    if (cache && cache.has(obj)) return cache.get(obj);

	    var newObj = { __proto__: null };
	    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	    for (var key in obj) {
	        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
	            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
	            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
	            else newObj[key] = obj[key];
	        }
	    }

	    newObj.default = obj;

	    if (cache) cache.set(obj, newObj);

	    return newObj;
	}
	_interop_require_wildcard._ = _interop_require_wildcard$1;
	return _interop_require_wildcard;
}

var resolveHref = {exports: {}};

var querystring = {};

var hasRequiredQuerystring;

function requireQuerystring () {
	if (hasRequiredQuerystring) return querystring;
	hasRequiredQuerystring = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    assign: null,
		    searchParamsToUrlQuery: null,
		    urlQueryToSearchParams: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    assign: function() {
		        return assign;
		    },
		    searchParamsToUrlQuery: function() {
		        return searchParamsToUrlQuery;
		    },
		    urlQueryToSearchParams: function() {
		        return urlQueryToSearchParams;
		    }
		});
		function searchParamsToUrlQuery(searchParams) {
		    const query = {};
		    for (const [key, value] of searchParams.entries()){
		        const existing = query[key];
		        if (typeof existing === 'undefined') {
		            query[key] = value;
		        } else if (Array.isArray(existing)) {
		            existing.push(value);
		        } else {
		            query[key] = [
		                existing,
		                value
		            ];
		        }
		    }
		    return query;
		}
		function stringifyUrlQueryParam(param) {
		    if (typeof param === 'string') {
		        return param;
		    }
		    if (typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
		        return String(param);
		    } else {
		        return '';
		    }
		}
		function urlQueryToSearchParams(query) {
		    const searchParams = new URLSearchParams();
		    for (const [key, value] of Object.entries(query)){
		        if (Array.isArray(value)) {
		            for (const item of value){
		                searchParams.append(key, stringifyUrlQueryParam(item));
		            }
		        } else {
		            searchParams.set(key, stringifyUrlQueryParam(value));
		        }
		    }
		    return searchParams;
		}
		function assign(target, ...searchParamsList) {
		    for (const searchParams of searchParamsList){
		        for (const key of searchParams.keys()){
		            target.delete(key);
		        }
		        for (const [key, value] of searchParams.entries()){
		            target.append(key, value);
		        }
		    }
		    return target;
		}

		
	} (querystring));
	return querystring;
}

var formatUrl = {};

var hasRequiredFormatUrl;

function requireFormatUrl () {
	if (hasRequiredFormatUrl) return formatUrl;
	hasRequiredFormatUrl = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		function _export(target, all) {
		  for (var name in all) Object.defineProperty(target, name, {
		    enumerable: true,
		    get: all[name]
		  });
		}
		_export(exports$1, {
		  formatUrl: function() {
		    return formatUrl;
		  },
		  formatWithValidation: function() {
		    return formatWithValidation;
		  },
		  urlObjectKeys: function() {
		    return urlObjectKeys;
		  }
		});
		const _interop_require_wildcard = /*@__PURE__*/ require_interop_require_wildcard();
		const _querystring = /* @__PURE__ */ _interop_require_wildcard._(requireQuerystring());
		const slashedProtocols = /https?|ftp|gopher|file/;
		function formatUrl(urlObj) {
		  let { auth, hostname } = urlObj;
		  let protocol = urlObj.protocol || "";
		  let pathname = urlObj.pathname || "";
		  let hash = urlObj.hash || "";
		  let query = urlObj.query || "";
		  let host = false;
		  auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
		  if (urlObj.host) {
		    host = auth + urlObj.host;
		  } else if (hostname) {
		    host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
		    if (urlObj.port) {
		      host += ":" + urlObj.port;
		    }
		  }
		  if (query && typeof query === "object") {
		    query = String(_querystring.urlQueryToSearchParams(query));
		  }
		  let search = urlObj.search || query && `?${query}` || "";
		  if (protocol && !protocol.endsWith(":")) protocol += ":";
		  if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
		    host = "//" + (host || "");
		    if (pathname && pathname[0] !== "/") pathname = "/" + pathname;
		  } else if (!host) {
		    host = "";
		  }
		  if (hash && hash[0] !== "#") hash = "#" + hash;
		  if (search && search[0] !== "?") search = "?" + search;
		  pathname = pathname.replace(/[?#]/g, encodeURIComponent);
		  search = search.replace("#", "%23");
		  return `${protocol}${host}${pathname}${search}${hash}`;
		}
		const urlObjectKeys = [
		  "auth",
		  "hash",
		  "host",
		  "hostname",
		  "href",
		  "path",
		  "pathname",
		  "port",
		  "protocol",
		  "query",
		  "search",
		  "slashes"
		];
		function formatWithValidation(url) {
		  if (false) {
		    if (url !== null && typeof url === "object") {
		      Object.keys(url).forEach((key) => {
		        if (!urlObjectKeys.includes(key)) {
		          console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
		        }
		      });
		    }
		  }
		  return formatUrl(url);
		} 
	} (formatUrl));
	return formatUrl;
}

var omit = {};

var hasRequiredOmit;

function requireOmit () {
	if (hasRequiredOmit) return omit;
	hasRequiredOmit = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "omit", {
		    enumerable: true,
		    get: function() {
		        return omit;
		    }
		});
		function omit(object, keys) {
		    const omitted = {};
		    Object.keys(object).forEach((key)=>{
		        if (!keys.includes(key)) {
		            omitted[key] = object[key];
		        }
		    });
		    return omitted;
		}

		
	} (omit));
	return omit;
}

var utils$1 = {};

var hasRequiredUtils$1;

function requireUtils$1 () {
	if (hasRequiredUtils$1) return utils$1;
	hasRequiredUtils$1 = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		function _export(target, all) {
		  for (var name in all) Object.defineProperty(target, name, {
		    enumerable: true,
		    get: all[name]
		  });
		}
		_export(exports$1, {
		  DecodeError: function() {
		    return DecodeError;
		  },
		  MiddlewareNotFoundError: function() {
		    return MiddlewareNotFoundError;
		  },
		  MissingStaticPage: function() {
		    return MissingStaticPage;
		  },
		  NormalizeError: function() {
		    return NormalizeError;
		  },
		  PageNotFoundError: function() {
		    return PageNotFoundError;
		  },
		  SP: function() {
		    return SP;
		  },
		  ST: function() {
		    return ST;
		  },
		  WEB_VITALS: function() {
		    return WEB_VITALS;
		  },
		  execOnce: function() {
		    return execOnce;
		  },
		  getDisplayName: function() {
		    return getDisplayName;
		  },
		  getLocationOrigin: function() {
		    return getLocationOrigin;
		  },
		  getURL: function() {
		    return getURL;
		  },
		  isAbsoluteUrl: function() {
		    return isAbsoluteUrl;
		  },
		  isResSent: function() {
		    return isResSent;
		  },
		  loadGetInitialProps: function() {
		    return loadGetInitialProps;
		  },
		  normalizeRepeatedSlashes: function() {
		    return normalizeRepeatedSlashes;
		  },
		  stringifyError: function() {
		    return stringifyError;
		  }
		});
		const WEB_VITALS = [
		  "CLS",
		  "FCP",
		  "FID",
		  "INP",
		  "LCP",
		  "TTFB"
		];
		function execOnce(fn) {
		  let used = false;
		  let result;
		  return (...args) => {
		    if (!used) {
		      used = true;
		      result = fn(...args);
		    }
		    return result;
		  };
		}
		const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
		const isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
		function getLocationOrigin() {
		  const { protocol, hostname, port } = window.location;
		  return `${protocol}//${hostname}${port ? ":" + port : ""}`;
		}
		function getURL() {
		  const { href } = window.location;
		  const origin = getLocationOrigin();
		  return href.substring(origin.length);
		}
		function getDisplayName(Component) {
		  return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
		}
		function isResSent(res) {
		  return res.finished || res.headersSent;
		}
		function normalizeRepeatedSlashes(url) {
		  const urlParts = url.split("?");
		  const urlNoQuery = urlParts[0];
		  return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
		}
		async function loadGetInitialProps(App, ctx) {
		  if (false) {
		    if (App.prototype?.getInitialProps) {
		      const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
		      throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
		        value: "E1035",
		        enumerable: false,
		        configurable: true
		      });
		    }
		  }
		  const res = ctx.res || ctx.ctx && ctx.ctx.res;
		  if (!App.getInitialProps) {
		    if (ctx.ctx && ctx.Component) {
		      return {
		        pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
		      };
		    }
		    return {};
		  }
		  const props = await App.getInitialProps(ctx);
		  if (res && isResSent(res)) {
		    return props;
		  }
		  if (!props) {
		    const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
		    throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
		      value: "E1025",
		      enumerable: false,
		      configurable: true
		    });
		  }
		  if (false) {
		    if (Object.keys(props).length === 0 && !ctx.ctx) {
		      console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
		    }
		  }
		  return props;
		}
		const SP = typeof performance !== "undefined";
		const ST = SP && [
		  "mark",
		  "measure",
		  "getEntriesByName"
		].every((method) => typeof performance[method] === "function");
		class DecodeError extends Error {
		}
		class NormalizeError extends Error {
		}
		class PageNotFoundError extends Error {
		  constructor(page) {
		    super();
		    this.code = "ENOENT";
		    this.name = "PageNotFoundError";
		    this.message = `Cannot find module for page: ${page}`;
		  }
		}
		class MissingStaticPage extends Error {
		  constructor(page, message) {
		    super();
		    this.message = `Failed to load static file for page: ${page} ${message}`;
		  }
		}
		class MiddlewareNotFoundError extends Error {
		  constructor() {
		    super();
		    this.code = "ENOENT";
		    this.message = `Cannot find the middleware module`;
		  }
		}
		function stringifyError(error) {
		  return JSON.stringify({
		    message: error.message,
		    stack: error.stack
		  });
		} 
	} (utils$1));
	return utils$1;
}

var normalizeTrailingSlash$1 = {exports: {}};

var removeTrailingSlash = {};

/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */

var hasRequiredRemoveTrailingSlash;

function requireRemoveTrailingSlash () {
	if (hasRequiredRemoveTrailingSlash) return removeTrailingSlash;
	hasRequiredRemoveTrailingSlash = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "removeTrailingSlash", {
		    enumerable: true,
		    get: function() {
		        return removeTrailingSlash;
		    }
		});
		function removeTrailingSlash(route) {
		    return route.replace(/\/$/, '') || '/';
		}

		
	} (removeTrailingSlash));
	return removeTrailingSlash;
}

var parsePath = {};

/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */

var hasRequiredParsePath;

function requireParsePath () {
	if (hasRequiredParsePath) return parsePath;
	hasRequiredParsePath = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "parsePath", {
		    enumerable: true,
		    get: function() {
		        return parsePath;
		    }
		});
		function parsePath(path) {
		    const hashIndex = path.indexOf('#');
		    const queryIndex = path.indexOf('?');
		    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
		    if (hasQuery || hashIndex > -1) {
		        return {
		            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
		            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
		            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
		        };
		    }
		    return {
		        pathname: path,
		        query: '',
		        hash: ''
		    };
		}

		
	} (parsePath));
	return parsePath;
}

var normalizeTrailingSlash = normalizeTrailingSlash$1.exports;

var hasRequiredNormalizeTrailingSlash;

function requireNormalizeTrailingSlash () {
	if (hasRequiredNormalizeTrailingSlash) return normalizeTrailingSlash$1.exports;
	hasRequiredNormalizeTrailingSlash = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "normalizePathTrailingSlash", {
		  enumerable: true,
		  get: function() {
		    return normalizePathTrailingSlash;
		  }
		});
		const _removetrailingslash = requireRemoveTrailingSlash();
		const _parsepath = requireParsePath();
		const normalizePathTrailingSlash = (path) => {
		  if (!path.startsWith("/") || define_process_env_default.__NEXT_MANUAL_TRAILING_SLASH) {
		    return path;
		  }
		  const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
		  if (define_process_env_default.__NEXT_TRAILING_SLASH) {
		    if (/\.[^/]+\/?$/.test(pathname)) {
		      return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
		    } else if (pathname.endsWith("/")) {
		      return `${pathname}${query}${hash}`;
		    } else {
		      return `${pathname}/${query}${hash}`;
		    }
		  }
		  return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
		};
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (normalizeTrailingSlash$1, normalizeTrailingSlash$1.exports));
	return normalizeTrailingSlash$1.exports;
}

var isLocalUrl = {};

var hasBasePath = {exports: {}};

var pathHasPrefix = {};

var hasRequiredPathHasPrefix;

function requirePathHasPrefix () {
	if (hasRequiredPathHasPrefix) return pathHasPrefix;
	hasRequiredPathHasPrefix = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "pathHasPrefix", {
		    enumerable: true,
		    get: function() {
		        return pathHasPrefix;
		    }
		});
		const _parsepath = requireParsePath();
		function pathHasPrefix(path, prefix) {
		    if (typeof path !== 'string') {
		        return false;
		    }
		    const { pathname } = (0, _parsepath.parsePath)(path);
		    return pathname === prefix || pathname.startsWith(prefix + '/');
		}

		
	} (pathHasPrefix));
	return pathHasPrefix;
}

var hasBasePath_1 = hasBasePath.exports;

var hasRequiredHasBasePath;

function requireHasBasePath () {
	if (hasRequiredHasBasePath) return hasBasePath.exports;
	hasRequiredHasBasePath = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "hasBasePath", {
		  enumerable: true,
		  get: function() {
		    return hasBasePath;
		  }
		});
		const _pathhasprefix = requirePathHasPrefix();
		const basePath = define_process_env_default.__NEXT_ROUTER_BASEPATH || "";
		function hasBasePath(path) {
		  return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
		}
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (hasBasePath, hasBasePath.exports));
	return hasBasePath.exports;
}

var hasRequiredIsLocalUrl;

function requireIsLocalUrl () {
	if (hasRequiredIsLocalUrl) return isLocalUrl;
	hasRequiredIsLocalUrl = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "isLocalURL", {
		    enumerable: true,
		    get: function() {
		        return isLocalURL;
		    }
		});
		const _utils = requireUtils$1();
		const _hasbasepath = requireHasBasePath();
		function isLocalURL(url) {
		    // prevent a hydration mismatch on href for url with anchor refs
		    if (!(0, _utils.isAbsoluteUrl)(url)) return true;
		    try {
		        // absolute urls can be local if they are on the same origin
		        const locationOrigin = (0, _utils.getLocationOrigin)();
		        const resolved = new URL(url, locationOrigin);
		        return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
		    } catch (_) {
		        return false;
		    }
		}

		
	} (isLocalUrl));
	return isLocalUrl;
}

var utils = {};

var sortedRoutes = {};

var hasRequiredSortedRoutes;

function requireSortedRoutes () {
	if (hasRequiredSortedRoutes) return sortedRoutes;
	hasRequiredSortedRoutes = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    getSortedRouteObjects: null,
		    getSortedRoutes: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    getSortedRouteObjects: function() {
		        return getSortedRouteObjects;
		    },
		    getSortedRoutes: function() {
		        return getSortedRoutes;
		    }
		});
		class UrlNode {
		    insert(urlPath) {
		        this._insert(urlPath.split('/').filter(Boolean), [], false);
		    }
		    smoosh() {
		        return this._smoosh();
		    }
		    _smoosh(prefix = '/') {
		        const childrenPaths = [
		            ...this.children.keys()
		        ].sort();
		        if (this.slugName !== null) {
		            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
		        }
		        if (this.restSlugName !== null) {
		            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
		        }
		        if (this.optionalRestSlugName !== null) {
		            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
		        }
		        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
		                ...prev,
		                ...curr
		            ], []);
		        if (this.slugName !== null) {
		            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
		        }
		        if (!this.placeholder) {
		            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
		            if (this.optionalRestSlugName != null) {
		                throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
		                    value: "E458",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            routes.unshift(r);
		        }
		        if (this.restSlugName !== null) {
		            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
		        }
		        if (this.optionalRestSlugName !== null) {
		            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
		        }
		        return routes;
		    }
		    _insert(urlPaths, slugNames, isCatchAll) {
		        if (urlPaths.length === 0) {
		            this.placeholder = false;
		            return;
		        }
		        if (isCatchAll) {
		            throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
		                value: "E392",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        // The next segment in the urlPaths list
		        let nextSegment = urlPaths[0];
		        // Check if the segment matches `[something]`
		        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
		            // Strip `[` and `]`, leaving only `something`
		            let segmentName = nextSegment.slice(1, -1);
		            let isOptional = false;
		            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
		                // Strip optional `[` and `]`, leaving only `something`
		                segmentName = segmentName.slice(1, -1);
		                isOptional = true;
		            }
		            if (segmentName.startsWith('…')) {
		                throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
		                    value: "E147",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            if (segmentName.startsWith('...')) {
		                // Strip `...`, leaving only `something`
		                segmentName = segmentName.substring(3);
		                isCatchAll = true;
		            }
		            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
		                throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
		                    value: "E421",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            if (segmentName.startsWith('.')) {
		                throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
		                    value: "E288",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            function handleSlug(previousSlug, nextSlug) {
		                if (previousSlug !== null) {
		                    // If the specific segment already has a slug but the slug is not `something`
		                    // This prevents collisions like:
		                    // pages/[post]/index.js
		                    // pages/[id]/index.js
		                    // Because currently multiple dynamic params on the same segment level are not supported
		                    if (previousSlug !== nextSlug) {
		                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
		                        throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
		                            value: "E337",
		                            enumerable: false,
		                            configurable: true
		                        });
		                    }
		                }
		                slugNames.forEach((slug)=>{
		                    if (slug === nextSlug) {
		                        throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
		                            value: "E247",
		                            enumerable: false,
		                            configurable: true
		                        });
		                    }
		                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
		                        throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
		                            value: "E499",
		                            enumerable: false,
		                            configurable: true
		                        });
		                    }
		                });
		                slugNames.push(nextSlug);
		            }
		            if (isCatchAll) {
		                if (isOptional) {
		                    if (this.restSlugName != null) {
		                        throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
		                            value: "E299",
		                            enumerable: false,
		                            configurable: true
		                        });
		                    }
		                    handleSlug(this.optionalRestSlugName, segmentName);
		                    // slugName is kept as it can only be one particular slugName
		                    this.optionalRestSlugName = segmentName;
		                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
		                    nextSegment = '[[...]]';
		                } else {
		                    if (this.optionalRestSlugName != null) {
		                        throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
		                            value: "E300",
		                            enumerable: false,
		                            configurable: true
		                        });
		                    }
		                    handleSlug(this.restSlugName, segmentName);
		                    // slugName is kept as it can only be one particular slugName
		                    this.restSlugName = segmentName;
		                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
		                    nextSegment = '[...]';
		                }
		            } else {
		                if (isOptional) {
		                    throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
		                        value: "E435",
		                        enumerable: false,
		                        configurable: true
		                    });
		                }
		                handleSlug(this.slugName, segmentName);
		                // slugName is kept as it can only be one particular slugName
		                this.slugName = segmentName;
		                // nextSegment is overwritten to [] so that it can later be sorted specifically
		                nextSegment = '[]';
		            }
		        }
		        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
		        if (!this.children.has(nextSegment)) {
		            this.children.set(nextSegment, new UrlNode());
		        }
		        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
		    }
		    constructor(){
		        this.placeholder = true;
		        this.children = new Map();
		        this.slugName = null;
		        this.restSlugName = null;
		        this.optionalRestSlugName = null;
		    }
		}
		function getSortedRoutes(normalizedPages) {
		    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
		    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
		    // Only 1 dynamic segment per nesting level
		    // So in the case that is test/integration/dynamic-routing it'll be this:
		    // pages/[post]/comments.js
		    // pages/blog/[post]/comment/[id].js
		    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
		    // So in this case `UrlNode` created here has `this.slugName === 'post'`
		    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
		    // Instead what has to be passed through is the upwards path's dynamic names
		    const root = new UrlNode();
		    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
		    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
		    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
		    return root.smoosh();
		}
		function getSortedRouteObjects(objects, getter) {
		    // We're assuming here that all the pathnames are unique, that way we can
		    // sort the list and use the index as the key.
		    const indexes = {};
		    const pathnames = [];
		    for(let i = 0; i < objects.length; i++){
		        const pathname = getter(objects[i]);
		        indexes[pathname] = i;
		        pathnames[i] = pathname;
		    }
		    // Sort the pathnames.
		    const sorted = getSortedRoutes(pathnames);
		    // Map the sorted pathnames back to the original objects using the new sorted
		    // index.
		    return sorted.map((pathname)=>objects[indexes[pathname]]);
		}

		
	} (sortedRoutes));
	return sortedRoutes;
}

var isDynamic = {};

var interceptionRoutes = {};

var appPaths = {};

var ensureLeadingSlash = {};

/**
 * For a given page path, this function ensures that there is a leading slash.
 * If there is not a leading slash, one is added, otherwise it is noop.
 */

var hasRequiredEnsureLeadingSlash;

function requireEnsureLeadingSlash () {
	if (hasRequiredEnsureLeadingSlash) return ensureLeadingSlash;
	hasRequiredEnsureLeadingSlash = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "ensureLeadingSlash", {
		    enumerable: true,
		    get: function() {
		        return ensureLeadingSlash;
		    }
		});
		function ensureLeadingSlash(path) {
		    return path.startsWith('/') ? path : `/${path}`;
		}

		
	} (ensureLeadingSlash));
	return ensureLeadingSlash;
}

var segment = {};

var hasRequiredSegment;

function requireSegment () {
	if (hasRequiredSegment) return segment;
	hasRequiredSegment = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    DEFAULT_SEGMENT_KEY: null,
		    NOT_FOUND_SEGMENT_KEY: null,
		    PAGE_SEGMENT_KEY: null,
		    addSearchParamsIfPageSegment: null,
		    computeSelectedLayoutSegment: null,
		    getSegmentValue: null,
		    getSelectedLayoutSegmentPath: null,
		    isGroupSegment: null,
		    isParallelRouteSegment: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    DEFAULT_SEGMENT_KEY: function() {
		        return DEFAULT_SEGMENT_KEY;
		    },
		    NOT_FOUND_SEGMENT_KEY: function() {
		        return NOT_FOUND_SEGMENT_KEY;
		    },
		    PAGE_SEGMENT_KEY: function() {
		        return PAGE_SEGMENT_KEY;
		    },
		    addSearchParamsIfPageSegment: function() {
		        return addSearchParamsIfPageSegment;
		    },
		    computeSelectedLayoutSegment: function() {
		        return computeSelectedLayoutSegment;
		    },
		    getSegmentValue: function() {
		        return getSegmentValue;
		    },
		    getSelectedLayoutSegmentPath: function() {
		        return getSelectedLayoutSegmentPath;
		    },
		    isGroupSegment: function() {
		        return isGroupSegment;
		    },
		    isParallelRouteSegment: function() {
		        return isParallelRouteSegment;
		    }
		});
		function getSegmentValue(segment) {
		    return Array.isArray(segment) ? segment[1] : segment;
		}
		function isGroupSegment(segment) {
		    // Use array[0] for performant purpose
		    return segment[0] === '(' && segment.endsWith(')');
		}
		function isParallelRouteSegment(segment) {
		    return segment.startsWith('@') && segment !== '@children';
		}
		function addSearchParamsIfPageSegment(segment, searchParams) {
		    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
		    if (isPageSegment) {
		        const stringifiedQuery = JSON.stringify(searchParams);
		        return stringifiedQuery !== '{}' ? PAGE_SEGMENT_KEY + '?' + stringifiedQuery : PAGE_SEGMENT_KEY;
		    }
		    return segment;
		}
		function computeSelectedLayoutSegment(segments, parallelRouteKey) {
		    if (!segments || segments.length === 0) {
		        return null;
		    }
		    // For 'children', use first segment; for other parallel routes, use last segment
		    const rawSegment = parallelRouteKey === 'children' ? segments[0] : segments[segments.length - 1];
		    // If the default slot is showing, return null since it's not technically "selected" (it's a fallback)
		    // Returning an internal value like `__DEFAULT__` would be confusing
		    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
		}
		function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
		    let node;
		    if (first) {
		        // Use the provided parallel route key on the first parallel route
		        node = tree[1][parallelRouteKey];
		    } else {
		        // After first parallel route prefer children, if there's no children pick the first parallel route.
		        const parallelRoutes = tree[1];
		        node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
		    }
		    if (!node) return segmentPath;
		    const segment = node[0];
		    let segmentValue = getSegmentValue(segment);
		    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
		        return segmentPath;
		    }
		    segmentPath.push(segmentValue);
		    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
		}
		const PAGE_SEGMENT_KEY = '__PAGE__';
		const DEFAULT_SEGMENT_KEY = '__DEFAULT__';
		const NOT_FOUND_SEGMENT_KEY = '/_not-found';

		
	} (segment));
	return segment;
}

var hasRequiredAppPaths;

function requireAppPaths () {
	if (hasRequiredAppPaths) return appPaths;
	hasRequiredAppPaths = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    compareAppPaths: null,
		    normalizeAppPath: null,
		    normalizeRscURL: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    compareAppPaths: function() {
		        return compareAppPaths;
		    },
		    normalizeAppPath: function() {
		        return normalizeAppPath;
		    },
		    normalizeRscURL: function() {
		        return normalizeRscURL;
		    }
		});
		const _ensureleadingslash = requireEnsureLeadingSlash();
		const _segment = requireSegment();
		function normalizeAppPath(route) {
		    return (0, _ensureleadingslash.ensureLeadingSlash)(route.split('/').reduce((pathname, segment, index, segments)=>{
		        // Empty segments are ignored.
		        if (!segment) {
		            return pathname;
		        }
		        // Groups are ignored.
		        if ((0, _segment.isGroupSegment)(segment)) {
		            return pathname;
		        }
		        // Parallel segments are ignored.
		        if (segment[0] === '@') {
		            return pathname;
		        }
		        // The last segment (if it's a leaf) should be ignored.
		        if ((segment === 'page' || segment === 'route') && index === segments.length - 1) {
		            return pathname;
		        }
		        return `${pathname}/${segment}`;
		    }, ''));
		}
		function compareAppPaths(a, b) {
		    const aHasSlot = a.includes('/@');
		    const bHasSlot = b.includes('/@');
		    if (aHasSlot && !bHasSlot) return -1;
		    if (!aHasSlot && bHasSlot) return 1;
		    return a.localeCompare(b);
		}
		function normalizeRscURL(url) {
		    return url.replace(/\.rsc($|\?)/, // $1 ensures `?` is preserved
		    '$1');
		}

		
	} (appPaths));
	return appPaths;
}

var hasRequiredInterceptionRoutes;

function requireInterceptionRoutes () {
	if (hasRequiredInterceptionRoutes) return interceptionRoutes;
	hasRequiredInterceptionRoutes = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    INTERCEPTION_ROUTE_MARKERS: null,
		    extractInterceptionRouteInformation: null,
		    isInterceptionRouteAppPath: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    INTERCEPTION_ROUTE_MARKERS: function() {
		        return INTERCEPTION_ROUTE_MARKERS;
		    },
		    extractInterceptionRouteInformation: function() {
		        return extractInterceptionRouteInformation;
		    },
		    isInterceptionRouteAppPath: function() {
		        return isInterceptionRouteAppPath;
		    }
		});
		const _apppaths = requireAppPaths();
		const INTERCEPTION_ROUTE_MARKERS = [
		    '(..)(..)',
		    '(.)',
		    '(..)',
		    '(...)'
		];
		function isInterceptionRouteAppPath(path) {
		    // TODO-APP: add more serious validation
		    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
		}
		function extractInterceptionRouteInformation(path) {
		    let interceptingRoute;
		    let marker;
		    let interceptedRoute;
		    for (const segment of path.split('/')){
		        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
		        if (marker) {
		            ;
		            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
		            break;
		        }
		    }
		    if (!interceptingRoute || !marker || !interceptedRoute) {
		        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
		            value: "E269",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
		    ;
		    switch(marker){
		        case '(.)':
		            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
		            if (interceptingRoute === '/') {
		                interceptedRoute = `/${interceptedRoute}`;
		            } else {
		                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
		            }
		            break;
		        case '(..)':
		            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
		            if (interceptingRoute === '/') {
		                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
		                    value: "E207",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
		            break;
		        case '(...)':
		            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
		            interceptedRoute = '/' + interceptedRoute;
		            break;
		        case '(..)(..)':
		            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
		            const splitInterceptingRoute = interceptingRoute.split('/');
		            if (splitInterceptingRoute.length <= 2) {
		                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
		                    value: "E486",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
		            break;
		        default:
		            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
		                value: "E112",
		                enumerable: false,
		                configurable: true
		            });
		    }
		    return {
		        interceptingRoute,
		        interceptedRoute
		    };
		}

		
	} (interceptionRoutes));
	return interceptionRoutes;
}

var hasRequiredIsDynamic;

function requireIsDynamic () {
	if (hasRequiredIsDynamic) return isDynamic;
	hasRequiredIsDynamic = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "isDynamicRoute", {
		    enumerable: true,
		    get: function() {
		        return isDynamicRoute;
		    }
		});
		const _interceptionroutes = requireInterceptionRoutes();
		// Identify /.*[param].*/ in route string
		const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
		// Identify /[param]/ in route string
		const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
		function isDynamicRoute(route, strict = true) {
		    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
		        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
		    }
		    if (strict) {
		        return TEST_STRICT_ROUTE.test(route);
		    }
		    return TEST_ROUTE.test(route);
		}

		
	} (isDynamic));
	return isDynamic;
}

var hasRequiredUtils;

function requireUtils () {
	if (hasRequiredUtils) return utils;
	hasRequiredUtils = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    getSortedRouteObjects: null,
		    getSortedRoutes: null,
		    isDynamicRoute: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    getSortedRouteObjects: function() {
		        return _sortedroutes.getSortedRouteObjects;
		    },
		    getSortedRoutes: function() {
		        return _sortedroutes.getSortedRoutes;
		    },
		    isDynamicRoute: function() {
		        return _isdynamic.isDynamicRoute;
		    }
		});
		const _sortedroutes = requireSortedRoutes();
		const _isdynamic = requireIsDynamic();

		
	} (utils));
	return utils;
}

var interpolateAs = {};

var routeMatcher = {};

var routeMatchUtils = {};

var pathToRegexp$1 = {exports: {}};

var pathToRegexp = pathToRegexp$1.exports;

var hasRequiredPathToRegexp;

function requirePathToRegexp () {
	if (hasRequiredPathToRegexp) return pathToRegexp$1.exports;
	hasRequiredPathToRegexp = 1;
	(()=>{"use strict";if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var e={};(()=>{var n=e;Object.defineProperty(n,"__esModule",{value:true});n.pathToRegexp=n.tokensToRegexp=n.regexpToFunction=n.match=n.tokensToFunction=n.compile=n.parse=void 0;function lexer(e){var n=[];var r=0;while(r<e.length){var t=e[r];if(t==="*"||t==="+"||t==="?"){n.push({type:"MODIFIER",index:r,value:e[r++]});continue}if(t==="\\"){n.push({type:"ESCAPED_CHAR",index:r++,value:e[r++]});continue}if(t==="{"){n.push({type:"OPEN",index:r,value:e[r++]});continue}if(t==="}"){n.push({type:"CLOSE",index:r,value:e[r++]});continue}if(t===":"){var a="";var i=r+1;while(i<e.length){var o=e.charCodeAt(i);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){a+=e[i++];continue}break}if(!a)throw new TypeError("Missing parameter name at ".concat(r));n.push({type:"NAME",index:r,value:a});r=i;continue}if(t==="("){var c=1;var f="";var i=r+1;if(e[i]==="?"){throw new TypeError('Pattern cannot start with "?" at '.concat(i))}while(i<e.length){if(e[i]==="\\"){f+=e[i++]+e[i++];continue}if(e[i]===")"){c--;if(c===0){i++;break}}else if(e[i]==="("){c++;if(e[i+1]!=="?"){throw new TypeError("Capturing groups are not allowed at ".concat(i))}}f+=e[i++];}if(c)throw new TypeError("Unbalanced pattern at ".concat(r));if(!f)throw new TypeError("Missing pattern at ".concat(r));n.push({type:"PATTERN",index:r,value:f});r=i;continue}n.push({type:"CHAR",index:r,value:e[r++]});}n.push({type:"END",index:r,value:""});return n}function parse(e,n){if(n===void 0){n={};}var r=lexer(e);var t=n.prefixes,a=t===void 0?"./":t,i=n.delimiter,o=i===void 0?"/#?":i;var c=[];var f=0;var u=0;var p="";var tryConsume=function(e){if(u<r.length&&r[u].type===e)return r[u++].value};var mustConsume=function(e){var n=tryConsume(e);if(n!==undefined)return n;var t=r[u],a=t.type,i=t.index;throw new TypeError("Unexpected ".concat(a," at ").concat(i,", expected ").concat(e))};var consumeText=function(){var e="";var n;while(n=tryConsume("CHAR")||tryConsume("ESCAPED_CHAR")){e+=n;}return e};var isSafe=function(e){for(var n=0,r=o;n<r.length;n++){var t=r[n];if(e.indexOf(t)>-1)return true}return false};var safePattern=function(e){var n=c[c.length-1];var r=e||(n&&typeof n==="string"?n:"");if(n&&!r){throw new TypeError('Must have text between two parameters, missing text after "'.concat(n.name,'"'))}if(!r||isSafe(r))return "[^".concat(escapeString(o),"]+?");return "(?:(?!".concat(escapeString(r),")[^").concat(escapeString(o),"])+?")};while(u<r.length){var v=tryConsume("CHAR");var s=tryConsume("NAME");var d=tryConsume("PATTERN");if(s||d){var g=v||"";if(a.indexOf(g)===-1){p+=g;g="";}if(p){c.push(p);p="";}c.push({name:s||f++,prefix:g,suffix:"",pattern:d||safePattern(g),modifier:tryConsume("MODIFIER")||""});continue}var x=v||tryConsume("ESCAPED_CHAR");if(x){p+=x;continue}if(p){c.push(p);p="";}var h=tryConsume("OPEN");if(h){var g=consumeText();var l=tryConsume("NAME")||"";var m=tryConsume("PATTERN")||"";var T=consumeText();mustConsume("CLOSE");c.push({name:l||(m?f++:""),pattern:l&&!m?safePattern(g):m,prefix:g,suffix:T,modifier:tryConsume("MODIFIER")||""});continue}mustConsume("END");}return c}n.parse=parse;function compile(e,n){return tokensToFunction(parse(e,n),n)}n.compile=compile;function tokensToFunction(e,n){if(n===void 0){n={};}var r=flags(n);var t=n.encode,a=t===void 0?function(e){return e}:t,i=n.validate,o=i===void 0?true:i;var c=e.map((function(e){if(typeof e==="object"){return new RegExp("^(?:".concat(e.pattern,")$"),r)}}));return function(n){var r="";for(var t=0;t<e.length;t++){var i=e[t];if(typeof i==="string"){r+=i;continue}var f=n?n[i.name]:undefined;var u=i.modifier==="?"||i.modifier==="*";var p=i.modifier==="*"||i.modifier==="+";if(Array.isArray(f)){if(!p){throw new TypeError('Expected "'.concat(i.name,'" to not repeat, but got an array'))}if(f.length===0){if(u)continue;throw new TypeError('Expected "'.concat(i.name,'" to not be empty'))}for(var v=0;v<f.length;v++){var s=a(f[v],i);if(o&&!c[t].test(s)){throw new TypeError('Expected all "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(s,'"'))}r+=i.prefix+s+i.suffix;}continue}if(typeof f==="string"||typeof f==="number"){var s=a(String(f),i);if(o&&!c[t].test(s)){throw new TypeError('Expected "'.concat(i.name,'" to match "').concat(i.pattern,'", but got "').concat(s,'"'))}r+=i.prefix+s+i.suffix;continue}if(u)continue;var d=p?"an array":"a string";throw new TypeError('Expected "'.concat(i.name,'" to be ').concat(d))}return r}}n.tokensToFunction=tokensToFunction;function match(e,n){var r=[];var t=pathToRegexp(e,r,n);return regexpToFunction(t,r,n)}n.match=match;function regexpToFunction(e,n,r){if(r===void 0){r={};}var t=r.decode,a=t===void 0?function(e){return e}:t;return function(r){var t=e.exec(r);if(!t)return false;var i=t[0],o=t.index;var c=Object.create(null);var _loop_1=function(e){if(t[e]===undefined)return "continue";var r=n[e-1];if(r.modifier==="*"||r.modifier==="+"){c[r.name]=t[e].split(r.prefix+r.suffix).map((function(e){return a(e,r)}));}else {c[r.name]=a(t[e],r);}};for(var f=1;f<t.length;f++){_loop_1(f);}return {path:i,index:o,params:c}}}n.regexpToFunction=regexpToFunction;function escapeString(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function flags(e){return e&&e.sensitive?"":"i"}function regexpToRegexp(e,n){if(!n)return e;var r=/\((?:\?<(.*?)>)?(?!\?)/g;var t=0;var a=r.exec(e.source);while(a){n.push({name:a[1]||t++,prefix:"",suffix:"",modifier:"",pattern:""});a=r.exec(e.source);}return e}function arrayToRegexp(e,n,r){var t=e.map((function(e){return pathToRegexp(e,n,r).source}));return new RegExp("(?:".concat(t.join("|"),")"),flags(r))}function stringToRegexp(e,n,r){return tokensToRegexp(parse(e,r),n,r)}function tokensToRegexp(e,n,r){if(r===void 0){r={};}var t=r.strict,a=t===void 0?false:t,i=r.start,o=i===void 0?true:i,c=r.end,f=c===void 0?true:c,u=r.encode,p=u===void 0?function(e){return e}:u,v=r.delimiter,s=v===void 0?"/#?":v,d=r.endsWith,g=d===void 0?"":d;var x="[".concat(escapeString(g),"]|$");var h="[".concat(escapeString(s),"]");var l=o?"^":"";for(var m=0,T=e;m<T.length;m++){var E=T[m];if(typeof E==="string"){l+=escapeString(p(E));}else {var w=escapeString(p(E.prefix));var y=escapeString(p(E.suffix));if(E.pattern){if(n)n.push(E);if(w||y){if(E.modifier==="+"||E.modifier==="*"){var R=E.modifier==="*"?"?":"";l+="(?:".concat(w,"((?:").concat(E.pattern,")(?:").concat(y).concat(w,"(?:").concat(E.pattern,"))*)").concat(y,")").concat(R);}else {l+="(?:".concat(w,"(").concat(E.pattern,")").concat(y,")").concat(E.modifier);}}else {if(E.modifier==="+"||E.modifier==="*"){throw new TypeError('Can not repeat "'.concat(E.name,'" without a prefix and suffix'))}l+="(".concat(E.pattern,")").concat(E.modifier);}}else {l+="(?:".concat(w).concat(y,")").concat(E.modifier);}}}if(f){if(!a)l+="".concat(h,"?");l+=!r.endsWith?"$":"(?=".concat(x,")");}else {var A=e[e.length-1];var _=typeof A==="string"?h.indexOf(A[A.length-1])>-1:A===undefined;if(!a){l+="(?:".concat(h,"(?=").concat(x,"))?");}if(!_){l+="(?=".concat(h,"|").concat(x,")");}}return new RegExp(l,flags(r))}n.tokensToRegexp=tokensToRegexp;function pathToRegexp(e,n,r){if(e instanceof RegExp)return regexpToRegexp(e,n);if(Array.isArray(e))return arrayToRegexp(e,n,r);return stringToRegexp(e,n,r)}n.pathToRegexp=pathToRegexp;})();pathToRegexp$1.exports=e;})();
	return pathToRegexp$1.exports;
}

var routePatternNormalizer = {};

var hasRequiredRoutePatternNormalizer;

function requireRoutePatternNormalizer () {
	if (hasRequiredRoutePatternNormalizer) return routePatternNormalizer;
	hasRequiredRoutePatternNormalizer = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    PARAM_SEPARATOR: null,
		    hasAdjacentParameterIssues: null,
		    normalizeAdjacentParameters: null,
		    normalizeTokensForRegexp: null,
		    stripNormalizedSeparators: null,
		    stripParameterSeparators: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    PARAM_SEPARATOR: function() {
		        return PARAM_SEPARATOR;
		    },
		    hasAdjacentParameterIssues: function() {
		        return hasAdjacentParameterIssues;
		    },
		    normalizeAdjacentParameters: function() {
		        return normalizeAdjacentParameters;
		    },
		    normalizeTokensForRegexp: function() {
		        return normalizeTokensForRegexp;
		    },
		    stripNormalizedSeparators: function() {
		        return stripNormalizedSeparators;
		    },
		    stripParameterSeparators: function() {
		        return stripParameterSeparators;
		    }
		});
		const PARAM_SEPARATOR = '_NEXTSEP_';
		function hasAdjacentParameterIssues(route) {
		    if (typeof route !== 'string') return false;
		    // Check for interception route markers followed immediately by parameters
		    // Pattern: /(.):param, /(..):param, /(...):param, /(.)(.):param etc.
		    // These patterns cause "Must have text between two parameters" errors
		    if (/\/\(\.{1,3}\):[^/\s]+/.test(route)) {
		        return true;
		    }
		    // Check for basic adjacent parameters without separators
		    // Pattern: :param1:param2 (but not :param* or other URL patterns)
		    if (/:[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/.test(route)) {
		        return true;
		    }
		    return false;
		}
		function normalizeAdjacentParameters(route) {
		    let normalized = route;
		    // Handle interception route patterns: (.):param -> (.)_NEXTSEP_:param
		    normalized = normalized.replace(/(\([^)]*\)):([^/\s]+)/g, `$1${PARAM_SEPARATOR}:$2`);
		    // Handle other adjacent parameter patterns: :param1:param2 -> :param1_NEXTSEP_:param2
		    normalized = normalized.replace(/:([^:/\s)]+)(?=:)/g, `:$1${PARAM_SEPARATOR}`);
		    return normalized;
		}
		function normalizeTokensForRegexp(tokens) {
		    return tokens.map((token)=>{
		        // Token union type: Token = string | TokenObject
		        // Literal path segments are strings, parameters/wildcards are objects
		        if (typeof token === 'object' && token !== null && // Not all token objects have 'modifier' property (e.g., simple text tokens)
		        'modifier' in token && // Only repeating modifiers (* or +) cause the validation error
		        // Other modifiers like '?' (optional) are fine
		        (token.modifier === '*' || token.modifier === '+') && // Token objects can have different shapes depending on route pattern
		        'prefix' in token && 'suffix' in token && // Both prefix and suffix must be empty strings
		        // This is what causes the validation error in path-to-regexp
		        token.prefix === '' && token.suffix === '') {
		            // Add minimal prefix to satisfy path-to-regexp validation
		            // We use '/' as it's the most common path delimiter and won't break route matching
		            // The prefix gets used in regex generation but doesn't affect parameter extraction
		            return {
		                ...token,
		                prefix: '/'
		            };
		        }
		        return token;
		    });
		}
		function stripNormalizedSeparators(pathname) {
		    // Remove separator after interception route markers
		    // Pattern: (.)_NEXTSEP_ -> (.), (..)_NEXTSEP_ -> (..), etc.
		    // The separator appears after the closing paren of interception markers
		    return pathname.replace(new RegExp(`\\)${PARAM_SEPARATOR}`, 'g'), ')');
		}
		function stripParameterSeparators(params) {
		    const cleaned = {};
		    for (const [key, value] of Object.entries(params)){
		        if (typeof value === 'string') {
		            // Remove the separator if it appears at the start of parameter values
		            cleaned[key] = value.replace(new RegExp(`^${PARAM_SEPARATOR}`), '');
		        } else if (Array.isArray(value)) {
		            // Handle array parameters (from repeated route segments)
		            cleaned[key] = value.map((item)=>typeof item === 'string' ? item.replace(new RegExp(`^${PARAM_SEPARATOR}`), '') : item);
		        } else {
		            cleaned[key] = value;
		        }
		    }
		    return cleaned;
		}

		
	} (routePatternNormalizer));
	return routePatternNormalizer;
}

/**
 * Client-safe utilities for route matching that don't import server-side
 * utilities to avoid bundling issues with Turbopack
 */

var hasRequiredRouteMatchUtils;

function requireRouteMatchUtils () {
	if (hasRequiredRouteMatchUtils) return routeMatchUtils;
	hasRequiredRouteMatchUtils = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    safeCompile: null,
		    safePathToRegexp: null,
		    safeRegexpToFunction: null,
		    safeRouteMatcher: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    safeCompile: function() {
		        return safeCompile;
		    },
		    safePathToRegexp: function() {
		        return safePathToRegexp;
		    },
		    safeRegexpToFunction: function() {
		        return safeRegexpToFunction;
		    },
		    safeRouteMatcher: function() {
		        return safeRouteMatcher;
		    }
		});
		const _pathtoregexp = requirePathToRegexp();
		const _routepatternnormalizer = requireRoutePatternNormalizer();
		function safePathToRegexp(route, keys, options) {
		    if (typeof route !== 'string') {
		        return (0, _pathtoregexp.pathToRegexp)(route, keys, options);
		    }
		    // Check if normalization is needed and cache the result
		    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
		    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
		    try {
		        return (0, _pathtoregexp.pathToRegexp)(routeToUse, keys, options);
		    } catch (error) {
		        // Only try normalization if we haven't already normalized
		        if (!needsNormalization) {
		            try {
		                const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
		                return (0, _pathtoregexp.pathToRegexp)(normalizedRoute, keys, options);
		            } catch (retryError) {
		                // If that doesn't work, fall back to original error
		                throw error;
		            }
		        }
		        throw error;
		    }
		}
		function safeCompile(route, options) {
		    // Check if normalization is needed and cache the result
		    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
		    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
		    try {
		        const compiler = (0, _pathtoregexp.compile)(routeToUse, options);
		        // If we normalized the route, wrap the compiler to strip separators from output
		        // The normalization inserts _NEXTSEP_ as a literal string in the pattern to satisfy
		        // path-to-regexp validation, but we don't want it in the final compiled URL
		        if (needsNormalization) {
		            return (params)=>{
		                return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
		            };
		        }
		        return compiler;
		    } catch (error) {
		        // Only try normalization if we haven't already normalized
		        if (!needsNormalization) {
		            try {
		                const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
		                const compiler = (0, _pathtoregexp.compile)(normalizedRoute, options);
		                // Wrap the compiler to strip separators from output
		                return (params)=>{
		                    return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
		                };
		            } catch (retryError) {
		                // If that doesn't work, fall back to original error
		                throw error;
		            }
		        }
		        throw error;
		    }
		}
		function safeRegexpToFunction(regexp, keys) {
		    const originalMatcher = (0, _pathtoregexp.regexpToFunction)(regexp, keys || []);
		    return (pathname)=>{
		        const result = originalMatcher(pathname);
		        if (!result) return false;
		        // Clean parameters before returning
		        return {
		            ...result,
		            params: (0, _routepatternnormalizer.stripParameterSeparators)(result.params)
		        };
		    };
		}
		function safeRouteMatcher(matcherFn) {
		    return (pathname)=>{
		        const result = matcherFn(pathname);
		        if (!result) return false;
		        // Clean parameters before returning
		        return (0, _routepatternnormalizer.stripParameterSeparators)(result);
		    };
		}

		
	} (routeMatchUtils));
	return routeMatchUtils;
}

var hasRequiredRouteMatcher;

function requireRouteMatcher () {
	if (hasRequiredRouteMatcher) return routeMatcher;
	hasRequiredRouteMatcher = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "getRouteMatcher", {
		    enumerable: true,
		    get: function() {
		        return getRouteMatcher;
		    }
		});
		const _utils = requireUtils$1();
		const _routematchutils = requireRouteMatchUtils();
		function getRouteMatcher({ re, groups }) {
		    const rawMatcher = (pathname)=>{
		        const routeMatch = re.exec(pathname);
		        if (!routeMatch) return false;
		        const decode = (param)=>{
		            try {
		                return decodeURIComponent(param);
		            } catch  {
		                throw Object.defineProperty(new _utils.DecodeError('failed to decode param'), "__NEXT_ERROR_CODE", {
		                    value: "E528",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		        };
		        const params = {};
		        for (const [key, group] of Object.entries(groups)){
		            const match = routeMatch[group.pos];
		            if (match !== undefined) {
		                if (group.repeat) {
		                    params[key] = match.split('/').map((entry)=>decode(entry));
		                } else {
		                    params[key] = decode(match);
		                }
		            }
		        }
		        return params;
		    };
		    // Wrap with safe matcher to handle parameter cleaning
		    return (0, _routematchutils.safeRouteMatcher)(rawMatcher);
		}

		
	} (routeMatcher));
	return routeMatcher;
}

var routeRegex = {};

var constants = {};

var hasRequiredConstants;

function requireConstants () {
	if (hasRequiredConstants) return constants;
	hasRequiredConstants = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    ACTION_SUFFIX: null,
		    APP_DIR_ALIAS: null,
		    CACHE_ONE_YEAR_SECONDS: null,
		    DOT_NEXT_ALIAS: null,
		    ESLINT_DEFAULT_DIRS: null,
		    GSP_NO_RETURNED_VALUE: null,
		    GSSP_COMPONENT_MEMBER_ERROR: null,
		    GSSP_NO_RETURNED_VALUE: null,
		    HTML_CONTENT_TYPE_HEADER: null,
		    INFINITE_CACHE: null,
		    INSTRUMENTATION_HOOK_FILENAME: null,
		    JSON_CONTENT_TYPE_HEADER: null,
		    MATCHED_PATH_HEADER: null,
		    MIDDLEWARE_FILENAME: null,
		    MIDDLEWARE_LOCATION_REGEXP: null,
		    NEXT_BODY_SUFFIX: null,
		    NEXT_CACHE_IMPLICIT_TAG_ID: null,
		    NEXT_CACHE_REVALIDATED_TAGS_HEADER: null,
		    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: null,
		    NEXT_CACHE_ROOT_PARAM_TAG_ID: null,
		    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: null,
		    NEXT_CACHE_TAGS_HEADER: null,
		    NEXT_CACHE_TAG_MAX_ITEMS: null,
		    NEXT_CACHE_TAG_MAX_LENGTH: null,
		    NEXT_DATA_SUFFIX: null,
		    NEXT_INTERCEPTION_MARKER_PREFIX: null,
		    NEXT_META_SUFFIX: null,
		    NEXT_NAV_DEPLOYMENT_ID_HEADER: null,
		    NEXT_QUERY_PARAM_PREFIX: null,
		    NEXT_RESUME_HEADER: null,
		    NEXT_RESUME_STATE_LENGTH_HEADER: null,
		    NON_STANDARD_NODE_ENV: null,
		    PAGES_DIR_ALIAS: null,
		    PRERENDER_REVALIDATE_HEADER: null,
		    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: null,
		    PROXY_FILENAME: null,
		    PROXY_LOCATION_REGEXP: null,
		    PUBLIC_DIR_MIDDLEWARE_CONFLICT: null,
		    ROOT_DIR_ALIAS: null,
		    RSC_ACTION_CLIENT_WRAPPER_ALIAS: null,
		    RSC_ACTION_ENCRYPTION_ALIAS: null,
		    RSC_ACTION_PROXY_ALIAS: null,
		    RSC_ACTION_VALIDATE_ALIAS: null,
		    RSC_CACHE_WRAPPER_ALIAS: null,
		    RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: null,
		    RSC_MOD_REF_PROXY_ALIAS: null,
		    RSC_SEGMENTS_DIR_SUFFIX: null,
		    RSC_SEGMENT_SUFFIX: null,
		    RSC_SUFFIX: null,
		    SERVER_PROPS_EXPORT_ERROR: null,
		    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: null,
		    SERVER_PROPS_SSG_CONFLICT: null,
		    SERVER_RUNTIME: null,
		    SSG_FALLBACK_EXPORT_ERROR: null,
		    SSG_GET_INITIAL_PROPS_CONFLICT: null,
		    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: null,
		    TEXT_PLAIN_CONTENT_TYPE_HEADER: null,
		    UNSTABLE_REVALIDATE_RENAME_ERROR: null,
		    WEBPACK_LAYERS: null,
		    WEBPACK_RESOURCE_QUERIES: null,
		    WEB_SOCKET_MAX_RECONNECTIONS: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    ACTION_SUFFIX: function() {
		        return ACTION_SUFFIX;
		    },
		    APP_DIR_ALIAS: function() {
		        return APP_DIR_ALIAS;
		    },
		    CACHE_ONE_YEAR_SECONDS: function() {
		        return CACHE_ONE_YEAR_SECONDS;
		    },
		    DOT_NEXT_ALIAS: function() {
		        return DOT_NEXT_ALIAS;
		    },
		    ESLINT_DEFAULT_DIRS: function() {
		        return ESLINT_DEFAULT_DIRS;
		    },
		    GSP_NO_RETURNED_VALUE: function() {
		        return GSP_NO_RETURNED_VALUE;
		    },
		    GSSP_COMPONENT_MEMBER_ERROR: function() {
		        return GSSP_COMPONENT_MEMBER_ERROR;
		    },
		    GSSP_NO_RETURNED_VALUE: function() {
		        return GSSP_NO_RETURNED_VALUE;
		    },
		    HTML_CONTENT_TYPE_HEADER: function() {
		        return HTML_CONTENT_TYPE_HEADER;
		    },
		    INFINITE_CACHE: function() {
		        return INFINITE_CACHE;
		    },
		    INSTRUMENTATION_HOOK_FILENAME: function() {
		        return INSTRUMENTATION_HOOK_FILENAME;
		    },
		    JSON_CONTENT_TYPE_HEADER: function() {
		        return JSON_CONTENT_TYPE_HEADER;
		    },
		    MATCHED_PATH_HEADER: function() {
		        return MATCHED_PATH_HEADER;
		    },
		    MIDDLEWARE_FILENAME: function() {
		        return MIDDLEWARE_FILENAME;
		    },
		    MIDDLEWARE_LOCATION_REGEXP: function() {
		        return MIDDLEWARE_LOCATION_REGEXP;
		    },
		    NEXT_BODY_SUFFIX: function() {
		        return NEXT_BODY_SUFFIX;
		    },
		    NEXT_CACHE_IMPLICIT_TAG_ID: function() {
		        return NEXT_CACHE_IMPLICIT_TAG_ID;
		    },
		    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
		        return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
		    },
		    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
		        return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
		    },
		    NEXT_CACHE_ROOT_PARAM_TAG_ID: function() {
		        return NEXT_CACHE_ROOT_PARAM_TAG_ID;
		    },
		    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
		        return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
		    },
		    NEXT_CACHE_TAGS_HEADER: function() {
		        return NEXT_CACHE_TAGS_HEADER;
		    },
		    NEXT_CACHE_TAG_MAX_ITEMS: function() {
		        return NEXT_CACHE_TAG_MAX_ITEMS;
		    },
		    NEXT_CACHE_TAG_MAX_LENGTH: function() {
		        return NEXT_CACHE_TAG_MAX_LENGTH;
		    },
		    NEXT_DATA_SUFFIX: function() {
		        return NEXT_DATA_SUFFIX;
		    },
		    NEXT_INTERCEPTION_MARKER_PREFIX: function() {
		        return NEXT_INTERCEPTION_MARKER_PREFIX;
		    },
		    NEXT_META_SUFFIX: function() {
		        return NEXT_META_SUFFIX;
		    },
		    NEXT_NAV_DEPLOYMENT_ID_HEADER: function() {
		        return NEXT_NAV_DEPLOYMENT_ID_HEADER;
		    },
		    NEXT_QUERY_PARAM_PREFIX: function() {
		        return NEXT_QUERY_PARAM_PREFIX;
		    },
		    NEXT_RESUME_HEADER: function() {
		        return NEXT_RESUME_HEADER;
		    },
		    NEXT_RESUME_STATE_LENGTH_HEADER: function() {
		        return NEXT_RESUME_STATE_LENGTH_HEADER;
		    },
		    NON_STANDARD_NODE_ENV: function() {
		        return NON_STANDARD_NODE_ENV;
		    },
		    PAGES_DIR_ALIAS: function() {
		        return PAGES_DIR_ALIAS;
		    },
		    PRERENDER_REVALIDATE_HEADER: function() {
		        return PRERENDER_REVALIDATE_HEADER;
		    },
		    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
		        return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
		    },
		    PROXY_FILENAME: function() {
		        return PROXY_FILENAME;
		    },
		    PROXY_LOCATION_REGEXP: function() {
		        return PROXY_LOCATION_REGEXP;
		    },
		    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
		        return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
		    },
		    ROOT_DIR_ALIAS: function() {
		        return ROOT_DIR_ALIAS;
		    },
		    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
		        return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
		    },
		    RSC_ACTION_ENCRYPTION_ALIAS: function() {
		        return RSC_ACTION_ENCRYPTION_ALIAS;
		    },
		    RSC_ACTION_PROXY_ALIAS: function() {
		        return RSC_ACTION_PROXY_ALIAS;
		    },
		    RSC_ACTION_VALIDATE_ALIAS: function() {
		        return RSC_ACTION_VALIDATE_ALIAS;
		    },
		    RSC_CACHE_WRAPPER_ALIAS: function() {
		        return RSC_CACHE_WRAPPER_ALIAS;
		    },
		    RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
		        return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
		    },
		    RSC_MOD_REF_PROXY_ALIAS: function() {
		        return RSC_MOD_REF_PROXY_ALIAS;
		    },
		    RSC_SEGMENTS_DIR_SUFFIX: function() {
		        return RSC_SEGMENTS_DIR_SUFFIX;
		    },
		    RSC_SEGMENT_SUFFIX: function() {
		        return RSC_SEGMENT_SUFFIX;
		    },
		    RSC_SUFFIX: function() {
		        return RSC_SUFFIX;
		    },
		    SERVER_PROPS_EXPORT_ERROR: function() {
		        return SERVER_PROPS_EXPORT_ERROR;
		    },
		    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
		        return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
		    },
		    SERVER_PROPS_SSG_CONFLICT: function() {
		        return SERVER_PROPS_SSG_CONFLICT;
		    },
		    SERVER_RUNTIME: function() {
		        return SERVER_RUNTIME;
		    },
		    SSG_FALLBACK_EXPORT_ERROR: function() {
		        return SSG_FALLBACK_EXPORT_ERROR;
		    },
		    SSG_GET_INITIAL_PROPS_CONFLICT: function() {
		        return SSG_GET_INITIAL_PROPS_CONFLICT;
		    },
		    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
		        return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
		    },
		    TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
		        return TEXT_PLAIN_CONTENT_TYPE_HEADER;
		    },
		    UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
		        return UNSTABLE_REVALIDATE_RENAME_ERROR;
		    },
		    WEBPACK_LAYERS: function() {
		        return WEBPACK_LAYERS;
		    },
		    WEBPACK_RESOURCE_QUERIES: function() {
		        return WEBPACK_RESOURCE_QUERIES;
		    },
		    WEB_SOCKET_MAX_RECONNECTIONS: function() {
		        return WEB_SOCKET_MAX_RECONNECTIONS;
		    }
		});
		const TEXT_PLAIN_CONTENT_TYPE_HEADER = 'text/plain';
		const HTML_CONTENT_TYPE_HEADER = 'text/html; charset=utf-8';
		const JSON_CONTENT_TYPE_HEADER = 'application/json; charset=utf-8';
		const NEXT_QUERY_PARAM_PREFIX = 'nxtP';
		const NEXT_INTERCEPTION_MARKER_PREFIX = 'nxtI';
		const MATCHED_PATH_HEADER = 'x-matched-path';
		const PRERENDER_REVALIDATE_HEADER = 'x-prerender-revalidate';
		const PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = 'x-prerender-revalidate-if-generated';
		const RSC_SEGMENTS_DIR_SUFFIX = '.segments';
		const RSC_SEGMENT_SUFFIX = '.segment.rsc';
		const RSC_SUFFIX = '.rsc';
		const ACTION_SUFFIX = '.action';
		const NEXT_DATA_SUFFIX = '.json';
		const NEXT_META_SUFFIX = '.meta';
		const NEXT_BODY_SUFFIX = '.body';
		const NEXT_NAV_DEPLOYMENT_ID_HEADER = 'x-nextjs-deployment-id';
		const NEXT_CACHE_TAGS_HEADER = 'x-next-cache-tags';
		const NEXT_CACHE_REVALIDATED_TAGS_HEADER = 'x-next-revalidated-tags';
		const NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = 'x-next-revalidate-tag-token';
		const NEXT_RESUME_HEADER = 'next-resume';
		const NEXT_RESUME_STATE_LENGTH_HEADER = 'x-next-resume-state-length';
		const NEXT_CACHE_TAG_MAX_ITEMS = 128;
		const NEXT_CACHE_TAG_MAX_LENGTH = 256;
		const NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
		const NEXT_CACHE_IMPLICIT_TAG_ID = '_N_T_';
		const NEXT_CACHE_ROOT_PARAM_TAG_ID = '_N_RP_';
		const CACHE_ONE_YEAR_SECONDS = 31536000;
		const INFINITE_CACHE = 0xfffffffe;
		const MIDDLEWARE_FILENAME = 'middleware';
		const MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
		const PROXY_FILENAME = 'proxy';
		const PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
		const INSTRUMENTATION_HOOK_FILENAME = 'instrumentation';
		const PAGES_DIR_ALIAS = 'private-next-pages';
		const DOT_NEXT_ALIAS = 'private-dot-next';
		const ROOT_DIR_ALIAS = 'private-next-root-dir';
		const APP_DIR_ALIAS = 'private-next-app-dir';
		const RSC_MOD_REF_PROXY_ALIAS = 'private-next-rsc-mod-ref-proxy';
		const RSC_ACTION_VALIDATE_ALIAS = 'private-next-rsc-action-validate';
		const RSC_ACTION_PROXY_ALIAS = 'private-next-rsc-server-reference';
		const RSC_CACHE_WRAPPER_ALIAS = 'private-next-rsc-cache-wrapper';
		const RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = 'private-next-rsc-track-dynamic-import';
		const RSC_ACTION_ENCRYPTION_ALIAS = 'private-next-rsc-action-encryption';
		const RSC_ACTION_CLIENT_WRAPPER_ALIAS = 'private-next-rsc-action-client-wrapper';
		const PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
		const SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
		const SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
		const SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
		const STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
		const SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
		const GSP_NO_RETURNED_VALUE = 'Your `getStaticProps` function did not return an object. Did you forget to add a `return`?';
		const GSSP_NO_RETURNED_VALUE = 'Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?';
		const UNSTABLE_REVALIDATE_RENAME_ERROR = 'The `unstable_revalidate` property is available for general use.\n' + 'Please use `revalidate` instead.';
		const GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
		const NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
		const SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
		const ESLINT_DEFAULT_DIRS = [
		    'app',
		    'pages',
		    'components',
		    'lib',
		    'src'
		];
		const SERVER_RUNTIME = {
		    edge: 'edge',
		    experimentalEdge: 'experimental-edge',
		    nodejs: 'nodejs'
		};
		const WEB_SOCKET_MAX_RECONNECTIONS = 12;
		/**
		 * The names of the webpack layers. These layers are the primitives for the
		 * webpack chunks.
		 */ const WEBPACK_LAYERS_NAMES = {
		    /**
		   * The layer for the shared code between the client and server bundles.
		   */ shared: 'shared',
		    /**
		   * The layer for server-only runtime and picking up `react-server` export conditions.
		   * Including app router RSC pages and app router custom routes and metadata routes.
		   */ reactServerComponents: 'rsc',
		    /**
		   * Server Side Rendering layer for app (ssr).
		   */ serverSideRendering: 'ssr',
		    /**
		   * The browser client bundle layer for actions.
		   */ actionBrowser: 'action-browser',
		    /**
		   * The Node.js bundle layer for the API routes.
		   */ apiNode: 'api-node',
		    /**
		   * The Edge Lite bundle layer for the API routes.
		   */ apiEdge: 'api-edge',
		    /**
		   * The layer for the middleware code.
		   */ middleware: 'middleware',
		    /**
		   * The layer for the instrumentation hooks.
		   */ instrument: 'instrument',
		    /**
		   * The layer for assets on the edge.
		   */ edgeAsset: 'edge-asset',
		    /**
		   * The browser client bundle layer for App directory.
		   */ appPagesBrowser: 'app-pages-browser',
		    /**
		   * The browser client bundle layer for Pages directory.
		   */ pagesDirBrowser: 'pages-dir-browser',
		    /**
		   * The Edge Lite bundle layer for Pages directory.
		   */ pagesDirEdge: 'pages-dir-edge',
		    /**
		   * The Node.js bundle layer for Pages directory.
		   */ pagesDirNode: 'pages-dir-node'
		};
		const WEBPACK_LAYERS = {
		    ...WEBPACK_LAYERS_NAMES,
		    GROUP: {
		        builtinReact: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser
		        ],
		        serverOnly: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser,
		            WEBPACK_LAYERS_NAMES.instrument,
		            WEBPACK_LAYERS_NAMES.middleware
		        ],
		        neutralTarget: [
		            // pages api
		            WEBPACK_LAYERS_NAMES.apiNode,
		            WEBPACK_LAYERS_NAMES.apiEdge
		        ],
		        clientOnly: [
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser
		        ],
		        bundled: [
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.actionBrowser,
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser,
		            WEBPACK_LAYERS_NAMES.shared,
		            WEBPACK_LAYERS_NAMES.instrument,
		            WEBPACK_LAYERS_NAMES.middleware
		        ],
		        appPages: [
		            // app router pages and layouts
		            WEBPACK_LAYERS_NAMES.reactServerComponents,
		            WEBPACK_LAYERS_NAMES.serverSideRendering,
		            WEBPACK_LAYERS_NAMES.appPagesBrowser,
		            WEBPACK_LAYERS_NAMES.actionBrowser
		        ]
		    }
		};
		const WEBPACK_RESOURCE_QUERIES = {
		    edgeSSREntry: '__next_edge_ssr_entry__',
		    metadata: '__next_metadata__',
		    metadataRoute: '__next_metadata_route__',
		    metadataImageMeta: '__next_metadata_image_meta__'
		};

		
	} (constants));
	return constants;
}

var escapeRegexp = {};

var hasRequiredEscapeRegexp;

function requireEscapeRegexp () {
	if (hasRequiredEscapeRegexp) return escapeRegexp;
	hasRequiredEscapeRegexp = 1;
	(function (exports$1) {
		// regexp is based on https://github.com/sindresorhus/escape-string-regexp
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "escapeStringRegexp", {
		    enumerable: true,
		    get: function() {
		        return escapeStringRegexp;
		    }
		});
		const reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
		const reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
		function escapeStringRegexp(str) {
		    // see also: https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/escapeRegExp.js#L23
		    if (reHasRegExp.test(str)) {
		        return str.replace(reReplaceRegExp, '\\$&');
		    }
		    return str;
		}

		
	} (escapeRegexp));
	return escapeRegexp;
}

var getDynamicParam = {};

var invariantError = {};

var hasRequiredInvariantError;

function requireInvariantError () {
	if (hasRequiredInvariantError) return invariantError;
	hasRequiredInvariantError = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "InvariantError", {
		    enumerable: true,
		    get: function() {
		        return InvariantError;
		    }
		});
		class InvariantError extends Error {
		    constructor(message, options){
		        super(`Invariant: ${message.endsWith('.') ? message : message + '.'} This is a bug in Next.js.`, options);
		        this.name = 'InvariantError';
		    }
		}

		
	} (invariantError));
	return invariantError;
}

var parseLoaderTree = {};

var hasRequiredParseLoaderTree;

function requireParseLoaderTree () {
	if (hasRequiredParseLoaderTree) return parseLoaderTree;
	hasRequiredParseLoaderTree = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "parseLoaderTree", {
		    enumerable: true,
		    get: function() {
		        return parseLoaderTree;
		    }
		});
		const _segment = requireSegment();
		function parseLoaderTree(tree) {
		    const [segment, parallelRoutes, modules, staticSiblings] = tree;
		    const { layout, template } = modules;
		    let { page } = modules;
		    // a __DEFAULT__ segment means that this route didn't match any of the
		    // segments in the route, so we should use the default page
		    page = segment === _segment.DEFAULT_SEGMENT_KEY ? modules.defaultPage : page;
		    const conventionPath = layout?.[1] || template?.[1] || page?.[1];
		    return {
		        page,
		        segment,
		        modules,
		        /* it can be either layout / template / page */ conventionPath,
		        parallelRoutes,
		        staticSiblings
		    };
		}

		
	} (parseLoaderTree));
	return parseLoaderTree;
}

var app = {};

var getSegmentParam = {};

var hasRequiredGetSegmentParam;

function requireGetSegmentParam () {
	if (hasRequiredGetSegmentParam) return getSegmentParam;
	hasRequiredGetSegmentParam = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    getParamProperties: null,
		    getSegmentParam: null,
		    isCatchAll: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    getParamProperties: function() {
		        return getParamProperties;
		    },
		    getSegmentParam: function() {
		        return getSegmentParam;
		    },
		    isCatchAll: function() {
		        return isCatchAll;
		    }
		});
		const _interceptionroutes = requireInterceptionRoutes();
		function getSegmentParam(segment) {
		    const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((marker)=>segment.startsWith(marker));
		    // if an interception marker is part of the path segment, we need to jump ahead
		    // to the relevant portion for param parsing
		    if (interceptionMarker) {
		        segment = segment.slice(interceptionMarker.length);
		    }
		    if (segment.startsWith('[[...') && segment.endsWith(']]')) {
		        return {
		            // TODO-APP: Optional catchall does not currently work with parallel routes,
		            // so for now aren't handling a potential interception marker.
		            paramType: 'optional-catchall',
		            paramName: segment.slice(5, -2)
		        };
		    }
		    if (segment.startsWith('[...') && segment.endsWith(']')) {
		        return {
		            paramType: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : 'catchall',
		            paramName: segment.slice(4, -1)
		        };
		    }
		    if (segment.startsWith('[') && segment.endsWith(']')) {
		        return {
		            paramType: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : 'dynamic',
		            paramName: segment.slice(1, -1)
		        };
		    }
		    return null;
		}
		function isCatchAll(type) {
		    return type === 'catchall' || type === 'catchall-intercepted-(..)(..)' || type === 'catchall-intercepted-(.)' || type === 'catchall-intercepted-(..)' || type === 'catchall-intercepted-(...)' || type === 'optional-catchall';
		}
		function getParamProperties(paramType) {
		    let repeat = false;
		    let optional = false;
		    switch(paramType){
		        case 'catchall':
		        case 'catchall-intercepted-(..)(..)':
		        case 'catchall-intercepted-(.)':
		        case 'catchall-intercepted-(..)':
		        case 'catchall-intercepted-(...)':
		            repeat = true;
		            break;
		        case 'optional-catchall':
		            repeat = true;
		            optional = true;
		            break;
		        case 'dynamic':
		        case 'dynamic-intercepted-(..)(..)':
		        case 'dynamic-intercepted-(.)':
		        case 'dynamic-intercepted-(..)':
		        case 'dynamic-intercepted-(...)':
		            break;
		        default:
		            paramType;
		    }
		    return {
		        repeat,
		        optional
		    };
		}

		
	} (getSegmentParam));
	return getSegmentParam;
}

var hasRequiredApp;

function requireApp () {
	if (hasRequiredApp) return app;
	hasRequiredApp = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    isInterceptionAppRoute: null,
		    isNormalizedAppRoute: null,
		    parseAppRoute: null,
		    parseAppRouteSegment: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    isInterceptionAppRoute: function() {
		        return isInterceptionAppRoute;
		    },
		    isNormalizedAppRoute: function() {
		        return isNormalizedAppRoute;
		    },
		    parseAppRoute: function() {
		        return parseAppRoute;
		    },
		    parseAppRouteSegment: function() {
		        return parseAppRouteSegment;
		    }
		});
		const _invarianterror = requireInvariantError();
		const _getsegmentparam = requireGetSegmentParam();
		const _interceptionroutes = requireInterceptionRoutes();
		function parseAppRouteSegment(segment) {
		    if (segment === '') {
		        return null;
		    }
		    // Check if the segment starts with an interception marker
		    const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
		    const param = (0, _getsegmentparam.getSegmentParam)(segment);
		    if (param) {
		        return {
		            type: 'dynamic',
		            name: segment,
		            param,
		            interceptionMarker
		        };
		    } else if (segment.startsWith('(') && segment.endsWith(')')) {
		        return {
		            type: 'route-group',
		            name: segment,
		            interceptionMarker
		        };
		    } else if (segment.startsWith('@')) {
		        return {
		            type: 'parallel-route',
		            name: segment,
		            interceptionMarker
		        };
		    } else {
		        return {
		            type: 'static',
		            name: segment,
		            interceptionMarker
		        };
		    }
		}
		function isNormalizedAppRoute(route) {
		    return route.normalized;
		}
		function isInterceptionAppRoute(route) {
		    return route.interceptionMarker !== undefined && route.interceptingRoute !== undefined && route.interceptedRoute !== undefined;
		}
		function parseAppRoute(pathname, normalized) {
		    const pathnameSegments = pathname.split('/').filter(Boolean);
		    // Build segments array with static and dynamic segments
		    const segments = [];
		    // Parse if this is an interception route.
		    let interceptionMarker;
		    let interceptingRoute;
		    let interceptedRoute;
		    for (const segment of pathnameSegments){
		        // Parse the segment into an AppSegment.
		        const appSegment = parseAppRouteSegment(segment);
		        if (!appSegment) {
		            continue;
		        }
		        if (normalized && (appSegment.type === 'route-group' || appSegment.type === 'parallel-route')) {
		            throw Object.defineProperty(new _invarianterror.InvariantError(`${pathname} is being parsed as a normalized route, but it has a route group or parallel route segment.`), "__NEXT_ERROR_CODE", {
		                value: "E923",
		                enumerable: false,
		                configurable: true
		            });
		        }
		        segments.push(appSegment);
		        if (appSegment.interceptionMarker) {
		            const parts = pathname.split(appSegment.interceptionMarker);
		            if (parts.length !== 2) {
		                throw Object.defineProperty(new Error(`Invalid interception route: ${pathname}`), "__NEXT_ERROR_CODE", {
		                    value: "E924",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		            interceptingRoute = normalized ? parseAppRoute(parts[0], true) : parseAppRoute(parts[0], false);
		            interceptedRoute = normalized ? parseAppRoute(parts[1], true) : parseAppRoute(parts[1], false);
		            interceptionMarker = appSegment.interceptionMarker;
		        }
		    }
		    const dynamicSegments = segments.filter((segment)=>segment.type === 'dynamic');
		    return {
		        normalized,
		        pathname,
		        segments,
		        dynamicSegments,
		        interceptionMarker,
		        interceptingRoute,
		        interceptedRoute
		    };
		}

		
	} (app));
	return app;
}

var resolveParamValue = {};

var interceptionPrefixFromParamType = {};

var hasRequiredInterceptionPrefixFromParamType;

function requireInterceptionPrefixFromParamType () {
	if (hasRequiredInterceptionPrefixFromParamType) return interceptionPrefixFromParamType;
	hasRequiredInterceptionPrefixFromParamType = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "interceptionPrefixFromParamType", {
		    enumerable: true,
		    get: function() {
		        return interceptionPrefixFromParamType;
		    }
		});
		function interceptionPrefixFromParamType(paramType) {
		    switch(paramType){
		        case 'catchall-intercepted-(..)(..)':
		        case 'dynamic-intercepted-(..)(..)':
		            return '(..)(..)';
		        case 'catchall-intercepted-(.)':
		        case 'dynamic-intercepted-(.)':
		            return '(.)';
		        case 'catchall-intercepted-(..)':
		        case 'dynamic-intercepted-(..)':
		            return '(..)';
		        case 'catchall-intercepted-(...)':
		        case 'dynamic-intercepted-(...)':
		            return '(...)';
		        case 'catchall':
		        case 'dynamic':
		        case 'optional-catchall':
		        default:
		            return null;
		    }
		}

		
	} (interceptionPrefixFromParamType));
	return interceptionPrefixFromParamType;
}

var hasRequiredResolveParamValue;

function requireResolveParamValue () {
	if (hasRequiredResolveParamValue) return resolveParamValue;
	hasRequiredResolveParamValue = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "resolveParamValue", {
		    enumerable: true,
		    get: function() {
		        return resolveParamValue;
		    }
		});
		const _invarianterror = requireInvariantError();
		const _interceptionprefixfromparamtype = requireInterceptionPrefixFromParamType();
		/**
		 * Extracts the param value from a path segment, handling interception markers
		 * based on the expected param type.
		 *
		 * @param pathSegment - The path segment to extract the value from
		 * @param params - The current params object for resolving dynamic param references
		 * @param paramType - The expected param type which may include interception marker info
		 * @returns The extracted param value
		 */ function getParamValueFromSegment(pathSegment, params, paramType) {
		    // If the segment is dynamic, resolve it from the params object
		    if (pathSegment.type === 'dynamic') {
		        return params[pathSegment.param.paramName];
		    }
		    // If the paramType indicates this is an intercepted param, strip the marker
		    // that matches the interception marker in the param type
		    const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
		    if (interceptionPrefix === pathSegment.interceptionMarker) {
		        return pathSegment.name.replace(pathSegment.interceptionMarker, '');
		    }
		    // For static segments, use the name
		    return pathSegment.name;
		}
		function resolveParamValue(paramName, paramType, depth, route, params) {
		    switch(paramType){
		        case 'catchall':
		        case 'optional-catchall':
		        case 'catchall-intercepted-(..)(..)':
		        case 'catchall-intercepted-(.)':
		        case 'catchall-intercepted-(..)':
		        case 'catchall-intercepted-(...)':
		            // For catchall routes, derive from pathname using depth to determine
		            // which segments to use
		            const processedSegments = [];
		            // Process segments to handle any embedded dynamic params
		            for(let index = depth; index < route.segments.length; index++){
		                const pathSegment = route.segments[index];
		                if (pathSegment.type === 'static') {
		                    let value = pathSegment.name;
		                    // For intercepted catch-all params, strip the marker from the first segment
		                    const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
		                    if (interceptionPrefix && index === depth && interceptionPrefix === pathSegment.interceptionMarker) {
		                        // Strip the interception marker from the value
		                        value = value.replace(pathSegment.interceptionMarker, '');
		                    }
		                    processedSegments.push(value);
		                } else {
		                    // If the segment is a param placeholder, check if we have its value
		                    if (!params.hasOwnProperty(pathSegment.param.paramName)) {
		                        // If the segment is an optional catchall, we can break out of the
		                        // loop because it's optional!
		                        if (pathSegment.param.paramType === 'optional-catchall') {
		                            break;
		                        }
		                        // Unknown param placeholder in pathname - can't derive full value
		                        return undefined;
		                    }
		                    // If the segment matches a param, use the param value
		                    // We don't encode values here as that's handled during retrieval.
		                    const paramValue = params[pathSegment.param.paramName];
		                    if (Array.isArray(paramValue)) {
		                        processedSegments.push(...paramValue);
		                    } else {
		                        processedSegments.push(paramValue);
		                    }
		                }
		            }
		            if (processedSegments.length > 0) {
		                return processedSegments;
		            } else if (paramType === 'optional-catchall') {
		                return undefined;
		            } else {
		                // We shouldn't be able to match a catchall segment without any path
		                // segments if it's not an optional catchall
		                throw Object.defineProperty(new _invarianterror.InvariantError(`Unexpected empty path segments match for a route "${route.pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
		                    value: "E931",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		        case 'dynamic':
		        case 'dynamic-intercepted-(..)(..)':
		        case 'dynamic-intercepted-(.)':
		        case 'dynamic-intercepted-(..)':
		        case 'dynamic-intercepted-(...)':
		            // For regular dynamic parameters, take the segment at this depth
		            if (depth < route.segments.length) {
		                const pathSegment = route.segments[depth];
		                // Check if the segment at this depth is a placeholder for an unknown param
		                if (pathSegment.type === 'dynamic' && !params.hasOwnProperty(pathSegment.param.paramName)) {
		                    // The segment is a placeholder like [category] and we don't have the value
		                    return undefined;
		                }
		                // If the segment matches a param, use the param value from params object
		                // Otherwise it's a static segment, just use it directly
		                // We don't encode values here as that's handled during retrieval
		                return getParamValueFromSegment(pathSegment, params, paramType);
		            }
		            return undefined;
		        default:
		            paramType;
		    }
		}

		
	} (resolveParamValue));
	return resolveParamValue;
}

var hasRequiredGetDynamicParam;

function requireGetDynamicParam () {
	if (hasRequiredGetDynamicParam) return getDynamicParam;
	hasRequiredGetDynamicParam = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    PARAMETER_PATTERN: null,
		    getDynamicParam: null,
		    interpolateParallelRouteParams: null,
		    parseMatchedParameter: null,
		    parseParameter: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    PARAMETER_PATTERN: function() {
		        return PARAMETER_PATTERN;
		    },
		    getDynamicParam: function() {
		        return getDynamicParam;
		    },
		    interpolateParallelRouteParams: function() {
		        return interpolateParallelRouteParams;
		    },
		    parseMatchedParameter: function() {
		        return parseMatchedParameter;
		    },
		    parseParameter: function() {
		        return parseParameter;
		    }
		});
		const _invarianterror = requireInvariantError();
		const _parseloadertree = requireParseLoaderTree();
		const _app = requireApp();
		const _resolveparamvalue = requireResolveParamValue();
		/**
		 * Gets the value of a param from the params object. This correctly handles the
		 * case where the param is a fallback route param and encodes the resulting
		 * value.
		 *
		 * @param interpolatedParams - The params object.
		 * @param segmentKey - The key of the segment.
		 * @param fallbackRouteParams - The fallback route params.
		 * @returns The value of the param.
		 */ function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
		    let value = interpolatedParams[segmentKey];
		    if (fallbackRouteParams?.has(segmentKey)) {
		        // We know that the fallback route params has the segment key because we
		        // checked that above.
		        const [searchValue] = fallbackRouteParams.get(segmentKey);
		        value = searchValue;
		    } else if (Array.isArray(value)) {
		        value = value.map((i)=>encodeURIComponent(i));
		    } else if (typeof value === 'string') {
		        value = encodeURIComponent(value);
		    }
		    return value;
		}
		function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
		    const interpolated = structuredClone(params);
		    // Stack-based traversal with depth tracking
		    const stack = [
		        {
		            tree: loaderTree,
		            depth: 0
		        }
		    ];
		    // Parse the route from the provided page path.
		    const route = (0, _app.parseAppRoute)(pagePath, true);
		    while(stack.length > 0){
		        const { tree, depth } = stack.pop();
		        const { segment, parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
		        const appSegment = (0, _app.parseAppRouteSegment)(segment);
		        if (appSegment?.type === 'dynamic' && !interpolated.hasOwnProperty(appSegment.param.paramName) && // If the param is in the fallback route params, we don't need to
		        // interpolate it because it's already marked as being unknown.
		        !fallbackRouteParams?.has(appSegment.param.paramName)) {
		            const { paramName, paramType } = appSegment.param;
		            const paramValue = (0, _resolveparamvalue.resolveParamValue)(paramName, paramType, depth, route, interpolated);
		            if (paramValue !== undefined) {
		                interpolated[paramName] = paramValue;
		            } else if (paramType !== 'optional-catchall') {
		                throw Object.defineProperty(new _invarianterror.InvariantError(`Could not resolve param value for segment: ${paramName}`), "__NEXT_ERROR_CODE", {
		                    value: "E932",
		                    enumerable: false,
		                    configurable: true
		                });
		            }
		        }
		        // Calculate next depth - increment if this is not a route group and not empty
		        let nextDepth = depth;
		        if (appSegment && appSegment.type !== 'route-group' && appSegment.type !== 'parallel-route') {
		            nextDepth++;
		        }
		        // Add all parallel routes to the stack for processing
		        for (const parallelRoute of Object.values(parallelRoutes)){
		            stack.push({
		                tree: parallelRoute,
		                depth: nextDepth
		            });
		        }
		    }
		    return interpolated;
		}
		function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams, staticSiblings) {
		    let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
		    // handle the case where an optional catchall does not have a value,
		    // e.g. `/dashboard/[[...slug]]` when requesting `/dashboard`
		    if (!value || value.length === 0) {
		        if (dynamicParamType === 'oc') {
		            return {
		                param: segmentKey,
		                value: null,
		                type: dynamicParamType,
		                treeSegment: [
		                    segmentKey,
		                    '',
		                    dynamicParamType,
		                    staticSiblings
		                ]
		            };
		        }
		        throw Object.defineProperty(new _invarianterror.InvariantError(`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
		            value: "E864",
		            enumerable: false,
		            configurable: true
		        });
		    }
		    const paramCacheKey = Array.isArray(value) ? value.join('/') : value;
		    return {
		        param: segmentKey,
		        // The value that is passed to user code.
		        value,
		        // The value that is rendered in the router tree.
		        // TODO: If the number of static siblings exceeds some threshold (e.g.,
		        // dozens or hundreds), consider sending a Bloom filter instead of the full
		        // array to reduce payload size. The client would then use the Bloom filter
		        // to check membership with a small false positive rate.
		        treeSegment: [
		            segmentKey,
		            paramCacheKey,
		            dynamicParamType,
		            staticSiblings
		        ],
		        type: dynamicParamType
		    };
		}
		const PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
		function parseParameter(param) {
		    const match = param.match(PARAMETER_PATTERN);
		    if (!match) {
		        return parseMatchedParameter(param);
		    }
		    return parseMatchedParameter(match[2]);
		}
		function parseMatchedParameter(param) {
		    const optional = param.startsWith('[') && param.endsWith(']');
		    if (optional) {
		        param = param.slice(1, -1);
		    }
		    const repeat = param.startsWith('...');
		    if (repeat) {
		        param = param.slice(3);
		    }
		    return {
		        key: param,
		        repeat,
		        optional
		    };
		}

		
	} (getDynamicParam));
	return getDynamicParam;
}

var hasRequiredRouteRegex;

function requireRouteRegex () {
	if (hasRequiredRouteRegex) return routeRegex;
	hasRequiredRouteRegex = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    getNamedMiddlewareRegex: null,
		    getNamedRouteRegex: null,
		    getRouteRegex: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    getNamedMiddlewareRegex: function() {
		        return getNamedMiddlewareRegex;
		    },
		    getNamedRouteRegex: function() {
		        return getNamedRouteRegex;
		    },
		    getRouteRegex: function() {
		        return getRouteRegex;
		    }
		});
		const _constants = requireConstants();
		const _interceptionroutes = requireInterceptionRoutes();
		const _escaperegexp = requireEscapeRegexp();
		const _removetrailingslash = requireRemoveTrailingSlash();
		const _getdynamicparam = requireGetDynamicParam();
		function getParametrizedRoute(route, includeSuffix, includePrefix) {
		    const groups = {};
		    let groupIndex = 1;
		    const segments = [];
		    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split('/')){
		        const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
		        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN) // Check for parameters
		        ;
		        if (markerMatch && paramMatches && paramMatches[2]) {
		            const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
		            groups[key] = {
		                pos: groupIndex++,
		                repeat,
		                optional
		            };
		            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(markerMatch)}([^/]+?)`);
		        } else if (paramMatches && paramMatches[2]) {
		            const { key, repeat, optional } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
		            groups[key] = {
		                pos: groupIndex++,
		                repeat,
		                optional
		            };
		            if (includePrefix && paramMatches[1]) {
		                segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
		            }
		            let s = repeat ? optional ? '(?:/(.+?))?' : '/(.+?)' : '/([^/]+?)';
		            // Remove the leading slash if includePrefix already added it.
		            if (includePrefix && paramMatches[1]) {
		                s = s.substring(1);
		            }
		            segments.push(s);
		        } else {
		            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
		        }
		        // If there's a suffix, add it to the segments if it's enabled.
		        if (includeSuffix && paramMatches && paramMatches[3]) {
		            segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
		        }
		    }
		    return {
		        parameterizedRoute: segments.join(''),
		        groups
		    };
		}
		function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
		    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
		    let re = parameterizedRoute;
		    if (!excludeOptionalTrailingSlash) {
		        re += '(?:/)?';
		    }
		    return {
		        re: new RegExp(`^${re}$`),
		        groups: groups
		    };
		}
		/**
		 * Builds a function to generate a minimal routeKey using only a-z and minimal
		 * number of characters.
		 */ function buildGetSafeRouteKey() {
		    let i = 0;
		    return ()=>{
		        let routeKey = '';
		        let j = ++i;
		        while(j > 0){
		            routeKey += String.fromCharCode(97 + (j - 1) % 26);
		            j = Math.floor((j - 1) / 26);
		        }
		        return routeKey;
		    };
		}
		function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
		    const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(segment);
		    // replace any non-word characters since they can break
		    // the named regex
		    let cleanedKey = key.replace(/\W/g, '');
		    if (keyPrefix) {
		        cleanedKey = `${keyPrefix}${cleanedKey}`;
		    }
		    let invalidKey = false;
		    // check if the key is still invalid and fallback to using a known
		    // safe key
		    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
		        invalidKey = true;
		    }
		    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
		        invalidKey = true;
		    }
		    if (invalidKey) {
		        cleanedKey = getSafeRouteKey();
		    }
		    const duplicateKey = cleanedKey in routeKeys;
		    if (keyPrefix) {
		        routeKeys[cleanedKey] = `${keyPrefix}${key}`;
		    } else {
		        routeKeys[cleanedKey] = key;
		    }
		    // if the segment has an interception marker, make sure that's part of the regex pattern
		    // this is to ensure that the route with the interception marker doesn't incorrectly match
		    // the non-intercepted route (ie /app/(.)[username] should not match /app/[username])
		    const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : '';
		    let pattern;
		    if (duplicateKey && backreferenceDuplicateKeys) {
		        // Use a backreference to the key to ensure that the key is the same value
		        // in each of the placeholders.
		        pattern = `\\k<${cleanedKey}>`;
		    } else if (repeat) {
		        pattern = `(?<${cleanedKey}>.+?)`;
		    } else {
		        pattern = `(?<${cleanedKey}>[^/]+?)`;
		    }
		    return {
		        key,
		        pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
		        cleanedKey: cleanedKey,
		        optional,
		        repeat
		    };
		}
		function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
		    names: {},
		    intercepted: {}
		}) {
		    const getSafeRouteKey = buildGetSafeRouteKey();
		    const routeKeys = {};
		    const segments = [];
		    const inverseParts = [];
		    // Ensure we don't mutate the original reference object.
		    reference = structuredClone(reference);
		    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split('/')){
		        const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m)=>segment.startsWith(m));
		        const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN) // Check for parameters
		        ;
		        const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : undefined;
		        let keyPrefix;
		        if (interceptionMarker && paramMatches?.[2]) {
		            keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
		            reference.intercepted[paramMatches[2]] = interceptionMarker;
		        } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
		            keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
		        } else {
		            keyPrefix = prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : undefined;
		        }
		        if (interceptionMarker && paramMatches && paramMatches[2]) {
		            // If there's an interception marker, add it to the segments.
		            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
		                getSafeRouteKey,
		                interceptionMarker,
		                segment: paramMatches[2],
		                routeKeys,
		                keyPrefix,
		                backreferenceDuplicateKeys
		            });
		            segments.push(pattern);
		            inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
		            reference.names[key] ??= cleanedKey;
		        } else if (paramMatches && paramMatches[2]) {
		            // If there's a prefix, add it to the segments if it's enabled.
		            if (includePrefix && paramMatches[1]) {
		                segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
		                inverseParts.push(`/${paramMatches[1]}`);
		            }
		            const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
		                getSafeRouteKey,
		                segment: paramMatches[2],
		                routeKeys,
		                keyPrefix,
		                backreferenceDuplicateKeys
		            });
		            // Remove the leading slash if includePrefix already added it.
		            let s = pattern;
		            if (includePrefix && paramMatches[1]) {
		                s = s.substring(1);
		            }
		            segments.push(s);
		            inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? '*' : '+' : ''}`);
		            reference.names[key] ??= cleanedKey;
		        } else {
		            segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
		            inverseParts.push(`/${segment}`);
		        }
		        // If there's a suffix, add it to the segments if it's enabled.
		        if (includeSuffix && paramMatches && paramMatches[3]) {
		            segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
		            inverseParts.push(paramMatches[3]);
		        }
		    }
		    return {
		        namedParameterizedRoute: segments.join(''),
		        routeKeys,
		        pathToRegexpPattern: inverseParts.join(''),
		        reference
		    };
		}
		function getNamedRouteRegex(normalizedRoute, options) {
		    const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
		    let namedRegex = result.namedParameterizedRoute;
		    if (!options.excludeOptionalTrailingSlash) {
		        namedRegex += '(?:/)?';
		    }
		    return {
		        ...getRouteRegex(normalizedRoute, options),
		        namedRegex: `^${namedRegex}$`,
		        routeKeys: result.routeKeys,
		        pathToRegexpPattern: result.pathToRegexpPattern,
		        reference: result.reference
		    };
		}
		function getNamedMiddlewareRegex(normalizedRoute, options) {
		    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
		    const { catchAll = true } = options;
		    if (parameterizedRoute === '/') {
		        let catchAllRegex = catchAll ? '.*' : '';
		        return {
		            namedRegex: `^/${catchAllRegex}$`
		        };
		    }
		    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, undefined);
		    let catchAllGroupedRegex = catchAll ? '(?:(/.*)?)' : '';
		    return {
		        namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
		    };
		}

		
	} (routeRegex));
	return routeRegex;
}

var hasRequiredInterpolateAs;

function requireInterpolateAs () {
	if (hasRequiredInterpolateAs) return interpolateAs;
	hasRequiredInterpolateAs = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "interpolateAs", {
		    enumerable: true,
		    get: function() {
		        return interpolateAs;
		    }
		});
		const _routematcher = requireRouteMatcher();
		const _routeregex = requireRouteRegex();
		function interpolateAs(route, asPathname, query) {
		    let interpolatedRoute = '';
		    const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
		    const dynamicGroups = dynamicRegex.groups;
		    const dynamicMatches = // Try to match the dynamic route against the asPath
		    (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
		    // TODO: should this take priority; also need to change in the router.
		    query;
		    interpolatedRoute = route;
		    const params = Object.keys(dynamicGroups);
		    if (!params.every((param)=>{
		        let value = dynamicMatches[param] || '';
		        const { repeat, optional } = dynamicGroups[param];
		        // support single-level catch-all
		        // TODO: more robust handling for user-error (passing `/`)
		        let replaced = `[${repeat ? '...' : ''}${param}]`;
		        if (optional) {
		            replaced = `${!value ? '/' : ''}[${replaced}]`;
		        }
		        if (repeat && !Array.isArray(value)) value = [
		            value
		        ];
		        return (optional || param in dynamicMatches) && // Interpolate group into data URL if present
		        (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map(// these values should be fully encoded instead of just
		        // path delimiter escaped since they are being inserted
		        // into the URL and we expect URL encoded segments
		        // when parsing dynamic route params
		        (segment)=>encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
		    })) {
		        interpolatedRoute = '' // did not satisfy all requirements
		        ;
		    // n.b. We ignore this error because we handle warning for this case in
		    // development in the `<Link>` component directly.
		    }
		    return {
		        params,
		        result: interpolatedRoute
		    };
		}

		
	} (interpolateAs));
	return interpolateAs;
}

var resolveHref_1 = resolveHref.exports;

var hasRequiredResolveHref;

function requireResolveHref () {
	if (hasRequiredResolveHref) return resolveHref.exports;
	hasRequiredResolveHref = 1;
	(function (module, exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "resolveHref", {
		    enumerable: true,
		    get: function() {
		        return resolveHref;
		    }
		});
		const _querystring = requireQuerystring();
		const _formaturl = requireFormatUrl();
		const _omit = requireOmit();
		const _utils = requireUtils$1();
		const _normalizetrailingslash = requireNormalizeTrailingSlash();
		const _islocalurl = requireIsLocalUrl();
		const _utils1 = requireUtils();
		const _interpolateas = requireInterpolateAs();
		const _routeregex = requireRouteRegex();
		const _routematcher = requireRouteMatcher();
		function resolveHref(router, href, resolveAs) {
		    // we use a dummy base url for relative urls
		    let base;
		    let urlAsString = typeof href === 'string' ? href : (0, _formaturl.formatWithValidation)(href);
		    // repeated slashes and backslashes in the URL are considered
		    // invalid and will never match a Next.js page/file
		    // https://www.rfc-editor.org/rfc/rfc3986.html#section-3.1
		    const urlProtoMatch = urlAsString.match(/^[a-z][a-z0-9+.-]*:\/\//i);
		    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
		    const urlParts = urlAsStringNoProto.split('?', 1);
		    if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
		        console.error(`Invalid href '${urlAsString}' passed to next/router in page: '${router.pathname}'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.`);
		        const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
		        urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
		    }
		    // Return because it cannot be routed by the Next.js router
		    if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
		        return resolveAs ? [
		            urlAsString
		        ] : urlAsString;
		    }
		    try {
		        let baseBase = urlAsString.startsWith('#') ? router.asPath : router.pathname;
		        // If the provided href is only a query string, it is safer to use the asPath
		        // considering rewrites.
		        if (urlAsString.startsWith('?')) {
		            baseBase = router.asPath;
		            // However, if is a dynamic route, we need to use the pathname to preserve the
		            // query interpolation and rewrites (router.pathname will look like "/[slug]").
		            if ((0, _utils1.isDynamicRoute)(router.pathname)) {
		                baseBase = router.pathname;
		                const routeRegex = (0, _routeregex.getRouteRegex)(router.pathname);
		                const match = (0, _routematcher.getRouteMatcher)(routeRegex)(router.asPath);
		                // For dynamic routes, if asPath doesn't match the pathname regex, it is a rewritten path.
		                // In this case, should use asPath to preserve the current URL.
		                if (!match) {
		                    baseBase = router.asPath;
		                }
		            // Note: There is an edge case where the pathname is dynamic, and also a rewrite path to the same segment.
		            // E.g. in "/[slug]" path, rewrite "/foo" -> "/bar"
		            // In this case, it will be treated as a non-rewritten path and possibly interpolate the query string.
		            // E.g., "/any?slug=foo" will become the content of "/foo", not rewritten as "/bar"
		            // This is currently a trade-off of not resolving rewrite paths on every Router/Link call,
		            // but using a lighter route regex pattern check.
		            }
		        }
		        base = new URL(baseBase, 'http://n');
		    } catch (_) {
		        // fallback to / for invalid asPath values e.g. //
		        base = new URL('/', 'http://n');
		    }
		    try {
		        const finalUrl = new URL(urlAsString, base);
		        finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
		        let interpolatedAs = '';
		        if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
		            const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
		            const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
		            if (result) {
		                interpolatedAs = (0, _formaturl.formatWithValidation)({
		                    pathname: result,
		                    hash: finalUrl.hash,
		                    query: (0, _omit.omit)(query, params)
		                });
		            }
		        }
		        // if the origin didn't change, it means we received a relative href
		        const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
		        return resolveAs ? [
		            resolvedHref,
		            interpolatedAs || resolvedHref
		        ] : resolvedHref;
		    } catch (_) {
		        return resolveAs ? [
		            urlAsString
		        ] : urlAsString;
		    }
		}

		if ((typeof exports$1.default === 'function' || (typeof exports$1.default === 'object' && exports$1.default !== null)) && typeof exports$1.default.__esModule === 'undefined') {
		  Object.defineProperty(exports$1.default, '__esModule', { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		}

		
	} (resolveHref, resolveHref.exports));
	return resolveHref.exports;
}

var addLocale$1 = {exports: {}};

var addLocale = {};

var addPathPrefix = {};

var hasRequiredAddPathPrefix;

function requireAddPathPrefix () {
	if (hasRequiredAddPathPrefix) return addPathPrefix;
	hasRequiredAddPathPrefix = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "addPathPrefix", {
		    enumerable: true,
		    get: function() {
		        return addPathPrefix;
		    }
		});
		const _parsepath = requireParsePath();
		function addPathPrefix(path, prefix) {
		    if (!path.startsWith('/') || !prefix) {
		        return path;
		    }
		    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
		    return `${prefix}${pathname}${query}${hash}`;
		}

		
	} (addPathPrefix));
	return addPathPrefix;
}

var hasRequiredAddLocale$1;

function requireAddLocale$1 () {
	if (hasRequiredAddLocale$1) return addLocale;
	hasRequiredAddLocale$1 = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "addLocale", {
		    enumerable: true,
		    get: function() {
		        return addLocale;
		    }
		});
		const _addpathprefix = requireAddPathPrefix();
		const _pathhasprefix = requirePathHasPrefix();
		function addLocale(path, locale, defaultLocale, ignorePrefix) {
		    // If no locale was given or the locale is the default locale, we don't need
		    // to prefix the path.
		    if (!locale || locale === defaultLocale) return path;
		    const lower = path.toLowerCase();
		    // If the path is an API path or the path already has the locale prefix, we
		    // don't need to prefix the path.
		    if (!ignorePrefix) {
		        if ((0, _pathhasprefix.pathHasPrefix)(lower, '/api')) return path;
		        if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`)) return path;
		    }
		    // Add the locale prefix to the path.
		    return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
		}

		
	} (addLocale));
	return addLocale;
}

var addLocale_1 = addLocale$1.exports;

var hasRequiredAddLocale;

function requireAddLocale () {
	if (hasRequiredAddLocale) return addLocale$1.exports;
	hasRequiredAddLocale = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "addLocale", {
		  enumerable: true,
		  get: function() {
		    return addLocale;
		  }
		});
		const _normalizetrailingslash = requireNormalizeTrailingSlash();
		const addLocale = (path, ...args) => {
		  if (define_process_env_default.__NEXT_I18N_SUPPORT) {
		    return (0, _normalizetrailingslash.normalizePathTrailingSlash)(requireAddLocale$1().addLocale(path, ...args));
		  }
		  return path;
		};
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (addLocale$1, addLocale$1.exports));
	return addLocale$1.exports;
}

var routerContext_sharedRuntime = {};

var _interop_require_default = {};

var hasRequired_interop_require_default;

function require_interop_require_default () {
	if (hasRequired_interop_require_default) return _interop_require_default;
	hasRequired_interop_require_default = 1;
	"use strict";

	function _interop_require_default$1(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}
	_interop_require_default._ = _interop_require_default$1;
	return _interop_require_default;
}

var hasRequiredRouterContext_sharedRuntime;

function requireRouterContext_sharedRuntime () {
	if (hasRequiredRouterContext_sharedRuntime) return routerContext_sharedRuntime;
	hasRequiredRouterContext_sharedRuntime = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "RouterContext", {
		  enumerable: true,
		  get: function() {
		    return RouterContext;
		  }
		});
		const _interop_require_default = /*@__PURE__*/ require_interop_require_default();
		const _react = /* @__PURE__ */ _interop_require_default._(requireReact());
		const RouterContext = _react.default.createContext(null);
		if (false) {
		  RouterContext.displayName = "RouterContext";
		} 
	} (routerContext_sharedRuntime));
	return routerContext_sharedRuntime;
}

var useIntersection = {exports: {}};

var requestIdleCallback = {exports: {}};

var requestIdleCallback_1 = requestIdleCallback.exports;

var hasRequiredRequestIdleCallback;

function requireRequestIdleCallback () {
	if (hasRequiredRequestIdleCallback) return requestIdleCallback.exports;
	hasRequiredRequestIdleCallback = 1;
	(function (module, exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		0 && (module.exports = {
		    cancelIdleCallback: null,
		    requestIdleCallback: null
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports$1, {
		    cancelIdleCallback: function() {
		        return cancelIdleCallback;
		    },
		    requestIdleCallback: function() {
		        return requestIdleCallback;
		    }
		});
		const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
		    let start = Date.now();
		    return self.setTimeout(function() {
		        cb({
		            didTimeout: false,
		            timeRemaining: function() {
		                return Math.max(0, 50 - (Date.now() - start));
		            }
		        });
		    }, 1);
		};
		const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
		    return clearTimeout(id);
		};

		if ((typeof exports$1.default === 'function' || (typeof exports$1.default === 'object' && exports$1.default !== null)) && typeof exports$1.default.__esModule === 'undefined') {
		  Object.defineProperty(exports$1.default, '__esModule', { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		}

		
	} (requestIdleCallback, requestIdleCallback.exports));
	return requestIdleCallback.exports;
}

var useIntersection_1 = useIntersection.exports;

var hasRequiredUseIntersection;

function requireUseIntersection () {
	if (hasRequiredUseIntersection) return useIntersection.exports;
	hasRequiredUseIntersection = 1;
	(function (module, exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "useIntersection", {
		    enumerable: true,
		    get: function() {
		        return useIntersection;
		    }
		});
		const _react = requireReact();
		const _requestidlecallback = requireRequestIdleCallback();
		const hasIntersectionObserver = typeof IntersectionObserver === 'function';
		const observers = new Map();
		const idList = [];
		function createObserver(options) {
		    const id = {
		        root: options.root || null,
		        margin: options.rootMargin || ''
		    };
		    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
		    let instance;
		    if (existing) {
		        instance = observers.get(existing);
		        if (instance) {
		            return instance;
		        }
		    }
		    const elements = new Map();
		    const observer = new IntersectionObserver((entries)=>{
		        entries.forEach((entry)=>{
		            const callback = elements.get(entry.target);
		            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
		            if (callback && isVisible) {
		                callback(isVisible);
		            }
		        });
		    }, options);
		    instance = {
		        id,
		        observer,
		        elements
		    };
		    idList.push(id);
		    observers.set(id, instance);
		    return instance;
		}
		function observe(element, callback, options) {
		    const { id, observer, elements } = createObserver(options);
		    elements.set(element, callback);
		    observer.observe(element);
		    return function unobserve() {
		        elements.delete(element);
		        observer.unobserve(element);
		        // Destroy observer when there's nothing left to watch:
		        if (elements.size === 0) {
		            observer.disconnect();
		            observers.delete(id);
		            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
		            if (index > -1) {
		                idList.splice(index, 1);
		            }
		        }
		    };
		}
		function useIntersection({ rootRef, rootMargin, disabled }) {
		    const isDisabled = disabled || !hasIntersectionObserver;
		    const [visible, setVisible] = (0, _react.useState)(false);
		    const elementRef = (0, _react.useRef)(null);
		    const setElement = (0, _react.useCallback)((element)=>{
		        elementRef.current = element;
		    }, []);
		    (0, _react.useEffect)(()=>{
		        if (hasIntersectionObserver) {
		            if (isDisabled || visible) return;
		            const element = elementRef.current;
		            if (element && element.tagName) {
		                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
		                    root: rootRef?.current,
		                    rootMargin
		                });
		                return unobserve;
		            }
		        } else {
		            if (!visible) {
		                const idleCallback = (0, _requestidlecallback.requestIdleCallback)(()=>setVisible(true));
		                return ()=>(0, _requestidlecallback.cancelIdleCallback)(idleCallback);
		            }
		        }
		    // eslint-disable-next-line react-hooks/exhaustive-deps
		    }, [
		        isDisabled,
		        rootMargin,
		        rootRef,
		        visible,
		        elementRef.current
		    ]);
		    const resetVisible = (0, _react.useCallback)(()=>{
		        setVisible(false);
		    }, []);
		    return [
		        setElement,
		        visible,
		        resetVisible
		    ];
		}

		if ((typeof exports$1.default === 'function' || (typeof exports$1.default === 'object' && exports$1.default !== null)) && typeof exports$1.default.__esModule === 'undefined') {
		  Object.defineProperty(exports$1.default, '__esModule', { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		}

		
	} (useIntersection, useIntersection.exports));
	return useIntersection.exports;
}

var getDomainLocale = {exports: {}};

var normalizeLocalePath$1 = {exports: {}};

var normalizeLocalePath = {};

var hasRequiredNormalizeLocalePath$1;

function requireNormalizeLocalePath$1 () {
	if (hasRequiredNormalizeLocalePath$1) return normalizeLocalePath;
	hasRequiredNormalizeLocalePath$1 = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "normalizeLocalePath", {
		    enumerable: true,
		    get: function() {
		        return normalizeLocalePath;
		    }
		});
		/**
		 * A cache of lowercased locales for each list of locales. This is stored as a
		 * WeakMap so if the locales are garbage collected, the cache entry will be
		 * removed as well.
		 */ const cache = new WeakMap();
		function normalizeLocalePath(pathname, locales) {
		    // If locales is undefined, return the pathname as is.
		    if (!locales) return {
		        pathname
		    };
		    // Get the cached lowercased locales or create a new cache entry.
		    let lowercasedLocales = cache.get(locales);
		    if (!lowercasedLocales) {
		        lowercasedLocales = locales.map((locale)=>locale.toLowerCase());
		        cache.set(locales, lowercasedLocales);
		    }
		    let detectedLocale;
		    // The first segment will be empty, because it has a leading `/`. If
		    // there is no further segment, there is no locale (or it's the default).
		    const segments = pathname.split('/', 2);
		    // If there's no second segment (ie, the pathname is just `/`), there's no
		    // locale.
		    if (!segments[1]) return {
		        pathname
		    };
		    // The second segment will contain the locale part if any.
		    const segment = segments[1].toLowerCase();
		    // See if the segment matches one of the locales. If it doesn't, there is
		    // no locale (or it's the default).
		    const index = lowercasedLocales.indexOf(segment);
		    if (index < 0) return {
		        pathname
		    };
		    // Return the case-sensitive locale.
		    detectedLocale = locales[index];
		    // Remove the `/${locale}` part of the pathname.
		    pathname = pathname.slice(detectedLocale.length + 1) || '/';
		    return {
		        pathname,
		        detectedLocale
		    };
		}

		
	} (normalizeLocalePath));
	return normalizeLocalePath;
}

var normalizeLocalePath_1 = normalizeLocalePath$1.exports;

var hasRequiredNormalizeLocalePath;

function requireNormalizeLocalePath () {
	if (hasRequiredNormalizeLocalePath) return normalizeLocalePath$1.exports;
	hasRequiredNormalizeLocalePath = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "normalizeLocalePath", {
		  enumerable: true,
		  get: function() {
		    return normalizeLocalePath;
		  }
		});
		const normalizeLocalePath = (pathname, locales) => {
		  if (define_process_env_default.__NEXT_I18N_SUPPORT) {
		    return requireNormalizeLocalePath$1().normalizeLocalePath(pathname, locales);
		  }
		  return {
		    pathname,
		    detectedLocale: void 0
		  };
		};
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (normalizeLocalePath$1, normalizeLocalePath$1.exports));
	return normalizeLocalePath$1.exports;
}

var detectDomainLocale$1 = {exports: {}};

var detectDomainLocale = {};

var hasRequiredDetectDomainLocale$1;

function requireDetectDomainLocale$1 () {
	if (hasRequiredDetectDomainLocale$1) return detectDomainLocale;
	hasRequiredDetectDomainLocale$1 = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "detectDomainLocale", {
		    enumerable: true,
		    get: function() {
		        return detectDomainLocale;
		    }
		});
		function detectDomainLocale(domainItems, hostname, detectedLocale) {
		    if (!domainItems) return;
		    if (detectedLocale) {
		        detectedLocale = detectedLocale.toLowerCase();
		    }
		    for (const item of domainItems){
		        // remove port if present
		        const domainHostname = item.domain?.split(':', 1)[0].toLowerCase();
		        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale)=>locale.toLowerCase() === detectedLocale)) {
		            return item;
		        }
		    }
		}

		
	} (detectDomainLocale));
	return detectDomainLocale;
}

var detectDomainLocale_1 = detectDomainLocale$1.exports;

var hasRequiredDetectDomainLocale;

function requireDetectDomainLocale () {
	if (hasRequiredDetectDomainLocale) return detectDomainLocale$1.exports;
	hasRequiredDetectDomainLocale = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "detectDomainLocale", {
		  enumerable: true,
		  get: function() {
		    return detectDomainLocale;
		  }
		});
		const detectDomainLocale = (...args) => {
		  if (define_process_env_default.__NEXT_I18N_SUPPORT) {
		    return requireDetectDomainLocale$1().detectDomainLocale(...args);
		  }
		};
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (detectDomainLocale$1, detectDomainLocale$1.exports));
	return detectDomainLocale$1.exports;
}

var getDomainLocale_1 = getDomainLocale.exports;

var hasRequiredGetDomainLocale;

function requireGetDomainLocale () {
	if (hasRequiredGetDomainLocale) return getDomainLocale.exports;
	hasRequiredGetDomainLocale = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "getDomainLocale", {
		  enumerable: true,
		  get: function() {
		    return getDomainLocale;
		  }
		});
		const _normalizetrailingslash = requireNormalizeTrailingSlash();
		const basePath = define_process_env_default.__NEXT_ROUTER_BASEPATH || "";
		function getDomainLocale(path, locale, locales, domainLocales) {
		  if (define_process_env_default.__NEXT_I18N_SUPPORT) {
		    const normalizeLocalePath = requireNormalizeLocalePath().normalizeLocalePath;
		    const detectDomainLocale = requireDetectDomainLocale().detectDomainLocale;
		    const target = locale || normalizeLocalePath(path, locales).detectedLocale;
		    const domain = detectDomainLocale(domainLocales, void 0, target);
		    if (domain) {
		      const proto = `http${domain.http ? "" : "s"}://`;
		      const finalLocale = target === domain.defaultLocale ? "" : `/${target}`;
		      return `${proto}${domain.domain}${(0, _normalizetrailingslash.normalizePathTrailingSlash)(`${basePath}${finalLocale}${path}`)}`;
		    }
		    return false;
		  } else {
		    return false;
		  }
		}
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (getDomainLocale, getDomainLocale.exports));
	return getDomainLocale.exports;
}

var addBasePath = {exports: {}};

var addBasePath_1 = addBasePath.exports;

var hasRequiredAddBasePath;

function requireAddBasePath () {
	if (hasRequiredAddBasePath) return addBasePath.exports;
	hasRequiredAddBasePath = 1;
	(function (module, exports$1) {
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "addBasePath", {
		  enumerable: true,
		  get: function() {
		    return addBasePath;
		  }
		});
		const _addpathprefix = requireAddPathPrefix();
		const _normalizetrailingslash = requireNormalizeTrailingSlash();
		const basePath = define_process_env_default.__NEXT_ROUTER_BASEPATH || "";
		function addBasePath(path, required) {
		  return (0, _normalizetrailingslash.normalizePathTrailingSlash)(define_process_env_default.__NEXT_MANUAL_CLIENT_BASE_PATH && !required ? path : (0, _addpathprefix.addPathPrefix)(path, basePath));
		}
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (addBasePath, addBasePath.exports));
	return addBasePath.exports;
}

var useMergedRef = {exports: {}};

var useMergedRef_1 = useMergedRef.exports;

var hasRequiredUseMergedRef;

function requireUseMergedRef () {
	if (hasRequiredUseMergedRef) return useMergedRef.exports;
	hasRequiredUseMergedRef = 1;
	(function (module, exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports$1, "useMergedRef", {
		    enumerable: true,
		    get: function() {
		        return useMergedRef;
		    }
		});
		const _react = requireReact();
		function useMergedRef(refA, refB) {
		    const cleanupA = (0, _react.useRef)(null);
		    const cleanupB = (0, _react.useRef)(null);
		    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
		    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
		    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
		    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
		    // (because it hasn't been updated for React 19)
		    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
		    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
		    return (0, _react.useCallback)((current)=>{
		        if (current === null) {
		            const cleanupFnA = cleanupA.current;
		            if (cleanupFnA) {
		                cleanupA.current = null;
		                cleanupFnA();
		            }
		            const cleanupFnB = cleanupB.current;
		            if (cleanupFnB) {
		                cleanupB.current = null;
		                cleanupFnB();
		            }
		        } else {
		            if (refA) {
		                cleanupA.current = applyRef(refA, current);
		            }
		            if (refB) {
		                cleanupB.current = applyRef(refB, current);
		            }
		        }
		    }, [
		        refA,
		        refB
		    ]);
		}
		function applyRef(refA, current) {
		    if (typeof refA === 'function') {
		        const cleanup = refA(current);
		        if (typeof cleanup === 'function') {
		            return cleanup;
		        } else {
		            return ()=>refA(null);
		        }
		    } else {
		        refA.current = current;
		        return ()=>{
		            refA.current = null;
		        };
		    }
		}

		if ((typeof exports$1.default === 'function' || (typeof exports$1.default === 'object' && exports$1.default !== null)) && typeof exports$1.default.__esModule === 'undefined') {
		  Object.defineProperty(exports$1.default, '__esModule', { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		}

		
	} (useMergedRef, useMergedRef.exports));
	return useMergedRef.exports;
}

var errorOnce = {};

var hasRequiredErrorOnce;

function requireErrorOnce () {
	if (hasRequiredErrorOnce) return errorOnce;
	hasRequiredErrorOnce = 1;
	(function (exports$1) {
		"use strict";
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports$1, "errorOnce", {
		  enumerable: true,
		  get: function() {
		    return errorOnce;
		  }
		});
		let errorOnce = (_) => {
		};
		if (false) {
		  const errors = /* @__PURE__ */ new Set();
		  errorOnce = (msg) => {
		    if (!errors.has(msg)) {
		      console.error(msg);
		    }
		    errors.add(msg);
		  };
		} 
	} (errorOnce));
	return errorOnce;
}

var link$1 = link$2.exports;

var hasRequiredLink$1;

function requireLink$1 () {
	if (hasRequiredLink$1) return link$2.exports;
	hasRequiredLink$1 = 1;
	(function (module, exports$1) {
		"use client";
		"use strict";
		var define_process_env_default = {};
		Object.defineProperty(exports$1, "__esModule", {
		  value: true
		});
		function _export(target, all) {
		  for (var name in all) Object.defineProperty(target, name, {
		    enumerable: true,
		    get: all[name]
		  });
		}
		_export(exports$1, {
		  default: function() {
		    return _default;
		  },
		  useLinkStatus: function() {
		    return useLinkStatus;
		  }
		});
		const _interop_require_wildcard = /*@__PURE__*/ require_interop_require_wildcard();
		const _jsxruntime = requireJsxRuntime();
		const _react = /* @__PURE__ */ _interop_require_wildcard._(requireReact());
		const _resolvehref = requireResolveHref();
		const _islocalurl = requireIsLocalUrl();
		const _formaturl = requireFormatUrl();
		const _utils = requireUtils$1();
		const _addlocale = requireAddLocale();
		const _routercontextsharedruntime = requireRouterContext_sharedRuntime();
		const _useintersection = requireUseIntersection();
		const _getdomainlocale = requireGetDomainLocale();
		const _addbasepath = requireAddBasePath();
		const _usemergedref = requireUseMergedRef();
		const _erroronce = requireErrorOnce();
		const prefetched = /* @__PURE__ */ new Set();
		function prefetch(router, href, as, options) {
		  if (typeof window === "undefined") {
		    return;
		  }
		  if (!(0, _islocalurl.isLocalURL)(href)) {
		    return;
		  }
		  if (!options.bypassPrefetchedCheck) {
		    const locale = (
		      // Let the link's locale prop override the default router locale.
		      typeof options.locale !== "undefined" ? options.locale : "locale" in router ? router.locale : void 0
		    );
		    const prefetchedKey = href + "%" + as + "%" + locale;
		    if (prefetched.has(prefetchedKey)) {
		      return;
		    }
		    prefetched.add(prefetchedKey);
		  }
		  router.prefetch(href, as, options).catch((err) => {
		    if (false) {
		      throw err;
		    }
		  });
		}
		function isModifiedEvent(event) {
		  const eventTarget = event.currentTarget;
		  const target = eventTarget.getAttribute("target");
		  return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
		  event.nativeEvent && event.nativeEvent.which === 2;
		}
		function linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate) {
		  const { nodeName } = e.currentTarget;
		  const isAnchorNodeName = nodeName.toUpperCase() === "A";
		  if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute("download")) {
		    return;
		  }
		  if (!(0, _islocalurl.isLocalURL)(href)) {
		    if (replace) {
		      e.preventDefault();
		      location.replace(href);
		    }
		    return;
		  }
		  e.preventDefault();
		  const navigate = () => {
		    if (onNavigate) {
		      let isDefaultPrevented = false;
		      onNavigate({
		        preventDefault: () => {
		          isDefaultPrevented = true;
		        }
		      });
		      if (isDefaultPrevented) {
		        return;
		      }
		    }
		    const routerScroll = scroll ?? true;
		    if ("beforePopState" in router) {
		      router[replace ? "replace" : "push"](href, as, {
		        shallow,
		        locale,
		        scroll: routerScroll
		      });
		    } else {
		      router[replace ? "replace" : "push"](as || href, {
		        scroll: routerScroll
		      });
		    }
		  };
		  navigate();
		}
		function formatStringOrUrl(urlObjOrString) {
		  if (typeof urlObjOrString === "string") {
		    return urlObjOrString;
		  }
		  return (0, _formaturl.formatUrl)(urlObjOrString);
		}
		const Link = /* @__PURE__ */ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
		  let children;
		  const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onNavigate, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, transitionTypes, ...restProps } = props;
		  children = childrenProp;
		  if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
		    children = /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
		      children
		    });
		  }
		  const router = _react.default.useContext(_routercontextsharedruntime.RouterContext);
		  const prefetchEnabled = prefetchProp !== false;
		  if (false) {
		    let createPropError = function(args) {
		      return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
		        value: "E319",
		        enumerable: false,
		        configurable: true
		      });
		    };
		    const requiredPropsGuard = {
		      href: true
		    };
		    const requiredProps = Object.keys(requiredPropsGuard);
		    requiredProps.forEach((key) => {
		      if (key === "href") {
		        if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
		          throw createPropError({
		            key,
		            expected: "`string` or `object`",
		            actual: props[key] === null ? "null" : typeof props[key]
		          });
		        }
		      } else {
		        const _ = key;
		      }
		    });
		    const optionalPropsGuard = {
		      as: true,
		      replace: true,
		      scroll: true,
		      shallow: true,
		      passHref: true,
		      prefetch: true,
		      locale: true,
		      onClick: true,
		      onMouseEnter: true,
		      onTouchStart: true,
		      legacyBehavior: true,
		      onNavigate: true,
		      transitionTypes: true
		    };
		    const optionalProps = Object.keys(optionalPropsGuard);
		    optionalProps.forEach((key) => {
		      const valType = typeof props[key];
		      if (key === "as") {
		        if (props[key] && valType !== "string" && valType !== "object") {
		          throw createPropError({
		            key,
		            expected: "`string` or `object`",
		            actual: valType
		          });
		        }
		      } else if (key === "locale") {
		        if (props[key] && valType !== "string") {
		          throw createPropError({
		            key,
		            expected: "`string`",
		            actual: valType
		          });
		        }
		      } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart" || key === "onNavigate") {
		        if (props[key] && valType !== "function") {
		          throw createPropError({
		            key,
		            expected: "`function`",
		            actual: valType
		          });
		        }
		      } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "legacyBehavior") {
		        if (props[key] != null && valType !== "boolean") {
		          throw createPropError({
		            key,
		            expected: "`boolean`",
		            actual: valType
		          });
		        }
		      } else if (key === "prefetch") {
		        if (props[key] != null && valType !== "boolean" && props[key] !== "auto") {
		          throw createPropError({
		            key,
		            expected: '`boolean | "auto"`',
		            actual: valType
		          });
		        }
		      } else if (key === "transitionTypes") {
		        if (props[key] != null && !Array.isArray(props[key])) {
		          throw createPropError({
		            key,
		            expected: "`string[]`",
		            actual: valType
		          });
		        }
		      } else {
		        const _ = key;
		      }
		    });
		  }
		  const { href, as } = _react.default.useMemo(() => {
		    if (!router) {
		      const resolvedHref2 = formatStringOrUrl(hrefProp);
		      return {
		        href: resolvedHref2,
		        as: asProp ? formatStringOrUrl(asProp) : resolvedHref2
		      };
		    }
		    const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(router, hrefProp, true);
		    return {
		      href: resolvedHref,
		      as: asProp ? (0, _resolvehref.resolveHref)(router, asProp) : resolvedAs || resolvedHref
		    };
		  }, [
		    router,
		    hrefProp,
		    asProp
		  ]);
		  const previousHref = _react.default.useRef(href);
		  const previousAs = _react.default.useRef(as);
		  let child;
		  if (legacyBehavior) {
		    if (false) {
		      if (onClick) {
		        console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
		      }
		      if (onMouseEnterProp) {
		        console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
		      }
		      try {
		        child = _react.default.Children.only(children);
		      } catch (err) {
		        if (!children) {
		          throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
		            value: "E320",
		            enumerable: false,
		            configurable: true
		          });
		        }
		        throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== "undefined" ? " \nOpen your browser's console to view the Component stack trace." : "")), "__NEXT_ERROR_CODE", {
		          value: "E266",
		          enumerable: false,
		          configurable: true
		        });
		      }
		    } else {
		      child = _react.default.Children.only(children);
		    }
		  } else {
		    if (false) {
		      if (children?.type === "a") {
		        throw Object.defineProperty(new Error("Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor"), "__NEXT_ERROR_CODE", {
		          value: "E209",
		          enumerable: false,
		          configurable: true
		        });
		      }
		    }
		  }
		  const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
		  const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
		    rootMargin: "200px"
		  });
		  const setIntersectionWithResetRef = _react.default.useCallback((el) => {
		    if (previousAs.current !== as || previousHref.current !== href) {
		      resetVisible();
		      previousAs.current = as;
		      previousHref.current = href;
		    }
		    setIntersectionRef(el);
		  }, [
		    as,
		    href,
		    resetVisible,
		    setIntersectionRef
		  ]);
		  const setRef = (0, _usemergedref.useMergedRef)(setIntersectionWithResetRef, childRef);
		  _react.default.useEffect(() => {
		    if (false) {
		      return;
		    }
		    if (!router) {
		      return;
		    }
		    if (!isVisible || !prefetchEnabled) {
		      return;
		    }
		    prefetch(router, href, as, {
		      locale
		    });
		  }, [
		    as,
		    href,
		    isVisible,
		    locale,
		    prefetchEnabled,
		    router?.locale,
		    router
		  ]);
		  const childProps = {
		    ref: setRef,
		    onClick(e) {
		      if (false) {
		        if (!e) {
		          throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
		            value: "E312",
		            enumerable: false,
		            configurable: true
		          });
		        }
		      }
		      if (!legacyBehavior && typeof onClick === "function") {
		        onClick(e);
		      }
		      if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
		        child.props.onClick(e);
		      }
		      if (!router) {
		        return;
		      }
		      if (e.defaultPrevented) {
		        return;
		      }
		      linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate);
		    },
		    onMouseEnter(e) {
		      if (!legacyBehavior && typeof onMouseEnterProp === "function") {
		        onMouseEnterProp(e);
		      }
		      if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
		        child.props.onMouseEnter(e);
		      }
		      if (!router) {
		        return;
		      }
		      prefetch(router, href, as, {
		        locale,
		        priority: true,
		        // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
		        bypassPrefetchedCheck: true
		      });
		    },
		    onTouchStart: define_process_env_default.__NEXT_LINK_NO_TOUCH_START ? void 0 : function onTouchStart(e) {
		      if (!legacyBehavior && typeof onTouchStartProp === "function") {
		        onTouchStartProp(e);
		      }
		      if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
		        child.props.onTouchStart(e);
		      }
		      if (!router) {
		        return;
		      }
		      prefetch(router, href, as, {
		        locale,
		        priority: true,
		        // @see {https://github.com/vercel/next.js/discussions/40268?sort=top#discussioncomment-3572642}
		        bypassPrefetchedCheck: true
		      });
		    }
		  };
		  if ((0, _utils.isAbsoluteUrl)(as)) {
		    childProps.href = as;
		  } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
		    const curLocale = typeof locale !== "undefined" ? locale : router?.locale;
		    const localeDomain = router?.isLocaleDomain && (0, _getdomainlocale.getDomainLocale)(as, curLocale, router?.locales, router?.domainLocales);
		    childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, router?.defaultLocale));
		  }
		  if (legacyBehavior) {
		    if (false) {
		      (0, _erroronce.errorOnce)("`legacyBehavior` is deprecated and will be removed in a future release. A codemod is available to upgrade your components:\n\nnpx @next/codemod@latest new-link .\n\nLearn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components");
		    }
		    return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
		  }
		  return /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
		    ...restProps,
		    ...childProps,
		    children
		  });
		});
		const LinkStatusContext = /* @__PURE__ */ (0, _react.createContext)({
		  // We do not support link status in the Pages Router, so we always return false
		  pending: false
		});
		const useLinkStatus = () => {
		  return (0, _react.useContext)(LinkStatusContext);
		};
		const _default = Link;
		if ((typeof exports$1.default === "function" || typeof exports$1.default === "object" && exports$1.default !== null) && typeof exports$1.default.__esModule === "undefined") {
		  Object.defineProperty(exports$1.default, "__esModule", { value: true });
		  Object.assign(exports$1.default, exports$1);
		  module.exports = exports$1.default;
		} 
	} (link$2, link$2.exports));
	return link$2.exports;
}

var link;
var hasRequiredLink;

function requireLink () {
	if (hasRequiredLink) return link;
	hasRequiredLink = 1;
	link = requireLink$1();
	return link;
}

var linkExports = requireLink();
const Link = /*@__PURE__*/getDefaultExportFromCjs(linkExports);

const locales = ["en", "de"];
const eventKeys = ["event_1", "event_2"];
const invitationModes = ["individual", "household"];
const inviteeKinds = ["adult", "child"];
const rsvpStatuses = ["pending", "attending", "declined"];
const attendeeTypes = ["named_guest", "plus_one", "child"];
const activityTypes = [
  "invite_sent",
  "invite_resent",
  "recovery_sent",
  "link_opened",
  "rsvp_updated",
  "admin_updated"
];
const defaultLocale = "en";
const guestCookieName = "wedding_guest_session";
const adminCookieName = "wedding_admin_session";
const guestLocaleCookieName = "wedding_locale";
const recoveryMaxPerEmailPerHour = 3;
const recoveryMaxPerIpPerHour = 10;
const maxChildrenPerInvitation = 8;

const dictionaries = {
  en: {
    localeLabel: "English",
    switchTo: {
      en: "English",
      de: "German"
    },
    landing: {
      eyebrow: "Invitation-only access",
      title: "A private RSVP space for each invited guest",
      description: "Open your personal invitation link to see the event details that apply to you, confirm attendance, and update your response at any time.",
      primaryCta: "Open invitation",
      recoverCta: "Recover my link",
      privacyTitle: "Private by design",
      privacyBody: "Guests only see the events they are invited to. Invitation links are created by the organizers and sent directly by email.",
      features: [
        "Separate RSVP flows for both wedding events",
        "Updates allowed through the original secure invitation link",
        "Practical event details only for invited guests"
      ]
    },
    recover: {
      title: "Recover your invitation link",
      description: "Enter the email address already associated with your invitation. If we find a match, we will resend your access link.",
      emailLabel: "Invitation email address",
      submit: "Send recovery email",
      neutralSuccess: "If that email address matches an existing invitation, a recovery message has been sent."
    },
    guest: {
      overview: "Overview",
      rsvp: "RSVP",
      details: "Details",
      calendar: "Calendar",
      update: "Update response",
      invitedEvents: "Your invited events",
      privateAccess: "Private invitation area",
      logout: "Clear this browser session",
      schedule: "Schedule",
      logistics: "Practical information",
      status: "Status",
      responsePending: "Pending",
      responseAttending: "Attending",
      responseDeclined: "Declined",
      noAccess: "You are not invited to this event.",
      backToOverview: "Back to overview",
      securedByLink: "Access is secured by your invitation link.",
      addToCalendar: "Add to calendar",
      eventDetails: "Event details",
      dietaryRequirements: "Dietary requirements",
      phoneNumber: "Phone number",
      yes: "Yes",
      no: "No",
      attending: "Attending",
      notAttending: "Not attending",
      plusOne: "Plus one",
      children: "Children",
      bringPlusOne: "Bringing a plus one",
      bringChildren: "Bringing children",
      childrenCount: "Number of children",
      childName: "Child name",
      saveRsvp: "Save RSVP",
      saved: "RSVP saved",
      informationHidden: "Guests only see information for the events they are invited to.",
      recoverLink: "Recover link",
      mainGuests: "Named guests",
      plusOneName: "Plus-one name",
      invitedPerson: "Invited guest",
      updateHint: "You can return later with the same invitation link to update any answer.",
      summaryLead: "Your invitation includes the following event access.",
      contactHeading: "Contact details for attending adults"
    },
    admin: {
      loginTitle: "Admin access",
      loginDescription: "Use the shared organizer password to manage invitations and RSVP data.",
      passwordLabel: "Shared password",
      submit: "Open dashboard"
    },
    errors: {
      invalidLinkTitle: "Invitation link not recognized",
      invalidLinkBody: "This link is invalid or has already been rotated. Request a new link using the invitation email address already on file.",
      expiredLinkTitle: "Invitation access has expired",
      expiredLinkBody: "The linked invitation is no longer active because all invited events have already passed.",
      setupTitle: "Configuration required",
      setupBody: "The application is missing one or more required environment variables."
    },
    emails: {
      invitationSubject: "Your wedding invitation link",
      recoverySubject: "Your wedding invitation access link",
      confirmationSubject: {
        event_1: "RSVP confirmation for Event One",
        event_2: "RSVP confirmation for Event Two"
      },
      greeting: "Hello",
      invitationIntro: "Your personal invitation page is ready. Use the secure link below to view your invitation details and submit or update your RSVP.",
      invitedTo: "Invited events",
      manageRsvp: "Manage RSVP",
      reminder: "The same link will remain valid, so you can come back later if your plans change.",
      recoveryIntro: "A request was made to recover your invitation link. Use the same secure link below to access your private invitation area again.",
      confirmationIntro: "Thank you for confirming. Your event details and RSVP update link are included below."
    }
  },
  de: {
    localeLabel: "Deutsch",
    switchTo: {
      en: "Englisch",
      de: "Deutsch"
    },
    landing: {
      eyebrow: "Nur mit Einladung",
      title: "Ein privater RSVP-Bereich fur jeden eingeladenen Gast",
      description: "Offne deinen personlichen Einladungslink, um nur die fur dich relevanten Veranstaltungsdetails zu sehen, deine Teilnahme zu bestatigen und deine Antwort spater zu aktualisieren.",
      primaryCta: "Einladung offnen",
      recoverCta: "Link erneut anfordern",
      privacyTitle: "Privat gestaltet",
      privacyBody: "Gaste sehen nur die Veranstaltungen, zu denen sie eingeladen sind. Die Einladungslinks werden von den Organisatoren erstellt und direkt per E-Mail versendet.",
      features: [
        "Getrennte RSVP-Ablaufe fur beide Hochzeitsveranstaltungen",
        "Aktualisierungen jederzeit uber den ursprunglichen sicheren Link",
        "Praktische Veranstaltungsdetails nur fur eingeladene Gaste"
      ]
    },
    recover: {
      title: "Einladungslink erneut erhalten",
      description: "Gib die E-Mail-Adresse ein, die bereits mit deiner Einladung verknupft ist. Wenn wir einen Treffer finden, schicken wir den Zugang erneut.",
      emailLabel: "E-Mail-Adresse der Einladung",
      submit: "Wiederherstellungs-E-Mail senden",
      neutralSuccess: "Wenn diese E-Mail-Adresse zu einer bestehenden Einladung gehort, wurde eine Nachricht mit dem Zugangslink gesendet."
    },
    guest: {
      overview: "Uberblick",
      rsvp: "RSVP",
      details: "Details",
      calendar: "Kalender",
      update: "Antwort aktualisieren",
      invitedEvents: "Deine eingeladenen Veranstaltungen",
      privateAccess: "Privater Einladungsbereich",
      logout: "Browser-Sitzung entfernen",
      schedule: "Ablauf",
      logistics: "Praktische Informationen",
      status: "Status",
      responsePending: "Ausstehend",
      responseAttending: "Zugesagt",
      responseDeclined: "Abgesagt",
      noAccess: "Du bist zu dieser Veranstaltung nicht eingeladen.",
      backToOverview: "Zuruck zum Uberblick",
      securedByLink: "Der Zugang ist durch deinen Einladungslink geschutzt.",
      addToCalendar: "Zum Kalender hinzufugen",
      eventDetails: "Veranstaltungsdetails",
      dietaryRequirements: "Ernahrungswunsche",
      phoneNumber: "Telefonnummer",
      yes: "Ja",
      no: "Nein",
      attending: "Dabei",
      notAttending: "Nicht dabei",
      plusOne: "Begleitperson",
      children: "Kinder",
      bringPlusOne: "Begleitperson mitbringen",
      bringChildren: "Kinder mitbringen",
      childrenCount: "Anzahl der Kinder",
      childName: "Name des Kindes",
      saveRsvp: "RSVP speichern",
      saved: "RSVP gespeichert",
      informationHidden: "Gaste sehen nur Informationen zu den Veranstaltungen, fur die sie freigeschaltet sind.",
      recoverLink: "Link wiederherstellen",
      mainGuests: "Namentlich eingeladene Gaste",
      plusOneName: "Name der Begleitperson",
      invitedPerson: "Eingeladener Gast",
      updateHint: "Du kannst spater mit demselben Einladungslink zuruckkehren und jede Antwort andern.",
      summaryLead: "Deine Einladung umfasst Zugriff auf die folgenden Veranstaltungen.",
      contactHeading: "Kontaktdaten fur teilnehmende Erwachsene"
    },
    admin: {
      loginTitle: "Admin-Zugang",
      loginDescription: "Nutze das gemeinsame Organisatoren-Passwort, um Einladungen und RSVP-Daten zu verwalten.",
      passwordLabel: "Gemeinsames Passwort",
      submit: "Dashboard offnen"
    },
    errors: {
      invalidLinkTitle: "Einladungslink nicht erkannt",
      invalidLinkBody: "Dieser Link ist ungultig oder wurde ersetzt. Fordere mit der hinterlegten E-Mail-Adresse einen neuen Link an.",
      expiredLinkTitle: "Einladungszugang abgelaufen",
      expiredLinkBody: "Diese Einladung ist nicht mehr aktiv, weil alle damit verbundenen Veranstaltungen bereits vorbei sind.",
      setupTitle: "Konfiguration erforderlich",
      setupBody: "Der Anwendung fehlen eine oder mehrere erforderliche Umgebungsvariablen."
    },
    emails: {
      invitationSubject: "Dein Hochzeits-Einladungslink",
      recoverySubject: "Dein Zugangslink zur Hochzeitseinladung",
      confirmationSubject: {
        event_1: "RSVP-Bestatigung fur Veranstaltung Eins",
        event_2: "RSVP-Bestatigung fur Veranstaltung Zwei"
      },
      greeting: "Hallo",
      invitationIntro: "Deine personliche Einladungsseite ist bereit. Nutze den sicheren Link unten, um deine Einladungsdetails anzusehen und deine RSVP-Antwort zu senden oder zu aktualisieren.",
      invitedTo: "Eingeladene Veranstaltungen",
      manageRsvp: "RSVP verwalten",
      reminder: "Derselbe Link bleibt gultig, damit du spater bei Anderungen erneut zuruckkehren kannst.",
      recoveryIntro: "Es wurde eine Anfrage gestellt, deinen Einladungslink erneut zu senden. Nutze den sicheren Link unten, um wieder auf deinen privaten Bereich zuzugreifen.",
      confirmationIntro: "Vielen Dank fur deine Zusage. Deine Veranstaltungsdetails und dein RSVP-Aktualisierungslink sind unten enthalten."
    }
  }
};
function getDictionary(locale) {
  return dictionaries[locale ?? defaultLocale] ?? dictionaries.en;
}

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

/**
 * @module constants
 * @summary Useful constants
 * @description
 * Collection of useful date constants.
 *
 * The constants could be imported from `date-fns/constants`:
 *
 * ```ts
 * import { maxTime, minTime } from "./constants/date-fns/constants";
 *
 * function isAllowedTime(time) {
 *   return time <= maxTime && time >= minTime;
 * }
 * ```
 */

/**
 * @constant
 * @name daysInWeek
 * @summary Days in 1 week.
 */
const daysInWeek = 7;

/**
 * @constant
 * @name daysInYear
 * @summary Days in 1 year.
 *
 * @description
 * How many days in a year.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 */
const daysInYear = 365.2425;

/**
 * @constant
 * @name maxTime
 * @summary Maximum allowed time.
 *
 * @example
 * import { maxTime } from "./constants/date-fns/constants";
 *
 * const isValid = 8640000000000001 <= maxTime;
 * //=> false
 *
 * new Date(8640000000000001);
 * //=> Invalid Date
 */
const maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1000;

/**
 * @constant
 * @name minTime
 * @summary Minimum allowed time.
 *
 * @example
 * import { minTime } from "./constants/date-fns/constants";
 *
 * const isValid = -8640000000000001 >= minTime;
 * //=> false
 *
 * new Date(-8640000000000001)
 * //=> Invalid Date
 */
const minTime = -maxTime;

/**
 * @constant
 * @name millisecondsInWeek
 * @summary Milliseconds in 1 week.
 */
const millisecondsInWeek = 604800000;

/**
 * @constant
 * @name millisecondsInDay
 * @summary Milliseconds in 1 day.
 */
const millisecondsInDay = 86400000;

/**
 * @constant
 * @name millisecondsInMinute
 * @summary Milliseconds in 1 minute
 */
const millisecondsInMinute = 60000;

/**
 * @constant
 * @name millisecondsInHour
 * @summary Milliseconds in 1 hour
 */
const millisecondsInHour = 3600000;

/**
 * @constant
 * @name millisecondsInSecond
 * @summary Milliseconds in 1 second
 */
const millisecondsInSecond = 1000;

/**
 * @constant
 * @name minutesInYear
 * @summary Minutes in 1 year.
 */
const minutesInYear = 525600;

/**
 * @constant
 * @name minutesInMonth
 * @summary Minutes in 1 month.
 */
const minutesInMonth = 43200;

/**
 * @constant
 * @name minutesInDay
 * @summary Minutes in 1 day.
 */
const minutesInDay = 1440;

/**
 * @constant
 * @name minutesInHour
 * @summary Minutes in 1 hour.
 */
const minutesInHour = 60;

/**
 * @constant
 * @name monthsInQuarter
 * @summary Months in 1 quarter.
 */
const monthsInQuarter = 3;

/**
 * @constant
 * @name monthsInYear
 * @summary Months in 1 year.
 */
const monthsInYear = 12;

/**
 * @constant
 * @name quartersInYear
 * @summary Quarters in 1 year
 */
const quartersInYear = 4;

/**
 * @constant
 * @name secondsInHour
 * @summary Seconds in 1 hour.
 */
const secondsInHour = 3600;

/**
 * @constant
 * @name secondsInMinute
 * @summary Seconds in 1 minute.
 */
const secondsInMinute = 60;

/**
 * @constant
 * @name secondsInDay
 * @summary Seconds in 1 day.
 */
const secondsInDay = secondsInHour * 24;

/**
 * @constant
 * @name secondsInWeek
 * @summary Seconds in 1 week.
 */
const secondsInWeek = secondsInDay * 7;

/**
 * @constant
 * @name secondsInYear
 * @summary Seconds in 1 year.
 */
const secondsInYear = secondsInDay * daysInYear;

/**
 * @constant
 * @name secondsInMonth
 * @summary Seconds in 1 month
 */
const secondsInMonth = secondsInYear / 12;

/**
 * @constant
 * @name secondsInQuarter
 * @summary Seconds in 1 quarter.
 */
const secondsInQuarter = secondsInMonth * 3;

/**
 * @constant
 * @name constructFromSymbol
 * @summary Symbol enabling Date extensions to inherit properties from the reference date.
 *
 * The symbol is used to enable the `constructFrom` function to construct a date
 * using a reference date and a value. It allows to transfer extra properties
 * from the reference date to the new date. It's useful for extensions like
 * [`TZDate`](https://github.com/date-fns/tz) that accept a time zone as
 * a constructor argument.
 */
const constructFromSymbol = Symbol.for("constructDateFrom");

/**
 * @name constructFrom
 * @category Generic Helpers
 * @summary Constructs a date using the reference date and the value
 *
 * @description
 * The function constructs a new date using the constructor from the reference
 * date and the given value. It helps to build generic functions that accept
 * date extensions.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * Starting from v3.7.0, it allows to construct a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The reference date to take constructor from
 * @param value - The value to create the date
 *
 * @returns Date initialized using the given date and value
 *
 * @example
 * import { constructFrom } from "./constructFrom/date-fns";
 *
 * // A function that clones a date preserving the original type
 * function cloneDate<DateType extends Date>(date: DateType): DateType {
 *   return constructFrom(
 *     date, // Use constructor from the given date
 *     date.getTime() // Use the date value to create a new date
 *   );
 * }
 */
function constructFrom(date, value) {
  if (typeof date === "function") return date(value);

  if (date && typeof date === "object" && constructFromSymbol in date)
    return date[constructFromSymbol](value);

  if (date instanceof Date) return new date.constructor(value);

  return new Date(value);
}

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * Starting from v3.7.0, it clones a date using `[Symbol.for("constructDateFrom")]`
 * enabling to transfer extra properties from the reference date to the new date.
 * It's useful for extensions like [`TZDate`](https://github.com/date-fns/tz)
 * that accept a time zone as a constructor argument.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument, context) {
  // [TODO] Get rid of `toDate` or `constructFrom`?
  return constructFrom(context || argument, argument);
}

/**
 * The {@link addDays} function options.
 */

/**
 * @name addDays
 * @category Day Helpers
 * @summary Add the specified number of days to the given date.
 *
 * @description
 * Add the specified number of days to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the days added
 *
 * @example
 * // Add 10 days to 1 September 2014:
 * const result = addDays(new Date(2014, 8, 1), 10)
 * //=> Thu Sep 11 2014 00:00:00
 */
function addDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);

  // If 0 days, no-op to avoid changing times in the hour before end of DST
  if (!amount) return _date;

  _date.setDate(_date.getDate() + amount);
  return _date;
}

/**
 * The {@link addMonths} function options.
 */

/**
 * @name addMonths
 * @category Month Helpers
 * @summary Add the specified number of months to the given date.
 *
 * @description
 * Add the specified number of months to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be added.
 * @param options - The options object
 *
 * @returns The new date with the months added
 *
 * @example
 * // Add 5 months to 1 September 2014:
 * const result = addMonths(new Date(2014, 8, 1), 5)
 * //=> Sun Feb 01 2015 00:00:00
 *
 * // Add one month to 30 January 2023:
 * const result = addMonths(new Date(2023, 0, 30), 1)
 * //=> Tue Feb 28 2023 00:00:00
 */
function addMonths(date, amount, options) {
  const _date = toDate(date, options?.in);
  if (isNaN(amount)) return constructFrom(options?.in || date, NaN);
  if (!amount) {
    // If 0 months, no-op to avoid changing times in the hour before end of DST
    return _date;
  }
  const dayOfMonth = _date.getDate();

  // The JS Date object supports date math by accepting out-of-bounds values for
  // month, day, etc. For example, new Date(2020, 0, 0) returns 31 Dec 2019 and
  // new Date(2020, 13, 1) returns 1 Feb 2021.  This is *almost* the behavior we
  // want except that dates will wrap around the end of a month, meaning that
  // new Date(2020, 13, 31) will return 3 Mar 2021 not 28 Feb 2021 as desired. So
  // we'll default to the end of the desired month by adding 1 to the desired
  // month and using a date of 0 to back up one day to the end of the desired
  // month.
  const endOfDesiredMonth = constructFrom(options?.in || date, _date.getTime());
  endOfDesiredMonth.setMonth(_date.getMonth() + amount + 1, 0);
  const daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    // If we're already at the end of the month, then this is the correct date
    // and we're done.
    return endOfDesiredMonth;
  } else {
    // Otherwise, we now know that setting the original day-of-month value won't
    // cause an overflow, so set the desired day-of-month. Note that we can't
    // just set the date of `endOfDesiredMonth` because that object may have had
    // its time changed in the unusual case where where a DST transition was on
    // the last day of the month and its local time was in the hour skipped or
    // repeated next to a DST transition.  So we use `date` instead which is
    // guaranteed to still have the original time.
    _date.setFullYear(
      endOfDesiredMonth.getFullYear(),
      endOfDesiredMonth.getMonth(),
      dayOfMonth,
    );
    return _date;
  }
}

/**
 * The {@link add} function options.
 */

/**
 * @name add
 * @category Common Helpers
 * @summary Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @description
 * Add the specified years, months, weeks, days, hours, minutes, and seconds to the given date.
 *
 * @typeParam DateType - The `Date` type the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes, and seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add the following duration to 1 September 2014, 10:19:50
 * const result = add(new Date(2014, 8, 1, 10, 19, 50), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30,
 * })
 * //=> Thu Jun 15 2017 15:29:20
 */
function add(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  // Add years and months
  const _date = toDate(date, options?.in);
  const dateWithMonths =
    months || years ? addMonths(_date, months + years * 12) : _date;

  // Add weeks and days
  const dateWithDays =
    days || weeks ? addDays(dateWithMonths, days + weeks * 7) : dateWithMonths;

  // Add days, hours, minutes, and seconds
  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000;

  return constructFrom(options?.in || date, +dateWithDays + msToAdd);
}

/**
 * The {@link isSaturday} function options.
 */

/**
 * @name isSaturday
 * @category Weekday Helpers
 * @summary Is the given date Saturday?
 *
 * @description
 * Is the given date Saturday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Saturday
 *
 * @example
 * // Is 27 September 2014 Saturday?
 * const result = isSaturday(new Date(2014, 8, 27))
 * //=> true
 */
function isSaturday(date, options) {
  return toDate(date, options?.in).getDay() === 6;
}

/**
 * The {@link isSunday} function options.
 */

/**
 * @name isSunday
 * @category Weekday Helpers
 * @summary Is the given date Sunday?
 *
 * @description
 * Is the given date Sunday?
 *
 * @param date - The date to check
 * @param options - The options object
 *
 * @returns The date is Sunday
 *
 * @example
 * // Is 21 September 2014 Sunday?
 * const result = isSunday(new Date(2014, 8, 21))
 * //=> true
 */
function isSunday(date, options) {
  return toDate(date, options?.in).getDay() === 0;
}

/**
 * The {@link isWeekend} function options.
 */

/**
 * @name isWeekend
 * @category Weekday Helpers
 * @summary Does the given date fall on a weekend?
 *
 * @description
 * Does the given date fall on a weekend? A weekend is either Saturday (`6`) or Sunday (`0`).
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date falls on a weekend
 *
 * @example
 * // Does 5 October 2014 fall on a weekend?
 * const result = isWeekend(new Date(2014, 9, 5))
 * //=> true
 */
function isWeekend(date, options) {
  const day = toDate(date, options?.in).getDay();
  return day === 0 || day === 6;
}

/**
 * The {@link addBusinessDays} function options.
 */

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be added.
 * @param options - An object with options
 *
 * @returns The new date with the business days added
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * const result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
function addBusinessDays(date, amount, options) {
  const _date = toDate(date, options?.in);
  const startedOnWeekend = isWeekend(_date, options);

  if (isNaN(amount)) return constructFrom(options?.in, NaN);

  const hours = _date.getHours();
  const sign = amount < 0 ? -1 : 1;
  const fullWeeks = Math.trunc(amount / 5);

  _date.setDate(_date.getDate() + fullWeeks * 7);

  // Get remaining days not part of a full week
  let restDays = Math.abs(amount % 5);

  // Loops over remaining days
  while (restDays > 0) {
    _date.setDate(_date.getDate() + sign);
    if (!isWeekend(_date, options)) restDays -= 1;
  }

  // If the date is a weekend day and we reduce a dividable of
  // 5 from it, we land on a weekend date.
  // To counter this, we add days accordingly to land on the next business day
  if (startedOnWeekend && isWeekend(_date, options) && amount !== 0) {
    // If we're reducing days, we want to add days until we land on a weekday
    // If we're adding days we want to reduce days until we land on a weekday
    if (isSaturday(_date, options))
      _date.setDate(_date.getDate() + (sign < 0 ? 2 : -1));
    if (isSunday(_date, options))
      _date.setDate(_date.getDate() + (sign < 0 ? 1 : -2));
  }

  // Restore hours to avoid DST lag
  _date.setHours(hours);

  return _date;
}

/**
 * The {@link addMilliseconds} function options.
 */

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be added.
 * @param options - The options object
 *
 * @returns The new date with the milliseconds added
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds(date, amount, options) {
  return constructFrom(options?.in || date, +toDate(date) + amount);
}

/**
 * The {@link addHours} function options.
 */

/**
 * @name addHours
 * @category Hour Helpers
 * @summary Add the specified number of hours to the given date.
 *
 * @description
 * Add the specified number of hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be added
 * @param options - An object with options
 *
 * @returns The new date with the hours added
 *
 * @example
 * // Add 2 hours to 10 July 2014 23:00:00:
 * const result = addHours(new Date(2014, 6, 10, 23, 0), 2)
 * //=> Fri Jul 11 2014 01:00:00
 */
function addHours(date, amount, options) {
  return addMilliseconds(date, amount * millisecondsInHour, options);
}

let defaultOptions = {};

function getDefaultOptions$1() {
  return defaultOptions;
}

function setDefaultOptions$1(newOptions) {
  defaultOptions = newOptions;
}

/**
 * The {@link startOfWeek} function options.
 */

/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfWeek(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  _date.setDate(_date.getDate() - diff);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link startOfISOWeek} function options.
 */

/**
 * @name startOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the start of an ISO week for the given date.
 *
 * @description
 * Return the start of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week
 *
 * @example
 * // The start of an ISO week for 2 September 2014 11:55:00:
 * const result = startOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfISOWeek(date, options) {
  return startOfWeek(date, { ...options, weekStartsOn: 1 });
}

/**
 * The {@link getISOWeekYear} function options.
 */

/**
 * @name getISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the ISO week-numbering year of the given date.
 *
 * @description
 * Get the ISO week-numbering year of the given date,
 * which always starts 3 days before the year's first Thursday.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 *
 * @returns The ISO week-numbering year
 *
 * @example
 * // Which ISO-week numbering year is 2 January 2005?
 * const result = getISOWeekYear(new Date(2005, 0, 2))
 * //=> 2004
 */
function getISOWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const fourthOfJanuaryOfNextYear = constructFrom(_date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);

  const fourthOfJanuaryOfThisYear = constructFrom(_date, 0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);

  if (_date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (_date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  const _date = toDate(date);
  const utcDate = new Date(
    Date.UTC(
      _date.getFullYear(),
      _date.getMonth(),
      _date.getDate(),
      _date.getHours(),
      _date.getMinutes(),
      _date.getSeconds(),
      _date.getMilliseconds(),
    ),
  );
  utcDate.setUTCFullYear(_date.getFullYear());
  return +date - +utcDate;
}

function normalizeDates(context, ...dates) {
  const normalize = constructFrom.bind(
    null,
    context || dates.find((date) => typeof date === "object"),
  );
  return dates.map(normalize);
}

/**
 * The {@link startOfDay} function options.
 */

/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a day
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */
function startOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link differenceInCalendarDays} function options.
 */

/**
 * @name differenceInCalendarDays
 * @category Day Helpers
 * @summary Get the number of calendar days between the given dates.
 *
 * @description
 * Get the number of calendar days between the given dates. This means that the times are removed
 * from the dates and then the difference in days is calculated.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options object
 *
 * @returns The number of calendar days
 *
 * @example
 * // How many calendar days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInCalendarDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 366
 * // How many calendar days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInCalendarDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 1
 */
function differenceInCalendarDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfDay = startOfDay(laterDate_);
  const earlierStartOfDay = startOfDay(earlierDate_);

  const laterTimestamp =
    +laterStartOfDay - getTimezoneOffsetInMilliseconds(laterStartOfDay);
  const earlierTimestamp =
    +earlierStartOfDay - getTimezoneOffsetInMilliseconds(earlierStartOfDay);

  // Round the number of days to the nearest integer because the number of
  // milliseconds in a day is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInDay);
}

/**
 * The {@link startOfISOWeekYear} function options.
 */

/**
 * @name startOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the start of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the start of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an ISO week-numbering year
 *
 * @example
 * // The start of an ISO week-numbering year for 2 July 2005:
 * const result = startOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  return startOfISOWeek(fourthOfJanuary);
}

/**
 * The {@link setISOWeekYear} function options.
 */

/**
 * @name setISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Set the ISO week-numbering year to the given date.
 *
 * @description
 * Set the ISO week-numbering year to the given date,
 * saving the week number and the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param weekYear - The ISO week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the ISO week-numbering year set
 *
 * @example
 * // Set ISO week-numbering year 2007 to 29 December 2008:
 * const result = setISOWeekYear(new Date(2008, 11, 29), 2007)
 * //=> Mon Jan 01 2007 00:00:00
 */
function setISOWeekYear(date, weekYear, options) {
  let _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(
    _date,
    startOfISOWeekYear(_date, options),
  );
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(weekYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  _date = startOfISOWeekYear(fourthOfJanuary);
  _date.setDate(_date.getDate() + diff);
  return _date;
}

/**
 * The {@link addISOWeekYears} function options.
 */

/**
 * @name addISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Add the specified number of ISO week-numbering years to the given date.
 *
 * @description
 * Add the specified number of ISO week-numbering years to the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be added.
 * @param options - An object with options
 *
 * @returns The new date with the ISO week-numbering years added
 *
 * @example
 * // Add 5 ISO week-numbering years to 2 July 2010:
 * const result = addISOWeekYears(new Date(2010, 6, 2), 5)
 * //=> Fri Jun 26 2015 00:00:00
 */
function addISOWeekYears(date, amount, options) {
  return setISOWeekYear(date, getISOWeekYear(date, options) + amount, options);
}

/**
 * The {@link addMinutes} function options.
 */

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be added.
 * @param options - An object with options
 *
 * @returns The new date with the minutes added
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * const result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes(date, amount, options) {
  const _date = toDate(date, options?.in);
  _date.setTime(_date.getTime() + amount * millisecondsInMinute);
  return _date;
}

/**
 * The {@link addQuarters} function options.
 */

/**
 * @name addQuarters
 * @category Quarter Helpers
 * @summary Add the specified number of year quarters to the given date.
 *
 * @description
 * Add the specified number of year quarters to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be added.
 * @param options - An object with options
 *
 * @returns The new date with the quarters added
 *
 * @example
 * // Add 1 quarter to 1 September 2014:
 * const result = addQuarters(new Date(2014, 8, 1), 1)
 * //=; Mon Dec 01 2014 00:00:00
 */
function addQuarters(date, amount, options) {
  return addMonths(date, amount * 3, options);
}

/**
 * The {@link addSeconds} function options.
 */

/**
 * @name addSeconds
 * @category Second Helpers
 * @summary Add the specified number of seconds to the given date.
 *
 * @description
 * Add the specified number of seconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be added.
 * @param options - An object with options
 *
 * @returns The new date with the seconds added
 *
 * @example
 * // Add 30 seconds to 10 July 2014 12:45:00:
 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:45:30
 */
function addSeconds(date, amount, options) {
  return addMilliseconds(date, amount * 1000, options);
}

/**
 * The {@link addWeeks} function options.
 */

/**
 * @name addWeeks
 * @category Week Helpers
 * @summary Add the specified number of weeks to the given date.
 *
 * @description
 * Add the specified number of weeks to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be added.
 * @param options - An object with options
 *
 * @returns The new date with the weeks added
 *
 * @example
 * // Add 4 weeks to 1 September 2014:
 * const result = addWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Sep 29 2014 00:00:00
 */
function addWeeks(date, amount, options) {
  return addDays(date, amount * 7, options);
}

/**
 * The {@link addYears} function options.
 */

/**
 * @name addYears
 * @category Year Helpers
 * @summary Add the specified number of years to the given date.
 *
 * @description
 * Add the specified number of years to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be added.
 * @param options - The options
 *
 * @returns The new date with the years added
 *
 * @example
 * // Add 5 years to 1 September 2014:
 * const result = addYears(new Date(2014, 8, 1), 5)
 * //=> Sun Sep 01 2019 00:00:00
 */
function addYears(date, amount, options) {
  return addMonths(date, amount * 12, options);
}

/**
 * The {@link areIntervalsOverlapping} function options.
 */

/**
 * @name areIntervalsOverlapping
 * @category Interval Helpers
 * @summary Is the given time interval overlapping with another time interval?
 *
 * @description
 * Is the given time interval overlapping with another time interval? Adjacent intervals do not count as overlapping unless `inclusive` is set to `true`.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - The object with options
 *
 * @returns Whether the time intervals are overlapping
 *
 * @example
 * // For overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> true
 *
 * @example
 * // For non-overlapping time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> false
 *
 * @example
 * // For adjacent time intervals:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 30) }
 * )
 * //=> false
 *
 * @example
 * // Using the inclusive option:
 * areIntervalsOverlapping(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 20), end: new Date(2014, 0, 24) },
 *   { inclusive: true }
 * )
 * //=> true
 */
function areIntervalsOverlapping(intervalLeft, intervalRight, options) {
  const [leftStartTime, leftEndTime] = [
    +toDate(intervalLeft.start, options?.in),
    +toDate(intervalLeft.end, options?.in),
  ].sort((a, b) => a - b);
  const [rightStartTime, rightEndTime] = [
    +toDate(intervalRight.start, options?.in),
    +toDate(intervalRight.end, options?.in),
  ].sort((a, b) => a - b);

  if (options?.inclusive)
    return leftStartTime <= rightEndTime && rightStartTime <= leftEndTime;

  return leftStartTime < rightEndTime && rightStartTime < leftEndTime;
}

/**
 * The {@link max} function options.
 */

/**
 * @name max
 * @category Common Helpers
 * @summary Return the latest of the given dates.
 *
 * @description
 * Return the latest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dates - The dates to compare
 *
 * @returns The latest of the dates
 *
 * @example
 * // Which of these dates is the latest?
 * const result = max([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Sun Jul 02 1995 00:00:00
 */
function max(dates, options) {
  let result;
  let context = options?.in;

  dates.forEach((date) => {
    // Use the first date object as the context function
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);

    const date_ = toDate(date, context);
    if (!result || result < date_ || isNaN(+date_)) result = date_;
  });

  return constructFrom(context, result || NaN);
}

/**
 * The {@link min} function options.
 */

/**
 * @name min
 * @category Common Helpers
 * @summary Returns the earliest of the given dates.
 *
 * @description
 * Returns the earliest of the given dates.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dates - The dates to compare
 *
 * @returns The earliest of the dates
 *
 * @example
 * // Which of these dates is the earliest?
 * const result = min([
 *   new Date(1989, 6, 10),
 *   new Date(1987, 1, 11),
 *   new Date(1995, 6, 2),
 *   new Date(1990, 0, 1)
 * ])
 * //=> Wed Feb 11 1987 00:00:00
 */
function min(dates, options) {
  let result;
  let context = options?.in;

  dates.forEach((date) => {
    // Use the first date object as the context function
    if (!context && typeof date === "object")
      context = constructFrom.bind(null, date);

    const date_ = toDate(date, context);
    if (!result || result > date_ || isNaN(+date_)) result = date_;
  });

  return constructFrom(context, result || NaN);
}

/**
 * The {@link clamp} function options.
 */

/**
 * The {@link clamp} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name clamp
 * @category Interval Helpers
 * @summary Return a date bounded by the start and the end of the given interval.
 *
 * @description
 * Clamps a date to the lower bound with the start of the interval and the upper
 * bound with the end of the interval.
 *
 * - When the date is less than the start of the interval, the start is returned.
 * - When the date is greater than the end of the interval, the end is returned.
 * - Otherwise the date is returned.
 *
 * @typeParam DateType - Date argument type.
 * @typeParam IntervalType - Interval argument type.
 * @typeParam Options - Options type.
 *
 * @param date - The date to be bounded
 * @param interval - The interval to bound to
 * @param options - An object with options
 *
 * @returns The date bounded by the start and the end of the interval
 *
 * @example
 * // What is Mar 21, 2021 bounded to an interval starting at Mar 22, 2021 and ending at Apr 01, 2021
 * const result = clamp(new Date(2021, 2, 21), {
 *   start: new Date(2021, 2, 22),
 *   end: new Date(2021, 3, 1),
 * })
 * //=> Mon Mar 22 2021 00:00:00
 */
function clamp(date, interval, options) {
  const [date_, start, end] = normalizeDates(
    options?.in,
    date,
    interval.start,
    interval.end,
  );

  return min([max([date_, start], options), end], options);
}

/**
 * @name closestIndexTo
 * @category Common Helpers
 * @summary Return an index of the closest date from the array comparing to the given date.
 *
 * @description
 * Return an index of the closest date from the array comparing to the given date.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns An index of the date closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015?
 * const dateToCompare = new Date(2015, 8, 6)
 * const datesArray = [
 *   new Date(2015, 0, 1),
 *   new Date(2016, 0, 1),
 *   new Date(2017, 0, 1)
 * ]
 * const result = closestIndexTo(dateToCompare, datesArray)
 * //=> 1
 */
function closestIndexTo(dateToCompare, dates) {
  // [TODO] It would be better to return -1 here rather than undefined, as this
  // is how JS behaves, but it would be a breaking change, so we need
  // to consider it for v4.
  const timeToCompare = +toDate(dateToCompare);

  if (isNaN(timeToCompare)) return NaN;

  let result;
  let minDistance;
  dates.forEach((date, index) => {
    const date_ = toDate(date);

    if (isNaN(+date_)) {
      result = NaN;
      minDistance = NaN;
      return;
    }

    const distance = Math.abs(timeToCompare - +date_);
    if (result == null || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  });

  return result;
}

/**
 * The {@link closestTo} function options.
 */

/**
 * The {@link closestTo} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name closestTo
 * @category Common Helpers
 * @summary Return a date from the array closest to the given date.
 *
 * @description
 * Return a date from the array closest to the given date.
 *
 * @typeParam DateToCompare - Date to compare argument type.
 * @typeParam DatesType - Dates array argument type.
 * @typeParam Options - Options type.
 *
 * @param dateToCompare - The date to compare with
 * @param dates - The array to search
 *
 * @returns The date from the array closest to the given date or undefined if no valid value is given
 *
 * @example
 * // Which date is closer to 6 September 2015: 1 January 2000 or 1 January 2030?
 * const dateToCompare = new Date(2015, 8, 6)
 * const result = closestTo(dateToCompare, [
 *   new Date(2000, 0, 1),
 *   new Date(2030, 0, 1)
 * ])
 * //=> Tue Jan 01 2030 00:00:00
 */
function closestTo(dateToCompare, dates, options) {
  const [dateToCompare_, ...dates_] = normalizeDates(
    options?.in,
    dateToCompare,
    ...dates,
  );

  const index = closestIndexTo(dateToCompare_, dates_);

  if (typeof index === "number" && isNaN(index))
    return constructFrom(dateToCompare_, NaN);

  if (index !== undefined) return dates_[index];
}

/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);

  if (diff < 0) return -1;
  else if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

/**
 * @name compareDesc
 * @category Common Helpers
 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return -1 if the first date is after the second,
 * 1 if the first date is before the second or 0 if dates are equal.
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The result of the comparison
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> 1
 *
 * @example
 * // Sort the array of dates in reverse chronological order:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareDesc)
 * //=> [
 * //   Sun Jul 02 1995 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Wed Feb 11 1987 00:00:00
 * // ]
 */
function compareDesc(dateLeft, dateRight) {
  const diff = +toDate(dateLeft) - +toDate(dateRight);

  if (diff > 0) return -1;
  else if (diff < 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

/**
 * @name constructNow
 * @category Generic Helpers
 * @summary Constructs a new current date using the passed value constructor.
 * @pure false
 *
 * @description
 * The function constructs a new current date using the constructor from
 * the reference date. It helps to build generic functions that accept date
 * extensions and use the current date.
 *
 * It defaults to `Date` if the passed reference date is a number or a string.
 *
 * @param date - The reference date to take constructor from
 *
 * @returns Current date initialized using the given date constructor
 *
 * @example
 * import { constructNow, isSameDay } from 'date-fns'
 *
 * function isToday<DateType extends Date>(
 *   date: DateArg<DateType>,
 * ): boolean {
 *   // If we were to use `new Date()` directly, the function would  behave
 *   // differently in different timezones and return false for the same date.
 *   return isSameDay(date, constructNow(date));
 * }
 */
function constructNow(date) {
  return constructFrom(date, Date.now());
}

/**
 * @name daysToWeeks
 * @category Conversion Helpers
 * @summary Convert days to weeks.
 *
 * @description
 * Convert a number of days to a full number of weeks.
 *
 * @param days - The number of days to be converted
 *
 * @returns The number of days converted in weeks
 *
 * @example
 * // Convert 14 days to weeks:
 * const result = daysToWeeks(14)
 * //=> 2
 *
 * @example
 * // It uses trunc rounding:
 * const result = daysToWeeks(13)
 * //=> 1
 */
function daysToWeeks(days) {
  const result = Math.trunc(days / daysInWeek);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}

/**
 * The {@link isSameDay} function options.
 */

/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same day (and year and month)
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */
function isSameDay(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +startOfDay(dateLeft_) === +startOfDay(dateRight_);
}

/**
 * @name isDate
 * @category Common Helpers
 * @summary Is the given value a date?
 *
 * @description
 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
 *
 * @param value - The value to check
 *
 * @returns True if the given value is a date
 *
 * @example
 * // For a valid date:
 * const result = isDate(new Date())
 * //=> true
 *
 * @example
 * // For an invalid date:
 * const result = isDate(new Date(NaN))
 * //=> true
 *
 * @example
 * // For some value:
 * const result = isDate('2014-02-31')
 * //=> false
 *
 * @example
 * // For an object:
 * const result = isDate({})
 * //=> false
 */
function isDate(value) {
  return (
    value instanceof Date ||
    (typeof value === "object" &&
      Object.prototype.toString.call(value) === "[object Date]")
  );
}

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate](https://date-fns.org/docs/toDate)
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param date - The date to check
 *
 * @returns The date is valid
 *
 * @example
 * // For the valid date:
 * const result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertible into a date:
 * const result = isValid(1393804800000)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isValid(new Date(''))
 * //=> false
 */
function isValid(date) {
  return !((!isDate(date) && typeof date !== "number") || isNaN(+toDate(date)));
}

/**
 * The {@link differenceInBusinessDays} function options.
 */

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that aren't in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of business days
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 *
 * // How many business days are between
 * // 30 November 2021 and 1 November 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 30),
 *   new Date(2021, 10, 1)
 * )
 * //=> 21
 *
 * // How many business days are between
 * // 1 November 2021 and 1 December 2021?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 11, 1)
 * )
 * //=> -22
 *
 * // How many business days are between
 * // 1 November 2021 and 1 November 2021 ?
 * const result = differenceInBusinessDays(
 *   new Date(2021, 10, 1),
 *   new Date(2021, 10, 1)
 * )
 * //=> 0
 */
function differenceInBusinessDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  if (!isValid(laterDate_) || !isValid(earlierDate_)) return NaN;

  const diff = differenceInCalendarDays(laterDate_, earlierDate_);
  const sign = diff < 0 ? -1 : 1;
  const weeks = Math.trunc(diff / 7);

  let result = weeks * 5;
  let movingDate = addDays(earlierDate_, weeks * 7);

  // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week
  while (!isSameDay(laterDate_, movingDate)) {
    // sign is used to account for both negative and positive differences
    result += isWeekend(movingDate, options) ? 0 : sign;
    movingDate = addDays(movingDate, sign);
  }

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

/**
 * The {@link differenceInCalendarISOWeekYears} function options.
 */

/**
 * @name differenceInCalendarISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of calendar ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of calendar ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar ISO week-numbering years
 *
 * @example
 * // How many calendar ISO week-numbering years are 1 January 2010 and 1 January 2012?
 * const result = differenceInCalendarISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * //=> 2
 */
function differenceInCalendarISOWeekYears(
  laterDate,
  earlierDate,
  options,
) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    getISOWeekYear(laterDate_, options) - getISOWeekYear(earlierDate_, options)
  );
}

/**
 * The {@link differenceInCalendarISOWeeks} function options.
 */

/**
 * @name differenceInCalendarISOWeeks
 * @category ISO Week Helpers
 * @summary Get the number of calendar ISO weeks between the given dates.
 *
 * @description
 * Get the number of calendar ISO weeks between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar ISO weeks
 *
 * @example
 * // How many calendar ISO weeks are between 6 July 2014 and 21 July 2014?
 * const result = differenceInCalendarISOWeeks(
 *   new Date(2014, 6, 21),
 *   new Date(2014, 6, 6),
 * );
 * //=> 3
 */
function differenceInCalendarISOWeeks(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const startOfISOWeekLeft = startOfISOWeek(laterDate_);
  const startOfISOWeekRight = startOfISOWeek(earlierDate_);

  const timestampLeft =
    +startOfISOWeekLeft - getTimezoneOffsetInMilliseconds(startOfISOWeekLeft);
  const timestampRight =
    +startOfISOWeekRight - getTimezoneOffsetInMilliseconds(startOfISOWeekRight);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round((timestampLeft - timestampRight) / millisecondsInWeek);
}

/**
 * The {@link differenceInCalendarMonths} function options.
 */

/**
 * @name differenceInCalendarMonths
 * @category Month Helpers
 * @summary Get the number of calendar months between the given dates.
 *
 * @description
 * Get the number of calendar months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar months
 *
 * @example
 * // How many calendar months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInCalendarMonths(
 *   new Date(2014, 8, 1),
 *   new Date(2014, 0, 31)
 * )
 * //=> 8
 */
function differenceInCalendarMonths(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const monthsDiff = laterDate_.getMonth() - earlierDate_.getMonth();

  return yearsDiff * 12 + monthsDiff;
}

/**
 * The {@link getQuarter} function options.
 */

/**
 * @name getQuarter
 * @category Quarter Helpers
 * @summary Get the year quarter of the given date.
 *
 * @description
 * Get the year quarter of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The quarter
 *
 * @example
 * // Which quarter is 2 July 2014?
 * const result = getQuarter(new Date(2014, 6, 2));
 * //=> 3
 */
function getQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const quarter = Math.trunc(_date.getMonth() / 3) + 1;
  return quarter;
}

/**
 * The {@link differenceInCalendarQuarters} function options.
 */

/**
 * @name differenceInCalendarQuarters
 * @category Quarter Helpers
 * @summary Get the number of calendar quarters between the given dates.
 *
 * @description
 * Get the number of calendar quarters between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of calendar quarters
 *
 * @example
 * // How many calendar quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInCalendarQuarters(
 *   new Date(2014, 6, 2),
 *   new Date(2013, 11, 31)
 * )
 * //=> 3
 */
function differenceInCalendarQuarters(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const yearsDiff = laterDate_.getFullYear() - earlierDate_.getFullYear();
  const quartersDiff = getQuarter(laterDate_) - getQuarter(earlierDate_);

  return yearsDiff * 4 + quartersDiff;
}

/**
 * The {@link differenceInCalendarWeeks} function options.
 */

/**
 * @name differenceInCalendarWeeks
 * @category Week Helpers
 * @summary Get the number of calendar weeks between the given dates.
 *
 * @description
 * Get the number of calendar weeks between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5)
 * )
 * //=> 3
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInCalendarWeeks(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 6, 5),
 *   { weekStartsOn: 1 }
 * )
 * //=> 2
 */
function differenceInCalendarWeeks(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const laterStartOfWeek = startOfWeek(laterDate_, options);
  const earlierStartOfWeek = startOfWeek(earlierDate_, options);

  const laterTimestamp =
    +laterStartOfWeek - getTimezoneOffsetInMilliseconds(laterStartOfWeek);
  const earlierTimestamp =
    +earlierStartOfWeek - getTimezoneOffsetInMilliseconds(earlierStartOfWeek);

  return Math.round((laterTimestamp - earlierTimestamp) / millisecondsInWeek);
}

/**
 * The {@link differenceInCalendarYears} function options.
 */

/**
 * @name differenceInCalendarYears
 * @category Year Helpers
 * @summary Get the number of calendar years between the given dates.
 *
 * @description
 * Get the number of calendar years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options

 * @returns The number of calendar years
 *
 * @example
 * // How many calendar years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInCalendarYears(
 *   new Date(2015, 1, 11),
 *   new Date(2013, 11, 31)
 * );
 * //=> 2
 */
function differenceInCalendarYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() - earlierDate_.getFullYear();
}

/**
 * The {@link differenceInDays} function options.
 */

/**
 * @name differenceInDays
 * @category Day Helpers
 * @summary Get the number of full days between the given dates.
 *
 * @description
 * Get the number of full day periods between two dates. Fractional days are
 * truncated towards zero.
 *
 * One "full day" is the distance between a local time in one day to the same
 * local time on the next or previous day. A full day can sometimes be less than
 * or more than 24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/24)|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full days according to the local timezone
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
 * const result = differenceInDays(
 *   new Date(2012, 6, 2, 0, 0),
 *   new Date(2011, 6, 2, 23, 0)
 * )
 * //=> 365
 *
 * @example
 * // How many full days are between
 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
 * const result = differenceInDays(
 *   new Date(2011, 6, 3, 0, 1),
 *   new Date(2011, 6, 2, 23, 59)
 * )
 * //=> 0
 *
 * @example
 * // How many full days are between
 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 92 days, even in
 * // time zones where DST starts and the
 * // period has only 92*24-1 hours.
 * const result = differenceInDays(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 1)
 * )
 * //=> 92
 */
function differenceInDays(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = compareLocalAsc(laterDate_, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarDays(laterDate_, earlierDate_),
  );

  laterDate_.setDate(laterDate_.getDate() - sign * difference);

  // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
  // If so, result must be decreased by 1 in absolute value
  const isLastDayNotFull = Number(
    compareLocalAsc(laterDate_, earlierDate_) === -sign,
  );

  const result = sign * (difference - isLastDayNotFull);
  // Prevent negative zero
  return result === 0 ? 0 : result;
}

// Like `compareAsc` but uses local time not UTC, which is needed
// for accurate equality comparisons of UTC timestamps that end up
// having the same representation in local time, e.g. one hour before
// DST ends vs. the instant that DST ends.
function compareLocalAsc(laterDate, earlierDate) {
  const diff =
    laterDate.getFullYear() - earlierDate.getFullYear() ||
    laterDate.getMonth() - earlierDate.getMonth() ||
    laterDate.getDate() - earlierDate.getDate() ||
    laterDate.getHours() - earlierDate.getHours() ||
    laterDate.getMinutes() - earlierDate.getMinutes() ||
    laterDate.getSeconds() - earlierDate.getSeconds() ||
    laterDate.getMilliseconds() - earlierDate.getMilliseconds();

  if (diff < 0) return -1;
  if (diff > 0) return 1;

  // Return 0 if diff is 0; return NaN if diff is NaN
  return diff;
}

function getRoundingMethod(method) {
  return (number) => {
    const round = method ? Math[method] : Math.trunc;
    const result = round(number);
    // Prevent negative zero
    return result === 0 ? 0 : result;
  };
}

/**
 * The {@link differenceInHours} function options.
 */

/**
 * @name differenceInHours
 * @category Hour Helpers
 * @summary Get the number of hours between the given dates.
 *
 * @description
 * Get the number of hours between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of hours
 *
 * @example
 * // How many hours are between 2 July 2014 06:50:00 and 2 July 2014 19:00:00?
 * const result = differenceInHours(
 *   new Date(2014, 6, 2, 19, 0),
 *   new Date(2014, 6, 2, 6, 50)
 * )
 * //=> 12
 */
function differenceInHours(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  const diff = (+laterDate_ - +earlierDate_) / millisecondsInHour;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link subISOWeekYears} function options.
 */

/**
 * @name subISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Subtract the specified number of ISO week-numbering years from the given date.
 *
 * @description
 * Subtract the specified number of ISO week-numbering years from the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of ISO week-numbering years to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the ISO week-numbering years subtracted
 *
 * @example
 * // Subtract 5 ISO week-numbering years from 1 September 2014:
 * const result = subISOWeekYears(new Date(2014, 8, 1), 5)
 * //=> Mon Aug 31 2009 00:00:00
 */
function subISOWeekYears(date, amount, options) {
  return addISOWeekYears(date, -amount, options);
}

/**
 * The {@link differenceInISOWeekYears} function options.
 */

/**
 * @name differenceInISOWeekYears
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of full ISO week-numbering years between the given dates.
 *
 * @description
 * Get the number of full ISO week-numbering years between the given dates.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - The options
 *
 * @returns The number of full ISO week-numbering years
 *
 * @example
 * // How many full ISO week-numbering years are between 1 January 2010 and 1 January 2012?
 * const result = differenceInISOWeekYears(
 *   new Date(2012, 0, 1),
 *   new Date(2010, 0, 1)
 * )
 * // => 1
 */
function differenceInISOWeekYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  const sign = compareAsc(laterDate_, earlierDate_);
  const diff = Math.abs(
    differenceInCalendarISOWeekYears(laterDate_, earlierDate_, options),
  );

  const adjustedDate = subISOWeekYears(laterDate_, sign * diff, options);

  const isLastISOWeekYearNotFull = Number(
    compareAsc(adjustedDate, earlierDate_) === -sign,
  );
  const result = sign * (diff - isLastISOWeekYearNotFull);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

/**
 * @name differenceInMilliseconds
 * @category Millisecond Helpers
 * @summary Get the number of milliseconds between the given dates.
 *
 * @description
 * Get the number of milliseconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 *
 * @returns The number of milliseconds
 *
 * @example
 * // How many milliseconds are between
 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
 * const result = differenceInMilliseconds(
 *   new Date(2014, 6, 2, 12, 30, 21, 700),
 *   new Date(2014, 6, 2, 12, 30, 20, 600)
 * )
 * //=> 1100
 */
function differenceInMilliseconds(laterDate, earlierDate) {
  return +toDate(laterDate) - +toDate(earlierDate);
}

/**
 * The {@link differenceInMinutes} function options.
 */

/**
 * @name differenceInMinutes
 * @category Minute Helpers
 * @summary Get the number of minutes between the given dates.
 *
 * @description
 * Get the signed number of full (rounded towards 0) minutes between the given dates.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of minutes
 *
 * @example
 * // How many minutes are between 2 July 2014 12:07:59 and 2 July 2014 12:20:00?
 * const result = differenceInMinutes(
 *   new Date(2014, 6, 2, 12, 20, 0),
 *   new Date(2014, 6, 2, 12, 7, 59)
 * )
 * //=> 12
 *
 * @example
 * // How many minutes are between 10:01:59 and 10:00:00
 * const result = differenceInMinutes(
 *   new Date(2000, 0, 1, 10, 0, 0),
 *   new Date(2000, 0, 1, 10, 1, 59)
 * )
 * //=> -1
 */
function differenceInMinutes(dateLeft, dateRight, options) {
  const diff =
    differenceInMilliseconds(dateLeft, dateRight) / millisecondsInMinute;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link endOfDay} function options.
 */

/**
 * @name endOfDay
 * @category Day Helpers
 * @summary Return the end of a day for the given date.
 *
 * @description
 * Return the end of a day for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a day
 *
 * @example
 * // The end of a day for 2 September 2014 11:55:00:
 * const result = endOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 23:59:59.999
 */
function endOfDay(date, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfMonth} function options.
 */

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * @name isLastDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the last day of a month?
 *
 * @description
 * Is the given date the last day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the last day of a month
 *
 * @example
 * // Is 28 February 2014 the last day of a month?
 * const result = isLastDayOfMonth(new Date(2014, 1, 28))
 * //=> true
 */
function isLastDayOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  return +endOfDay(_date, options) === +endOfMonth(_date, options);
}

/**
 * The {@link differenceInMonths} function options.
 */

/**
 * @name differenceInMonths
 * @category Month Helpers
 * @summary Get the number of full months between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full months
 *
 * @example
 * // How many full months are between 31 January 2014 and 1 September 2014?
 * const result = differenceInMonths(new Date(2014, 8, 1), new Date(2014, 0, 31))
 * //=> 7
 */
function differenceInMonths(laterDate, earlierDate, options) {
  const [laterDate_, workingLaterDate, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    laterDate,
    earlierDate,
  );

  const sign = compareAsc(workingLaterDate, earlierDate_);
  const difference = Math.abs(
    differenceInCalendarMonths(workingLaterDate, earlierDate_),
  );

  if (difference < 1) return 0;

  if (workingLaterDate.getMonth() === 1 && workingLaterDate.getDate() > 27)
    workingLaterDate.setDate(30);

  workingLaterDate.setMonth(workingLaterDate.getMonth() - sign * difference);

  let isLastMonthNotFull = compareAsc(workingLaterDate, earlierDate_) === -sign;

  if (
    isLastDayOfMonth(laterDate_) &&
    difference === 1 &&
    compareAsc(laterDate_, earlierDate_) === 1
  ) {
    isLastMonthNotFull = false;
  }

  const result = sign * (difference - +isLastMonthNotFull);
  return result === 0 ? 0 : result;
}

/**
 * The {@link differenceInQuarters} function options.
 */

/**
 * @name differenceInQuarters
 * @category Quarter Helpers
 * @summary Get the number of quarters between the given dates.
 *
 * @description
 * Get the number of quarters between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of full quarters
 *
 * @example
 * // How many full quarters are between 31 December 2013 and 2 July 2014?
 * const result = differenceInQuarters(new Date(2014, 6, 2), new Date(2013, 11, 31))
 * //=> 2
 */
function differenceInQuarters(laterDate, earlierDate, options) {
  const diff = differenceInMonths(laterDate, earlierDate, options) / 3;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link differenceInSeconds} function options.
 */

/**
 * @name differenceInSeconds
 * @category Second Helpers
 * @summary Get the number of seconds between the given dates.
 *
 * @description
 * Get the number of seconds between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options.
 *
 * @returns The number of seconds
 *
 * @example
 * // How many seconds are between
 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
 * const result = differenceInSeconds(
 *   new Date(2014, 6, 2, 12, 30, 20, 0),
 *   new Date(2014, 6, 2, 12, 30, 7, 999)
 * )
 * //=> 12
 */
function differenceInSeconds(laterDate, earlierDate, options) {
  const diff = differenceInMilliseconds(laterDate, earlierDate) / 1000;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link differenceInWeeks} function options.
 */

/**
 * @name differenceInWeeks
 * @category Week Helpers
 * @summary Get the number of full weeks between the given dates.
 *
 * @description
 * Get the number of full weeks between two dates. Fractional weeks are
 * truncated towards zero by default.
 *
 * One "full week" is the distance between a local time in one day to the same
 * local time 7 days earlier or later. A full week can sometimes be less than
 * or more than 7*24 hours if a daylight savings change happens between two dates.
 *
 * To ignore DST and only measure exact 7*24-hour periods, use this instead:
 * `Math.trunc(differenceInHours(dateLeft, dateRight)/(7*24))|0`.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full weeks
 *
 * @example
 * // How many full weeks are between 5 July 2014 and 20 July 2014?
 * const result = differenceInWeeks(new Date(2014, 6, 20), new Date(2014, 6, 5))
 * //=> 2
 *
 * @example
 * // How many full weeks are between
 * // 1 March 2020 0:00 and 6 June 2020 0:00 ?
 * // Note: because local time is used, the
 * // result will always be 8 weeks (54 days),
 * // even if DST starts and the period has
 * // only 54*24-1 hours.
 * const result = differenceInWeeks(
 *   new Date(2020, 5, 1),
 *   new Date(2020, 2, 6)
 * )
 * //=> 8
 */
function differenceInWeeks(laterDate, earlierDate, options) {
  const diff = differenceInDays(laterDate, earlierDate, options) / 7;
  return getRoundingMethod(options?.roundingMethod)(diff);
}

/**
 * The {@link differenceInYears} function options.
 */

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * @param laterDate - The later date
 * @param earlierDate - The earlier date
 * @param options - An object with options
 *
 * @returns The number of full years
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * const result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
function differenceInYears(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  // -1 if the left date is earlier than the right date
  // 2023-12-31 - 2024-01-01 = -1
  const sign = compareAsc(laterDate_, earlierDate_);

  // First calculate the difference in calendar years
  // 2024-01-01 - 2023-12-31 = 1 year
  const diff = Math.abs(differenceInCalendarYears(laterDate_, earlierDate_));

  // Now we need to calculate if the difference is full. To do that we set
  // both dates to the same year and check if the both date's month and day
  // form a full year.
  laterDate_.setFullYear(1584);
  earlierDate_.setFullYear(1584);

  // For it to be true, when the later date is indeed later than the earlier date
  // (2026-02-01 - 2023-12-10 = 3 years), the difference is full if
  // the normalized later date is also later than the normalized earlier date.
  // In our example, 1584-02-01 is earlier than 1584-12-10, so the difference
  // is partial, hence we need to subtract 1 from the difference 3 - 1 = 2.
  const partial = compareAsc(laterDate_, earlierDate_) === -sign;

  const result = sign * (diff - +partial);

  // Prevent negative zero
  return result === 0 ? 0 : result;
}

function normalizeInterval(context, interval) {
  const [start, end] = normalizeDates(context, interval.start, interval.end);
  return { start, end };
}

/**
 * The {@link eachDayOfInterval} function options.
 */

/**
 * The {@link eachDayOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachDayOfInterval
 * @category Interval Helpers
 * @summary Return the array of dates within the specified time interval.
 *
 * @description
 * Return the array of dates within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of days from the day of the interval start to the day of the interval end
 *
 * @example
 * // Each day between 6 October 2014 and 10 October 2014:
 * const result = eachDayOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 9, 10)
 * })
 * //=> [
 * //   Mon Oct 06 2014 00:00:00,
 * //   Tue Oct 07 2014 00:00:00,
 * //   Wed Oct 08 2014 00:00:00,
 * //   Thu Oct 09 2014 00:00:00,
 * //   Fri Oct 10 2014 00:00:00
 * // ]
 */
function eachDayOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setDate(date.getDate() + step);
    date.setHours(0, 0, 0, 0);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link eachHourOfInterval} function options.
 */

/**
 * The {@link eachHourOfInterval} function result type.
 * Resolves to the appropriate date type based on inputs.
 */

/**
 * @name eachHourOfInterval
 * @category Interval Helpers
 * @summary Return the array of hours within the specified time interval.
 *
 * @description
 * Return the array of hours within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of hours from the hour of the interval start to the hour of the interval end
 *
 * @example
 * // Each hour between 6 October 2014, 12:00 and 6 October 2014, 15:00
 * const result = eachHourOfInterval({
 *   start: new Date(2014, 9, 6, 12),
 *   end: new Date(2014, 9, 6, 15)
 * });
 * //=> [
 * //   Mon Oct 06 2014 12:00:00,
 * //   Mon Oct 06 2014 13:00:00,
 * //   Mon Oct 06 2014 14:00:00,
 * //   Mon Oct 06 2014 15:00:00
 * // ]
 */
function eachHourOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setMinutes(0, 0, 0);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setHours(date.getHours() + step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link eachMinuteOfInterval} function options.
 */

/**
 * The {@link eachMinuteOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachMinuteOfInterval
 * @category Interval Helpers
 * @summary Return the array of minutes within the specified time interval.
 *
 * @description
 * Returns the array of minutes within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of minutes from the minute of the interval start to the minute of the interval end
 *
 * @example
 * // Each minute between 14 October 2020, 13:00 and 14 October 2020, 13:03
 * const result = eachMinuteOfInterval({
 *   start: new Date(2014, 9, 14, 13),
 *   end: new Date(2014, 9, 14, 13, 3)
 * })
 * //=> [
 * //   Wed Oct 14 2014 13:00:00,
 * //   Wed Oct 14 2014 13:01:00,
 * //   Wed Oct 14 2014 13:02:00,
 * //   Wed Oct 14 2014 13:03:00
 * // ]
 */
function eachMinuteOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  // Set to the start of the minute
  start.setSeconds(0, 0);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  let date = reversed ? end : start;

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date = addMinutes(date, step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link eachMonthOfInterval} function options.
 */

/**
 * The {@link eachMonthOfInterval} function result type. It resolves the proper data type.
 */

/**
 * @name eachMonthOfInterval
 * @category Interval Helpers
 * @summary Return the array of months within the specified time interval.
 *
 * @description
 * Return the array of months within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of months from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each month between 6 February 2014 and 10 August 2014:
 * const result = eachMonthOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10)
 * })
 * //=> [
 * //   Sat Feb 01 2014 00:00:00,
 * //   Sat Mar 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Thu May 01 2014 00:00:00,
 * //   Sun Jun 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * //   Fri Aug 01 2014 00:00:00
 * // ]
 */
function eachMonthOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setDate(1);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setMonth(date.getMonth() + step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link startOfQuarter} function options.
 */

/**
 * @name startOfQuarter
 * @category Quarter Helpers
 * @summary Return the start of a year quarter for the given date.
 *
 * @description
 * Return the start of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a quarter
 *
 * @example
 * // The start of a quarter for 2 September 2014 11:55:00:
 * const result = startOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Jul 01 2014 00:00:00
 */
function startOfQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3);
  _date.setMonth(month, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link eachQuarterOfInterval} function options.
 */

/**
 * The {@link eachQuarterOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachQuarterOfInterval
 * @category Interval Helpers
 * @summary Return the array of quarters within the specified time interval.
 *
 * @description
 * Return the array of quarters within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval
 * @param options - An object with options
 *
 * @returns The array with starts of quarters from the quarter of the interval start to the quarter of the interval end
 *
 * @example
 * // Each quarter within interval 6 February 2014 - 10 August 2014:
 * const result = eachQuarterOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2014, 7, 10),
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Tue Apr 01 2014 00:00:00,
 * //   Tue Jul 01 2014 00:00:00,
 * // ]
 */
function eachQuarterOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +startOfQuarter(start) : +startOfQuarter(end);
  let date = reversed ? startOfQuarter(end) : startOfQuarter(start);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date = addQuarters(date, step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link eachWeekOfInterval} function options.
 */

/**
 * The {@link eachWeekOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the interval start date,
 * then the end interval date. If a context function is passed, it uses the context function return type.
 */

/**
 * @name eachWeekOfInterval
 * @category Interval Helpers
 * @summary Return the array of weeks within the specified time interval.
 *
 * @description
 * Return the array of weeks within the specified time interval.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of weeks from the week of the interval start to the week of the interval end
 *
 * @example
 * // Each week within interval 6 October 2014 - 23 November 2014:
 * const result = eachWeekOfInterval({
 *   start: new Date(2014, 9, 6),
 *   end: new Date(2014, 10, 23)
 * })
 * //=> [
 * //   Sun Oct 05 2014 00:00:00,
 * //   Sun Oct 12 2014 00:00:00,
 * //   Sun Oct 19 2014 00:00:00,
 * //   Sun Oct 26 2014 00:00:00,
 * //   Sun Nov 02 2014 00:00:00,
 * //   Sun Nov 09 2014 00:00:00,
 * //   Sun Nov 16 2014 00:00:00,
 * //   Sun Nov 23 2014 00:00:00
 * // ]
 */
function eachWeekOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const startDateWeek = reversed
    ? startOfWeek(end, options)
    : startOfWeek(start, options);
  const endDateWeek = reversed
    ? startOfWeek(start, options)
    : startOfWeek(end, options);

  startDateWeek.setHours(15);
  endDateWeek.setHours(15);

  const endTime = +endDateWeek.getTime();
  let currentDate = startDateWeek;

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+currentDate <= endTime) {
    currentDate.setHours(0);
    dates.push(constructFrom(start, currentDate));
    currentDate = addWeeks(currentDate, step);
    currentDate.setHours(15);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link eachWeekendOfInterval} function options.
 */

/**
 * The {@link eachWeekendOfInterval} function result type.
 */

/**
 * @name eachWeekendOfInterval
 * @category Interval Helpers
 * @summary List all the Saturdays and Sundays in the given date interval.
 *
 * @description
 * Get all the Saturdays and Sundays in the given date interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The given interval
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given date interval
 * const result = eachWeekendOfInterval({
 *   start: new Date(2018, 8, 17),
 *   end: new Date(2018, 8, 30)
 * })
 * //=> [
 * //   Sat Sep 22 2018 00:00:00,
 * //   Sun Sep 23 2018 00:00:00,
 * //   Sat Sep 29 2018 00:00:00,
 * //   Sun Sep 30 2018 00:00:00
 * // ]
 */
function eachWeekendOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  const dateInterval = eachDayOfInterval({ start, end }, options);
  const weekends = [];
  let index = 0;
  while (index < dateInterval.length) {
    const date = dateInterval[index++];
    if (isWeekend(date)) weekends.push(constructFrom(start, date));
  }
  return weekends;
}

/**
 * The {@link startOfMonth} function options.
 */

/**
 * @name startOfMonth
 * @category Month Helpers
 * @summary Return the start of a month for the given date.
 *
 * @description
 * Return the start of a month for the given date. The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments.
 * Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed,
 * or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a month
 *
 * @example
 * // The start of a month for 2 September 2014 11:55:00:
 * const result = startOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Mon Sep 01 2014 00:00:00
 */
function startOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link eachWeekendOfMonth} function options.
 */

/**
 * @name eachWeekendOfMonth
 * @category Month Helpers
 * @summary List all the Saturdays and Sundays in the given month.
 *
 * @description
 * Get all the Saturdays and Sundays in the given month.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The given month
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the given month
 * const result = eachWeekendOfMonth(new Date(2022, 1, 1))
 * //=> [
 * //   Sat Feb 05 2022 00:00:00,
 * //   Sun Feb 06 2022 00:00:00,
 * //   Sat Feb 12 2022 00:00:00,
 * //   Sun Feb 13 2022 00:00:00,
 * //   Sat Feb 19 2022 00:00:00,
 * //   Sun Feb 20 2022 00:00:00,
 * //   Sat Feb 26 2022 00:00:00,
 * //   Sun Feb 27 2022 00:00:00
 * // ]
 */
function eachWeekendOfMonth(date, options) {
  const start = startOfMonth(date, options);
  const end = endOfMonth(date, options);
  return eachWeekendOfInterval({ start, end }, options);
}

/**
 * The {@link endOfYear} function options.
 */

/**
 * @name endOfYear
 * @category Year Helpers
 * @summary Return the end of a year for the given date.
 *
 * @description
 * Return the end of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The end of a year
 *
 * @example
 * // The end of a year for 2 September 2014 11:55:00:
 * const result = endOfYear(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Wed Dec 31 2014 23:59:59.999
 */
function endOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  _date.setFullYear(year + 1, 0, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link startOfYear} function options.
 */

/**
 * @name startOfYear
 * @category Year Helpers
 * @summary Return the start of a year for the given date.
 *
 * @description
 * Return the start of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a year
 *
 * @example
 * // The start of a year for 2 September 2014 11:55:00:
 * const result = startOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Jan 01 2014 00:00:00
 */
function startOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setFullYear(date_.getFullYear(), 0, 1);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

/**
 * The {@link eachWeekendOfYear} function options.
 */

/**
 * @name eachWeekendOfYear
 * @category Year Helpers
 * @summary List all the Saturdays and Sundays in the year.
 *
 * @description
 * Get all the Saturdays and Sundays in the year.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The given year
 * @param options - An object with options
 *
 * @returns An array containing all the Saturdays and Sundays
 *
 * @example
 * // Lists all Saturdays and Sundays in the year
 * const result = eachWeekendOfYear(new Date(2020, 1, 1))
 * //=> [
 * //   Sat Jan 03 2020 00:00:00,
 * //   Sun Jan 04 2020 00:00:00,
 * //   ...
 * //   Sun Dec 27 2020 00:00:00
 * // ]
 * ]
 */
function eachWeekendOfYear(date, options) {
  const start = startOfYear(date, options);
  const end = endOfYear(date, options);
  return eachWeekendOfInterval({ start, end }, options);
}

/**
 * The {@link eachYearOfInterval} function options.
 */

/**
 * The {@link eachYearOfInterval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the date argument,
 * then the start interval date, and finally the end interval date. If
 * a context function is passed, it uses the context function return type.
 */

/**
 * @name eachYearOfInterval
 * @category Interval Helpers
 * @summary Return the array of yearly timestamps within the specified time interval.
 *
 * @description
 * Return the array of yearly timestamps within the specified time interval.
 *
 * @typeParam IntervalType - Interval type.
 * @typeParam Options - Options type.
 *
 * @param interval - The interval.
 * @param options - An object with options.
 *
 * @returns The array with starts of yearly timestamps from the month of the interval start to the month of the interval end
 *
 * @example
 * // Each year between 6 February 2014 and 10 August 2017:
 * const result = eachYearOfInterval({
 *   start: new Date(2014, 1, 6),
 *   end: new Date(2017, 7, 10)
 * })
 * //=> [
 * //   Wed Jan 01 2014 00:00:00,
 * //   Thu Jan 01 2015 00:00:00,
 * //   Fri Jan 01 2016 00:00:00,
 * //   Sun Jan 01 2017 00:00:00
 * // ]
 */
function eachYearOfInterval(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);

  let reversed = +start > +end;
  const endTime = reversed ? +start : +end;
  const date = reversed ? end : start;
  date.setHours(0, 0, 0, 0);
  date.setMonth(0, 1);

  let step = options?.step ?? 1;
  if (!step) return [];
  if (step < 0) {
    step = -step;
    reversed = !reversed;
  }

  const dates = [];

  while (+date <= endTime) {
    dates.push(constructFrom(start, date));
    date.setFullYear(date.getFullYear() + step);
  }

  return reversed ? dates.reverse() : dates;
}

/**
 * The {@link endOfDecade} function options.
 */

/**
 * @name endOfDecade
 * @category Decade Helpers
 * @summary Return the end of a decade for the given date.
 *
 * @description
 * Return the end of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a decade
 *
 * @example
 * // The end of a decade for 12 May 1984 00:00:00:
 * const result = endOfDecade(new Date(1984, 4, 12, 00, 00, 00))
 * //=> Dec 31 1989 23:59:59.999
 */
function endOfDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const decade = 9 + Math.floor(year / 10) * 10;
  _date.setFullYear(decade, 11, 31);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfHour} function options.
 */

/**
 * @name endOfHour
 * @category Hour Helpers
 * @summary Return the end of an hour for the given date.
 *
 * @description
 * Return the end of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an hour
 *
 * @example
 * // The end of an hour for 2 September 2014 11:55:00:
 * const result = endOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:59:59.999
 */
function endOfHour(date, options) {
  const _date = toDate(date, options?.in);
  _date.setMinutes(59, 59, 999);
  return _date;
}

/**
 * The {@link endOfWeek} function options.
 */

/**
 * @name endOfWeek
 * @category Week Helpers
 * @summary Return the end of a week for the given date.
 *
 * @description
 * Return the end of a week for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a week
 *
 * @example
 * // The end of a week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 23:59:59.999
 *
 * @example
 * // If the week starts on Monday, the end of the week for 2 September 2014 11:55:00:
 * const result = endOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfWeek(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setDate(_date.getDate() + diff);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfISOWeek} function options.
 */

/**
 * @name endOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the end of an ISO week for the given date.
 *
 * @description
 * Return the end of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an ISO week
 *
 * @example
 * // The end of an ISO week for 2 September 2014 11:55:00:
 * const result = endOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 23:59:59.999
 */
function endOfISOWeek(date, options) {
  return endOfWeek(date, { ...options, weekStartsOn: 1 });
}

/**
 * The {@link endOfISOWeekYear} function options.
 */

/**
 * @name endOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the end of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the end of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The end of an ISO week-numbering year for 2 July 2005:
 * const result = endOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 23:59:59.999
 */
function endOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuaryOfNextYear = constructFrom(options?.in || date, 0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  const _date = startOfISOWeek(fourthOfJanuaryOfNextYear, options);
  _date.setMilliseconds(_date.getMilliseconds() - 1);
  return _date;
}

/**
 * The {@link endOfMinute} function options.
 */

/**
 * @name endOfMinute
 * @category Minute Helpers
 * @summary Return the end of a minute for the given date.
 *
 * @description
 * Return the end of a minute for the given date.
 * The result will be in the local timezone or the provided context.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a minute
 *
 * @example
 * // The end of a minute for 1 December 2014 22:15:45.400:
 * const result = endOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:59.999
 */
function endOfMinute(date, options) {
  const _date = toDate(date, options?.in);
  _date.setSeconds(59, 999);
  return _date;
}

/**
 * The {@link endOfQuarter} function options.
 */

/**
 * @name endOfQuarter
 * @category Quarter Helpers
 * @summary Return the end of a year quarter for the given date.
 *
 * @description
 * Return the end of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a quarter
 *
 * @example
 * // The end of a quarter for 2 September 2014 11:55:00:
 * const result = endOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfQuarter(date, options) {
  const _date = toDate(date, options?.in);
  const currentMonth = _date.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;
  _date.setMonth(month, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * The {@link endOfSecond} function options.
 */

/**
 * @name endOfSecond
 * @category Second Helpers
 * @summary Return the end of a second for the given date.
 *
 * @description
 * Return the end of a second for the given date.
 * The result will be in the local timezone if no `in` option is specified.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of a second
 *
 * @example
 * // The end of a second for 1 December 2014 22:15:45.400:
 * const result = endOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.999
 */
function endOfSecond(date, options) {
  const _date = toDate(date, options?.in);
  _date.setMilliseconds(999);
  return _date;
}

/**
 * The {@link endOfToday} function options.
 */

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param options - The options
 *
 * @returns The end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday(options) {
  return endOfDay(Date.now(), options);
}

/**
 * The {@link endOfTomorrow} function options.
 */

/**
 * @name endOfTomorrow
 * @category Day Helpers
 * @summary Return the end of tomorrow.
 * @pure false
 *
 * @description
 * Return the end of tomorrow.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param options - The options
 * @returns The end of tomorrow
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfTomorrow()
 * //=> Tue Oct 7 2014 23:59:59.999
 */
function endOfTomorrow(options) {
  const now = constructNow(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = constructNow(options?.in);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return options?.in ? options.in(date) : date;
}

/**
 * The {@link endOfYesterday} function options.
 */

/**
 * @name endOfYesterday
 * @category Day Helpers
 * @summary Return the end of yesterday.
 * @pure false
 *
 * @description
 * Return the end of yesterday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @returns The end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday(options) {
  const now = constructNow(options?.in);
  const date = constructFrom(options?.in, 0);
  date.setFullYear(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

const formatDistanceLocale = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds",
  },

  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds",
  },

  halfAMinute: "half a minute",

  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes",
  },

  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes",
  },

  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours",
  },

  xHours: {
    one: "1 hour",
    other: "{{count}} hours",
  },

  xDays: {
    one: "1 day",
    other: "{{count}} days",
  },

  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks",
  },

  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks",
  },

  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months",
  },

  xMonths: {
    one: "1 month",
    other: "{{count}} months",
  },

  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years",
  },

  xYears: {
    one: "1 year",
    other: "{{count}} years",
  },

  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years",
  },

  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years",
  },
};

const formatDistance$1 = (token, count, options) => {
  let result;

  const tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }

  return result;
};

function buildFormatLongFn(args) {
  return (options = {}) => {
    // TODO: Remove String()
    const width = options.width ? String(options.width) : args.defaultWidth;
    const format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

const dateFormats = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy",
};

const timeFormats = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a",
};

const dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}",
};

const formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full",
  }),

  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full",
  }),

  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full",
  }),
};

const formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P",
};

const formatRelative$1 = (token, _date, _baseDate, _options) =>
  formatRelativeLocale[token];

/**
 * The localize function argument callback which allows to convert raw value to
 * the actual type.
 *
 * @param value - The value to convert
 *
 * @returns The converted value
 */

/**
 * The map of localized values for each width.
 */

/**
 * The index type of the locale unit value. It types conversion of units of
 * values that don't start at 0 (i.e. quarters).
 */

/**
 * Converts the unit value to the tuple of values.
 */

/**
 * The tuple of localized era values. The first element represents BC,
 * the second element represents AD.
 */

/**
 * The tuple of localized quarter values. The first element represents Q1.
 */

/**
 * The tuple of localized day values. The first element represents Sunday.
 */

/**
 * The tuple of localized month values. The first element represents January.
 */

function buildLocalizeFn(args) {
  return (value, options) => {
    const context = options?.context ? String(options.context) : "standalone";

    let valuesArray;
    if (context === "formatting" && args.formattingValues) {
      const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      const width = options?.width ? String(options.width) : defaultWidth;

      valuesArray =
        args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      const defaultWidth = args.defaultWidth;
      const width = options?.width ? String(options.width) : args.defaultWidth;

      valuesArray = args.values[width] || args.values[defaultWidth];
    }
    const index = args.argumentCallback ? args.argumentCallback(value) : value;

    // @ts-expect-error - For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

const eraValues = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"],
};

const quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
const monthValues = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],

  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

const dayValues = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
};

const dayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night",
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night",
  },
};

const ordinalNumber = (dirtyNumber, _options) => {
  const number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  const rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};

const localize = {
  ordinalNumber,

  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide",
  }),

  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: (quarter) => quarter - 1,
  }),

  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide",
  }),

  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide",
  }),

  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide",
  }),
};

function buildMatchFn(args) {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern =
      (width && args.matchPatterns[width]) ||
      args.matchPatterns[args.defaultMatchWidth];
    const matchResult = string.match(matchPattern);

    if (!matchResult) {
      return null;
    }
    const matchedString = matchResult[0];

    const parsePatterns =
      (width && args.parsePatterns[width]) ||
      args.parsePatterns[args.defaultParseWidth];

    const key = Array.isArray(parsePatterns)
      ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
      : // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString));

    let value;

    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback
      ? // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

function findKey(object, predicate) {
  for (const key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      predicate(object[key])
    ) {
      return key;
    }
  }
  return undefined;
}

function findIndex(array, predicate) {
  for (let key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

function buildMatchPatternFn(args) {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    const matchedString = matchResult[0];

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    let value = args.valueCallback
      ? args.valueCallback(parseResult[0])
      : parseResult[0];

    // [TODO] I challenge you to fix the type
    value = options.valueCallback ? options.valueCallback(value) : value;

    const rest = string.slice(matchedString.length);

    return { value, rest };
  };
}

const matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i,
};
const parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i],
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i],
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],

  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ],
};

const matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
};
const parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
};

const matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i,
  },
};

const match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),

  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any",
  }),

  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: (index) => index + 1,
  }),

  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any",
  }),

  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any",
  }),

  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any",
  }),
};

/**
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp](https://github.com/kossnocorp)
 * @author Lesha Koss [@leshakoss](https://github.com/leshakoss)
 */
const enUS = {
  code: "en-US",
  formatDistance: formatDistance$1,
  formatLong: formatLong,
  formatRelative: formatRelative$1,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};

/**
 * The {@link getDayOfYear} function options.
 */

/**
 * @name getDayOfYear
 * @category Day Helpers
 * @summary Get the day of the year of the given date.
 *
 * @description
 * Get the day of the year of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of year
 *
 * @example
 * // Which day of the year is 2 July 2014?
 * const result = getDayOfYear(new Date(2014, 6, 2))
 * //=> 183
 */
function getDayOfYear(date, options) {
  const _date = toDate(date, options?.in);
  const diff = differenceInCalendarDays(_date, startOfYear(_date));
  const dayOfYear = diff + 1;
  return dayOfYear;
}

/**
 * The {@link getISOWeek} function options.
 */

/**
 * @name getISOWeek
 * @category ISO Week Helpers
 * @summary Get the ISO week of the given date.
 *
 * @description
 * Get the ISO week of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The ISO week
 *
 * @example
 * // Which week of the ISO-week numbering year is 2 January 2005?
 * const result = getISOWeek(new Date(2005, 0, 2))
 * //=> 53
 */
function getISOWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfISOWeek(_date) - +startOfISOWeekYear(_date);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

/**
 * The {@link getWeekYear} function options.
 */

/**
 * @name getWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Get the local week-numbering year of the given date.
 *
 * @description
 * Get the local week-numbering year of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The local week-numbering year
 *
 * @example
 * // Which week numbering year is 26 December 2004 with the default settings?
 * const result = getWeekYear(new Date(2004, 11, 26))
 * //=> 2005
 *
 * @example
 * // Which week numbering year is 26 December 2004 if week starts on Saturday?
 * const result = getWeekYear(new Date(2004, 11, 26), { weekStartsOn: 6 })
 * //=> 2004
 *
 * @example
 * // Which week numbering year is 26 December 2004 if the first week contains 4 January?
 * const result = getWeekYear(new Date(2004, 11, 26), { firstWeekContainsDate: 4 })
 * //=> 2004
 */
function getWeekYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();

  const defaultOptions = getDefaultOptions$1();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const firstWeekOfNextYear = constructFrom(options?.in || date, 0);
  firstWeekOfNextYear.setFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setHours(0, 0, 0, 0);
  const startOfNextYear = startOfWeek(firstWeekOfNextYear, options);

  const firstWeekOfThisYear = constructFrom(options?.in || date, 0);
  firstWeekOfThisYear.setFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setHours(0, 0, 0, 0);
  const startOfThisYear = startOfWeek(firstWeekOfThisYear, options);

  if (+_date >= +startOfNextYear) {
    return year + 1;
  } else if (+_date >= +startOfThisYear) {
    return year;
  } else {
    return year - 1;
  }
}

/**
 * The {@link startOfWeekYear} function options.
 */

/**
 * @name startOfWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Return the start of a local week-numbering year for the given date.
 *
 * @description
 * Return the start of a local week-numbering year.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a week-numbering year
 *
 * @example
 * // The start of an a week-numbering year for 2 July 2005 with default settings:
 * const result = startOfWeekYear(new Date(2005, 6, 2))
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // The start of a week-numbering year for 2 July 2005
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = startOfWeekYear(new Date(2005, 6, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Mon Jan 03 2005 00:00:00
 */
function startOfWeekYear(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const year = getWeekYear(date, options);
  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);
  const _date = startOfWeek(firstWeek, options);
  return _date;
}

/**
 * The {@link getWeek} function options.
 */

/**
 * @name getWeek
 * @category Week Helpers
 * @summary Get the local week index of the given date.
 *
 * @description
 * Get the local week index of the given date.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The week
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005 with default options?
 * const result = getWeek(new Date(2005, 0, 2))
 * //=> 2
 *
 * @example
 * // Which week of the local week numbering year is 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January?
 * const result = getWeek(new Date(2005, 0, 2), {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> 53
 */
function getWeek(date, options) {
  const _date = toDate(date, options?.in);
  const diff = +startOfWeek(_date, options) - +startOfWeekYear(_date, options);

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek) + 1;
}

function addLeadingZeros(number, targetLength) {
  const sign = number < 0 ? "-" : "";
  const output = Math.abs(number).toString().padStart(targetLength, "0");
  return sign + output;
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */

const lightFormatters = {
  // Year
  y(date, token) {
    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
    // |----------|-------|----|-------|-------|-------|
    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |

    const signedYear = date.getFullYear();
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },

  // Month
  M(date, token) {
    const month = date.getMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },

  // Day of the month
  d(date, token) {
    return addLeadingZeros(date.getDate(), token.length);
  },

  // AM or PM
  a(date, token) {
    const dayPeriodEnumValue = date.getHours() / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },

  // Hour [1-12]
  h(date, token) {
    return addLeadingZeros(date.getHours() % 12 || 12, token.length);
  },

  // Hour [0-23]
  H(date, token) {
    return addLeadingZeros(date.getHours(), token.length);
  },

  // Minute
  m(date, token) {
    return addLeadingZeros(date.getMinutes(), token.length);
  },

  // Second
  s(date, token) {
    return addLeadingZeros(date.getSeconds(), token.length);
  },

  // Fraction of second
  S(date, token) {
    const numberOfDigits = token.length;
    const milliseconds = date.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, numberOfDigits - 3),
    );
    return addLeadingZeros(fractionalSeconds, token.length);
  },
};

const dayPeriodEnum = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night",
};

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */

const formatters = {
  // Era
  G: function (date, token, localize) {
    const era = date.getFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize.era(era, { width: "abbreviated" });
      // A, B
      case "GGGGG":
        return localize.era(era, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize.era(era, { width: "wide" });
    }
  },

  // Year
  y: function (date, token, localize) {
    // Ordinal number
    if (token === "yo") {
      const signedYear = date.getFullYear();
      // Returns 1 for 1 BC (which is year 0 in JavaScript)
      const year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize.ordinalNumber(year, { unit: "year" });
    }

    return lightFormatters.y(date, token);
  },

  // Local week-numbering year
  Y: function (date, token, localize, options) {
    const signedWeekYear = getWeekYear(date, options);
    // Returns 1 for 1 BC (which is year 0 in JavaScript)
    const weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;

    // Two digit year
    if (token === "YY") {
      const twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }

    // Ordinal number
    if (token === "Yo") {
      return localize.ordinalNumber(weekYear, { unit: "year" });
    }

    // Padding
    return addLeadingZeros(weekYear, token.length);
  },

  // ISO week-numbering year
  R: function (date, token) {
    const isoWeekYear = getISOWeekYear(date);

    // Padding
    return addLeadingZeros(isoWeekYear, token.length);
  },

  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function (date, token) {
    const year = date.getFullYear();
    return addLeadingZeros(year, token.length);
  },

  // Quarter
  Q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "formatting",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone quarter
  q: function (date, token, localize) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize.ordinalNumber(quarter, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize.quarter(quarter, {
          width: "abbreviated",
          context: "standalone",
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize.quarter(quarter, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize.quarter(quarter, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // Month
  M: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      case "M":
      case "MM":
        return lightFormatters.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize.month(month, {
          width: "abbreviated",
          context: "formatting",
        });
      // J, F, ..., D
      case "MMMMM":
        return localize.month(month, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize.month(month, { width: "wide", context: "formatting" });
    }
  },

  // Stand-alone month
  L: function (date, token, localize) {
    const month = date.getMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize.ordinalNumber(month + 1, { unit: "month" });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize.month(month, {
          width: "abbreviated",
          context: "standalone",
        });
      // J, F, ..., D
      case "LLLLL":
        return localize.month(month, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize.month(month, { width: "wide", context: "standalone" });
    }
  },

  // Local week of year
  w: function (date, token, localize, options) {
    const week = getWeek(date, options);

    if (token === "wo") {
      return localize.ordinalNumber(week, { unit: "week" });
    }

    return addLeadingZeros(week, token.length);
  },

  // ISO week of year
  I: function (date, token, localize) {
    const isoWeek = getISOWeek(date);

    if (token === "Io") {
      return localize.ordinalNumber(isoWeek, { unit: "week" });
    }

    return addLeadingZeros(isoWeek, token.length);
  },

  // Day of the month
  d: function (date, token, localize) {
    if (token === "do") {
      return localize.ordinalNumber(date.getDate(), { unit: "date" });
    }

    return lightFormatters.d(date, token);
  },

  // Day of year
  D: function (date, token, localize) {
    const dayOfYear = getDayOfYear(date);

    if (token === "Do") {
      return localize.ordinalNumber(dayOfYear, { unit: "dayOfYear" });
    }

    return addLeadingZeros(dayOfYear, token.length);
  },

  // Day of week
  E: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "EEEEE":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "EEEE":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Local day of week
  e: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "eee":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "eeeee":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "eeee":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Stand-alone local day of week
  c: function (date, token, localize, options) {
    const dayOfWeek = date.getDay();
    const localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize.ordinalNumber(localDayOfWeek, { unit: "day" });
      case "ccc":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone",
        });
      // T
      case "ccccc":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "standalone",
        });
      // Tuesday
      case "cccc":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "standalone",
        });
    }
  },

  // ISO day of week
  i: function (date, token, localize) {
    const dayOfWeek = date.getDay();
    const isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize.ordinalNumber(isoDayOfWeek, { unit: "day" });
      // Tue
      case "iii":
        return localize.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting",
        });
      // T
      case "iiiii":
        return localize.day(dayOfWeek, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "iiiiii":
        return localize.day(dayOfWeek, {
          width: "short",
          context: "formatting",
        });
      // Tuesday
      case "iiii":
      default:
        return localize.day(dayOfWeek, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM or PM
  a: function (date, token, localize) {
    const hours = date.getHours();
    const dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";

    switch (token) {
      case "a":
      case "aa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "aaa":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "aaaaa":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // AM, PM, midnight, noon
  b: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }

    switch (token) {
      case "b":
      case "bb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "bbb":
        return localize
          .dayPeriod(dayPeriodEnumValue, {
            width: "abbreviated",
            context: "formatting",
          })
          .toLowerCase();
      case "bbbbb":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // in the morning, in the afternoon, in the evening, at night
  B: function (date, token, localize) {
    const hours = date.getHours();
    let dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }

    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting",
        });
      case "BBBBB":
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return localize.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting",
        });
    }
  },

  // Hour [1-12]
  h: function (date, token, localize) {
    if (token === "ho") {
      let hours = date.getHours() % 12;
      if (hours === 0) hours = 12;
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return lightFormatters.h(date, token);
  },

  // Hour [0-23]
  H: function (date, token, localize) {
    if (token === "Ho") {
      return localize.ordinalNumber(date.getHours(), { unit: "hour" });
    }

    return lightFormatters.H(date, token);
  },

  // Hour [0-11]
  K: function (date, token, localize) {
    const hours = date.getHours() % 12;

    if (token === "Ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Hour [1-24]
  k: function (date, token, localize) {
    let hours = date.getHours();
    if (hours === 0) hours = 24;

    if (token === "ko") {
      return localize.ordinalNumber(hours, { unit: "hour" });
    }

    return addLeadingZeros(hours, token.length);
  },

  // Minute
  m: function (date, token, localize) {
    if (token === "mo") {
      return localize.ordinalNumber(date.getMinutes(), { unit: "minute" });
    }

    return lightFormatters.m(date, token);
  },

  // Second
  s: function (date, token, localize) {
    if (token === "so") {
      return localize.ordinalNumber(date.getSeconds(), { unit: "second" });
    }

    return lightFormatters.s(date, token);
  },

  // Fraction of second
  S: function (date, token) {
    return lightFormatters.S(date, token);
  },

  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    if (timezoneOffset === 0) {
      return "Z";
    }

    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx": // Hours and minutes without `:` delimiter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx": // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (GMT)
  O: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Timezone (specific non-location)
  z: function (date, token, _localize) {
    const timezoneOffset = date.getTimezoneOffset();

    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },

  // Seconds timestamp
  t: function (date, token, _localize) {
    const timestamp = Math.trunc(+date / 1000);
    return addLeadingZeros(timestamp, token.length);
  },

  // Milliseconds timestamp
  T: function (date, token, _localize) {
    return addLeadingZeros(+date, token.length);
  },
};

function formatTimezoneShort(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = Math.trunc(absOffset / 60);
  const minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}

function formatTimezoneWithOptionalMinutes(offset, delimiter) {
  if (offset % 60 === 0) {
    const sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, delimiter);
}

function formatTimezone(offset, delimiter = "") {
  const sign = offset > 0 ? "-" : "+";
  const absOffset = Math.abs(offset);
  const hours = addLeadingZeros(Math.trunc(absOffset / 60), 2);
  const minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}

const dateLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "P":
      return formatLong.date({ width: "short" });
    case "PP":
      return formatLong.date({ width: "medium" });
    case "PPP":
      return formatLong.date({ width: "long" });
    case "PPPP":
    default:
      return formatLong.date({ width: "full" });
  }
};

const timeLongFormatter = (pattern, formatLong) => {
  switch (pattern) {
    case "p":
      return formatLong.time({ width: "short" });
    case "pp":
      return formatLong.time({ width: "medium" });
    case "ppp":
      return formatLong.time({ width: "long" });
    case "pppp":
    default:
      return formatLong.time({ width: "full" });
  }
};

const dateTimeLongFormatter = (pattern, formatLong) => {
  const matchResult = pattern.match(/(P+)(p+)?/) || [];
  const datePattern = matchResult[1];
  const timePattern = matchResult[2];

  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong);
  }

  let dateTimeFormat;

  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong.dateTime({ width: "short" });
      break;
    case "PP":
      dateTimeFormat = formatLong.dateTime({ width: "medium" });
      break;
    case "PPP":
      dateTimeFormat = formatLong.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong.dateTime({ width: "full" });
      break;
  }

  return dateTimeFormat
    .replace("{{date}}", dateLongFormatter(datePattern, formatLong))
    .replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};

const longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter,
};

const dayOfYearTokenRE = /^D+$/;
const weekYearTokenRE = /^Y+$/;

const throwTokens = ["D", "DD", "YY", "YYYY"];

function isProtectedDayOfYearToken(token) {
  return dayOfYearTokenRE.test(token);
}

function isProtectedWeekYearToken(token) {
  return weekYearTokenRE.test(token);
}

function warnOrThrowProtectedError(token, format, input) {
  const _message = message(token, format, input);
  console.warn(_message);
  if (throwTokens.includes(token)) throw new RangeError(_message);
}

function message(token, format, input) {
  const subject = token[0] === "Y" ? "years" : "days of the month";
  return `Use \`${token.toLowerCase()}\` instead of \`${token}\` (in \`${format}\`) for formatting ${subject} to the input \`${input}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp$2 =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp$2 = /^'([^]*?)'?$/;
const doubleQuoteRegExp$2 = /''/g;
const unescapedLatinCharacterRegExp$2 = /[a-zA-Z]/;

/**
 * The {@link format} function options.
 */

/**
 * @name format
 * @alias formatDate
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          | a..aa   | AM, PM                            |       |
 * |                                 | aaa     | am, pm                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
 * |                                 | bbb     | am, pm, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 001, ..., 999                |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 04/29/1453                        | 7     |
 * |                                 | PP      | Apr 29, 1453                      | 7     |
 * |                                 | PPP     | April 29th, 1453                  | 7     |
 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear](https://date-fns.org/docs/getISOWeekYear)
 *    and [getWeekYear](https://date-fns.org/docs/getWeekYear)).
 *
 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
 *    so right now these tokens fall back to GMT timezones.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 9. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @param date - The original date
 * @param format - The string of tokens
 * @param options - An object with options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * const result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format(date, formatStr, options) {
  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const originalDate = toDate(date, options?.in);

  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }

  let parts = formatStr
    .match(longFormattingTokensRegExp$1)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter === "p" || firstCharacter === "P") {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp$2)
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return { isToken: false, value: "'" };
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return { isToken: false, value: cleanEscapedString$2(substring) };
      }

      if (formatters[firstCharacter]) {
        return { isToken: true, value: substring };
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp$2)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return { isToken: false, value: substring };
    });

  // invoke localize preprocessor (only for french locales at the moment)
  if (locale.localize.preprocessor) {
    parts = locale.localize.preprocessor(originalDate, parts);
  }

  const formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  return parts
    .map((part) => {
      if (!part.isToken) return part.value;

      const token = part.value;

      if (
        (!options?.useAdditionalWeekYearTokens &&
          isProtectedWeekYearToken(token)) ||
        (!options?.useAdditionalDayOfYearTokens &&
          isProtectedDayOfYearToken(token))
      ) {
        warnOrThrowProtectedError(token, formatStr, String(date));
      }

      const formatter = formatters[token[0]];
      return formatter(originalDate, token, locale.localize, formatterOptions);
    })
    .join("");
}

function cleanEscapedString$2(input) {
  const matched = input.match(escapedStringRegExp$2);

  if (!matched) {
    return input;
  }

  return matched[1].replace(doubleQuoteRegExp$2, "'");
}

/**
 * The {@link formatDistance} function options.
 */

/**
 * @name formatDistance
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words.
 *
 * | Distance between dates                                            | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance between dates | Result               |
 * |------------------------|----------------------|
 * | 0 secs ... 5 secs      | less than 5 seconds  |
 * | 5 secs ... 10 secs     | less than 10 seconds |
 * | 10 secs ... 20 secs    | less than 20 seconds |
 * | 20 secs ... 40 secs    | half a minute        |
 * | 40 secs ... 60 secs    | less than a minute   |
 * | 60 secs ... 90 secs    | 1 minute             |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistance(new Date(2014, 6, 2), new Date(2015, 0, 1))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00, including seconds?
 * const result = formatDistance(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0),
 *   { includeSeconds: true }
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistance(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> 'about 1 year ago'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistance(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> 'pli ol 1 jaro'
 */
function formatDistance(laterDate, earlierDate, options) {
  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;
  const minutesInAlmostTwoDays = 2520;

  const comparison = compareAsc(laterDate, earlierDate);

  if (isNaN(comparison)) throw new RangeError("Invalid time value");

  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison: comparison,
  });

  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    ...(comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]),
  );

  const seconds = differenceInSeconds(earlierDate_, laterDate_);
  const offsetInSeconds =
    (getTimezoneOffsetInMilliseconds(earlierDate_) -
      getTimezoneOffsetInMilliseconds(laterDate_)) /
    1000;
  const minutes = Math.round((seconds - offsetInSeconds) / 60);
  let months;

  // 0 up to 2 mins
  if (minutes < 2) {
    if (options?.includeSeconds) {
      if (seconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return locale.formatDistance("halfAMinute", 0, localizeOptions);
      } else if (seconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return locale.formatDistance("lessThanXMinutes", 1, localizeOptions);
      } else {
        return locale.formatDistance("xMinutes", minutes, localizeOptions);
      }
    }

    // 2 mins up to 0.75 hrs
  } else if (minutes < 45) {
    return locale.formatDistance("xMinutes", minutes, localizeOptions);

    // 0.75 hrs up to 1.5 hrs
  } else if (minutes < 90) {
    return locale.formatDistance("aboutXHours", 1, localizeOptions);

    // 1.5 hrs up to 24 hrs
  } else if (minutes < minutesInDay) {
    const hours = Math.round(minutes / 60);
    return locale.formatDistance("aboutXHours", hours, localizeOptions);

    // 1 day up to 1.75 days
  } else if (minutes < minutesInAlmostTwoDays) {
    return locale.formatDistance("xDays", 1, localizeOptions);

    // 1.75 days up to 30 days
  } else if (minutes < minutesInMonth) {
    const days = Math.round(minutes / minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);

    // 1 month up to 2 months
  } else if (minutes < minutesInMonth * 2) {
    months = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("aboutXMonths", months, localizeOptions);
  }

  months = differenceInMonths(earlierDate_, laterDate_);

  // 2 months up to 12 months
  if (months < 12) {
    const nearestMonth = Math.round(minutes / minutesInMonth);
    return locale.formatDistance("xMonths", nearestMonth, localizeOptions);

    // 1 year up to max Date
  } else {
    const monthsSinceStartOfYear = months % 12;
    const years = Math.trunc(months / 12);

    // N years up to 1 years 3 months
    if (monthsSinceStartOfYear < 3) {
      return locale.formatDistance("aboutXYears", years, localizeOptions);

      // N years 3 months up to N years 9 months
    } else if (monthsSinceStartOfYear < 9) {
      return locale.formatDistance("overXYears", years, localizeOptions);

      // N years 9 months up to N year 12 months
    } else {
      return locale.formatDistance("almostXYears", years + 1, localizeOptions);
    }
  }
}

/**
 * The {@link formatDistanceStrict} function options.
 */

/**
 * The unit used to format the distance in {@link formatDistanceStrict}.
 */

/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(laterDate, earlierDate, options) {
  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const comparison = compareAsc(laterDate, earlierDate);

  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }

  const localizeOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison: comparison,
  });

  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    ...(comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]),
  );

  const roundingMethod = getRoundingMethod(options?.roundingMethod ?? "round");

  const milliseconds = earlierDate_.getTime() - laterDate_.getTime();
  const minutes = milliseconds / millisecondsInMinute;

  const timezoneOffset =
    getTimezoneOffsetInMilliseconds(earlierDate_) -
    getTimezoneOffsetInMilliseconds(laterDate_);

  // Use DST-normalized difference in minutes for years, months and days;
  // use regular difference in minutes for hours, minutes and seconds.
  const dstNormalizedMinutes =
    (milliseconds - timezoneOffset) / millisecondsInMinute;

  const defaultUnit = options?.unit;
  let unit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = "second";
    } else if (minutes < 60) {
      unit = "minute";
    } else if (minutes < minutesInDay) {
      unit = "hour";
    } else if (dstNormalizedMinutes < minutesInMonth) {
      unit = "day";
    } else if (dstNormalizedMinutes < minutesInYear) {
      unit = "month";
    } else {
      unit = "year";
    }
  } else {
    unit = defaultUnit;
  }

  // 0 up to 60 seconds
  if (unit === "second") {
    const seconds = roundingMethod(milliseconds / 1000);
    return locale.formatDistance("xSeconds", seconds, localizeOptions);

    // 1 up to 60 mins
  } else if (unit === "minute") {
    const roundedMinutes = roundingMethod(minutes);
    return locale.formatDistance("xMinutes", roundedMinutes, localizeOptions);

    // 1 up to 24 hours
  } else if (unit === "hour") {
    const hours = roundingMethod(minutes / 60);
    return locale.formatDistance("xHours", hours, localizeOptions);

    // 1 up to 30 days
  } else if (unit === "day") {
    const days = roundingMethod(dstNormalizedMinutes / minutesInDay);
    return locale.formatDistance("xDays", days, localizeOptions);

    // 1 up to 12 months
  } else if (unit === "month") {
    const months = roundingMethod(dstNormalizedMinutes / minutesInMonth);
    return months === 12 && defaultUnit !== "month"
      ? locale.formatDistance("xYears", 1, localizeOptions)
      : locale.formatDistance("xMonths", months, localizeOptions);

    // 1 year up to max Date
  } else {
    const years = roundingMethod(dstNormalizedMinutes / minutesInYear);
    return locale.formatDistance("xYears", years, localizeOptions);
  }
}

/**
 * The {@link formatDistanceToNow} function options.
 */

/**
 * @name formatDistanceToNow
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given date and now in words.
 *
 * | Distance to now                                                   | Result              |
 * |-------------------------------------------------------------------|---------------------|
 * | 0 ... 30 secs                                                     | less than a minute  |
 * | 30 secs ... 1 min 30 secs                                         | 1 minute            |
 * | 1 min 30 secs ... 44 mins 30 secs                                 | [2..44] minutes     |
 * | 44 mins ... 30 secs ... 89 mins 30 secs                           | about 1 hour        |
 * | 89 mins 30 secs ... 23 hrs 59 mins 30 secs                        | about [2..24] hours |
 * | 23 hrs 59 mins 30 secs ... 41 hrs 59 mins 30 secs                 | 1 day               |
 * | 41 hrs 59 mins 30 secs ... 29 days 23 hrs 59 mins 30 secs         | [2..30] days        |
 * | 29 days 23 hrs 59 mins 30 secs ... 44 days 23 hrs 59 mins 30 secs | about 1 month       |
 * | 44 days 23 hrs 59 mins 30 secs ... 59 days 23 hrs 59 mins 30 secs | about 2 months      |
 * | 59 days 23 hrs 59 mins 30 secs ... 1 yr                           | [2..12] months      |
 * | 1 yr ... 1 yr 3 months                                            | about 1 year        |
 * | 1 yr 3 months ... 1 yr 9 month s                                  | over 1 year         |
 * | 1 yr 9 months ... 2 yrs                                           | almost 2 years      |
 * | N yrs ... N yrs 3 months                                          | about N years       |
 * | N yrs 3 months ... N yrs 9 months                                 | over N years        |
 * | N yrs 9 months ... N+1 yrs                                        | almost N+1 years    |
 *
 * With `options.includeSeconds == true`:
 * | Distance to now     | Result               |
 * |---------------------|----------------------|
 * | 0 secs ... 5 secs   | less than 5 seconds  |
 * | 5 secs ... 10 secs  | less than 10 seconds |
 * | 10 secs ... 20 secs | less than 20 seconds |
 * | 20 secs ... 40 secs | half a minute        |
 * | 40 secs ... 60 secs | less than a minute   |
 * | 60 secs ... 90 secs | 1 minute             |
 *
 * @param date - The given date
 * @param options - The object with options
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNow(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNow(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   {includeSeconds: true}
 * )
 * //=> 'less than 20 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNow(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in about 1 year'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 August 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNow(
 *   new Date(2016, 7, 1),
 *   {locale: eoLocale}
 * )
 * //=> 'pli ol 1 jaro'
 */
function formatDistanceToNow(date, options) {
  return formatDistance(date, constructNow(date), options);
}

/**
 * The {@link formatDistanceToNowStrict} function options.
 */

/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The distance in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function formatDistanceToNowStrict(date, options) {
  return formatDistanceStrict(date, constructNow(date), options);
}

/**
 * The {@link formatDuration} function options.
 */

const defaultFormat = [
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds",
];

/**
 * @name formatDuration
 * @category Common Helpers
 * @summary Formats a duration in human-readable format
 *
 * @description
 * Return human-readable duration string i.e. "9 months 2 days"
 *
 * @param duration - The duration to format
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @example
 * // Format full duration
 * formatDuration({
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> '2 years 9 months 1 week 7 days 5 hours 9 minutes 30 seconds'
 *
 * @example
 * // Format partial duration
 * formatDuration({ months: 9, days: 2 })
 * //=> '9 months 2 days'
 *
 * @example
 * // Customize the format
 * formatDuration(
 *   {
 *     years: 2,
 *     months: 9,
 *     weeks: 1,
 *     days: 7,
 *     hours: 5,
 *     minutes: 9,
 *     seconds: 30
 *   },
 *   { format: ['months', 'weeks'] }
 * ) === '9 months 1 week'
 *
 * @example
 * // Customize the zeros presence
 * formatDuration({ years: 0, months: 9 })
 * //=> '9 months'
 * formatDuration({ years: 0, months: 9 }, { zero: true })
 * //=> '0 years 9 months'
 *
 * @example
 * // Customize the delimiter
 * formatDuration({ years: 2, months: 9, weeks: 3 }, { delimiter: ', ' })
 * //=> '2 years, 9 months, 3 weeks'
 */
function formatDuration(duration, options) {
  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;
  const format = options?.format ?? defaultFormat;
  const zero = options?.zero ?? false;
  const delimiter = options?.delimiter ?? " ";

  if (!locale.formatDistance) {
    return "";
  }

  const result = format
    .reduce((acc, unit) => {
      const token = `x${unit.replace(/(^.)/, (m) => m.toUpperCase())}`;
      const value = duration[unit];
      if (value !== undefined && (zero || duration[unit])) {
        return acc.concat(locale.formatDistance(token, value));
      }
      return acc;
    }, [])
    .join(delimiter);

  return result;
}

/**
 * The {@link formatISO} function options.
 */

/**
 * @name formatISO
 * @category Common Helpers
 * @summary Format the date according to the ISO 8601 standard (https://support.sas.com/documentation/cdl/en/lrdict/64316/HTML/default/viewer.htm#a003169814.htm).
 *
 * @description
 * Return the formatted date string in ISO 8601 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string (in local time zone)
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601, short format (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918T190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, date only:
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 8601 format, time only (local time zone is UTC):
 * const result = formatISO(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52Z'
 */
function formatISO(date, options) {
  const date_ = toDate(date, options?.in);

  if (isNaN(+date_)) {
    throw new RangeError("Invalid time value");
  }

  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  let result = "";
  let tzOffset = "";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  // Representation is either 'date' or 'complete'
  if (representation !== "time") {
    const day = addLeadingZeros(date_.getDate(), 2);
    const month = addLeadingZeros(date_.getMonth() + 1, 2);
    const year = addLeadingZeros(date_.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  // Representation is either 'time' or 'complete'
  if (representation !== "date") {
    // Add the timezone.
    const offset = date_.getTimezoneOffset();

    if (offset !== 0) {
      const absoluteOffset = Math.abs(offset);
      const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
      const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
      // If less than 0, the sign is +, because it is ahead of time.
      const sign = offset < 0 ? "+" : "-";

      tzOffset = `${sign}${hourOffset}:${minuteOffset}`;
    } else {
      tzOffset = "Z";
    }

    const hour = addLeadingZeros(date_.getHours(), 2);
    const minute = addLeadingZeros(date_.getMinutes(), 2);
    const second = addLeadingZeros(date_.getSeconds(), 2);

    // If there's also date, separate it with time with 'T'
    const separator = result === "" ? "" : "T";

    // Creates a time string consisting of hour, minute, and second, separated by delimiters, if defined.
    const time = [hour, minute, second].join(timeDelimiter);

    // HHmmss or HH:mm:ss.
    result = `${result}${separator}${time}${tzOffset}`;
  }

  return result;
}

/**
 * The {@link formatISO9075} function options.
 */

/**
 * @name formatISO9075
 * @category Common Helpers
 * @summary Format the date according to the ISO 9075 standard (https://dev.mysql.com/doc/refman/5.7/en/date-and-time-functions.html#function_get-format).
 *
 * @description
 * Return the formatted date string in ISO 9075 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18 19:00:52'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075, short format:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { format: 'basic' })
 * //=> '20190918 190052'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, date only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'date' })
 * //=> '2019-09-18'
 *
 * @example
 * // Represent 18 September 2019 in ISO 9075 format, time only:
 * const result = formatISO9075(new Date(2019, 8, 18, 19, 0, 52), { representation: 'time' })
 * //=> '19:00:52'
 */
function formatISO9075(date, options) {
  const date_ = toDate(date, options?.in);

  if (!isValid(date_)) {
    throw new RangeError("Invalid time value");
  }

  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  let result = "";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  // Representation is either 'date' or 'complete'
  if (representation !== "time") {
    const day = addLeadingZeros(date_.getDate(), 2);
    const month = addLeadingZeros(date_.getMonth() + 1, 2);
    const year = addLeadingZeros(date_.getFullYear(), 4);

    // yyyyMMdd or yyyy-MM-dd.
    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  // Representation is either 'time' or 'complete'
  if (representation !== "date") {
    const hour = addLeadingZeros(date_.getHours(), 2);
    const minute = addLeadingZeros(date_.getMinutes(), 2);
    const second = addLeadingZeros(date_.getSeconds(), 2);

    // If there's also date, separate it with time with a space
    const separator = result === "" ? "" : " ";

    // HHmmss or HH:mm:ss.
    result = `${result}${separator}${hour}${timeDelimiter}${minute}${timeDelimiter}${second}`;
  }

  return result;
}

/**
 * @name formatISODuration
 * @category Common Helpers
 * @summary Format a duration object according as ISO 8601 duration string
 *
 * @description
 * Format a duration object according to the ISO 8601 duration standard (https://www.digi.com/resources/documentation/digidocs//90001488-13/reference/r_iso_8601_duration_format.htm)
 *
 * @param duration - The duration to format
 *
 * @returns The ISO 8601 duration string
 *
 * @example
 * // Format the given duration as ISO 8601 string
 * const result = formatISODuration({
 *   years: 39,
 *   months: 2,
 *   days: 20,
 *   hours: 7,
 *   minutes: 5,
 *   seconds: 0
 * })
 * //=> 'P39Y2M20DT0H0M0S'
 */
function formatISODuration(duration) {
  const {
    years = 0,
    months = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  return `P${years}Y${months}M${days}DT${hours}H${minutes}M${seconds}S`;
}

/**
 * The {@link formatRFC3339} function options.
 */

/**
 * @name formatRFC3339
 * @category Common Helpers
 * @summary Format the date according to the RFC 3339 standard (https://tools.ietf.org/html/rfc3339#section-5.6).
 *
 * @description
 * Return the formatted date string in RFC 3339 format. Options may be passed to control the parts and notations of the date.
 *
 * @param date - The original date
 * @param options - An object with options.
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format:
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52))
 * //=> '2019-09-18T19:00:52Z'
 *
 * @example
 * // Represent 18 September 2019 in RFC 3339 format, 3 digits of second fraction
 * formatRFC3339(new Date(2019, 8, 18, 19, 0, 52, 234), {
 *   fractionDigits: 3
 * })
 * //=> '2019-09-18T19:00:52.234Z'
 */
function formatRFC3339(date, options) {
  const date_ = toDate(date, options?.in);

  if (!isValid(date_)) {
    throw new RangeError("Invalid time value");
  }

  const fractionDigits = options?.fractionDigits ?? 0;

  const day = addLeadingZeros(date_.getDate(), 2);
  const month = addLeadingZeros(date_.getMonth() + 1, 2);
  const year = date_.getFullYear();

  const hour = addLeadingZeros(date_.getHours(), 2);
  const minute = addLeadingZeros(date_.getMinutes(), 2);
  const second = addLeadingZeros(date_.getSeconds(), 2);

  let fractionalSecond = "";
  if (fractionDigits > 0) {
    const milliseconds = date_.getMilliseconds();
    const fractionalSeconds = Math.trunc(
      milliseconds * Math.pow(10, fractionDigits - 3),
    );
    fractionalSecond = "." + addLeadingZeros(fractionalSeconds, fractionDigits);
  }

  let offset = "";
  const tzOffset = date_.getTimezoneOffset();

  if (tzOffset !== 0) {
    const absoluteOffset = Math.abs(tzOffset);
    const hourOffset = addLeadingZeros(Math.trunc(absoluteOffset / 60), 2);
    const minuteOffset = addLeadingZeros(absoluteOffset % 60, 2);
    // If less than 0, the sign is +, because it is ahead of time.
    const sign = tzOffset < 0 ? "+" : "-";

    offset = `${sign}${hourOffset}:${minuteOffset}`;
  } else {
    offset = "Z";
  }

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}${offset}`;
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * @name formatRFC7231
 * @category Common Helpers
 * @summary Format the date according to the RFC 7231 standard (https://tools.ietf.org/html/rfc7231#section-7.1.1.1).
 *
 * @description
 * Return the formatted date string in RFC 7231 format.
 * The result will always be in UTC timezone.
 *
 * @param date - The original date
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 18 September 2019 in RFC 7231 format:
 * const result = formatRFC7231(new Date(2019, 8, 18, 19, 0, 52))
 * //=> 'Wed, 18 Sep 2019 19:00:52 GMT'
 */
function formatRFC7231(date) {
  const _date = toDate(date);

  if (!isValid(_date)) {
    throw new RangeError("Invalid time value");
  }

  const dayName = days[_date.getUTCDay()];
  const dayOfMonth = addLeadingZeros(_date.getUTCDate(), 2);
  const monthName = months[_date.getUTCMonth()];
  const year = _date.getUTCFullYear();

  const hour = addLeadingZeros(_date.getUTCHours(), 2);
  const minute = addLeadingZeros(_date.getUTCMinutes(), 2);
  const second = addLeadingZeros(_date.getUTCSeconds(), 2);

  // Result variables.
  return `${dayName}, ${dayOfMonth} ${monthName} ${year} ${hour}:${minute}:${second} GMT`;
}

/**
 * The {@link formatRelative} function options.
 */

/**
 * @name formatRelative
 * @category Common Helpers
 * @summary Represent the date in words relative to the given base date.
 *
 * @description
 * Represent the date in words relative to the given base date.
 *
 * | Distance to the base date | Result                    |
 * |---------------------------|---------------------------|
 * | Previous 6 days           | last Sunday at 04:30 AM   |
 * | Last day                  | yesterday at 04:30 AM     |
 * | Same day                  | today at 04:30 AM         |
 * | Next day                  | tomorrow at 04:30 AM      |
 * | Next 6 days               | Sunday at 04:30 AM        |
 * | Other                     | 12/31/2017                |
 *
 * @param date - The date to format
 * @param baseDate - The date to compare with
 * @param options - An object with options
 *
 * @returns The date in words
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.locale` must contain `localize` property
 * @throws `options.locale` must contain `formatLong` property
 * @throws `options.locale` must contain `formatRelative` property
 *
 * @example
 * // Represent the date of 6 days ago in words relative to the given base date. In this example, today is Wednesday
 * const result = formatRelative(subDays(new Date(), 6), new Date())
 * //=> "last Thursday at 12:45 AM"
 */
function formatRelative(date, baseDate, options) {
  const [date_, baseDate_] = normalizeDates(options?.in, date, baseDate);

  const defaultOptions = getDefaultOptions$1();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const diff = differenceInCalendarDays(date_, baseDate_);

  if (isNaN(diff)) {
    throw new RangeError("Invalid time value");
  }

  let token;
  if (diff < -6) {
    token = "other";
  } else if (diff < -1) {
    token = "lastWeek";
  } else if (diff < 0) {
    token = "yesterday";
  } else if (diff < 1) {
    token = "today";
  } else if (diff < 2) {
    token = "tomorrow";
  } else if (diff < 7) {
    token = "nextWeek";
  } else {
    token = "other";
  }

  const formatStr = locale.formatRelative(token, date_, baseDate_, {
    locale,
    weekStartsOn,
  });
  return format(date_, formatStr, { locale, weekStartsOn });
}

/**
 * The {@link fromUnixTime} function options.
 */

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 * @param options - An object with options. Allows to pass a context.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @returns The date
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
function fromUnixTime(unixTime, options) {
  return toDate(unixTime * 1000, options?.in);
}

/**
 * The {@link getDate} function options.
 */

/**
 * @name getDate
 * @category Day Helpers
 * @summary Get the day of the month of the given date.
 *
 * @description
 * Get the day of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The day of month
 *
 * @example
 * // Which day of the month is 29 February 2012?
 * const result = getDate(new Date(2012, 1, 29))
 * //=> 29
 */
function getDate(date, options) {
  return toDate(date, options?.in).getDate();
}

/**
 * The {@link getDay} function options.
 */

/**
 * @name getDay
 * @category Weekday Helpers
 * @summary Get the day of the week of the given date.
 *
 * @description
 * Get the day of the week of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The day of week, 0 represents Sunday
 *
 * @example
 * // Which day of the week is 29 February 2012?
 * const result = getDay(new Date(2012, 1, 29))
 * //=> 3
 */
function getDay(date, options) {
  return toDate(date, options?.in).getDay();
}

/**
 * The {@link getDaysInMonth} function options.
 */

/**
 * @name getDaysInMonth
 * @category Month Helpers
 * @summary Get the number of days in a month of the given date.
 *
 * @description
 * Get the number of days in a month of the given date, considering the context if provided.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a month
 *
 * @example
 * // How many days are in February 2000?
 * const result = getDaysInMonth(new Date(2000, 1))
 * //=> 29
 */
function getDaysInMonth(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const monthIndex = _date.getMonth();
  const lastDayOfMonth = constructFrom(_date, 0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}

/**
 * @name isLeapYear
 * @category Year Helpers
 * @summary Is the given date in the leap year?
 *
 * @description
 * Is the given date in the leap year?
 *
 * @param date - The date to check
 * @param options - The options object
 *
 * @returns The date is in the leap year
 *
 * @example
 * // Is 1 September 2012 in the leap year?
 * const result = isLeapYear(new Date(2012, 8, 1))
 * //=> true
 */
function isLeapYear(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * The {@link getDaysInYear} function options.
 */

/**
 * @name getDaysInYear
 * @category Year Helpers
 * @summary Get the number of days in a year of the given date.
 *
 * @description
 * Get the number of days in a year of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of days in a year
 *
 * @example
 * // How many days are in 2012?
 * const result = getDaysInYear(new Date(2012, 0, 1))
 * //=> 366
 */
function getDaysInYear(date, options) {
  const _date = toDate(date, options?.in);
  if (Number.isNaN(+_date)) return NaN;
  return isLeapYear(_date) ? 366 : 365;
}

/**
 * The {@link getDecade} function options.
 */

/**
 * @name getDecade
 * @category Decade Helpers
 * @summary Get the decade of the given date.
 *
 * @description
 * Get the decade of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The year of decade
 *
 * @example
 * // Which decade belongs 27 November 1942?
 * const result = getDecade(new Date(1942, 10, 27))
 * //=> 1940
 */
function getDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const decade = Math.floor(year / 10) * 10;
  return decade;
}

/**
 * @name getDefaultOptions
 * @category Common Helpers
 * @summary Get default options.
 * @pure false
 *
 * @description
 * Returns an object that contains defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * You can change these with [setDefaultOptions](https://date-fns.org/docs/setDefaultOptions).
 *
 * @returns The default options
 *
 * @example
 * const result = getDefaultOptions()
 * //=> {}
 *
 * @example
 * setDefaultOptions({ weekStarsOn: 1, firstWeekContainsDate: 4 })
 * const result = getDefaultOptions()
 * //=> { weekStarsOn: 1, firstWeekContainsDate: 4 }
 */
function getDefaultOptions() {
  return Object.assign({}, getDefaultOptions$1());
}

/**
 * The {@link getHours} function options.
 */

/**
 * @name getHours
 * @category Hour Helpers
 * @summary Get the hours of the given date.
 *
 * @description
 * Get the hours of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The hours
 *
 * @example
 * // Get the hours of 29 February 2012 11:45:00:
 * const result = getHours(new Date(2012, 1, 29, 11, 45))
 * //=> 11
 */
function getHours(date, options) {
  return toDate(date, options?.in).getHours();
}

/**
 * The {@link getISODay} function options.
 */

/**
 * @name getISODay
 * @category Weekday Helpers
 * @summary Get the day of the ISO week of the given date.
 *
 * @description
 * Get the day of the ISO week of the given date,
 * which is 7 for Sunday, 1 for Monday etc.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The day of ISO week
 *
 * @example
 * // Which day of the ISO week is 26 February 2012?
 * const result = getISODay(new Date(2012, 1, 26))
 * //=> 7
 */
function getISODay(date, options) {
  const day = toDate(date, options?.in).getDay();
  return day === 0 ? 7 : day;
}

/**
 * The {@link getISOWeeksInYear} function options.
 */

/**
 * @name getISOWeeksInYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * @description
 * Get the number of weeks in an ISO week-numbering year of the given date.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The number of ISO weeks in a year
 *
 * @example
 * // How many weeks are in ISO week-numbering year 2015?
 * const result = getISOWeeksInYear(new Date(2015, 1, 11))
 * //=> 53
 */
function getISOWeeksInYear(date, options) {
  const thisYear = startOfISOWeekYear(date, options);
  const nextYear = startOfISOWeekYear(addWeeks(thisYear, 60));
  const diff = +nextYear - +thisYear;

  // Round the number of weeks to the nearest integer because the number of
  // milliseconds in a week is not constant (e.g. it's different in the week of
  // the daylight saving time clock shift).
  return Math.round(diff / millisecondsInWeek);
}

/**
 * @name getMilliseconds
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The milliseconds
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * const result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
function getMilliseconds(date) {
  return toDate(date).getMilliseconds();
}

/**
 * The {@link getMinutes} function options.
 */

/**
 * @name getMinutes
 * @category Minute Helpers
 * @summary Get the minutes of the given date.
 *
 * @description
 * Get the minutes of the given date.
 *
 * @param date - The given date
 * @param options - The options
 *
 * @returns The minutes
 *
 * @example
 * // Get the minutes of 29 February 2012 11:45:05:
 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 45
 */
function getMinutes(date, options) {
  return toDate(date, options?.in).getMinutes();
}

/**
 * The {@link getMonth} function options.
 */

/**
 * @name getMonth
 * @category Month Helpers
 * @summary Get the month of the given date.
 *
 * @description
 * Get the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The month index (0-11)
 *
 * @example
 * // Which month is 29 February 2012?
 * const result = getMonth(new Date(2012, 1, 29))
 * //=> 1
 */
function getMonth(date, options) {
  return toDate(date, options?.in).getMonth();
}

/**
 * @name getOverlappingDaysInIntervals
 * @category Interval Helpers
 * @summary Get the number of days that overlap in two time intervals
 *
 * @description
 * Get the number of days that overlap in two time intervals. It uses the time
 * between dates to calculate the number of days, rounding it up to include
 * partial days.
 *
 * Two equal 0-length intervals will result in 0. Two equal 1ms intervals will
 * result in 1.
 *
 * @param intervalLeft - The first interval to compare.
 * @param intervalRight - The second interval to compare.
 * @param options - An object with options
 *
 * @returns The number of days that overlap in two time intervals
 *
 * @example
 * // For overlapping time intervals adds 1 for each started overlapping day:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 17), end: new Date(2014, 0, 21) }
 * )
 * //=> 3
 *
 * @example
 * // For non-overlapping time intervals returns 0:
 * getOverlappingDaysInIntervals(
 *   { start: new Date(2014, 0, 10), end: new Date(2014, 0, 20) },
 *   { start: new Date(2014, 0, 21), end: new Date(2014, 0, 22) }
 * )
 * //=> 0
 */

function getOverlappingDaysInIntervals(intervalLeft, intervalRight) {
  const [leftStart, leftEnd] = [
    +toDate(intervalLeft.start),
    +toDate(intervalLeft.end),
  ].sort((a, b) => a - b);
  const [rightStart, rightEnd] = [
    +toDate(intervalRight.start),
    +toDate(intervalRight.end),
  ].sort((a, b) => a - b);

  // Prevent NaN result if intervals don't overlap at all.
  const isOverlapping = leftStart < rightEnd && rightStart < leftEnd;
  if (!isOverlapping) return 0;

  // Remove the timezone offset to negate the DST effect on calculations.
  const overlapLeft = rightStart < leftStart ? leftStart : rightStart;
  const left = overlapLeft - getTimezoneOffsetInMilliseconds(overlapLeft);
  const overlapRight = rightEnd > leftEnd ? leftEnd : rightEnd;
  const right = overlapRight - getTimezoneOffsetInMilliseconds(overlapRight);

  // Ceil the number to include partial days too.
  return Math.ceil((right - left) / millisecondsInDay);
}

/**
 * @name getSeconds
 * @category Second Helpers
 * @summary Get the seconds of the given date.
 *
 * @description
 * Get the seconds of the given date.
 *
 * @param date - The given date
 *
 * @returns The seconds
 *
 * @example
 * // Get the seconds of 29 February 2012 11:45:05.123:
 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 5
 */
function getSeconds(date) {
  return toDate(date).getSeconds();
}

/**
 * @name getTime
 * @category Timestamp Helpers
 * @summary Get the milliseconds timestamp of the given date.
 *
 * @description
 * Get the milliseconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05.123:
 * const result = getTime(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 1330515905123
 */
function getTime(date) {
  return +toDate(date);
}

/**
 * @name getUnixTime
 * @category Timestamp Helpers
 * @summary Get the seconds timestamp of the given date.
 *
 * @description
 * Get the seconds timestamp of the given date.
 *
 * @param date - The given date
 *
 * @returns The timestamp
 *
 * @example
 * // Get the timestamp of 29 February 2012 11:45:05 CET:
 * const result = getUnixTime(new Date(2012, 1, 29, 11, 45, 5))
 * //=> 1330512305
 */
function getUnixTime(date) {
  return Math.trunc(+toDate(date) / 1000);
}

/**
 * The {@link getWeekOfMonth} function options.
 */

/**
 * @name getWeekOfMonth
 * @category Week Helpers
 * @summary Get the week of the month of the given date.
 *
 * @description
 * Get the week of the month of the given date.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The week of month
 *
 * @example
 * // Which week of the month is 9 November 2017?
 * const result = getWeekOfMonth(new Date(2017, 10, 9))
 * //=> 2
 */
function getWeekOfMonth(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const currentDayOfMonth = getDate(toDate(date, options?.in));
  if (isNaN(currentDayOfMonth)) return NaN;

  const startWeekDay = getDay(startOfMonth(date, options));

  let lastDayOfFirstWeek = weekStartsOn - startWeekDay;
  if (lastDayOfFirstWeek <= 0) lastDayOfFirstWeek += 7;

  const remainingDaysAfterFirstWeek = currentDayOfMonth - lastDayOfFirstWeek;
  return Math.ceil(remainingDaysAfterFirstWeek / 7) + 1;
}

/**
 * The {@link lastDayOfMonth} function options.
 */

/**
 * @name lastDayOfMonth
 * @category Month Helpers
 * @summary Return the last day of a month for the given date.
 *
 * @description
 * Return the last day of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a month
 *
 * @example
 * // The last day of a month for 2 September 2014 11:55:00:
 * const result = lastDayOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfMonth(date, options) {
  const _date = toDate(date, options?.in);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(0, 0, 0, 0);
  return toDate(_date, options?.in);
}

/**
 * The {@link getWeeksInMonth} function options.
 */

/**
 * @name getWeeksInMonth
 * @category Week Helpers
 * @summary Get the number of calendar weeks a month spans.
 *
 * @description
 * Get the number of calendar weeks the month in the given date spans.
 *
 * @param date - The given date
 * @param options - An object with options.
 *
 * @returns The number of calendar weeks
 *
 * @example
 * // How many calendar weeks does February 2015 span?
 * const result = getWeeksInMonth(new Date(2015, 1, 8))
 * //=> 4
 *
 * @example
 * // If the week starts on Monday,
 * // how many calendar weeks does July 2017 span?
 * const result = getWeeksInMonth(new Date(2017, 6, 5), { weekStartsOn: 1 })
 * //=> 6
 */
function getWeeksInMonth(date, options) {
  const contextDate = toDate(date, options?.in);
  return (
    differenceInCalendarWeeks(
      lastDayOfMonth(contextDate, options),
      startOfMonth(contextDate, options),
      options,
    ) + 1
  );
}

/**
 * The {@link getYear} function options.
 */

/**
 * @name getYear
 * @category Year Helpers
 * @summary Get the year of the given date.
 *
 * @description
 * Get the year of the given date.
 *
 * @param date - The given date
 * @param options - An object with options
 *
 * @returns The year
 *
 * @example
 * // Which year is 2 July 2014?
 * const result = getYear(new Date(2014, 6, 2))
 * //=> 2014
 */
function getYear(date, options) {
  return toDate(date, options?.in).getFullYear();
}

/**
 * @name hoursToMilliseconds
 * @category  Conversion Helpers
 * @summary Convert hours to milliseconds.
 *
 * @description
 * Convert a number of hours to a full number of milliseconds.
 *
 * @param hours - number of hours to be converted
 *
 * @returns The number of hours converted to milliseconds
 *
 * @example
 * // Convert 2 hours to milliseconds:
 * const result = hoursToMilliseconds(2)
 * //=> 7200000
 */
function hoursToMilliseconds(hours) {
  return Math.trunc(hours * millisecondsInHour);
}

/**
 * @name hoursToMinutes
 * @category Conversion Helpers
 * @summary Convert hours to minutes.
 *
 * @description
 * Convert a number of hours to a full number of minutes.
 *
 * @param hours - number of hours to be converted
 *
 * @returns The number of hours converted in minutes
 *
 * @example
 * // Convert 2 hours to minutes:
 * const result = hoursToMinutes(2)
 * //=> 120
 */
function hoursToMinutes(hours) {
  return Math.trunc(hours * minutesInHour);
}

/**
 * @name hoursToSeconds
 * @category Conversion Helpers
 * @summary Convert hours to seconds.
 *
 * @description
 * Convert a number of hours to a full number of seconds.
 *
 * @param hours - The number of hours to be converted
 *
 * @returns The number of hours converted in seconds
 *
 * @example
 * // Convert 2 hours to seconds:
 * const result = hoursToSeconds(2)
 * //=> 7200
 */
function hoursToSeconds(hours) {
  return Math.trunc(hours * secondsInHour);
}

/**
 * The {@link interval} function options.
 */

/**
 * The {@link interval} function result type. It resolves the proper data type.
 * It uses the first argument date object type, starting from the start argument,
 * then the end interval date. If a context function is passed, it uses the context
 * function return type.
 */

/**
 * @name interval
 * @category Interval Helpers
 * @summary Creates an interval object and validates its values.
 *
 * @description
 * Creates a normalized interval object and validates its values. If the interval is invalid, an exception is thrown.
 *
 * @typeParam StartDate - Start date type.
 * @typeParam EndDate - End date type.
 * @typeParam Options - Options type.
 *
 * @param start - The start of the interval.
 * @param end - The end of the interval.
 * @param options - The options object.
 *
 * @throws `Start date is invalid` when `start` is invalid.
 * @throws `End date is invalid` when `end` is invalid.
 * @throws `End date must be after start date` when end is before `start` and `options.assertPositive` is true.
 *
 * @returns The normalized and validated interval object.
 */
function interval(start, end, options) {
  const [_start, _end] = normalizeDates(options?.in, start, end);

  if (isNaN(+_start)) throw new TypeError("Start date is invalid");
  if (isNaN(+_end)) throw new TypeError("End date is invalid");

  if (options?.assertPositive && +_start > +_end)
    throw new TypeError("End date must be after start date");

  return { start: _start, end: _end };
}

/**
 * The {@link intervalToDuration} function options.
 */

/**
 * @name intervalToDuration
 * @category Common Helpers
 * @summary Convert interval to duration
 *
 * @description
 * Convert an interval object to a duration object.
 *
 * @param interval - The interval to convert to duration
 * @param options - The context options
 *
 * @returns The duration object
 *
 * @example
 * // Get the duration between January 15, 1929 and April 4, 1968.
 * intervalToDuration({
 *   start: new Date(1929, 0, 15, 12, 0, 0),
 *   end: new Date(1968, 3, 4, 19, 5, 0)
 * });
 * //=> { years: 39, months: 2, days: 20, hours: 7, minutes: 5, seconds: 0 }
 */
function intervalToDuration(interval, options) {
  const { start, end } = normalizeInterval(options?.in, interval);
  const duration = {};

  const years = differenceInYears(end, start);
  if (years) duration.years = years;

  const remainingMonths = add(start, { years: duration.years });
  const months = differenceInMonths(end, remainingMonths);
  if (months) duration.months = months;

  const remainingDays = add(remainingMonths, { months: duration.months });
  const days = differenceInDays(end, remainingDays);
  if (days) duration.days = days;

  const remainingHours = add(remainingDays, { days: duration.days });
  const hours = differenceInHours(end, remainingHours);
  if (hours) duration.hours = hours;

  const remainingMinutes = add(remainingHours, { hours: duration.hours });
  const minutes = differenceInMinutes(end, remainingMinutes);
  if (minutes) duration.minutes = minutes;

  const remainingSeconds = add(remainingMinutes, { minutes: duration.minutes });
  const seconds = differenceInSeconds(end, remainingSeconds);
  if (seconds) duration.seconds = seconds;

  return duration;
}

/**
 * The locale string (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
 * @deprecated
 *
 * [TODO] Remove in v4
 */

/**
 * The format options (see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#options)
 */

/**
 * The locale options.
 */

/**
 * @name intlFormat
 * @category Common Helpers
 * @summary Format the date with Intl.DateTimeFormat (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat).
 *
 * @description
 * Return the formatted date string in the given format.
 * The method uses [`Intl.DateTimeFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) inside.
 * formatOptions are the same as [`Intl.DateTimeFormat` options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat#using_options)
 *
 * > ⚠️ Please note that before Node version 13.0.0, only the locale data for en-US is available by default.
 *
 * @param date - The date to format
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in middle-endian format:
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456))
 * //=> 10/4/2019
 */

/**
 * @param date - The date to format
 * @param localeOptions - An object with locale
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in Korean.
 * // Convert the date with locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   locale: 'ko-KR',
 * })
 * //=> 2019. 10. 4.
 */

/**
 * @param date - The date to format
 * @param formatOptions - The format options
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019.
 * // Convert the date with format's options.
 * const result = intlFormat.default(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   year: 'numeric',
 *   month: 'numeric',
 *   day: 'numeric',
 *   hour: 'numeric',
 * })
 * //=> 10/4/2019, 12 PM
 */

/**
 * @param date - The date to format
 * @param formatOptions - The format options
 * @param localeOptions - An object with locale
 *
 * @returns The formatted date string
 *
 * @throws `date` must not be Invalid Date
 *
 * @example
 * // Represent 4 October 2019 in German.
 * // Convert the date with format's options and locale's options.
 * const result = intlFormat(new Date(2019, 9, 4, 12, 30, 13, 456), {
 *   weekday: 'long',
 *   year: 'numeric',
 *   month: 'long',
 *   day: 'numeric',
 * }, {
 *   locale: 'de-DE',
 * })
 * //=> Freitag, 4. Oktober 2019
 */

function intlFormat(date, formatOrLocale, localeOptions) {
  let formatOptions;

  if (isFormatOptions(formatOrLocale)) {
    formatOptions = formatOrLocale;
  } else {
    localeOptions = formatOrLocale;
  }

  return new Intl.DateTimeFormat(localeOptions?.locale, formatOptions).format(
    toDate(date),
  );
}

function isFormatOptions(opts) {
  return opts !== undefined && !("locale" in opts);
}

/**
 * The {@link intlFormatDistance} function options.
 */

/**
 * The unit used to format the distance in {@link intlFormatDistance}.
 */

/**
 * @name intlFormatDistance
 * @category Common Helpers
 * @summary Formats distance between two dates in a human-readable format
 * @description
 * The function calculates the difference between two dates and formats it as a human-readable string.
 *
 * The function will pick the most appropriate unit depending on the distance between dates. For example, if the distance is a few hours, it might return `x hours`. If the distance is a few months, it might return `x months`.
 *
 * You can also specify a unit to force using it regardless of the distance to get a result like `123456 hours`.
 *
 * See the table below for the unit picking logic:
 *
 * | Distance between dates | Result (past)  | Result (future) |
 * | ---------------------- | -------------- | --------------- |
 * | 0 seconds              | now            | now             |
 * | 1-59 seconds           | X seconds ago  | in X seconds    |
 * | 1-59 minutes           | X minutes ago  | in X minutes    |
 * | 1-23 hours             | X hours ago    | in X hours      |
 * | 1 day                  | yesterday      | tomorrow        |
 * | 2-6 days               | X days ago     | in X days       |
 * | 7 days                 | last week      | next week       |
 * | 8 days-1 month         | X weeks ago    | in X weeks      |
 * | 1 month                | last month     | next month      |
 * | 2-3 months             | X months ago   | in X months     |
 * | 1 quarter              | last quarter   | next quarter    |
 * | 2-3 quarters           | X quarters ago | in X quarters   |
 * | 1 year                 | last year      | next year       |
 * | 2+ years               | X years ago    | in X years      |
 *
 * @param laterDate - The date
 * @param earlierDate - The date to compare with.
 * @param options - An object with options.
 * See MDN for details [Locale identification and negotiation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
 * The narrow one could be similar to the short one for some locales.
 *
 * @returns The distance in words according to language-sensitive relative time formatting.
 *
 * @throws `date` must not be Invalid Date
 * @throws `baseDate` must not be Invalid Date
 * @throws `options.unit` must not be invalid Unit
 * @throws `options.locale` must not be invalid locale
 * @throws `options.localeMatcher` must not be invalid localeMatcher
 * @throws `options.numeric` must not be invalid numeric
 * @throws `options.style` must not be invalid style
 *
 * @example
 * // What is the distance between the dates when the fist date is after the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0)
 * )
 * //=> 'in 1 hour'
 *
 * // What is the distance between the dates when the fist date is before the second?
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0)
 * )
 * //=> '1 hour ago'
 *
 * @example
 * // Use the unit option to force the function to output the result in quarters. Without setting it, the example would return "next year"
 * intlFormatDistance(
 *   new Date(1987, 6, 4, 10, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { unit: 'quarter' }
 * )
 * //=> 'in 5 quarters'
 *
 * @example
 * // Use the locale option to get the result in Spanish. Without setting it, the example would return "in 1 hour".
 * intlFormatDistance(
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 10, 30, 0),
 *   { locale: 'es' }
 * )
 * //=> 'dentro de 1 hora'
 *
 * @example
 * // Use the numeric option to force the function to use numeric values. Without setting it, the example would return "tomorrow".
 * intlFormatDistance(
 *   new Date(1986, 3, 5, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { numeric: 'always' }
 * )
 * //=> 'in 1 day'
 *
 * @example
 * // Use the style option to force the function to use short values. Without setting it, the example would return "in 2 years".
 * intlFormatDistance(
 *   new Date(1988, 3, 4, 11, 30, 0),
 *   new Date(1986, 3, 4, 11, 30, 0),
 *   { style: 'short' }
 * )
 * //=> 'in 2 yr'
 */
function intlFormatDistance(laterDate, earlierDate, options) {
  let value = 0;
  let unit;

  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );

  if (!options?.unit) {
    // Get the unit based on diffInSeconds calculations if no unit is specified
    const diffInSeconds = differenceInSeconds(laterDate_, earlierDate_); // The smallest unit

    if (Math.abs(diffInSeconds) < secondsInMinute) {
      value = differenceInSeconds(laterDate_, earlierDate_);
      unit = "second";
    } else if (Math.abs(diffInSeconds) < secondsInHour) {
      value = differenceInMinutes(laterDate_, earlierDate_);
      unit = "minute";
    } else if (
      Math.abs(diffInSeconds) < secondsInDay &&
      Math.abs(differenceInCalendarDays(laterDate_, earlierDate_)) < 1
    ) {
      value = differenceInHours(laterDate_, earlierDate_);
      unit = "hour";
    } else if (
      Math.abs(diffInSeconds) < secondsInWeek &&
      (value = differenceInCalendarDays(laterDate_, earlierDate_)) &&
      Math.abs(value) < 7
    ) {
      unit = "day";
    } else if (Math.abs(diffInSeconds) < secondsInMonth) {
      value = differenceInCalendarWeeks(laterDate_, earlierDate_);
      unit = "week";
    } else if (Math.abs(diffInSeconds) < secondsInQuarter) {
      value = differenceInCalendarMonths(laterDate_, earlierDate_);
      unit = "month";
    } else if (Math.abs(diffInSeconds) < secondsInYear) {
      if (differenceInCalendarQuarters(laterDate_, earlierDate_) < 4) {
        // To filter out cases that are less than a year but match 4 quarters
        value = differenceInCalendarQuarters(laterDate_, earlierDate_);
        unit = "quarter";
      } else {
        value = differenceInCalendarYears(laterDate_, earlierDate_);
        unit = "year";
      }
    } else {
      value = differenceInCalendarYears(laterDate_, earlierDate_);
      unit = "year";
    }
  } else {
    // Get the value if unit is specified
    unit = options?.unit;
    if (unit === "second") {
      value = differenceInSeconds(laterDate_, earlierDate_);
    } else if (unit === "minute") {
      value = differenceInMinutes(laterDate_, earlierDate_);
    } else if (unit === "hour") {
      value = differenceInHours(laterDate_, earlierDate_);
    } else if (unit === "day") {
      value = differenceInCalendarDays(laterDate_, earlierDate_);
    } else if (unit === "week") {
      value = differenceInCalendarWeeks(laterDate_, earlierDate_);
    } else if (unit === "month") {
      value = differenceInCalendarMonths(laterDate_, earlierDate_);
    } else if (unit === "quarter") {
      value = differenceInCalendarQuarters(laterDate_, earlierDate_);
    } else if (unit === "year") {
      value = differenceInCalendarYears(laterDate_, earlierDate_);
    }
  }

  const rtf = new Intl.RelativeTimeFormat(options?.locale, {
    numeric: "auto",
    ...options,
  });

  return rtf.format(value, unit);
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param date - The date that should be after the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is after the second date
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * const result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter(date, dateToCompare) {
  return +toDate(date) > +toDate(dateToCompare);
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param date - The date that should be before the other one to return true
 * @param dateToCompare - The date to compare with
 *
 * @returns The first date is before the second date
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * const result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(date, dateToCompare) {
  return +toDate(date) < +toDate(dateToCompare);
}

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param dateLeft - The first date to compare
 * @param dateRight - The second date to compare
 *
 * @returns The dates are equal
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * const result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0),
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual(leftDate, rightDate) {
  return +toDate(leftDate) === +toDate(rightDate);
}

/**
 * @name isExists
 * @category Common Helpers
 * @summary Is the given date exists?
 *
 * @description
 * Checks if the given arguments convert to an existing date.
 *
 * @param year - The year of the date to check
 * @param month - The month of the date to check
 * @param day - The day of the date to check
 *
 * @returns `true` if the date exists
 *
 * @example
 * // For the valid date:
 * const result = isExists(2018, 0, 31)
 * //=> true
 *
 * @example
 * // For the invalid date:
 * const result = isExists(2018, 1, 31)
 * //=> false
 */
function isExists(year, month, day) {
  const date = new Date(year, month, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day
  );
}

/**
 * The {@link isFirstDayOfMonth} function options.
 */

/**
 * @name isFirstDayOfMonth
 * @category Month Helpers
 * @summary Is the given date the first day of a month?
 *
 * @description
 * Is the given date the first day of a month?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is the first day of a month
 *
 * @example
 * // Is 1 September 2014 the first day of a month?
 * const result = isFirstDayOfMonth(new Date(2014, 8, 1))
 * //=> true
 */
function isFirstDayOfMonth(date, options) {
  return toDate(date, options?.in).getDate() === 1;
}

/**
 * The {@link isFriday} function options.
 */

/**
 * @name isFriday
 * @category Weekday Helpers
 * @summary Is the given date Friday?
 *
 * @description
 * Is the given date Friday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Friday
 *
 * @example
 * // Is 26 September 2014 Friday?
 * const result = isFriday(new Date(2014, 8, 26))
 * //=> true
 */
function isFriday(date, options) {
  return toDate(date, options?.in).getDay() === 5;
}

/**
 * @name isFuture
 * @category Common Helpers
 * @summary Is the given date in the future?
 * @pure false
 *
 * @description
 * Is the given date in the future?
 *
 * @param date - The date to check
 *
 * @returns The date is in the future
 *
 * @example
 * // If today is 6 October 2014, is 31 December 2014 in the future?
 * const result = isFuture(new Date(2014, 11, 31))
 * //=> true
 */
function isFuture(date) {
  return +toDate(date) > Date.now();
}

/**
 * @name transpose
 * @category Generic Helpers
 * @summary Transpose the date to the given constructor.
 *
 * @description
 * The function transposes the date to the given constructor. It helps you
 * to transpose the date in the system time zone to say `UTCDate` or any other
 * date extension.
 *
 * @typeParam InputDate - The input `Date` type derived from the passed argument.
 * @typeParam ResultDate - The result `Date` type derived from the passed constructor.
 *
 * @param date - The date to use values from
 * @param constructor - The date constructor to use
 *
 * @returns Date transposed to the given constructor
 *
 * @example
 * // Create July 10, 2022 00:00 in locale time zone
 * const date = new Date(2022, 6, 10)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0800 (Singapore Standard Time)'
 *
 * @example
 * // Transpose the date to July 10, 2022 00:00 in UTC
 * transpose(date, UTCDate)
 * //=> 'Sun Jul 10 2022 00:00:00 GMT+0000 (Coordinated Universal Time)'
 */
function transpose(date, constructor) {
  const date_ = isConstructor(constructor)
    ? new constructor(0)
    : constructFrom(constructor, 0);
  date_.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
  date_.setHours(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  );
  return date_;
}

function isConstructor(constructor) {
  return (
    typeof constructor === "function" &&
    constructor.prototype?.constructor === constructor
  );
}

const TIMEZONE_UNIT_PRIORITY = 10;

class Setter {
  subPriority = 0;

  validate(_utcDate, _options) {
    return true;
  }
}

class ValueSetter extends Setter {
  constructor(
    value,

    validateValue,

    setValue,

    priority,
    subPriority,
  ) {
    super();
    this.value = value;
    this.validateValue = validateValue;
    this.setValue = setValue;
    this.priority = priority;
    if (subPriority) {
      this.subPriority = subPriority;
    }
  }

  validate(date, options) {
    return this.validateValue(date, this.value, options);
  }

  set(date, flags, options) {
    return this.setValue(date, flags, this.value, options);
  }
}

class DateTimezoneSetter extends Setter {
  priority = TIMEZONE_UNIT_PRIORITY;
  subPriority = -1;

  constructor(context, reference) {
    super();
    this.context = context || ((date) => constructFrom(reference, date));
  }

  set(date, flags) {
    if (flags.timestampIsSet) return date;
    return constructFrom(date, transpose(date, this.context));
  }
}

class Parser {
  run(dateString, token, match, options) {
    const result = this.parse(dateString, token, match, options);
    if (!result) {
      return null;
    }

    return {
      setter: new ValueSetter(
        result.value,
        this.validate,
        this.set,
        this.priority,
        this.subPriority,
      ),
      rest: result.rest,
    };
  }

  validate(_utcDate, _value, _options) {
    return true;
  }
}

class EraParser extends Parser {
  priority = 140;

  parse(dateString, token, match) {
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return (
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );

      // A, B
      case "GGGGG":
        return match.era(dateString, { width: "narrow" });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return (
          match.era(dateString, { width: "wide" }) ||
          match.era(dateString, { width: "abbreviated" }) ||
          match.era(dateString, { width: "narrow" })
        );
    }
  }

  set(date, flags, value) {
    flags.era = value;
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["R", "u", "t", "T"];
}

const numericPatterns = {
  month: /^(1[0-2]|0?\d)/, // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/, // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/, // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/, // 0 to 12
  minute: /^[0-5]?\d/, // 0 to 59
  second: /^[0-5]?\d/, // 0 to 59

  singleDigit: /^\d/, // 0 to 9
  twoDigits: /^\d{1,2}/, // 0 to 99
  threeDigits: /^\d{1,3}/, // 0 to 999
  fourDigits: /^\d{1,4}/, // 0 to 9999

  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/, // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/, // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/, // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/, // 0 to 9999, -0 to -9999
};

const timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/,
};

function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }

  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest,
  };
}

function parseNumericPattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseTimezonePattern(pattern, dateString) {
  const matchResult = dateString.match(pattern);

  if (!matchResult) {
    return null;
  }

  // Input is 'Z'
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1),
    };
  }

  const sign = matchResult[1] === "+" ? 1 : -1;
  const hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  const minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  const seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;

  return {
    value:
      sign *
      (hours * millisecondsInHour +
        minutes * millisecondsInMinute +
        seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length),
  };
}

function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}

function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}

function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}

function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}

function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  const isCommonEra = currentYear > 0;
  // Absolute number of the current year:
  // 1 -> 1 AC
  // 0 -> 1 BC
  // -1 -> 2 BC
  const absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;

  let result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    const rangeEnd = absCurrentYear + 50;
    const rangeEndCentury = Math.trunc(rangeEnd / 100) * 100;
    const isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }

  return isCommonEra ? result : 1 - result;
}

function isLeapYearIndex$1(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

// From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
// | Year     |     y | yy |   yyy |  yyyy | yyyyy |
// |----------|-------|----|-------|-------|-------|
// | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
// | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
// | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
// | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
// | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
class YearParser extends Parser {
  priority = 130;
  incompatibleTokens = ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"];

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "yy",
    });

    switch (token) {
      case "y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "yo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value) {
    const currentYear = date.getFullYear();

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear,
      );
      date.setFullYear(normalizedTwoDigitYear, 0, 1);
      date.setHours(0, 0, 0, 0);
      return date;
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

// Local week-numbering year
class LocalWeekYearParser extends Parser {
  priority = 130;

  parse(dateString, token, match) {
    const valueCallback = (year) => ({
      year,
      isTwoDigitYear: token === "YY",
    });

    switch (token) {
      case "Y":
        return mapValue(parseNDigits(4, dateString), valueCallback);
      case "Yo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "year",
          }),
          valueCallback,
        );
      default:
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
    }
  }

  validate(_date, value) {
    return value.isTwoDigitYear || value.year > 0;
  }

  set(date, flags, value, options) {
    const currentYear = getWeekYear(date, options);

    if (value.isTwoDigitYear) {
      const normalizedTwoDigitYear = normalizeTwoDigitYear(
        value.year,
        currentYear,
      );
      date.setFullYear(
        normalizedTwoDigitYear,
        0,
        options.firstWeekContainsDate,
      );
      date.setHours(0, 0, 0, 0);
      return startOfWeek(date, options);
    }

    const year =
      !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
    date.setFullYear(year, 0, options.firstWeekContainsDate);
    date.setHours(0, 0, 0, 0);
    return startOfWeek(date, options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}

// ISO week-numbering year
class ISOWeekYearParser extends Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "R") {
      return parseNDigitsSigned(4, dateString);
    }

    return parseNDigitsSigned(token.length, dateString);
  }

  set(date, _flags, value) {
    const firstWeekOfYear = constructFrom(date, 0);
    firstWeekOfYear.setFullYear(value, 0, 4);
    firstWeekOfYear.setHours(0, 0, 0, 0);
    return startOfISOWeek(firstWeekOfYear);
  }

  incompatibleTokens = [
    "G",
    "y",
    "Y",
    "u",
    "Q",
    "q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}

class ExtendedYearParser extends Parser {
  priority = 130;

  parse(dateString, token) {
    if (token === "u") {
      return parseNDigitsSigned(4, dateString);
    }

    return parseNDigitsSigned(token.length, dateString);
  }

  set(date, _flags, value) {
    date.setFullYear(value, 0, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"];
}

class QuarterParser extends Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
      case "QQ": // 01, 02, 03, 04
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return match.quarter(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class StandAloneQuarterParser extends Parser {
  priority = 120;

  parse(dateString, token, match) {
    switch (token) {
      // 1, 2, 3, 4
      case "q":
      case "qq": // 01, 02, 03, 04
        return parseNDigits(token.length, dateString);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return match.ordinalNumber(dateString, { unit: "quarter" });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return (
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );

      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return match.quarter(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return (
          match.quarter(dateString, {
            width: "wide",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.quarter(dateString, {
            width: "narrow",
            context: "standalone",
          })
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 4;
  }

  set(date, _flags, value) {
    date.setMonth((value - 1) * 3, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class MonthParser extends Parser {
  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "L",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];

  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "M":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "MM":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "MMM":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );

      // J, F, ..., D
      case "MMMMM":
        return match.month(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return (
          match.month(dateString, { width: "wide", context: "formatting" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.month(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

class StandAloneMonthParser extends Parser {
  priority = 110;

  parse(dateString, token, match) {
    const valueCallback = (value) => value - 1;

    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return mapValue(
          parseNumericPattern(numericPatterns.month, dateString),
          valueCallback,
        );
      // 01, 02, ..., 12
      case "LL":
        return mapValue(parseNDigits(2, dateString), valueCallback);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "month",
          }),
          valueCallback,
        );
      // Jan, Feb, ..., Dec
      case "LLL":
        return (
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );

      // J, F, ..., D
      case "LLLLL":
        return match.month(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return (
          match.month(dateString, { width: "wide", context: "standalone" }) ||
          match.month(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.month(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    date.setMonth(value, 1);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

/**
 * The {@link setWeek} function options.
 */

/**
 * @name setWeek
 * @category Week Helpers
 * @summary Set the local week to the given date.
 *
 * @description
 * Set the local week to the given date, saving the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param week - The week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week set
 *
 * @example
 * // Set the 1st week to 2 January 2005 with default options:
 * const result = setWeek(new Date(2005, 0, 2), 1)
 * //=> Sun Dec 26 2004 00:00:00
 *
 * @example
 * // Set the 1st week to 2 January 2005,
 * // if Monday is the first day of the week,
 * // and the first week of the year always contains 4 January:
 * const result = setWeek(new Date(2005, 0, 2), 1, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sun Jan 4 2004 00:00:00
 */
function setWeek(date, week, options) {
  const date_ = toDate(date, options?.in);
  const diff = getWeek(date_, options) - week;
  date_.setDate(date_.getDate() - diff * 7);
  return toDate(date_, options?.in);
}

// Local week of year
class LocalWeekParser extends Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "w":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "wo":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value, options) {
    return startOfWeek(setWeek(date, value, options), options);
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "i",
    "t",
    "T",
  ];
}

/**
 * The {@link setISOWeek} function options.
 */

/**
 * @name setISOWeek
 * @category ISO Week Helpers
 * @summary Set the ISO week to the given date.
 *
 * @description
 * Set the ISO week to the given date, saving the weekday number.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The `Date` type of the context function.
 *
 * @param date - The date to be changed
 * @param week - The ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the ISO week set
 *
 * @example
 * // Set the 53rd ISO week to 7 August 2004:
 * const result = setISOWeek(new Date(2004, 7, 7), 53)
 * //=> Sat Jan 01 2005 00:00:00
 */
function setISOWeek(date, week, options) {
  const _date = toDate(date, options?.in);
  const diff = getISOWeek(_date, options) - week;
  _date.setDate(_date.getDate() - diff * 7);
  return _date;
}

// ISO week of year
class ISOWeekParser extends Parser {
  priority = 100;

  parse(dateString, token, match) {
    switch (token) {
      case "I":
        return parseNumericPattern(numericPatterns.week, dateString);
      case "Io":
        return match.ordinalNumber(dateString, { unit: "week" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 53;
  }

  set(date, _flags, value) {
    return startOfISOWeek(setISOWeek(date, value));
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "e",
    "c",
    "t",
    "T",
  ];
}

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

// Day of the month
class DateParser extends Parser {
  priority = 90;
  subPriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "d":
        return parseNumericPattern(numericPatterns.date, dateString);
      case "do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex$1(year);
    const month = date.getMonth();
    if (isLeapYear) {
      return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
    } else {
      return value >= 1 && value <= DAYS_IN_MONTH[month];
    }
  }

  set(date, _flags, value) {
    date.setDate(value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "w",
    "I",
    "D",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

class DayOfYearParser extends Parser {
  priority = 90;

  subpriority = 1;

  parse(dateString, token, match) {
    switch (token) {
      case "D":
      case "DD":
        return parseNumericPattern(numericPatterns.dayOfYear, dateString);
      case "Do":
        return match.ordinalNumber(dateString, { unit: "date" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(date, value) {
    const year = date.getFullYear();
    const isLeapYear = isLeapYearIndex$1(year);
    if (isLeapYear) {
      return value >= 1 && value <= 366;
    } else {
      return value >= 1 && value <= 365;
    }
  }

  set(date, _flags, value) {
    date.setMonth(0, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "Y",
    "R",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "I",
    "d",
    "E",
    "i",
    "e",
    "c",
    "t",
    "T",
  ];
}

/**
 * The {@link setDay} function options.
 */

/**
 * @name setDay
 * @category Weekday Helpers
 * @summary Set the day of the week to the given date.
 *
 * @description
 * Set the day of the week to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the week of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the day of the week set
 *
 * @example
 * // Set week day to Sunday, with the default weekStartsOn of Sunday:
 * const result = setDay(new Date(2014, 8, 1), 0)
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Set week day to Sunday, with a weekStartsOn of Monday:
 * const result = setDay(new Date(2014, 8, 1), 0, { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */
function setDay(date, day, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const date_ = toDate(date, options?.in);
  const currentDay = date_.getDay();

  const remainder = day % 7;
  const dayIndex = (remainder + 7) % 7;

  const delta = 7 - weekStartsOn;
  const diff =
    day < 0 || day > 6
      ? day - ((currentDay + delta) % 7)
      : ((dayIndex + delta) % 7) - ((currentDay + delta) % 7);
  return addDays(date_, diff, options);
}

// Day of week
class DayParser extends Parser {
  priority = 90;

  parse(dateString, token, match) {
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "EEEEE":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "EEEEEE":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "EEEE":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["D", "i", "e", "c", "t", "T"];
}

// Local day of week
class LocalDayParser extends Parser {
  priority = 90;
  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "e":
      case "ee": // 03
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "eo":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "eee":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // T
      case "eeeee":
        return match.day(dateString, {
          width: "narrow",
          context: "formatting",
        });
      // Tu
      case "eeeeee":
        return (
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );

      // Tuesday
      case "eeee":
      default:
        return (
          match.day(dateString, { width: "wide", context: "formatting" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.day(dateString, { width: "short", context: "formatting" }) ||
          match.day(dateString, { width: "narrow", context: "formatting" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "c",
    "t",
    "T",
  ];
}

// Stand-alone local day of week
class StandAloneLocalDayParser extends Parser {
  priority = 90;

  parse(dateString, token, match, options) {
    const valueCallback = (value) => {
      // We want here floor instead of trunc, so we get -7 for value 0 instead of 0
      const wholeWeekDays = Math.floor((value - 1) / 7) * 7;
      return ((value + options.weekStartsOn + 6) % 7) + wholeWeekDays;
    };

    switch (token) {
      // 3
      case "c":
      case "cc": // 03
        return mapValue(parseNDigits(token.length, dateString), valueCallback);
      // 3rd
      case "co":
        return mapValue(
          match.ordinalNumber(dateString, {
            unit: "day",
          }),
          valueCallback,
        );
      // Tue
      case "ccc":
        return (
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // T
      case "ccccc":
        return match.day(dateString, {
          width: "narrow",
          context: "standalone",
        });
      // Tu
      case "cccccc":
        return (
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );

      // Tuesday
      case "cccc":
      default:
        return (
          match.day(dateString, { width: "wide", context: "standalone" }) ||
          match.day(dateString, {
            width: "abbreviated",
            context: "standalone",
          }) ||
          match.day(dateString, { width: "short", context: "standalone" }) ||
          match.day(dateString, { width: "narrow", context: "standalone" })
        );
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 6;
  }

  set(date, _flags, value, options) {
    date = setDay(date, value, options);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "R",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "I",
    "d",
    "D",
    "E",
    "i",
    "e",
    "t",
    "T",
  ];
}

/**
 * The {@link setISODay} function options.
 */

/**
 * @name setISODay
 * @category Weekday Helpers
 * @summary Set the day of the ISO week to the given date.
 *
 * @description
 * Set the day of the ISO week to the given date.
 * ISO week starts with Monday.
 * 7 is the index of Sunday, 1 is the index of Monday, etc.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param day - The day of the ISO week of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the ISO week set
 *
 * @example
 * // Set Sunday to 1 September 2014:
 * const result = setISODay(new Date(2014, 8, 1), 7)
 * //=> Sun Sep 07 2014 00:00:00
 */
function setISODay(date, day, options) {
  const date_ = toDate(date, options?.in);
  const currentDay = getISODay(date_, options);
  const diff = day - currentDay;
  return addDays(date_, diff, options);
}

// ISO day of week
class ISODayParser extends Parser {
  priority = 90;

  parse(dateString, token, match) {
    const valueCallback = (value) => {
      if (value === 0) {
        return 7;
      }
      return value;
    };

    switch (token) {
      // 2
      case "i":
      case "ii": // 02
        return parseNDigits(token.length, dateString);
      // 2nd
      case "io":
        return match.ordinalNumber(dateString, { unit: "day" });
      // Tue
      case "iii":
        return mapValue(
          match.day(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // T
      case "iiiii":
        return mapValue(
          match.day(dateString, {
            width: "narrow",
            context: "formatting",
          }),
          valueCallback,
        );
      // Tu
      case "iiiiii":
        return mapValue(
          match.day(dateString, {
            width: "short",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
      // Tuesday
      case "iiii":
      default:
        return mapValue(
          match.day(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
            match.day(dateString, {
              width: "abbreviated",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "short",
              context: "formatting",
            }) ||
            match.day(dateString, {
              width: "narrow",
              context: "formatting",
            }),
          valueCallback,
        );
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 7;
  }

  set(date, _flags, value) {
    date = setISODay(date, value);
    date.setHours(0, 0, 0, 0);
    return date;
  }

  incompatibleTokens = [
    "y",
    "Y",
    "u",
    "q",
    "Q",
    "M",
    "L",
    "w",
    "d",
    "D",
    "E",
    "e",
    "c",
    "t",
    "T",
  ];
}

class AMPMParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "a":
      case "aa":
      case "aaa":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "aaaaa":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "aaaa":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["b", "B", "H", "k", "t", "T"];
}

class AMPMMidnightParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "b":
      case "bb":
      case "bbb":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "bbbbb":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "bbbb":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "B", "H", "k", "t", "T"];
}

// in the morning, in the afternoon, in the evening, at night
class DayPeriodParser extends Parser {
  priority = 80;

  parse(dateString, token, match) {
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return (
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );

      case "BBBBB":
        return match.dayPeriod(dateString, {
          width: "narrow",
          context: "formatting",
        });
      case "BBBB":
      default:
        return (
          match.dayPeriod(dateString, {
            width: "wide",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting",
          }) ||
          match.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting",
          })
        );
    }
  }

  set(date, _flags, value) {
    date.setHours(dayPeriodEnumToHours(value), 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "t", "T"];
}

class Hour1to12Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "h":
        return parseNumericPattern(numericPatterns.hour12h, dateString);
      case "ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 12;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else if (!isPM && value === 12) {
      date.setHours(0, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["H", "K", "k", "t", "T"];
}

class Hour0to23Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "H":
        return parseNumericPattern(numericPatterns.hour23h, dateString);
      case "Ho":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 23;
  }

  set(date, _flags, value) {
    date.setHours(value, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "K", "k", "t", "T"];
}

class Hour0To11Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "K":
        return parseNumericPattern(numericPatterns.hour11h, dateString);
      case "Ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 11;
  }

  set(date, _flags, value) {
    const isPM = date.getHours() >= 12;
    if (isPM && value < 12) {
      date.setHours(value + 12, 0, 0, 0);
    } else {
      date.setHours(value, 0, 0, 0);
    }
    return date;
  }

  incompatibleTokens = ["h", "H", "k", "t", "T"];
}

class Hour1To24Parser extends Parser {
  priority = 70;

  parse(dateString, token, match) {
    switch (token) {
      case "k":
        return parseNumericPattern(numericPatterns.hour24h, dateString);
      case "ko":
        return match.ordinalNumber(dateString, { unit: "hour" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 1 && value <= 24;
  }

  set(date, _flags, value) {
    const hours = value <= 24 ? value % 24 : value;
    date.setHours(hours, 0, 0, 0);
    return date;
  }

  incompatibleTokens = ["a", "b", "h", "H", "K", "t", "T"];
}

class MinuteParser extends Parser {
  priority = 60;

  parse(dateString, token, match) {
    switch (token) {
      case "m":
        return parseNumericPattern(numericPatterns.minute, dateString);
      case "mo":
        return match.ordinalNumber(dateString, { unit: "minute" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setMinutes(value, 0, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

class SecondParser extends Parser {
  priority = 50;

  parse(dateString, token, match) {
    switch (token) {
      case "s":
        return parseNumericPattern(numericPatterns.second, dateString);
      case "so":
        return match.ordinalNumber(dateString, { unit: "second" });
      default:
        return parseNDigits(token.length, dateString);
    }
  }

  validate(_date, value) {
    return value >= 0 && value <= 59;
  }

  set(date, _flags, value) {
    date.setSeconds(value, 0);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

class FractionOfSecondParser extends Parser {
  priority = 30;

  parse(dateString, token) {
    const valueCallback = (value) =>
      Math.trunc(value * Math.pow(10, -token.length + 3));
    return mapValue(parseNDigits(token.length, dateString), valueCallback);
  }

  set(date, _flags, value) {
    date.setMilliseconds(value);
    return date;
  }

  incompatibleTokens = ["t", "T"];
}

// Timezone (ISO-8601. +00:00 is `'Z'`)
class ISOTimezoneWithZParser extends Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "X":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "XX":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "XXXX":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "XXXXX":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "XXX":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
    );
  }

  incompatibleTokens = ["t", "T", "x"];
}

// Timezone (ISO-8601)
class ISOTimezoneParser extends Parser {
  priority = 10;

  parse(dateString, token) {
    switch (token) {
      case "x":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalMinutes,
          dateString,
        );
      case "xx":
        return parseTimezonePattern(timezonePatterns.basic, dateString);
      case "xxxx":
        return parseTimezonePattern(
          timezonePatterns.basicOptionalSeconds,
          dateString,
        );
      case "xxxxx":
        return parseTimezonePattern(
          timezonePatterns.extendedOptionalSeconds,
          dateString,
        );
      case "xxx":
      default:
        return parseTimezonePattern(timezonePatterns.extended, dateString);
    }
  }

  set(date, flags, value) {
    if (flags.timestampIsSet) return date;
    return constructFrom(
      date,
      date.getTime() - getTimezoneOffsetInMilliseconds(date) - value,
    );
  }

  incompatibleTokens = ["t", "T", "X"];
}

class TimestampSecondsParser extends Parser {
  priority = 40;

  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }

  set(date, _flags, value) {
    return [constructFrom(date, value * 1000), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}

class TimestampMillisecondsParser extends Parser {
  priority = 20;

  parse(dateString) {
    return parseAnyDigitsSigned(dateString);
  }

  set(date, _flags, value) {
    return [constructFrom(date, value), { timestampIsSet: true }];
  }

  incompatibleTokens = "*";
}

/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
 * |  p  |                                |  P  |                                |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 */
const parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser(),
};

/**
 * The {@link parse} function options.
 */

// This RegExp consists of three parts separated by `|`:
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp$1 =
  /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;

// This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
const longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp$1 = /^'([^]*?)'?$/;
const doubleQuoteRegExp$1 = /''/g;

const notWhitespaceRegExp = /\S/;
const unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format string.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * parse('23 AM', 'HH a', new Date())
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `parse` will try to match both formatting and stand-alone units interchangeably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
 *
 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
 *
 *    while `uu` will just assign the year as is:
 *
 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
 *
 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be assigned to the date in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
 *
 * `referenceDate` must be passed for correct work of the function.
 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dateStr - The string to parse
 * @param formatStr - The string of tokens
 * @param referenceDate - defines values missing from the parsed dateString
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns The parsed date
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
 *   locale: eo
 * })
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse(dateStr, formatStr, referenceDate, options) {
  const invalidDate = () => constructFrom(options?.in || referenceDate, NaN);
  const defaultOptions = getDefaultOptions();
  const locale = options?.locale ?? defaultOptions.locale ?? enUS;

  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  if (!formatStr)
    return dateStr ? invalidDate() : toDate(referenceDate, options?.in);

  const subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale,
  };

  // If timezone isn't specified, it will try to use the context or
  // the reference date and fallback to the system time zone.
  const setters = [new DateTimezoneSetter(options?.in, referenceDate)];

  const tokens = formatStr
    .match(longFormattingTokensRegExp)
    .map((substring) => {
      const firstCharacter = substring[0];
      if (firstCharacter in longFormatters) {
        const longFormatter = longFormatters[firstCharacter];
        return longFormatter(substring, locale.formatLong);
      }
      return substring;
    })
    .join("")
    .match(formattingTokensRegExp$1);

  const usedTokens = [];

  for (let token of tokens) {
    if (
      !options?.useAdditionalWeekYearTokens &&
      isProtectedWeekYearToken(token)
    ) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }
    if (
      !options?.useAdditionalDayOfYearTokens &&
      isProtectedDayOfYearToken(token)
    ) {
      warnOrThrowProtectedError(token, formatStr, dateStr);
    }

    const firstCharacter = token[0];
    const parser = parsers[firstCharacter];
    if (parser) {
      const { incompatibleTokens } = parser;
      if (Array.isArray(incompatibleTokens)) {
        const incompatibleToken = usedTokens.find(
          (usedToken) =>
            incompatibleTokens.includes(usedToken.token) ||
            usedToken.token === firstCharacter,
        );
        if (incompatibleToken) {
          throw new RangeError(
            `The format string mustn't contain \`${incompatibleToken.fullToken}\` and \`${token}\` at the same time`,
          );
        }
      } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
        throw new RangeError(
          `The format string mustn't contain \`${token}\` and any other token at the same time`,
        );
      }

      usedTokens.push({ token: firstCharacter, fullToken: token });

      const parseResult = parser.run(
        dateStr,
        token,
        locale.match,
        subFnOptions,
      );

      if (!parseResult) {
        return invalidDate();
      }

      setters.push(parseResult.setter);

      dateStr = parseResult.rest;
    } else {
      if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      // Replace two single quote characters with one single quote character
      if (token === "''") {
        token = "'";
      } else if (firstCharacter === "'") {
        token = cleanEscapedString$1(token);
      }

      // Cut token from string, or, if string doesn't match the token, return Invalid Date
      if (dateStr.indexOf(token) === 0) {
        dateStr = dateStr.slice(token.length);
      } else {
        return invalidDate();
      }
    }
  }

  // Check if the remaining input contains something other than whitespace
  if (dateStr.length > 0 && notWhitespaceRegExp.test(dateStr)) {
    return invalidDate();
  }

  const uniquePrioritySetters = setters
    .map((setter) => setter.priority)
    .sort((a, b) => b - a)
    .filter((priority, index, array) => array.indexOf(priority) === index)
    .map((priority) =>
      setters
        .filter((setter) => setter.priority === priority)
        .sort((a, b) => b.subPriority - a.subPriority),
    )
    .map((setterArray) => setterArray[0]);

  let date = toDate(referenceDate, options?.in);

  if (isNaN(+date)) return invalidDate();

  const flags = {};
  for (const setter of uniquePrioritySetters) {
    if (!setter.validate(date, subFnOptions)) {
      return invalidDate();
    }

    const result = setter.set(date, flags, subFnOptions);
    // Result is tuple (date, flags)
    if (Array.isArray(result)) {
      date = result[0];
      Object.assign(flags, result[1]);
      // Result is date
    } else {
      date = result;
    }
  }

  return date;
}

function cleanEscapedString$1(input) {
  return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
}

/**
 * The {@link isMatch} function options.
 */

/**
 * @name isMatch
 * @category Common Helpers
 * @summary validates the date string against given formats
 *
 * @description
 * Return the true if given date is string correct against the given format else
 * will return false.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters in the format string wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the format string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 5 below the table).
 *
 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
 *
 * ```javascript
 * isMatch('23 AM', 'HH a')
 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
 * ```
 *
 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
 *
 * Accepted format string patterns:
 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
 * |---------------------------------|-----|---------|-----------------------------------|-------|
 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 |     | GGGGG   | A, B                              |       |
 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
 * |                                 |     | yyyyy   | ...                               | 2,4   |
 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
 * |                                 |     | YYYYY   | ...                               | 2,4   |
 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
 * |                                 |     | uuuuu   | ...                               | 2,4   |
 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 |     | DDDD    | ...                               | 2     |
 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
 * |                                 |     | iii     | Mon, Tue, Wed, ..., Su            | 5     |
 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Sa, Su        | 5     |
 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
 * |                                 |     | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Sa, Su        |       |
 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
 * |                                 |     | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
 * |                                 |     | tt      | ...                               | 2     |
 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
 * |                                 |     | SSS     | 000, 001, ..., 999                |       |
 * |                                 |     | SSSS    | ...                               | 2     |
 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
 * |                                 |     | TT      | ...                               | 2     |
 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
 * |                                 |     | XX      | -0800, +0530, Z                   |       |
 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
 * |                                 |     | xx      | -0800, +0530, +0000               |       |
 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
 * |                                 |     | PP      | May 29, 1453                      |       |
 * |                                 |     | PPP     | May 29th, 1453                    |       |
 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
 * |                                 |     | pp      | 12:00:00 AM                       |       |
 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular.
 *    In `format` function, they will produce different result:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 *    `isMatch` will try to match both formatting and stand-alone units interchangeably.
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table:
 *    - for numerical units (`yyyyyyyy`) `isMatch` will try to match a number
 *      as wide as the sequence
 *    - for text units (`MMMMMMMM`) `isMatch` will try to match the widest variation of the unit.
 *      These variations are marked with "2" in the last column of the table.
 *
 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 4. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
 *
 *    `isMatch('50', 'yy') //=> true`
 *
 *    `isMatch('75', 'yy') //=> true`
 *
 *    while `uu` will use the year as is:
 *
 *    `isMatch('50', 'uu') //=> true`
 *
 *    `isMatch('75', 'uu') //=> true`
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear](https://date-fns.org/docs/setISOWeekYear)
 *    and [setWeekYear](https://date-fns.org/docs/setWeekYear)).
 *
 * 5. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 7. `D` and `DD` tokens represent days of the year but they are often confused with days of the month.
 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
 *    on the given locale.
 *
 *    using `en-US` locale: `P` => `MM/dd/yyyy`
 *    using `en-US` locale: `p` => `hh:mm a`
 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
 *    using `pt-BR` locale: `p` => `HH:mm`
 *
 * Values will be checked in the descending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are matched (e.g. when matching string 'January 1st' without a year),
 * the values will be taken from today's using `new Date()` date which works as a context of parsing.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
 *
 * @param dateStr - The date string to verify
 * @param format - The string of tokens
 * @param options - An object with options.
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *   see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * @returns Is format string a match for date string?
 *
 * @throws `options.locale` must contain `match` property
 * @throws use `yyyy` instead of `YYYY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `yy` instead of `YY` for formatting years; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `d` instead of `D` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws use `dd` instead of `DD` for formatting days of the month; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * // Match 11 February 2014 from middle-endian format:
 * const result = isMatch('02/11/2014', 'MM/dd/yyyy')
 * //=> true
 *
 * @example
 * // Match 28th of February in Esperanto locale in the context of 2010 year:
 * import eo from 'date-fns/locale/eo'
 * const result = isMatch('28-a de februaro', "do 'de' MMMM", {
 *   locale: eo
 * })
 * //=> true
 */
function isMatch(dateStr, formatStr, options) {
  return isValid(parse(dateStr, formatStr, new Date(), options));
}

/**
 * The {@link isMonday} function options.
 */

/**
 * @name isMonday
 * @category Weekday Helpers
 * @summary Is the given date Monday?
 *
 * @description
 * Is the given date Monday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Monday
 *
 * @example
 * // Is 22 September 2014 Monday?
 * const result = isMonday(new Date(2014, 8, 22))
 * //=> true
 */
function isMonday(date, options) {
  return toDate(date, options?.in).getDay() === 1;
}

/**
 * @name isPast
 * @category Common Helpers
 * @summary Is the given date in the past?
 * @pure false
 *
 * @description
 * Is the given date in the past?
 *
 * @param date - The date to check
 *
 * @returns The date is in the past
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast(date) {
  return +toDate(date) < Date.now();
}

/**
 * The {@link startOfHour} function options.
 */

/**
 * @name startOfHour
 * @category Hour Helpers
 * @summary Return the start of an hour for the given date.
 *
 * @description
 * Return the start of an hour for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of an hour
 *
 * @example
 * // The start of an hour for 2 September 2014 11:55:00:
 * const result = startOfHour(new Date(2014, 8, 2, 11, 55))
 * //=> Tue Sep 02 2014 11:00:00
 */
function startOfHour(date, options) {
  const _date = toDate(date, options?.in);
  _date.setMinutes(0, 0, 0);
  return _date;
}

/**
 * The {@link isSameHour} function options.
 */

/**
 * @name isSameHour
 * @category Hour Helpers
 * @summary Are the given dates in the same hour (and same day)?
 *
 * @description
 * Are the given dates in the same hour (and same day)?
 *
 * @param dateLeft - The first date to check
 * @param dateRight - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same hour (and same day)
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 4 September 06:30:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 6, 30))
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:00 and 5 September 06:00:00 in the same hour?
 * const result = isSameHour(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 5, 6, 0))
 * //=> false
 */
function isSameHour(dateLeft, dateRight, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    dateLeft,
    dateRight,
  );
  return +startOfHour(dateLeft_) === +startOfHour(dateRight_);
}

/**
 * The {@link isSameWeek} function options.
 */

/**
 * @name isSameWeek
 * @category Week Helpers
 * @summary Are the given dates in the same week (and month and year)?
 *
 * @description
 * Are the given dates in the same week (and month and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same week (and month and year)
 *
 * @example
 * // Are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4))
 * //=> true
 *
 * @example
 * // If week starts with Monday,
 * // are 31 August 2014 and 4 September 2014 in the same week?
 * const result = isSameWeek(new Date(2014, 7, 31), new Date(2014, 8, 4), {
 *   weekStartsOn: 1
 * })
 * //=> false
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same week?
 * const result = isSameWeek(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameWeek(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    +startOfWeek(laterDate_, options) === +startOfWeek(earlierDate_, options)
  );
}

/**
 * The {@link isSameISOWeek} function options.
 */

/**
 * @name isSameISOWeek
 * @category ISO Week Helpers
 * @summary Are the given dates in the same ISO week (and year)?
 *
 * @description
 * Are the given dates in the same ISO week (and year)?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same ISO week (and year)
 *
 * @example
 * // Are 1 September 2014 and 7 September 2014 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2014, 8, 7))
 * //=> true
 *
 * @example
 * // Are 1 September 2014 and 1 September 2015 in the same ISO week?
 * const result = isSameISOWeek(new Date(2014, 8, 1), new Date(2015, 8, 1))
 * //=> false
 */
function isSameISOWeek(laterDate, earlierDate, options) {
  return isSameWeek(laterDate, earlierDate, { ...options, weekStartsOn: 1 });
}

/**
 * The {@link isSameISOWeekYear} function options.
 */

/**
 * @name isSameISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Are the given dates in the same ISO week-numbering year?
 *
 * @description
 * Are the given dates in the same ISO week-numbering year?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same ISO week-numbering year
 *
 * @example
 * // Are 29 December 2003 and 2 January 2005 in the same ISO week-numbering year?
 * const result = isSameISOWeekYear(new Date(2003, 11, 29), new Date(2005, 0, 2))
 * //=> true
 */
function isSameISOWeekYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +startOfISOWeekYear(laterDate_) === +startOfISOWeekYear(earlierDate_);
}

/**
 * The {@link startOfMinute} function options.
 */

/**
 * @name startOfMinute
 * @category Minute Helpers
 * @summary Return the start of a minute for the given date.
 *
 * @description
 * Return the start of a minute for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a minute
 *
 * @example
 * // The start of a minute for 1 December 2014 22:15:45.400:
 * const result = startOfMinute(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:00
 */
function startOfMinute(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setSeconds(0, 0);
  return date_;
}

/**
 * @name isSameMinute
 * @category Minute Helpers
 * @summary Are the given dates in the same minute (and hour and day)?
 *
 * @description
 * Are the given dates in the same minute (and hour and day)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 *
 * @returns The dates are in the same minute (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 4 September 2014 06:30:15 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 4, 6, 30, 15)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:30:00 and 5 September 2014 06:30:00 in the same minute?
 * const result = isSameMinute(
 *   new Date(2014, 8, 4, 6, 30),
 *   new Date(2014, 8, 5, 6, 30)
 * )
 * //=> false
 */
function isSameMinute(laterDate, earlierDate) {
  return +startOfMinute(laterDate) === +startOfMinute(earlierDate);
}

/**
 * The {@link isSameMonth} function options.
 */

/**
 * @name isSameMonth
 * @category Month Helpers
 * @summary Are the given dates in the same month (and year)?
 *
 * @description
 * Are the given dates in the same month (and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same month (and year)
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 *
 * @example
 * // Are 2 September 2014 and 25 September 2015 in the same month?
 * const result = isSameMonth(new Date(2014, 8, 2), new Date(2015, 8, 25))
 * //=> false
 */
function isSameMonth(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return (
    laterDate_.getFullYear() === earlierDate_.getFullYear() &&
    laterDate_.getMonth() === earlierDate_.getMonth()
  );
}

/**
 * The {@link isSameQuarter} function options.
 */

/**
 * @name isSameQuarter
 * @category Quarter Helpers
 * @summary Are the given dates in the same quarter (and year)?
 *
 * @description
 * Are the given dates in the same quarter (and year)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same quarter (and year)
 *
 * @example
 * // Are 1 January 2014 and 8 March 2014 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2014, 2, 8))
 * //=> true
 *
 * @example
 * // Are 1 January 2014 and 1 January 2015 in the same quarter?
 * const result = isSameQuarter(new Date(2014, 0, 1), new Date(2015, 0, 1))
 * //=> false
 */
function isSameQuarter(laterDate, earlierDate, options) {
  const [dateLeft_, dateRight_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return +startOfQuarter(dateLeft_) === +startOfQuarter(dateRight_);
}

/**
 * The {@link startOfSecond} function options.
 */

/**
 * @name startOfSecond
 * @category Second Helpers
 * @summary Return the start of a second for the given date.
 *
 * @description
 * Return the start of a second for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The start of a second
 *
 * @example
 * // The start of a second for 1 December 2014 22:15:45.400:
 * const result = startOfSecond(new Date(2014, 11, 1, 22, 15, 45, 400))
 * //=> Mon Dec 01 2014 22:15:45.000
 */
function startOfSecond(date, options) {
  const date_ = toDate(date, options?.in);
  date_.setMilliseconds(0);
  return date_;
}

/**
 * @name isSameSecond
 * @category Second Helpers
 * @summary Are the given dates in the same second (and hour and day)?
 *
 * @description
 * Are the given dates in the same second (and hour and day)?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 *
 * @returns The dates are in the same second (and hour and day)
 *
 * @example
 * // Are 4 September 2014 06:30:15.000 and 4 September 2014 06:30.15.500 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 30, 15),
 *   new Date(2014, 8, 4, 6, 30, 15, 500)
 * )
 * //=> true
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 4 September 2014 06:01.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 4, 6, 1, 15)
 * )
 * //=> false
 *
 * @example
 * // Are 4 September 2014 06:00:15.000 and 5 September 2014 06:00.15.000 in the same second?
 * const result = isSameSecond(
 *   new Date(2014, 8, 4, 6, 0, 15),
 *   new Date(2014, 8, 5, 6, 0, 15)
 * )
 * //=> false
 */
function isSameSecond(laterDate, earlierDate) {
  return +startOfSecond(laterDate) === +startOfSecond(earlierDate);
}

/**
 * The {@link isSameYear} function options.
 */

/**
 * @name isSameYear
 * @category Year Helpers
 * @summary Are the given dates in the same year?
 *
 * @description
 * Are the given dates in the same year?
 *
 * @param laterDate - The first date to check
 * @param earlierDate - The second date to check
 * @param options - An object with options
 *
 * @returns The dates are in the same year
 *
 * @example
 * // Are 2 September 2014 and 25 September 2014 in the same year?
 * const result = isSameYear(new Date(2014, 8, 2), new Date(2014, 8, 25))
 * //=> true
 */
function isSameYear(laterDate, earlierDate, options) {
  const [laterDate_, earlierDate_] = normalizeDates(
    options?.in,
    laterDate,
    earlierDate,
  );
  return laterDate_.getFullYear() === earlierDate_.getFullYear();
}

/**
 * The {@link isThisHour} function options.
 */

/**
 * @name isThisHour
 * @category Hour Helpers
 * @summary Is the given date in the same hour as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same hour as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this hour
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:00:00 in this hour?
 * const result = isThisHour(new Date(2014, 8, 25, 18))
 * //=> true
 */
function isThisHour(date, options) {
  return isSameHour(
    toDate(date, options?.in),
    constructNow(options?.in || date),
  );
}

/**
 * The {@link isThisISOWeek} function options.
 */

/**
 * @name isThisISOWeek
 * @category ISO Week Helpers
 * @summary Is the given date in the same ISO week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same ISO week as the current date?
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this ISO week
 *
 * @example
 * // If today is 25 September 2014, is 22 September 2014 in this ISO week?
 * const result = isThisISOWeek(new Date(2014, 8, 22))
 * //=> true
 */
function isThisISOWeek(date, options) {
  return isSameISOWeek(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

/**
 * @name isThisMinute
 * @category Minute Helpers
 * @summary Is the given date in the same minute as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same minute as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this minute
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:00 in this minute?
 * const result = isThisMinute(new Date(2014, 8, 25, 18, 30))
 * //=> true
 */

function isThisMinute(date) {
  return isSameMinute(date, constructNow(date));
}

/**
 * The {@link isThisMonth} function options.
 */

/**
 * @name isThisMonth
 * @category Month Helpers
 * @summary Is the given date in the same month as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same month as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this month
 *
 * @example
 * // If today is 25 September 2014, is 15 September 2014 in this month?
 * const result = isThisMonth(new Date(2014, 8, 15))
 * //=> true
 */
function isThisMonth(date, options) {
  return isSameMonth(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

/**
 * The {@link isThisQuarter} function options.
 */

/**
 * @name isThisQuarter
 * @category Quarter Helpers
 * @summary Is the given date in the same quarter as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same quarter as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this quarter
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this quarter?
 * const result = isThisQuarter(new Date(2014, 6, 2))
 * //=> true
 */
function isThisQuarter(date, options) {
  return isSameQuarter(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

/**
 * @name isThisSecond
 * @category Second Helpers
 * @summary Is the given date in the same second as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same second as the current date?
 *
 * @param date - The date to check
 *
 * @returns The date is in this second
 *
 * @example
 * // If now is 25 September 2014 18:30:15.500,
 * // is 25 September 2014 18:30:15.000 in this second?
 * const result = isThisSecond(new Date(2014, 8, 25, 18, 30, 15))
 * //=> true
 */
function isThisSecond(date) {
  return isSameSecond(date, constructNow(date));
}

/**
 * The {@link isThisWeek} function options.
 */

/**
 * @name isThisWeek
 * @category Week Helpers
 * @summary Is the given date in the same week as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same week as the current date?
 *
 * @param date - The date to check
 * @param options - The object with options
 *
 * @returns The date is in this week
 *
 * @example
 * // If today is 25 September 2014, is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21))
 * //=> true
 *
 * @example
 * // If today is 25 September 2014 and week starts with Monday
 * // is 21 September 2014 in this week?
 * const result = isThisWeek(new Date(2014, 8, 21), { weekStartsOn: 1 })
 * //=> false
 */
function isThisWeek(date, options) {
  return isSameWeek(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
    options,
  );
}

/**
 * The {@link isThisYear} function options.
 */

/**
 * @name isThisYear
 * @category Year Helpers
 * @summary Is the given date in the same year as the current date?
 * @pure false
 *
 * @description
 * Is the given date in the same year as the current date?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is in this year
 *
 * @example
 * // If today is 25 September 2014, is 2 July 2014 in this year?
 * const result = isThisYear(new Date(2014, 6, 2))
 * //=> true
 */
function isThisYear(date, options) {
  return isSameYear(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

/**
 * The {@link isThursday} function options.
 */

/**
 * @name isThursday
 * @category Weekday Helpers
 * @summary Is the given date Thursday?
 *
 * @description
 * Is the given date Thursday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Thursday
 *
 * @example
 * // Is 25 September 2014 Thursday?
 * const result = isThursday(new Date(2014, 8, 25))
 * //=> true
 */
function isThursday(date, options) {
  return toDate(date, options?.in).getDay() === 4;
}

/**
 * The {@link isToday} function options.
 */

/**
 * @name isToday
 * @category Day Helpers
 * @summary Is the given date today?
 * @pure false
 *
 * @description
 * Is the given date today?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is today
 *
 * @example
 * // If today is 6 October 2014, is 6 October 14:00:00 today?
 * const result = isToday(new Date(2014, 9, 6, 14, 0))
 * //=> true
 */
function isToday(date, options) {
  return isSameDay(
    constructFrom(options?.in || date, date),
    constructNow(options?.in || date),
  );
}

/**
 * The {@link isTomorrow} function options.
 */

/**
 * @name isTomorrow
 * @category Day Helpers
 * @summary Is the given date tomorrow?
 * @pure false
 *
 * @description
 * Is the given date tomorrow?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is tomorrow
 *
 * @example
 * // If today is 6 October 2014, is 7 October 14:00:00 tomorrow?
 * const result = isTomorrow(new Date(2014, 9, 7, 14, 0))
 * //=> true
 */
function isTomorrow(date, options) {
  return isSameDay(
    date,
    addDays(constructNow(options?.in || date), 1),
    options,
  );
}

/**
 * The {@link isTuesday} function options.
 */

/**
 * @name isTuesday
 * @category Weekday Helpers
 * @summary Is the given date Tuesday?
 *
 * @description
 * Is the given date Tuesday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Tuesday
 *
 * @example
 * // Is 23 September 2014 Tuesday?
 * const result = isTuesday(new Date(2014, 8, 23))
 * //=> true
 */
function isTuesday(date, options) {
  return toDate(date, options?.in).getDay() === 2;
}

/**
 * The {@link isWednesday} function options.
 */

/**
 * @name isWednesday
 * @category Weekday Helpers
 * @summary Is the given date Wednesday?
 *
 * @description
 * Is the given date Wednesday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is Wednesday
 *
 * @example
 * // Is 24 September 2014 Wednesday?
 * const result = isWednesday(new Date(2014, 8, 24))
 * //=> true
 */
function isWednesday(date, options) {
  return toDate(date, options?.in).getDay() === 3;
}

/**
 * The {@link isWithinInterval} function options.
 */

/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param date - The date to check
 * @param interval - The interval to check
 * @param options - An object with options
 *
 * @returns The date is within the interval
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * // => false
 *
 * @example
 * // For date equal to the interval start:
 * isWithinInterval(date, { start, end: date })
 * // => true
 *
 * @example
 * // For date equal to the interval end:
 * isWithinInterval(date, { start: date, end })
 * // => true
 */
function isWithinInterval(date, interval, options) {
  const time = +toDate(date, options?.in);
  const [startTime, endTime] = [
    +toDate(interval.start, options?.in),
    +toDate(interval.end, options?.in),
  ].sort((a, b) => a - b);

  return time >= startTime && time <= endTime;
}

/**
 * The {@link subDays} function options.
 */

/**
 * @name subDays
 * @category Day Helpers
 * @summary Subtract the specified number of days from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the days subtracted
 *
 * @example
 * // Subtract 10 days from 1 September 2014:
 * const result = subDays(new Date(2014, 8, 1), 10)
 * //=> Fri Aug 22 2014 00:00:00
 */
function subDays(date, amount, options) {
  return addDays(date, -amount, options);
}

/**
 * The {@link isYesterday} function options.
 */

/**
 * @name isYesterday
 * @category Day Helpers
 * @summary Is the given date yesterday?
 * @pure false
 *
 * @description
 * Is the given date yesterday?
 *
 * @param date - The date to check
 * @param options - An object with options
 *
 * @returns The date is yesterday
 *
 * @example
 * // If today is 6 October 2014, is 5 October 14:00:00 yesterday?
 * const result = isYesterday(new Date(2014, 9, 5, 14, 0))
 * //=> true
 */
function isYesterday(date, options) {
  return isSameDay(
    constructFrom(options?.in || date, date),
    subDays(constructNow(options?.in || date), 1),
  );
}

/**
 * The {@link lastDayOfDecade} function options.
 */

/**
 * @name lastDayOfDecade
 * @category Decade Helpers
 * @summary Return the last day of a decade for the given date.
 *
 * @description
 * Return the last day of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type; inferred from arguments or specified by context.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The last day of a decade
 *
 * @example
 * // The last day of a decade for 21 December 2012 21:12:00:
 * const result = lastDayOfDecade(new Date(2012, 11, 21, 21, 12, 00))
 * //=> Wed Dec 31 2019 00:00:00
 */
function lastDayOfDecade(date, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const decade = 9 + Math.floor(year / 10) * 10;
  _date.setFullYear(decade + 1, 0, 0);
  _date.setHours(0, 0, 0, 0);
  return toDate(_date, options?.in);
}

/**
 * The {@link lastDayOfWeek} function options.
 */

/**
 * @name lastDayOfWeek
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone unless a context is specified.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a week
 */
function lastDayOfWeek(date, options) {
  const defaultOptions = getDefaultOptions$1();
  const weekStartsOn =
    options?.weekStartsOn ??
    options?.locale?.options?.weekStartsOn ??
    defaultOptions.weekStartsOn ??
    defaultOptions.locale?.options?.weekStartsOn ??
    0;

  const _date = toDate(date, options?.in);
  const day = _date.getDay();
  const diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);

  _date.setHours(0, 0, 0, 0);
  _date.setDate(_date.getDate() + diff);

  return _date;
}

/**
 * The {@link lastDayOfISOWeek} function options.
 */

/**
 * @name lastDayOfISOWeek
 * @category ISO Week Helpers
 * @summary Return the last day of an ISO week for the given date.
 *
 * @description
 * Return the last day of an ISO week for the given date.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The Date type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of an ISO week
 *
 * @example
 * // The last day of an ISO week for 2 September 2014 11:55:00:
 * const result = lastDayOfISOWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Sep 07 2014 00:00:00
 */
function lastDayOfISOWeek(date, options) {
  return lastDayOfWeek(date, { ...options, weekStartsOn: 1 });
}

/**
 * The {@link lastDayOfISOWeekYear} function options.
 */

/**
 * @name lastDayOfISOWeekYear
 * @category ISO Week-Numbering Year Helpers
 * @summary Return the last day of an ISO week-numbering year for the given date.
 *
 * @description
 * Return the last day of an ISO week-numbering year,
 * which always starts 3 days before the year's first Thursday.
 * The result will be in the local timezone.
 *
 * ISO week-numbering year: http://en.wikipedia.org/wiki/ISO_week_date
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The end of an ISO week-numbering year
 *
 * @example
 * // The last day of an ISO week-numbering year for 2 July 2005:
 * const result = lastDayOfISOWeekYear(new Date(2005, 6, 2))
 * //=> Sun Jan 01 2006 00:00:00
 */
function lastDayOfISOWeekYear(date, options) {
  const year = getISOWeekYear(date, options);
  const fourthOfJanuary = constructFrom(options?.in || date, 0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);

  const date_ = startOfISOWeek(fourthOfJanuary, options);
  date_.setDate(date_.getDate() - 1);
  return date_;
}

/**
 * The {@link lastDayOfQuarter} function options.
 */

/**
 * @name lastDayOfQuarter
 * @category Quarter Helpers
 * @summary Return the last day of a year quarter for the given date.
 *
 * @description
 * Return the last day of a year quarter for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - The options
 *
 * @returns The last day of a quarter
 *
 * @example
 * // The last day of a quarter for 2 September 2014 11:55:00:
 * const result = lastDayOfQuarter(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 00:00:00
 */
function lastDayOfQuarter(date, options) {
  const date_ = toDate(date, options?.in);
  const currentMonth = date_.getMonth();
  const month = currentMonth - (currentMonth % 3) + 3;
  date_.setMonth(month, 0);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

/**
 * The {@link lastDayOfYear} function options.
 */

/**
 * @name lastDayOfYear
 * @category Year Helpers
 * @summary Return the last day of a year for the given date.
 *
 * @description
 * Return the last day of a year for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The last day of a year
 *
 * @example
 * // The last day of a year for 2 September 2014 11:55:00:
 * const result = lastDayOfYear(new Date(2014, 8, 2, 11, 55, 00))
 * //=> Wed Dec 31 2014 00:00:00
 */
function lastDayOfYear(date, options) {
  const date_ = toDate(date, options?.in);
  const year = date_.getFullYear();
  date_.setFullYear(year + 1, 0, 0);
  date_.setHours(0, 0, 0, 0);
  return date_;
}

// This RegExp consists of three parts separated by `|`:
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;

const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

/**
 * @private
 */

/**
 * @name lightFormat
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. Unlike `format`,
 * `lightFormat` doesn't use locales and outputs date using the most popular tokens.
 *
 * > ⚠️ Please note that the `lightFormat` tokens differ from Moment.js and other libraries.
 * > See: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   |
 * |---------------------------------|---------|-----------------------------------|
 * | AM, PM                          | a..aaa  | AM, PM                            |
 * |                                 | aaaa    | a.m., p.m.                        |
 * |                                 | aaaaa   | a, p                              |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 |
 * |                                 | yy      | 44, 01, 00, 17                    |
 * |                                 | yyy     | 044, 001, 000, 017                |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |
 * |                                 | MM      | 01, 02, ..., 12                   |
 * | Day of month                    | d       | 1, 2, ..., 31                     |
 * |                                 | dd      | 01, 02, ..., 31                   |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |
 * |                                 | hh      | 01, 02, ..., 11, 12               |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |
 * |                                 | HH      | 00, 01, 02, ..., 23               |
 * | Minute                          | m       | 0, 1, ..., 59                     |
 * |                                 | mm      | 00, 01, ..., 59                   |
 * | Second                          | s       | 0, 1, ..., 59                     |
 * |                                 | ss      | 00, 01, ..., 59                   |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |
 * |                                 | SS      | 00, 01, ..., 99                   |
 * |                                 | SSS     | 000, 001, ..., 999                |
 * |                                 | SSSS    | ...                               |
 *
 * @param date - The original date
 * @param format - The string of tokens
 *
 * @returns The formatted date string
 *
 * @throws `Invalid time value` if the date is invalid
 * @throws format string contains an unescaped latin alphabet character
 *
 * @example
 * const result = lightFormat(new Date(2014, 1, 11), 'yyyy-MM-dd')
 * //=> '2014-02-11'
 */
function lightFormat(date, formatStr) {
  const date_ = toDate(date);

  if (!isValid(date_)) {
    throw new RangeError("Invalid time value");
  }

  const tokens = formatStr.match(formattingTokensRegExp);

  // The only case when formattingTokensRegExp doesn't match the string is when it's empty
  if (!tokens) return "";

  const result = tokens
    .map((substring) => {
      // Replace two single quote characters with one single quote character
      if (substring === "''") {
        return "'";
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      const formatter = lightFormatters[firstCharacter];
      if (formatter) {
        return formatter(date_, substring);
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return substring;
    })
    .join("");

  return result;
}

function cleanEscapedString(input) {
  const matches = input.match(escapedStringRegExp);
  if (!matches) return input;
  return matches[1].replace(doubleQuoteRegExp, "'");
}

/**
 * @name milliseconds
 * @category Millisecond Helpers
 * @summary
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * @description
 * Returns the number of milliseconds in the specified, years, months, weeks, days, hours, minutes and seconds.
 *
 * One years equals 365.2425 days according to the formula:
 *
 * > Leap year occurs every 4 years, except for years that are divisible by 100 and not divisible by 400.
 * > 1 mean year = (365+1/4-1/100+1/400) days = 365.2425 days
 *
 * One month is a year divided by 12.
 *
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be added.
 *
 * @returns The milliseconds
 *
 * @example
 * // 1 year in milliseconds
 * milliseconds({ years: 1 })
 * //=> 31556952000
 *
 * // 3 months in milliseconds
 * milliseconds({ months: 3 })
 * //=> 7889238000
 */
function milliseconds({
  years,
  months,
  weeks,
  days,
  hours,
  minutes,
  seconds,
}) {
  let totalDays = 0;

  if (years) totalDays += years * daysInYear;
  if (months) totalDays += months * (daysInYear / 12);
  if (weeks) totalDays += weeks * 7;
  if (days) totalDays += days;

  let totalSeconds = totalDays * 24 * 60 * 60;

  if (hours) totalSeconds += hours * 60 * 60;
  if (minutes) totalSeconds += minutes * 60;
  if (seconds) totalSeconds += seconds;

  return Math.trunc(totalSeconds * 1000);
}

/**
 * @name millisecondsToHours
 * @category Conversion Helpers
 * @summary Convert milliseconds to hours.
 *
 * @description
 * Convert a number of milliseconds to a full number of hours.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in hours
 *
 * @example
 * // Convert 7200000 milliseconds to hours:
 * const result = millisecondsToHours(7200000)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToHours(7199999)
 * //=> 1
 */
function millisecondsToHours(milliseconds) {
  const hours = milliseconds / millisecondsInHour;
  return Math.trunc(hours);
}

/**
 * @name millisecondsToMinutes
 * @category Conversion Helpers
 * @summary Convert milliseconds to minutes.
 *
 * @description
 * Convert a number of milliseconds to a full number of minutes.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in minutes
 *
 * @example
 * // Convert 60000 milliseconds to minutes:
 * const result = millisecondsToMinutes(60000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToMinutes(119999)
 * //=> 1
 */
function millisecondsToMinutes(milliseconds) {
  const minutes = milliseconds / millisecondsInMinute;
  return Math.trunc(minutes);
}

/**
 * @name millisecondsToSeconds
 * @category Conversion Helpers
 * @summary Convert milliseconds to seconds.
 *
 * @description
 * Convert a number of milliseconds to a full number of seconds.
 *
 * @param milliseconds - The number of milliseconds to be converted
 *
 * @returns The number of milliseconds converted in seconds
 *
 * @example
 * // Convert 1000 milliseconds to seconds:
 * const result = millisecondsToSeconds(1000)
 * //=> 1
 *
 * @example
 * // It uses floor rounding:
 * const result = millisecondsToSeconds(1999)
 * //=> 1
 */
function millisecondsToSeconds(milliseconds) {
  const seconds = milliseconds / millisecondsInSecond;
  return Math.trunc(seconds);
}

/**
 * @name minutesToHours
 * @category Conversion Helpers
 * @summary Convert minutes to hours.
 *
 * @description
 * Convert a number of minutes to a full number of hours.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in hours
 *
 * @example
 * // Convert 140 minutes to hours:
 * const result = minutesToHours(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = minutesToHours(179)
 * //=> 2
 */
function minutesToHours(minutes) {
  const hours = minutes / minutesInHour;
  return Math.trunc(hours);
}

/**
 * @name minutesToMilliseconds
 * @category Conversion Helpers
 * @summary Convert minutes to milliseconds.
 *
 * @description
 * Convert a number of minutes to a full number of milliseconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in milliseconds
 *
 * @example
 * // Convert 2 minutes to milliseconds
 * const result = minutesToMilliseconds(2)
 * //=> 120000
 */
function minutesToMilliseconds(minutes) {
  return Math.trunc(minutes * millisecondsInMinute);
}

/**
 * @name minutesToSeconds
 * @category Conversion Helpers
 * @summary Convert minutes to seconds.
 *
 * @description
 * Convert a number of minutes to a full number of seconds.
 *
 * @param minutes - The number of minutes to be converted
 *
 * @returns The number of minutes converted in seconds
 *
 * @example
 * // Convert 2 minutes to seconds
 * const result = minutesToSeconds(2)
 * //=> 120
 */
function minutesToSeconds(minutes) {
  return Math.trunc(minutes * secondsInMinute);
}

/**
 * @name monthsToQuarters
 * @category Conversion Helpers
 * @summary Convert number of months to quarters.
 *
 * @description
 * Convert a number of months to a full number of quarters.
 *
 * @param months - The number of months to be converted.
 *
 * @returns The number of months converted in quarters
 *
 * @example
 * // Convert 6 months to quarters:
 * const result = monthsToQuarters(6)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = monthsToQuarters(7)
 * //=> 2
 */
function monthsToQuarters(months) {
  const quarters = months / monthsInQuarter;
  return Math.trunc(quarters);
}

/**
 * @name monthsToYears
 * @category Conversion Helpers
 * @summary Convert number of months to years.
 *
 * @description
 * Convert a number of months to a full number of years.
 *
 * @param months - The number of months to be converted
 *
 * @returns The number of months converted in years
 *
 * @example
 * // Convert 36 months to years:
 * const result = monthsToYears(36)
 * //=> 3
 *
 * // It uses floor rounding:
 * const result = monthsToYears(40)
 * //=> 3
 */
function monthsToYears(months) {
  const years = months / monthsInYear;
  return Math.trunc(years);
}

/**
 * The {@link nextDay} function options.
 */

/**
 * @name nextDay
 * @category Weekday Helpers
 * @summary When is the next day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to check
 * @param day - Day of the week
 * @param options - An object with options
 *
 * @returns The date is the next day of the week
 *
 * @example
 * // When is the next Monday after Mar, 20, 2020?
 * const result = nextDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 23 2020 00:00:00
 *
 * @example
 * // When is the next Tuesday after Mar, 21, 2020?
 * const result = nextDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextDay(date, day, options) {
  let delta = day - getDay(date, options);
  if (delta <= 0) delta += 7;

  return addDays(date, delta, options);
}

/**
 * The {@link nextFriday} function options.
 */

/**
 * @name nextFriday
 * @category Weekday Helpers
 * @summary When is the next Friday?
 *
 * @description
 * When is the next Friday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Friday
 *
 * @example
 * // When is the next Friday after Mar, 22, 2020?
 * const result = nextFriday(new Date(2020, 2, 22))
 * //=> Fri Mar 27 2020 00:00:00
 */
function nextFriday(date, options) {
  return nextDay(date, 5, options);
}

/**
 * The {@link nextMonday} function options.
 */

/**
 * @name nextMonday
 * @category Weekday Helpers
 * @summary When is the next Monday?
 *
 * @description
 * When is the next Monday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, returned from the context function if passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Monday
 *
 * @example
 * // When is the next Monday after Mar, 22, 2020?
 * const result = nextMonday(new Date(2020, 2, 22))
 * //=> Mon Mar 23 2020 00:00:00
 */
function nextMonday(date, options) {
  return nextDay(date, 1, options);
}

/**
 * The {@link nextSaturday} function options.
 */

/**
 * @name nextSaturday
 * @category Weekday Helpers
 * @summary When is the next Saturday?
 *
 * @description
 * When is the next Saturday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Saturday
 *
 * @example
 * // When is the next Saturday after Mar, 22, 2020?
 * const result = nextSaturday(new Date(2020, 2, 22))
 * //=> Sat Mar 28 2020 00:00:00
 */
function nextSaturday(date, options) {
  return nextDay(date, 6, options);
}

/**
 * The {@link nextSunday} function options.
 */

/**
 * @name nextSunday
 * @category Weekday Helpers
 * @summary When is the next Sunday?
 *
 * @description
 * When is the next Sunday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned if a context is provided.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Sunday
 *
 * @example
 * // When is the next Sunday after March 22, 2020?
 * const result = nextSunday(new Date(2020, 2, 22))
 * //=> Sun Mar 29 2020 00:00:00
 */
function nextSunday(date, options) {
  return nextDay(date, 0, options);
}

/**
 * The {@link nextThursday} function options.
 */

/**
 * @name nextThursday
 * @category Weekday Helpers
 * @summary When is the next Thursday?
 *
 * @description
 * When is the next Thursday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Thursday
 *
 * @example
 * // When is the next Thursday after Mar, 22, 2020?
 * const result = nextThursday(new Date(2020, 2, 22))
 * //=> Thur Mar 26 2020 00:00:00
 */
function nextThursday(date, options) {
  return nextDay(date, 4, options);
}

/**
 * The {@link nextTuesday} function options.
 */

/**
 * @name nextTuesday
 * @category Weekday Helpers
 * @summary When is the next Tuesday?
 *
 * @description
 * When is the next Tuesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Tuesday
 *
 * @example
 * // When is the next Tuesday after Mar, 22, 2020?
 * const result = nextTuesday(new Date(2020, 2, 22))
 * //=> Tue Mar 24 2020 00:00:00
 */
function nextTuesday(date, options) {
  return nextDay(date, 2, options);
}

/**
 * The {@link nextWednesday} function options.
 */

/**
 * @name nextWednesday
 * @category Weekday Helpers
 * @summary When is the next Wednesday?
 *
 * @description
 * When is the next Wednesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The next Wednesday
 *
 * @example
 * // When is the next Wednesday after Mar, 22, 2020?
 * const result = nextWednesday(new Date(2020, 2, 22))
 * //=> Wed Mar 25 2020 00:00:00
 */
function nextWednesday(date, options) {
  return nextDay(date, 3, options);
}

/**
 * The {@link parseISO} function options.
 */

/**
 * @name parseISO
 * @category Common Helpers
 * @summary Parse ISO string
 *
 * @description
 * Parse the given string in ISO 8601 format and return an instance of Date.
 *
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument isn't a string, the function cannot parse the string or
 * the values are invalid, it returns Invalid Date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param argument - The value to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = parseISO('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = parseISO('+02014101', { additionalDigits: 1 })
 * //=> Fri Apr 11 2014 00:00:00
 */
function parseISO(argument, options) {
  const invalidDate = () => constructFrom(options?.in, NaN);

  const additionalDigits = options?.additionalDigits ?? 2;
  const dateStrings = splitDateString(argument);

  let date;
  if (dateStrings.date) {
    const parseYearResult = parseYear(dateStrings.date, additionalDigits);
    date = parseDate(parseYearResult.restDateString, parseYearResult.year);
  }

  if (!date || isNaN(+date)) return invalidDate();

  const timestamp = +date;
  let time = 0;
  let offset;

  if (dateStrings.time) {
    time = parseTime(dateStrings.time);
    if (isNaN(time)) return invalidDate();
  }

  if (dateStrings.timezone) {
    offset = parseTimezone(dateStrings.timezone);
    if (isNaN(offset)) return invalidDate();
  } else {
    const tmpDate = new Date(timestamp + time);
    const result = toDate(0, options?.in);
    result.setFullYear(
      tmpDate.getUTCFullYear(),
      tmpDate.getUTCMonth(),
      tmpDate.getUTCDate(),
    );
    result.setHours(
      tmpDate.getUTCHours(),
      tmpDate.getUTCMinutes(),
      tmpDate.getUTCSeconds(),
      tmpDate.getUTCMilliseconds(),
    );
    return result;
  }

  return toDate(timestamp + time + offset, options?.in);
}

const patterns = {
  dateTimeDelimiter: /[T ]/,
  timeZoneDelimiter: /[Z ]/i,
  timezone: /([Z+-].*)$/,
};

const dateRegex =
  /^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/;
const timeRegex =
  /^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/;
const timezoneRegex = /^([+-])(\d{2})(?::?(\d{2}))?$/;

function splitDateString(dateString) {
  const dateStrings = {};
  const array = dateString.split(patterns.dateTimeDelimiter);
  let timeString;

  // The regex match should only return at maximum two array elements.
  // [date], [time], or [date, time].
  if (array.length > 2) {
    return dateStrings;
  }

  if (/:/.test(array[0])) {
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    if (patterns.timeZoneDelimiter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(patterns.timeZoneDelimiter)[0];
      timeString = dateString.substr(
        dateStrings.date.length,
        dateString.length,
      );
    }
  }

  if (timeString) {
    const token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings;
}

function parseYear(dateString, additionalDigits) {
  const regex = new RegExp(
    "^(?:(\\d{4}|[+-]\\d{" +
      (4 + additionalDigits) +
      "})|(\\d{2}|[+-]\\d{" +
      (2 + additionalDigits) +
      "})$)",
  );

  const captures = dateString.match(regex);
  // Invalid ISO-formatted year
  if (!captures) return { year: NaN, restDateString: "" };

  const year = captures[1] ? parseInt(captures[1]) : null;
  const century = captures[2] ? parseInt(captures[2]) : null;

  // either year or century is null, not both
  return {
    year: century === null ? year : century * 100,
    restDateString: dateString.slice((captures[1] || captures[2]).length),
  };
}

function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) return new Date(NaN);

  const captures = dateString.match(dateRegex);
  // Invalid ISO-formatted string
  if (!captures) return new Date(NaN);

  const isWeekDate = !!captures[4];
  const dayOfYear = parseDateUnit(captures[1]);
  const month = parseDateUnit(captures[2]) - 1;
  const day = parseDateUnit(captures[3]);
  const week = parseDateUnit(captures[4]);
  const dayOfWeek = parseDateUnit(captures[5]) - 1;

  if (isWeekDate) {
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  } else {
    const date = new Date(0);
    if (
      !validateDate(year, month, day) ||
      !validateDayOfYearDate(year, dayOfYear)
    ) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, Math.max(dayOfYear, day));
    return date;
  }
}

function parseDateUnit(value) {
  return value ? parseInt(value) : 1;
}

function parseTime(timeString) {
  const captures = timeString.match(timeRegex);
  if (!captures) return NaN; // Invalid ISO-formatted time

  const hours = parseTimeUnit(captures[1]);
  const minutes = parseTimeUnit(captures[2]);
  const seconds = parseTimeUnit(captures[3]);

  if (!validateTime(hours, minutes, seconds)) {
    return NaN;
  }

  return (
    hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * 1000
  );
}

function parseTimeUnit(value) {
  return (value && parseFloat(value.replace(",", "."))) || 0;
}

function parseTimezone(timezoneString) {
  if (timezoneString === "Z") return 0;

  const captures = timezoneString.match(timezoneRegex);
  if (!captures) return 0;

  const sign = captures[1] === "+" ? -1 : 1;
  const hours = parseInt(captures[2]);
  const minutes = (captures[3] && parseInt(captures[3])) || 0;

  if (!validateTimezone(hours, minutes)) {
    return NaN;
  }

  return sign * (hours * millisecondsInHour + minutes * millisecondsInMinute);
}

function dayOfISOWeekYear(isoWeekYear, week, day) {
  const date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  const fourthOfJanuaryDay = date.getUTCDay() || 7;
  const diff = (week - 1) * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

// February is null to handle the leap year (using ||)
const daysInMonths = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYearIndex(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function validateDate(year, month, date) {
  return (
    month >= 0 &&
    month <= 11 &&
    date >= 1 &&
    date <= (daysInMonths[month] || (isLeapYearIndex(year) ? 29 : 28))
  );
}

function validateDayOfYearDate(year, dayOfYear) {
  return dayOfYear >= 1 && dayOfYear <= (isLeapYearIndex(year) ? 366 : 365);
}

function validateWeekDate(_year, week, day) {
  return week >= 1 && week <= 53 && day >= 0 && day <= 6;
}

function validateTime(hours, minutes, seconds) {
  if (hours === 24) {
    return minutes === 0 && seconds === 0;
  }

  return (
    seconds >= 0 &&
    seconds < 60 &&
    minutes >= 0 &&
    minutes < 60 &&
    hours >= 0 &&
    hours < 25
  );
}

function validateTimezone(_hours, minutes) {
  return minutes >= 0 && minutes <= 59;
}

/**
 * The {@link parseJSON} function options.
 */

/**
 * Converts a complete ISO date string in UTC time, the typical format for transmitting
 * a date in JSON, to a JavaScript `Date` instance.
 *
 * This is a minimal implementation for converting dates retrieved from a JSON API to
 * a `Date` instance which can be used with other functions in the `date-fns` library.
 * The following formats are supported:
 *
 * - `2000-03-15T05:20:10.123Z`: The output of `.toISOString()` and `JSON.stringify(new Date())`
 * - `2000-03-15T05:20:10Z`: Without milliseconds
 * - `2000-03-15T05:20:10+00:00`: With a zero offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+05:45`: With a positive or negative offset, the default JSON encoded format in some other languages
 * - `2000-03-15T05:20:10+0000`: With a zero offset without a colon
 * - `2000-03-15T05:20:10`: Without a trailing 'Z' symbol
 * - `2000-03-15T05:20:10.1234567`: Up to 7 digits in milliseconds field. Only first 3 are taken into account since JS does not allow fractional milliseconds
 * - `2000-03-15 05:20:10`: With a space instead of a 'T' separator for APIs returning a SQL date without reformatting
 *
 * For convenience and ease of use these other input types are also supported
 * via [toDate](https://date-fns.org/docs/toDate):
 *
 * - A `Date` instance will be cloned
 * - A `number` will be treated as a timestamp
 *
 * Any other input type or invalid date strings will return an `Invalid Date`.
 *
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param dateStr - A fully formed ISO8601 date string to convert
 * @param options - An object with options
 *
 * @returns The parsed date in the local time zone
 */
function parseJSON(dateStr, options) {
  const parts = dateStr.match(
    /(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})(?:\.(\d{0,7}))?(?:Z|(.)(\d{2}):?(\d{2})?)?/,
  );

  if (!parts) return toDate(NaN, options?.in);

  return toDate(
    Date.UTC(
      +parts[1],
      +parts[2] - 1,
      +parts[3],
      +parts[4] - (+parts[9] || 0) * (parts[8] == "-" ? -1 : 1),
      +parts[5] - (+parts[10] || 0) * (parts[8] == "-" ? -1 : 1),
      +parts[6],
      +((parts[7] || "0") + "00").substring(0, 3),
    ),
    options?.in,
  );
}

/**
 * The {@link previousDay} function options.
 */

/**
 * @name previousDay
 * @category Weekday Helpers
 * @summary When is the previous day of the week?
 *
 * @description
 * When is the previous day of the week? 0-6 the day of the week, 0 represents Sunday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to check
 * @param day - The day of the week
 * @param options - An object with options
 *
 * @returns The date is the previous day of week
 *
 * @example
 * // When is the previous Monday before Mar, 20, 2020?
 * const result = previousDay(new Date(2020, 2, 20), 1)
 * //=> Mon Mar 16 2020 00:00:00
 *
 * @example
 * // When is the previous Tuesday before Mar, 21, 2020?
 * const result = previousDay(new Date(2020, 2, 21), 2)
 * //=> Tue Mar 17 2020 00:00:00
 */
function previousDay(date, day, options) {
  let delta = getDay(date, options) - day;
  if (delta <= 0) delta += 7;

  return subDays(date, delta, options);
}

/**
 * The {@link previousFriday} function options.
 */

/**
 * @name previousFriday
 * @category Weekday Helpers
 * @summary When is the previous Friday?
 *
 * @description
 * When is the previous Friday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Friday
 *
 * @example
 * // When is the previous Friday before Jun, 19, 2021?
 * const result = previousFriday(new Date(2021, 5, 19))
 * //=> Fri June 18 2021 00:00:00
 */
function previousFriday(date, options) {
  return previousDay(date, 5, options);
}

/**
 * The {@link previousMonday} function options.
 */

/**
 * @name previousMonday
 * @category Weekday Helpers
 * @summary When is the previous Monday?
 *
 * @description
 * When is the previous Monday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Monday
 *
 * @example
 * // When is the previous Monday before Jun, 18, 2021?
 * const result = previousMonday(new Date(2021, 5, 18))
 * //=> Mon June 14 2021 00:00:00
 */
function previousMonday(date, options) {
  return previousDay(date, 1, options);
}

/**
 * The {@link previousSaturday} function options.
 */

/**
 * @name previousSaturday
 * @category Weekday Helpers
 * @summary When is the previous Saturday?
 *
 * @description
 * When is the previous Saturday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Saturday
 *
 * @example
 * // When is the previous Saturday before Jun, 20, 2021?
 * const result = previousSaturday(new Date(2021, 5, 20))
 * //=> Sat June 19 2021 00:00:00
 */
function previousSaturday(date, options) {
  return previousDay(date, 6, options);
}

/**
 * The {@link previousSunday} function options.
 */

/**
 * @name previousSunday
 * @category Weekday Helpers
 * @summary When is the previous Sunday?
 *
 * @description
 * When is the previous Sunday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - The options
 *
 * @returns The previous Sunday
 *
 * @example
 * // When is the previous Sunday before Jun, 21, 2021?
 * const result = previousSunday(new Date(2021, 5, 21))
 * //=> Sun June 20 2021 00:00:00
 */
function previousSunday(date, options) {
  return previousDay(date, 0, options);
}

/**
 * The {@link previousThursday} function options.
 */

/**
 * @name previousThursday
 * @category Weekday Helpers
 * @summary When is the previous Thursday?
 *
 * @description
 * When is the previous Thursday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Thursday
 *
 * @example
 * // When is the previous Thursday before Jun, 18, 2021?
 * const result = previousThursday(new Date(2021, 5, 18))
 * //=> Thu June 17 2021 00:00:00
 */
function previousThursday(date, options) {
  return previousDay(date, 4, options);
}

/**
 * The {@link previousTuesday} function options.
 */

/**
 * @name previousTuesday
 * @category Weekday Helpers
 * @summary When is the previous Tuesday?
 *
 * @description
 * When is the previous Tuesday?
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Tuesday
 *
 * @example
 * // When is the previous Tuesday before Jun, 18, 2021?
 * const result = previousTuesday(new Date(2021, 5, 18))
 * //=> Tue June 15 2021 00:00:00
 */
function previousTuesday(date, options) {
  return previousDay(date, 2, options);
}

/**
 * The {@link previousWednesday} function options.
 */

/**
 * @name previousWednesday
 * @category Weekday Helpers
 * @summary When is the previous Wednesday?
 *
 * @description
 * When is the previous Wednesday?
 *
 * @typeParam DateType - The Date type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [UTCDate](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to start counting from
 * @param options - An object with options
 *
 * @returns The previous Wednesday
 *
 * @example
 * // When is the previous Wednesday before Jun, 18, 2021?
 * const result = previousWednesday(new Date(2021, 5, 18))
 * //=> Wed June 16 2021 00:00:00
 */
function previousWednesday(date, options) {
  return previousDay(date, 3, options);
}

/**
 * @name quartersToMonths
 * @category Conversion Helpers
 * @summary Convert number of quarters to months.
 *
 * @description
 * Convert a number of quarters to a full number of months.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in months
 *
 * @example
 * // Convert 2 quarters to months
 * const result = quartersToMonths(2)
 * //=> 6
 */
function quartersToMonths(quarters) {
  return Math.trunc(quarters * monthsInQuarter);
}

/**
 * @name quartersToYears
 * @category Conversion Helpers
 * @summary Convert number of quarters to years.
 *
 * @description
 * Convert a number of quarters to a full number of years.
 *
 * @param quarters - The number of quarters to be converted
 *
 * @returns The number of quarters converted in years
 *
 * @example
 * // Convert 8 quarters to years
 * const result = quartersToYears(8)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = quartersToYears(11)
 * //=> 2
 */
function quartersToYears(quarters) {
  const years = quarters / quartersInYear;
  return Math.trunc(years);
}

/**
 * The {@link roundToNearestHours} function options.
 */

/**
 * @name roundToNearestHours
 * @category Hour Helpers
 * @summary Rounds the given date to the nearest hour
 *
 * @description
 * Rounds the given date to the nearest hour (or number of hours).
 * Rounds up when the given date is exactly between the nearest round hours.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to round
 * @param options - An object with options.
 *
 * @returns The new date rounded to the closest hour
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56))
 * //=> Thu Jul 10 2014 13:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 6 })
 * //=> Thu Jul 10 2014 12:00:00
 *
 * @example
 * // Round 10 July 2014 12:34:56 to nearest half hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { nearestTo: 8 })
 * //=> Thu Jul 10 2014 16:00:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:34:56 to nearest hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 1, 23, 45), { roundingMethod: 'ceil' })
 * //=> Thu Jul 10 2014 02:00:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:34:56 to nearest quarter hour:
 * const result = roundToNearestHours(new Date(2014, 6, 10, 12, 34, 56), { roundingMethod: 'floor', nearestTo: 8 })
 * //=> Thu Jul 10 2014 08:00:00
 */
function roundToNearestHours(date, options) {
  const nearestTo = options?.nearestTo ?? 1;

  if (nearestTo < 1 || nearestTo > 12)
    return constructFrom(options?.in || date, NaN);

  const date_ = toDate(date, options?.in);
  const fractionalMinutes = date_.getMinutes() / 60;
  const fractionalSeconds = date_.getSeconds() / 60 / 60;
  const fractionalMilliseconds = date_.getMilliseconds() / 1000 / 60 / 60;
  const hours =
    date_.getHours() +
    fractionalMinutes +
    fractionalSeconds +
    fractionalMilliseconds;

  const method = options?.roundingMethod ?? "round";
  const roundingMethod = getRoundingMethod(method);

  const roundedHours = roundingMethod(hours / nearestTo) * nearestTo;

  date_.setHours(roundedHours, 0, 0, 0);
  return date_;
}

/**
 * The {@link roundToNearestMinutes} function options.
 */

/**
 * @name roundToNearestMinutes
 * @category Minute Helpers
 * @summary Rounds the given date to the nearest minute
 *
 * @description
 * Rounds the given date to the nearest minute (or number of minutes).
 * Rounds up when the given date is exactly between the nearest round minutes.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to round
 * @param options - An object with options.
 *
 * @returns The new date rounded to the closest minute
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34))
 * //=> Thu Jul 10 2014 12:13:00
 *
 * @example
 * // Round 10 July 2014 12:12:34 to nearest quarter hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { nearestTo: 15 })
 * //=> Thu Jul 10 2014 12:15:00
 *
 * @example
 * // Floor (rounds down) 10 July 2014 12:12:34 to nearest minute:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'floor' })
 * //=> Thu Jul 10 2014 12:12:00
 *
 * @example
 * // Ceil (rounds up) 10 July 2014 12:12:34 to nearest half hour:
 * const result = roundToNearestMinutes(new Date(2014, 6, 10, 12, 12, 34), { roundingMethod: 'ceil', nearestTo: 30 })
 * //=> Thu Jul 10 2014 12:30:00
 */
function roundToNearestMinutes(date, options) {
  const nearestTo = options?.nearestTo ?? 1;

  if (nearestTo < 1 || nearestTo > 30) return constructFrom(date, NaN);

  const date_ = toDate(date, options?.in);
  const fractionalSeconds = date_.getSeconds() / 60;
  const fractionalMilliseconds = date_.getMilliseconds() / 1000 / 60;
  const minutes =
    date_.getMinutes() + fractionalSeconds + fractionalMilliseconds;

  const method = options?.roundingMethod ?? "round";
  const roundingMethod = getRoundingMethod(method);

  const roundedMinutes = roundingMethod(minutes / nearestTo) * nearestTo;

  date_.setMinutes(roundedMinutes, 0, 0);
  return date_;
}

/**
 * @name secondsToHours
 * @category Conversion Helpers
 * @summary Convert seconds to hours.
 *
 * @description
 * Convert a number of seconds to a full number of hours.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in hours
 *
 * @example
 * // Convert 7200 seconds into hours
 * const result = secondsToHours(7200)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToHours(7199)
 * //=> 1
 */
function secondsToHours(seconds) {
  const hours = seconds / secondsInHour;
  return Math.trunc(hours);
}

/**
 * @name secondsToMilliseconds
 * @category Conversion Helpers
 * @summary Convert seconds to milliseconds.
 *
 * @description
 * Convert a number of seconds to a full number of milliseconds.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in milliseconds
 *
 * @example
 * // Convert 2 seconds into milliseconds
 * const result = secondsToMilliseconds(2)
 * //=> 2000
 */
function secondsToMilliseconds(seconds) {
  return seconds * millisecondsInSecond;
}

/**
 * @name secondsToMinutes
 * @category Conversion Helpers
 * @summary Convert seconds to minutes.
 *
 * @description
 * Convert a number of seconds to a full number of minutes.
 *
 * @param seconds - The number of seconds to be converted
 *
 * @returns The number of seconds converted in minutes
 *
 * @example
 * // Convert 120 seconds into minutes
 * const result = secondsToMinutes(120)
 * //=> 2
 *
 * @example
 * // It uses floor rounding:
 * const result = secondsToMinutes(119)
 * //=> 1
 */
function secondsToMinutes(seconds) {
  const minutes = seconds / secondsInMinute;
  return Math.trunc(minutes);
}

/**
 * The {@link setMonth} function options.
 */

/**
 * @name setMonth
 * @category Month Helpers
 * @summary Set the month to the given date.
 *
 * @description
 * Set the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param month - The month index to set (0-11)
 * @param options - The options
 *
 * @returns The new date with the month set
 *
 * @example
 * // Set February to 1 September 2014:
 * const result = setMonth(new Date(2014, 8, 1), 1)
 * //=> Sat Feb 01 2014 00:00:00
 */
function setMonth(date, month, options) {
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const day = _date.getDate();

  const midMonth = constructFrom(options?.in || date, 0);
  midMonth.setFullYear(year, month, 15);
  midMonth.setHours(0, 0, 0, 0);
  const daysInMonth = getDaysInMonth(midMonth);

  // Set the earlier date, allows to wrap Jan 31 to Feb 28
  _date.setMonth(month, Math.min(day, daysInMonth));
  return _date;
}

/**
 * The {@link set} function options.
 */

/**
 * @name set
 * @category Common Helpers
 * @summary Set date values to a given date.
 *
 * @description
 * Set date values to a given date.
 *
 * Sets time values to date from object `values`.
 * A value is not set if it is undefined or null or doesn't exist in `values`.
 *
 * Note about bundle size: `set` does not internally use `setX` functions from date-fns but instead opts
 * to use native `Date#setX` methods. If you use this function, you may not want to include the
 * other `setX` functions that date-fns provides if you are concerned about the bundle size.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param values - The date values to be set
 * @param options - The options
 *
 * @returns The new date with options set
 *
 * @example
 * // Transform 1 September 2014 into 20 October 2015 in a single line:
 * const result = set(new Date(2014, 8, 20), { year: 2015, month: 9, date: 20 })
 * //=> Tue Oct 20 2015 00:00:00
 *
 * @example
 * // Set 12 PM to 1 September 2014 01:23:45 to 1 September 2014 12:00:00:
 * const result = set(new Date(2014, 8, 1, 1, 23, 45), { hours: 12 })
 * //=> Mon Sep 01 2014 12:23:45
 */
function set(date, values, options) {
  let _date = toDate(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+_date)) return constructFrom(options?.in || date, NaN);

  if (values.year != null) _date.setFullYear(values.year);
  if (values.month != null) _date = setMonth(_date, values.month);
  if (values.date != null) _date.setDate(values.date);
  if (values.hours != null) _date.setHours(values.hours);
  if (values.minutes != null) _date.setMinutes(values.minutes);
  if (values.seconds != null) _date.setSeconds(values.seconds);
  if (values.milliseconds != null) _date.setMilliseconds(values.milliseconds);

  return _date;
}

/**
 * The {@link setDate} function options.
 */

/**
 * @name setDate
 * @category Day Helpers
 * @summary Set the day of the month to the given date.
 *
 * @description
 * Set the day of the month to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param dayOfMonth - The day of the month of the new date
 * @param options - The options
 *
 * @returns The new date with the day of the month set
 *
 * @example
 * // Set the 30th day of the month to 1 September 2014:
 * const result = setDate(new Date(2014, 8, 1), 30)
 * //=> Tue Sep 30 2014 00:00:00
 */
function setDate(date, dayOfMonth, options) {
  const _date = toDate(date, options?.in);
  _date.setDate(dayOfMonth);
  return _date;
}

/**
 * The {@link setDayOfYear} function options.
 */

/**
 * @name setDayOfYear
 * @category Day Helpers
 * @summary Set the day of the year to the given date.
 *
 * @description
 * Set the day of the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param dayOfYear - The day of the year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the day of the year set
 *
 * @example
 * // Set the 2nd day of the year to 2 July 2014:
 * const result = setDayOfYear(new Date(2014, 6, 2), 2)
 * //=> Thu Jan 02 2014 00:00:00
 */
function setDayOfYear(date, dayOfYear, options) {
  const date_ = toDate(date, options?.in);
  date_.setMonth(0);
  date_.setDate(dayOfYear);
  return date_;
}

/**
 * @name setDefaultOptions
 * @category Common Helpers
 * @summary Set default options including locale.
 * @pure false
 *
 * @description
 * Sets the defaults for
 * `options.locale`, `options.weekStartsOn` and `options.firstWeekContainsDate`
 * arguments for all functions.
 *
 * @param options - An object with options
 *
 * @example
 * // Set global locale:
 * import { es } from 'date-fns/locale'
 * setDefaultOptions({ locale: es })
 * const result = format(new Date(2014, 8, 2), 'PPPP')
 * //=> 'martes, 2 de septiembre de 2014'
 *
 * @example
 * // Start of the week for 2 September 2014:
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Start of the week for 2 September 2014,
 * // when we set that week starts on Monday by default:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Mon Sep 01 2014 00:00:00
 *
 * @example
 * // Manually set options take priority over default options:
 * setDefaultOptions({ weekStartsOn: 1 })
 * const result = startOfWeek(new Date(2014, 8, 2), { weekStartsOn: 0 })
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // Remove the option by setting it to `undefined`:
 * setDefaultOptions({ weekStartsOn: 1 })
 * setDefaultOptions({ weekStartsOn: undefined })
 * const result = startOfWeek(new Date(2014, 8, 2))
 * //=> Sun Aug 31 2014 00:00:00
 */
function setDefaultOptions(options) {
  const result = {};
  const defaultOptions = getDefaultOptions$1();

  for (const property in defaultOptions) {
    if (Object.prototype.hasOwnProperty.call(defaultOptions, property)) {
      // [TODO] I challenge you to fix the type
      result[property] = defaultOptions[property];
    }
  }

  for (const property in options) {
    if (Object.prototype.hasOwnProperty.call(options, property)) {
      if (options[property] === undefined) {
        // [TODO] I challenge you to fix the type
        delete result[property];
      } else {
        // [TODO] I challenge you to fix the type
        result[property] = options[property];
      }
    }
  }

  setDefaultOptions$1(result);
}

/**
 * The {@link setHours} function options.
 */

/**
 * @name setHours
 * @category Hour Helpers
 * @summary Set the hours to the given date.
 *
 * @description
 * Set the hours to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param hours - The hours of the new date
 * @param options - An object with options
 *
 * @returns The new date with the hours set
 *
 * @example
 * // Set 4 hours to 1 September 2014 11:30:00:
 * const result = setHours(new Date(2014, 8, 1, 11, 30), 4)
 * //=> Mon Sep 01 2014 04:30:00
 */
function setHours(date, hours, options) {
  const _date = toDate(date, options?.in);
  _date.setHours(hours);
  return _date;
}

/**
 * The {@link setMilliseconds} function options.
 */

/**
 * @name setMilliseconds
 * @category Millisecond Helpers
 * @summary Set the milliseconds to the given date.
 *
 * @description
 * Set the milliseconds to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param milliseconds - The milliseconds of the new date
 * @param options - The options
 *
 * @returns The new date with the milliseconds set
 *
 * @example
 * // Set 300 milliseconds to 1 September 2014 11:30:40.500:
 * const result = setMilliseconds(new Date(2014, 8, 1, 11, 30, 40, 500), 300)
 * //=> Mon Sep 01 2014 11:30:40.300
 */
function setMilliseconds(date, milliseconds, options) {
  const _date = toDate(date, options?.in);
  _date.setMilliseconds(milliseconds);
  return _date;
}

/**
 * The {@link setMinutes} function options.
 */

/**
 * @name setMinutes
 * @category Minute Helpers
 * @summary Set the minutes to the given date.
 *
 * @description
 * Set the minutes to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows using extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, returned from the context function, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param minutes - The minutes of the new date
 * @param options - An object with options
 *
 * @returns The new date with the minutes set
 *
 * @example
 * // Set 45 minutes to 1 September 2014 11:30:40:
 * const result = setMinutes(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:45:40
 */
function setMinutes(date, minutes, options) {
  const date_ = toDate(date, options?.in);
  date_.setMinutes(minutes);
  return date_;
}

/**
 * The {@link setQuarter} function options.
 */

/**
 * @name setQuarter
 * @category Quarter Helpers
 * @summary Set the year quarter to the given date.
 *
 * @description
 * Set the year quarter to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param quarter - The quarter of the new date
 * @param options - The options
 *
 * @returns The new date with the quarter set
 *
 * @example
 * // Set the 2nd quarter to 2 July 2014:
 * const result = setQuarter(new Date(2014, 6, 2), 2)
 * //=> Wed Apr 02 2014 00:00:00
 */
function setQuarter(date, quarter, options) {
  const date_ = toDate(date, options?.in);
  const oldQuarter = Math.trunc(date_.getMonth() / 3) + 1;
  const diff = quarter - oldQuarter;
  return setMonth(date_, date_.getMonth() + diff * 3);
}

/**
 * The {@link setSeconds} function options.
 */

/**
 * @name setSeconds
 * @category Second Helpers
 * @summary Set the seconds to the given date, with context support.
 *
 * @description
 * Set the seconds to the given date, with an optional context for time zone specification.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param seconds - The seconds of the new date
 * @param options - An object with options
 *
 * @returns The new date with the seconds set
 *
 * @example
 * // Set 45 seconds to 1 September 2014 11:30:40:
 * const result = setSeconds(new Date(2014, 8, 1, 11, 30, 40), 45)
 * //=> Mon Sep 01 2014 11:30:45
 */
function setSeconds(date, seconds, options) {
  const _date = toDate(date, options?.in);
  _date.setSeconds(seconds);
  return _date;
}

/**
 * The {@link setWeekYear} function options.
 */

/**
 * @name setWeekYear
 * @category Week-Numbering Year Helpers
 * @summary Set the local week-numbering year to the given date.
 *
 * @description
 * Set the local week-numbering year to the given date,
 * saving the week number and the weekday number.
 * The exact calculation depends on the values of
 * `options.weekStartsOn` (which is the index of the first day of the week)
 * and `options.firstWeekContainsDate` (which is the day of January, which is always in
 * the first week of the week-numbering year)
 *
 * Week numbering: https://en.wikipedia.org/wiki/Week#The_ISO_week_date_system
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param weekYear - The local week-numbering year of the new date
 * @param options - An object with options
 *
 * @returns The new date with the local week-numbering year set
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010 with default options:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004)
 * //=> Sat Jan 03 2004 00:00:00
 *
 * @example
 * // Set the local week-numbering year 2004 to 2 January 2010,
 * // if Monday is the first day of week
 * // and 4 January is always in the first week of the year:
 * const result = setWeekYear(new Date(2010, 0, 2), 2004, {
 *   weekStartsOn: 1,
 *   firstWeekContainsDate: 4
 * })
 * //=> Sat Jan 01 2005 00:00:00
 */
function setWeekYear(date, weekYear, options) {
  const defaultOptions = getDefaultOptions$1();
  const firstWeekContainsDate =
    options?.firstWeekContainsDate ??
    options?.locale?.options?.firstWeekContainsDate ??
    defaultOptions.firstWeekContainsDate ??
    defaultOptions.locale?.options?.firstWeekContainsDate ??
    1;

  const diff = differenceInCalendarDays(
    toDate(date, options?.in),
    startOfWeekYear(date, options),
    options,
  );

  const firstWeek = constructFrom(options?.in || date, 0);
  firstWeek.setFullYear(weekYear, 0, firstWeekContainsDate);
  firstWeek.setHours(0, 0, 0, 0);

  const date_ = startOfWeekYear(firstWeek, options);
  date_.setDate(date_.getDate() + diff);
  return date_;
}

/**
 * The {@link setYear} function options.
 */

/**
 * @name setYear
 * @category Year Helpers
 * @summary Set the year to the given date.
 *
 * @description
 * Set the year to the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param year - The year of the new date
 * @param options - An object with options.
 *
 * @returns The new date with the year set
 *
 * @example
 * // Set year 2013 to 1 September 2014:
 * const result = setYear(new Date(2014, 8, 1), 2013)
 * //=> Sun Sep 01 2013 00:00:00
 */
function setYear(date, year, options) {
  const date_ = toDate(date, options?.in);

  // Check if date is Invalid Date because Date.prototype.setFullYear ignores the value of Invalid Date
  if (isNaN(+date_)) return constructFrom(options?.in || date, NaN);

  date_.setFullYear(year);
  return date_;
}

/**
 * The {@link startOfDecade} options.
 */

/**
 * @name startOfDecade
 * @category Decade Helpers
 * @summary Return the start of a decade for the given date.
 *
 * @description
 * Return the start of a decade for the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The original date
 * @param options - An object with options
 *
 * @returns The start of a decade
 *
 * @example
 * // The start of a decade for 21 October 2015 00:00:00:
 * const result = startOfDecade(new Date(2015, 9, 21, 00, 00, 00))
 * //=> Jan 01 2010 00:00:00
 */
function startOfDecade(date, options) {
  // TODO: Switch to more technical definition in of decades that start with 1
  // end with 0. I.e. 2001-2010 instead of current 2000-2009. It's a breaking
  // change, so it can only be done in 4.0.
  const _date = toDate(date, options?.in);
  const year = _date.getFullYear();
  const decade = Math.floor(year / 10) * 10;
  _date.setFullYear(decade, 0, 1);
  _date.setHours(0, 0, 0, 0);
  return _date;
}

/**
 * The {@link startOfToday} function options.
 */

/**
 * @name startOfToday
 * @category Day Helpers
 * @summary Return the start of today.
 * @pure false
 *
 * @description
 * Return the start of today.
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @returns The start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday(options) {
  return startOfDay(Date.now(), options);
}

/**
 * The {@link startOfTomorrow} function options.
 */

/**
 * @name startOfTomorrow
 * @category Day Helpers
 * @summary Return the start of tomorrow.
 * @pure false
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @returns The start of tomorrow
 *
 * @description
 * Return the start of tomorrow.
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfTomorrow()
 * //=> Tue Oct 7 2014 00:00:00
 */
function startOfTomorrow(options) {
  const now = constructNow(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = constructFrom(options?.in, 0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * The {@link startOfYesterday} function options.
 */

/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @typeParam ContextDate - The `Date` type of the context function.
 *
 * @param options - An object with options
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns The start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday(options) {
  const now = constructNow(options?.in);
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = constructNow(options?.in);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * The subMonths function options.
 */

/**
 * @name subMonths
 * @category Month Helpers
 * @summary Subtract the specified number of months from the given date.
 *
 * @description
 * Subtract the specified number of months from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of months to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the months subtracted
 *
 * @example
 * // Subtract 5 months from 1 February 2015:
 * const result = subMonths(new Date(2015, 1, 1), 5)
 * //=> Mon Sep 01 2014 00:00:00
 */
function subMonths(date, amount, options) {
  return addMonths(date, -amount, options);
}

/**
 * The {@link sub} function options.
 */

/**
 * @name sub
 * @category Common Helpers
 * @summary Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @description
 * Subtract the specified years, months, weeks, days, hours, minutes and seconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param duration - The object with years, months, weeks, days, hours, minutes and seconds to be subtracted
 * @param options - An object with options
 *
 * | Key     | Description                        |
 * |---------|------------------------------------|
 * | years   | Amount of years to be subtracted   |
 * | months  | Amount of months to be subtracted  |
 * | weeks   | Amount of weeks to be subtracted   |
 * | days    | Amount of days to be subtracted    |
 * | hours   | Amount of hours to be subtracted   |
 * | minutes | Amount of minutes to be subtracted |
 * | seconds | Amount of seconds to be subtracted |
 *
 * All values default to 0
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract the following duration from 15 June 2017 15:29:20
 * const result = sub(new Date(2017, 5, 15, 15, 29, 20), {
 *   years: 2,
 *   months: 9,
 *   weeks: 1,
 *   days: 7,
 *   hours: 5,
 *   minutes: 9,
 *   seconds: 30
 * })
 * //=> Mon Sep 1 2014 10:19:50
 */
function sub(date, duration, options) {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
  } = duration;

  const withoutMonths = subMonths(date, months + years * 12, options);
  const withoutDays = subDays(withoutMonths, days + weeks * 7, options);

  const minutesToSub = minutes + hours * 60;
  const secondsToSub = seconds + minutesToSub * 60;
  const msToSub = secondsToSub * 1000;

  return constructFrom(options?.in || date, +withoutDays - msToSub);
}

/**
 * The {@link subBusinessDays} function options.
 */

/**
 * @name subBusinessDays
 * @category Day Helpers
 * @summary Subtract the specified number of business days (mon - fri) from the given date.
 *
 * @description
 * Subtract the specified number of business days (mon - fri) from the given date, ignoring weekends.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of business days to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the business days subtracted
 *
 * @example
 * // Subtract 10 business days from 1 September 2014:
 * const result = subBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Aug 18 2014 00:00:00 (skipped weekend days)
 */
function subBusinessDays(date, amount, options) {
  return addBusinessDays(date, -amount, options);
}

/**
 * The {@link subHours} function options.
 */

/**
 * @name subHours
 * @category Hour Helpers
 * @summary Subtract the specified number of hours from the given date.
 *
 * @description
 * Subtract the specified number of hours from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of hours to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the hours subtracted
 *
 * @example
 * // Subtract 2 hours from 11 July 2014 01:00:00:
 * const result = subHours(new Date(2014, 6, 11, 1, 0), 2)
 * //=> Thu Jul 10 2014 23:00:00
 */
function subHours(date, amount, options) {
  return addHours(date, -amount, options);
}

/**
 * The {@link subMilliseconds} function options.
 */

/**
 * Subtract the specified number of milliseconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of milliseconds to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the milliseconds subtracted
 */
function subMilliseconds(date, amount, options) {
  return addMilliseconds(date, -amount, options);
}

/**
 * The {@link subMinutes} function options.
 */

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of minutes to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the minutes subtracted
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * const result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes(date, amount, options) {
  return addMinutes(date, -amount, options);
}

/**
 * The {@link subQuarters} function options.
 */

/**
 * @name subQuarters
 * @category Quarter Helpers
 * @summary Subtract the specified number of year quarters from the given date.
 *
 * @description
 * Subtract the specified number of year quarters from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of quarters to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the quarters subtracted
 *
 * @example
 * // Subtract 3 quarters from 1 September 2014:
 * const result = subQuarters(new Date(2014, 8, 1), 3)
 * //=> Sun Dec 01 2013 00:00:00
 */
function subQuarters(date, amount, options) {
  return addQuarters(date, -amount, options);
}

/**
 * The {@link subSeconds} function options.
 */

/**
 * Subtract the specified number of seconds from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of seconds to be subtracted.
 * @param options - The options
 *
 * @returns The new date with the seconds subtracted
 *
 * @example
 * // Subtract 30 seconds from 10 July 2014 12:45:00:
 * const result = subSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
 * //=> Thu Jul 10 2014 12:44:30
 */
function subSeconds(date, amount, options) {
  return addSeconds(date, -amount, options);
}

/**
 * The {@link subWeeks} function options.
 */

/**
 * @name subWeeks
 * @category Week Helpers
 * @summary Subtract the specified number of weeks from the given date.
 *
 * @description
 * Subtract the specified number of weeks from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of weeks to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the weeks subtracted
 *
 * @example
 * // Subtract 4 weeks from 1 September 2014:
 * const result = subWeeks(new Date(2014, 8, 1), 4)
 * //=> Mon Aug 04 2014 00:00:00
 */
function subWeeks(date, amount, options) {
  return addWeeks(date, -amount, options);
}

/**
 * The {@link subYears} function options.
 */

/**
 * @name subYears
 * @category Year Helpers
 * @summary Subtract the specified number of years from the given date.
 *
 * @description
 * Subtract the specified number of years from the given date.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 * @typeParam ResultDate - The result `Date` type, it is the type returned from the context function if it is passed, or inferred from the arguments.
 *
 * @param date - The date to be changed
 * @param amount - The amount of years to be subtracted.
 * @param options - An object with options
 *
 * @returns The new date with the years subtracted
 *
 * @example
 * // Subtract 5 years from 1 September 2014:
 * const result = subYears(new Date(2014, 8, 1), 5)
 * //=> Tue Sep 01 2009 00:00:00
 */
function subYears(date, amount, options) {
  return addYears(date, -amount, options);
}

/**
 * @name weeksToDays
 * @category Conversion Helpers
 * @summary Convert weeks to days.
 *
 * @description
 * Convert a number of weeks to a full number of days.
 *
 * @param weeks - The number of weeks to be converted
 *
 * @returns The number of weeks converted in days
 *
 * @example
 * // Convert 2 weeks into days
 * const result = weeksToDays(2)
 * //=> 14
 */
function weeksToDays(weeks) {
  return Math.trunc(weeks * daysInWeek);
}

/**
 * @name yearsToDays
 * @category Conversion Helpers
 * @summary Convert years to days.
 *
 * @description
 * Convert a number of years to a full number of days.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in days
 *
 * @example
 * // Convert 2 years into days
 * const result = yearsToDays(2)
 * //=> 730
 */
function yearsToDays(years) {
  return Math.trunc(years * daysInYear);
}

/**
 * @name yearsToMonths
 * @category Conversion Helpers
 * @summary Convert years to months.
 *
 * @description
 * Convert a number of years to a full number of months.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in months
 *
 * @example
 * // Convert 2 years into months
 * const result = yearsToMonths(2)
 * //=> 24
 */
function yearsToMonths(years) {
  return Math.trunc(years * monthsInYear);
}

/**
 * @name yearsToQuarters
 * @category Conversion Helpers
 * @summary Convert years to quarters.
 *
 * @description
 * Convert a number of years to a full number of quarters.
 *
 * @param years - The number of years to be converted
 *
 * @returns The number of years converted in quarters
 *
 * @example
 * // Convert 2 years to quarters
 * const result = yearsToQuarters(2)
 * //=> 8
 */
function yearsToQuarters(years) {
  return Math.trunc(years * quartersInYear);
}

// This file is generated automatically by `scripts/build/indices.ts`. Please, don't change it.

function cn(...inputs) {
  return clsx(inputs);
}
function formatDateTime(value) {
  return format(new Date(value), "EEEE, d MMMM yyyy 'at' HH:mm");
}
function formatDate(value) {
  return format(new Date(value), "EEEE, d MMMM yyyy");
}
function formatTime(value) {
  return format(new Date(value), "HH:mm");
}
function formatNullable(value, fallback = "Not provided") {
  return value?.trim() ? value : fallback;
}
function compact(values) {
  return values.filter(Boolean);
}
function slugify(value) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildGuestLocaleUrl(locale, redirectTo = "/guest") {
  const search = new URLSearchParams({
    locale,
    redirectTo
  });
  return `/guest/locale?${search.toString()}`;
}
function PageBackground({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "min-h-screen bg-[radial-gradient(circle_at_top,_rgba(234,215,196,0.95),_rgba(246,240,234,0.92)_38%,_#f8f3ed_100%)]",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,255,255,0.4),transparent_35%,rgba(91,70,55,0.06))]" }),
        children
      ]
    }
  );
}
function PageContainer({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8", className), children });
}
function SurfaceCard({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: cn(
        "rounded-[28px] border border-white/60 bg-white/85 p-5 shadow-[0_24px_80px_rgba(71,50,33,0.08)] backdrop-blur sm:p-6",
        className
      ),
      children
    }
  );
}
function Eyebrow({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.28em] text-[#8f6e57]", children });
}
function Heading({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: cn("font-serif text-4xl leading-tight text-[#2e2118] sm:text-5xl", className), children });
}
function SubtleText({
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm leading-6 text-[#5f4d40] sm:text-base", className), children });
}
function buttonClassName({
  secondary = false,
  compact = false
} = {}) {
  return cn(
    "inline-flex items-center justify-center rounded-full transition duration-200",
    compact ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm sm:text-base",
    secondary ? "border border-[#d7c2b1] bg-white text-[#2f241c] hover:border-[#b4957e] hover:bg-[#faf3ec]" : "bg-[#2f241c] text-[#fff7f1] hover:bg-[#4b382b]"
  );
}
function Pill({
  children,
  tone = "neutral"
}) {
  const toneMap = {
    neutral: "bg-[#f3e7da] text-[#6b4d37]",
    warm: "bg-[#f5ddc9] text-[#8b4c22]",
    success: "bg-[#ddebdc] text-[#2d5c32]",
    muted: "bg-[#eee7e0] text-[#68564a]"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]", toneMap[tone]), children });
}
function StatusPill({ status }) {
  const tone = status === "attending" ? "success" : status === "declined" ? "muted" : "warm";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { tone, children: status });
}
function SectionTitle({
  title,
  description
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-2xl text-[#2e2118]", children: title }),
    description ? /* @__PURE__ */ jsxRuntimeExports.jsx(SubtleText, { children: description }) : null
  ] });
}
function Field({
  label,
  children,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-[#3b2d24]", children: label }),
    children,
    hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[#7a685b]", children: hint }) : null
  ] });
}
function inputClassName() {
  return "w-full rounded-2xl border border-[#dbc8bb] bg-[#fffdfa] px-4 py-3 text-sm text-[#2f241c] outline-none transition focus:border-[#ab8566] focus:ring-2 focus:ring-[#edd9c7]";
}
function textAreaClassName() {
  return `${inputClassName()} min-h-32 resize-y`;
}
function LanguageSwitcher$1({
  locale,
  redirectTo
}) {
  const dictionary = getDictionary(locale);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: ["en", "de"].map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      href: buildGuestLocaleUrl(option, redirectTo),
      className: buttonClassName({
        secondary: option !== locale,
        compact: true
      }),
      children: dictionary.switchTo[option]
    },
    option
  )) });
}
function StatCard({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[24px] border border-[#eadbcd] bg-[#fffaf6] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.22em] text-[#91705b]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-3xl font-semibold text-[#2f241c]", children: value })
  ] });
}
function DataList({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid gap-4 sm:grid-cols-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[22px] bg-[#faf4ee] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-semibold uppercase tracking-[0.2em] text-[#8f6e57]", children: item.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-2 text-sm leading-6 text-[#382b22]", children: item.value })
  ] }, item.label)) });
}

"use client";
const LocaleContext = reactExports.createContext(null);
function persistGuestLocale(locale) {
  const search = new URLSearchParams({ locale });
  void fetch(`/guest/locale?${search.toString()}`, {
    cache: "no-store",
    credentials: "same-origin",
    keepalive: true
  }).catch(() => void 0);
}
function LocaleProvider({
  children,
  initialLocale
}) {
  const [locale, setLocaleState] = reactExports.useState(initialLocale);
  function setLocale(nextLocale) {
    setLocaleState((currentLocale) => {
      if (currentLocale === nextLocale) {
        return currentLocale;
      }
      persistGuestLocale(nextLocale);
      return nextLocale;
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LocaleContext.Provider, { value: { locale, setLocale }, children });
}
function useLocale() {
  const context = reactExports.useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const dictionary = getDictionary(locale);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: locales.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      className: buttonClassName({
        secondary: option !== locale,
        compact: true
      }),
      "aria-pressed": option === locale,
      onClick: () => setLocale(option),
      children: dictionary.switchTo[option]
    },
    option
  )) });
}

export { Field as F, LocaleContext as L, SurfaceCard as S, LocaleProvider as a, buttonClassName as b, LanguageSwitcher as c, getDictionary as g, inputClassName as i, textAreaClassName as t, useLocale as u };
//# sourceMappingURL=locale-context-VveYLVII.js.map
