/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function () {
	    'use strict';

	    var htpasswd = __webpack_require__(1);

	    var pass = document.getElementById('pass');
	    var enc = document.getElementById('pass-enc');

	    document.getElementById('pass-form').addEventListener('submit', encrypt);
	    pass.addEventListener('blur', encrypt);

	    function encrypt(e) {
	        e.preventDefault();

	        enc.value = htpasswd(pass.value);
	        enc.focus();
	        enc.select();
	    }
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var md5 = __webpack_require__(3);

	var itoa64 = Array.from('./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz');

	module.exports = process;

	function stringToArray(s) {
	    return Array.from(s).map(function (char) {
	        return char.charCodeAt();
	    });
	}

	function ap_to64(v, n) {
	    var s = '';

	    while (--n >= 0) {
	        s += itoa64[v & 0x3f];
	        v >>>= 6;
	    }

	    return s;
	}

	function process(password) {
	    var salt = ap_to64(Math.floor(Math.random() * 16777215), 4) + ap_to64(Math.floor(Math.random() * 16777215), 4);
	    var msg = password + '$apr1$' + salt;
	    var temp = md5.rstr(password + salt + password);

	    for (var pl = password.length; pl > 0; pl -= 16) {
	        msg += temp.substr(0, pl > 16 ? 16 : pl);
	    }

	    for (var i = password.length; i != 0; i >>= 1) {
	        if (i & 1) {
	            msg += String.fromCharCode(0);
	        } else {
	            msg += password.charAt(0);
	        }
	    }

	    temp = md5.rstr(msg);

	    var msg2 = void 0;
	    for (var _i = 0; _i < 1000; _i++) {
	        msg2 = '';

	        if (_i & 1) {
	            msg2 += password;
	        } else {
	            msg2 += temp.substr(0, 16);
	        }

	        if (_i % 3) {
	            msg2 += salt;
	        }

	        if (_i % 7) {
	            msg2 += password;
	        }
	        if (_i & 1) {
	            msg2 += temp.substr(0, 16);
	        } else {
	            msg2 += password;
	        }

	        temp = md5.rstr(msg2);
	    }

	    temp = stringToArray(temp);

	    return '$apr1$' + salt + '$' + ap_to64(temp[0] << 16 | temp[6] << 8 | temp[12], 4) + ap_to64(temp[1] << 16 | temp[7] << 8 | temp[13], 4) + ap_to64(temp[2] << 16 | temp[8] << 8 | temp[14], 4) + ap_to64(temp[3] << 16 | temp[9] << 8 | temp[15], 4) + ap_to64(temp[4] << 16 | temp[10] << 8 | temp[5], 4) + ap_to64(temp[11], 2);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	    try {
	        cachedSetTimeout = setTimeout;
	    } catch (e) {
	        cachedSetTimeout = function cachedSetTimeout() {
	            throw new Error('setTimeout is not defined');
	        };
	    }
	    try {
	        cachedClearTimeout = clearTimeout;
	    } catch (e) {
	        cachedClearTimeout = function cachedClearTimeout() {
	            throw new Error('clearTimeout is not defined');
	        };
	    }
	})();
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
	 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
	 * Digest Algorithm, as defined in RFC 1321.
	 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
	 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
	 * Distributed under the BSD License
	 * See http://pajhome.org.uk/crypt/md5 for more info.
	 *
	 * derived from the RSA Data Security, Inc. MD5 Message-Digest Algorithm
	 * removed unused functions and updated to ES2015 were reasonable
	 */

	'use strict';

	module.exports = {
	    rstr: rstr_md5
	};

	/*
	 * Calculate the MD5 of a raw string
	 */
	function rstr_md5(s) {
	    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
	}

	/*
	 * Convert a raw string to an array of little-endian words
	 * Characters >255 have their high-byte silently ignored.
	 */
	function rstr2binl(input) {
	    var output = Array(input.length >> 2).fill(0);

	    for (var i = 0; i < input.length; i++) {
	        var eightfold = i * 8;
	        output[eightfold >> 5] |= (input.charCodeAt(i) & 0xFF) << eightfold % 32;
	    }

	    return output;
	}

	/*
	 * Convert an array of little-endian words to a string
	 */
	function binl2rstr(input) {
	    var output = '';

	    for (var i = 0; i < input.length * 32; i += 8) {
	        output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);
	    }

	    return output;
	}

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length.
	 */
	function binl_md5(x, len) {
	    var a = 1732584193;
	    var b = -271733879;
	    var c = -1732584194;
	    var d = 271733878;

	    /* append padding */
	    x[len >> 5] |= 0x80 << len % 32;
	    x[(len + 64 >>> 9 << 4) + 14] = len;

	    for (var i = 0; i < x.length; i += 16) {
	        var olda = a;
	        var oldb = b;
	        var oldc = c;
	        var oldd = d;

	        a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
	        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
	        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
	        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
	        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
	        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
	        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
	        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
	        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
	        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
	        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
	        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
	        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
	        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
	        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
	        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

	        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
	        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
	        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
	        b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
	        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
	        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
	        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
	        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
	        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
	        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
	        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
	        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
	        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
	        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
	        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
	        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

	        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
	        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
	        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
	        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
	        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
	        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
	        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
	        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
	        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
	        d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
	        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
	        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
	        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
	        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
	        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
	        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

	        a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
	        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
	        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
	        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
	        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
	        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
	        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
	        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
	        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
	        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
	        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
	        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
	        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
	        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
	        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
	        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

	        a = safe_add(a, olda);
	        b = safe_add(b, oldb);
	        c = safe_add(c, oldc);
	        d = safe_add(d, oldd);
	    }

	    return [a, b, c, d];
	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn(q, a, b, x, s, t) {
	    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
	}

	function md5_ff(a, b, c, d, x, s, t) {
	    return md5_cmn(b & c | ~b & d, a, b, x, s, t);
	}

	function md5_gg(a, b, c, d, x, s, t) {
	    return md5_cmn(b & d | c & ~d, a, b, x, s, t);
	}

	function md5_hh(a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
	}

	function md5_ii(a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
	}

	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add(x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);

	    return msw << 16 | lsw & 0xFFFF;
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol(num, cnt) {
	    return num << cnt | num >>> 32 - cnt;
	}

/***/ }
/******/ ]);