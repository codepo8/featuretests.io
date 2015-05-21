(function UMD(name,context,definition) {
	if (typeof module != "undefined" && module.exports) module.exports = definition(name,context);
	else if (typeof define == "function" && define.amd) define(definition);
	else context[name] = definition(name,context);
})("Tmpls",typeof global != "undefined" ? global : this,function definition(name,context) {
	"use strict";

	function init() {
		(function(G){var partial = G.definePartial, clone = G.cloneObj, extend = G.extend, cID = "/about.html";extend(cID,"/master.html");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n\n<div id=\"content\">\n\n	<h1 id=\"about\">About</h1>\n	<p>\n		ES6+ Feature Tests as a service.\n	</p>\n	<p>\n		<strong>It's easy!</strong> Load the <code>\"rs.js\"</code> library, request feature test results for the current browser, use those results to determine what code to deliver for your application!\n	</p>\n	<p>\n		If all the JavaScript features/syntax your code uses are supported natively by the browser, why would you load up the ugly transpiled code? Why would you load dozens of kb of polyfills/shims if all (or most of) those APIs are already built-in?\n	</p>\n	<p>\n		Just use the original authored ES6+ code in newest browsers! Only use transpiled code and polyfills/shims for browsers which are missing the features/syntax you need.\n	</p>\n	<p>\n		Don't rely on stale <em>caniuse</em> data baked into build tools that matches a browser based on brittle <code>UserAgent</code> string parsing. <strong>Feature Test!</strong> That's the most reliable and sensible approach.\n	</p>\n\n	<h2 id=\"privacy\">Privacy</h2>\n\n	<p>\n		There is absolutely no data collection of any kind performed by this service (not even cookies). The only persistent information is the <code>LocalStorage</code> caching of test results in each user's browser, which can be <a href=\"/details#disableLocalCache\">disabled via the library's API</a>. These test results are not collected or monitored by the service in any way.\n	</p>\n\n	<h2 id=\"license-copyright\">License &amp; Copyright</h2>\n\n	<p>\n		The code and all the documentation are released under the MIT license.\n	</p>\n	<p>\n		<a href=\"http://getify.mit-license.org/\" data-ignore>http://getify.mit-license.org/</a>\n	</p>\n\n</div>\n\n";return ret;},"/about.html#content");})(this.grips||grips);(function(G){var partial = G.definePartial, clone = G.cloneObj, extend = G.extend, cID = "/details.html";extend(cID,"/master.html");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n\n<div id=\"content\">\n\n	<p>\n		<strong>jump to:</strong>\n	</p>\n\n	<ul>\n		<li><a href=\"#overview\" data-ignore>Overview</a></li>\n		<li><a href=\"#library\" data-ignore>Library</a></li>\n		<li><a href=\"#implementation-details\" data-ignore>Implementation Details</a></li>\n		<li><a href=\"#node-iojs\" data-ignore>Node/iojs</a></li>\n		<li><a href=\"#test-results\" data-ignore>Test Results</a></li>\n		<li><a href=\"#api\" data-ignore>API</a></li>\n	</ul>\n\n	<h1 id=\"overview\">Overview</h1>\n\n	<p>\n		This service can be used either as a JS library (<code>\"rs.js\"</code>) loaded into a page, as a Node/iojs package, or via an API call (cross-domain CORS Ajax enabled) to retrieve the tests that you can perform yourself.\n	</p>\n	<p>\n		The <code>\"rs.js\"</code> library uses a number of tricks to reduce the performance penalty overhead of running these tests in the browser. It runs them <em>off-thread</em> if possible, and caches the results for up to 2 weeks, meaning the tests aren't unnecessarily repeated.\n	</p>\n	<p>\n		Also, cached test results are accessible across all sites using this service, further reducing the chances that a user will actually see any delay waiting for test results for any site that uses the service.\n	</p>\n\n	<h2 id=\"library\">Library</h2>\n\n	<p>\n		The entry point for using this service is to load the <code>https://featuretests.io/rs.js</code> library script into the page. You should probably load it as early as possible in your load process, so that the tests can be done behind the scenes and be ready when you need them.\n	</p>\n	<p>\n		The library provides a function to call to request the tests -- if they haven't already been performed (they probably have, more on that later!) -- and retrieve the test results. That call looks like:\n	</p>\n\n<pre class=\"examplecode\">\nwindow[\"Reflect.supports\"]( \"all\", function(results,ts){<br>\n&nbsp;&nbsp;&nbsp;// ..<br>\n});<br>\n</pre>\n\n	<p>\n		<strong>Note:</strong> Rather than adding a method called <code>supports(..)</code> to the <code>Reflect</code> global (added in ES6), this library (for now) adds a global property called <code>\"Reflect.supports\"</code>. This should be safer and more future-proof. The hope is an API of this sort may eventually come to the actual <code>Reflect.supports</code> location.\n	<p>\n	<p>\n		The <code>\"all\"</code> parameter value performs the entire set of tests for ES6+ features/syntax. Right now, this is the only allowed value, but in the future you may be able to perform subsets of the test suite, or even individual tests.\n	</p>\n	<p>\n		The <code>results</code> value returned to your callback is an object, with each property corresponding to a test, and the <code>true</code> or <code>false</code> values to indicate if the feature/syntax is supported in the browser.\n	</p>\n	<p>\n		The <code>ts</code> argument is the timestamp (in GMT) when the last results were cached, or <em>right now</em> if not available (or too out of date). Results are good for up to two weeks from the moment the test is run.\n	</p>\n	<p>\n		Check out <a href=\"/mybrowser\">your full browser results</a> or try the above snippet in your developer console to see the current results for your browser!\n	</p>\n\n	<h3 id=\"implementation-details\">Implementation Details</h3>\n\n	</p>\n		The <code>\"rs.js\"</code> library checks to see if the tests have already been run recently (cached in <code>LocalStorage</code>). If so, and not past the results' expiration date (2 weeks), the results are immediately available to you with no further action.\n	</p>\n	<p>\n		If the results haven't been cached, or if they're too old, the library loads an invisible cross-domain <code>&lt;iframe></code> from this <code>https://featuretests.io</code> origin, and loads the test library to perform the tests. The test library also checks to see if the results have been recently <code>LocalStorage</code> cached on the <code>featuretests.io</code> origin (so globally across all sites that use this service!), and if so, uses those cached results.\n	</p>\n	<p id=\"content-security-policy\">\n		<strong>Warning:</strong><br>\n		One important but subtle requirement of your usage of this service is that you will have to allow your site to load and use a cross-domain <code>&lt;iframe></code>. By default, most sites do support this. However, your site may have a more restrictive <a href=\"https://developer.mozilla.org/en-US/docs/Web/Security/CSP\">CSP (content security policy)</a> in effect that disallows these.\n	</p>\n	<p>\n		So, if the service isn't working due to your CSP (you'll see CSP errors in your console!), you'll need to specify a <a href=\"https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives#child-src\"><code>child-src</code></a> policy that at a minimum allows the \"https://featuretests.io\" origin. Here's what that CSP response header may look like:\n	</p>\n<pre class=\"examplecode\">\nContent-Security-Policy:<br>\ndefault-src 'self'; script-src 'self' https://featuretests.io; child-src 'self' https://featuretests.io;\n</pre>\n	<p>\n		If valid/recent test results cannot be loaded from the <code>LocalStorage</code> cache, the <code>&lt;iframe></code> code spins up a test session.\n	</p>\n	<p>\n		It first attempts to run the tests in a <code>SharedWorker</code>, which can be shared by multiple tabs if they're all using this service's library. If <code>SharedWorker</code>s are not available, a normal dedicated Web Worker is attempted. In either case, this performs the tests <em>off-thread</em> to reduce any performance penalty.\n	</p>\n	<p>\n		If neither kind of Web Worker can be used, the tests are performed directly in the <code>&lt;iframe></code>.\n	</p>\n	<p id=\"disableLocalCache\">\n		As mentioned, by default results are cached for 2 weeks using <code>LocalStorage</code>, both on the <code>featuretests.io</code> origin (so globally accessible to any site via the <code>&lt;iframe></code>), as well as on your site's <code>LocalStorage</code> origin. To disable the <code>LocalStorage</code> caching (for this page session only):\n	</p>\n\n<pre class=\"examplecode\">\nwindow[\"Reflect.supports\"].disableLocalCache();<br>\n</pre>\n\n	<p>\n		To just clear the local site's cache (not the global one on the \"https://featuretests.io\" origin) but not disable the caching of results, use:\n	</p>\n\n<pre class=\"examplecode\">\nwindow[\"Reflect.supports\"].clearLocalSiteCache();<br>\n</pre>\n\n	<h3 id=\"node-iojs\">Node/iojs</h3>\n\n	<p>\n		The library can also be loaded and used in Node/ioJS:\n	</p>\n\n<pre class=\"examplecode\">\nvar ReflectSupports = require(\"es-feature-tests\");<br>\n<br>\nReflectSupports( \"all\", function(results){<br>\n&nbsp;&nbsp;&nbsp;// ..<br>\n});<br>\n</pre>\n\n	<p>\n		<strong>Note:</strong> Obviously, usage in Node/iojs doesn't use any of the <code>LocalStorage</code> caching or the <code>Worker</code> <em>off-thread</em> processing.\n	</p>\n\n	<h3 id=\"test-results\">Test Results</h3>\n\n	<p>\n		The following test results are provided by the library:\n	</p>\n\n	<p>\n		<strong>Everything:</strong>\n	</p>\n	<ul>\n		<li><code>everything</code>: Only <code>true</code> if all tests passed, <code>false</code> otherwise</li>\n	</ul>\n\n	<p>\n		<strong>Syntax:</strong>\n	</p>\n	<ul>\n		<li><code>letConst</code>: <code>let</code> and <code>const</code></li>\n		<li><code>defaultParameter</code>: default function parameter values</li>\n		<li><code>spreadRest</code>: <code>...</code> operator</li>\n		<li><code>destructuring</code>: destructuring assignments/declarations for arrays and objects</li>\n		<li><code>parameterDestructuring</code>: destructuring for function parameters</li>\n		<li><code>templateString</code>: <code>`..`</code> Template String Literals</li>\n		<li><code>forOf</code>: <code>for (var v of something) { .. }</code></li>\n		<li><code>arrow</code>: <code>x => x * x</code></li>\n		<li><code>generator</code>: <code>function *foo() { .. }</code></li>\n		<li><code>conciseMethodProperty</code>: <code>o = { b() { .. }, a }</code></li>\n		<li><code>computedProperty</code>: <code>o = { [\"a\" + \"b\"]: 42 }</code></li>\n		<li><code>moduleExport</code>: In modules, <code>export default foo = 42</code></li>\n		<li><code>moduleImport</code>: In modules, <code>import bar from \"foo\"</code></li>\n		<li><code>\"class\"</code> (alias: <code>classes</code>): <code>class A extends B { .. }</code></li>\n		<li><code>numericLiteral</code>: Octal and binary literal forms (<code>0o1, 0b10</code>)</li>\n		<li><code>oldOctalLiteral</code>: Old octal literal invalid now (<code>01</code>)</li>\n		<li><code>symbol</code>: <code>Symbol</code> primitive</li>\n		<li><code>unicodeEscape</code>: Unicode code-point escape form in string literals (<code>'\\u{20BB7}'</code>)</li>\n		<li><code>unicodeIdentifier</code>: Unicode code-point escape form in identifier names (<code>\\u{20BB7} = 42</code>)</li>\n		<li><code>unicodeRegExp</code>: Unicode code-point escape form in regular expressions (<code>/\\u{20BB7}/u</code>)</li>\n		<li><code>stickyRegExp</code>: <code>y</code> flag for sticky regular expressions</li>\n	</ul>\n\n	<p>\n		<strong>Semantics:</strong>\n	</p>\n\n	<ul>\n		<li><code>letTDZ</code>: TDZ error for too-early access of <code>let</code> or <code>const</code> declarations</li>\n		<li><code>constRedef</code>: Redefinition of <code>const</code> declarations not allowed</li>\n		<li><code>objectProto</code>: <code>__proto__</code> in object literal definition sets <code>[[Prototype]]</code> link</li>\n		<li><code>objectSuper</code>: <code>super</code> allowed in object methods</li>\n		<li><code>extendNatives</code>: <code>class ABC extends Array { .. }</code></li>\n		<li><code>TCO</code>: Tail-call optimization for function calls and recursion</li>\n		<li><code>symbolImplicitCoercion</code>: Symbols can't be implicitly coerced (<code>Symbol(\"a\") + \"\"</code>)</li>\n		<li><code>functionNameInfernece</code>: Inferences for function <code>name</code> property for anonymous functions</li>\n	</ul>\n\n	<p>\n		<strong>Built-in APIs:</strong>\n	</p>\n\n	<ul>\n		<li><code>ObjectStatics</code>: Static functions added to <code>Object</code></li>\n		<li><code>ArrayStatics</code>: Static functions added to <code>Array</code></li>\n		<li><code>ArrayMethods</code>: Methods added to <code>Array.prototype</code></li>\n		<li><code>TypedArrays</code>: TypedArrays like <code>Uint8Array</code> (technically a web platform feature long before ES6)</li>\n		<li><code>TypedArrayStatics</code>: Some <code>Array</code> statics (like <code>from(..)</code>) added to the TypedArray constructors</li>\n		<li><code>TypedArrayMethods</code>: Some <code>Array</code> methods (like <code>map(..)</code>) added to the TypedArray prototypes</li>\n		<li><code>StringMethods</code>: Methods added to <code>String.prototype</code></li>\n		<li><code>NumberStatics</code>: Static functions added to <code>Number</code></li>\n		<li><code>MathStatics</code>: Static functions added to <code>Math</code></li>\n		<li><code>collections</code>: Collections added (<code>Map</code>, <code>Set</code>, <code>WeakMap</code>, <code>WeakSet</code>)</li>\n		<li><code>Proxy</code>: Proxies</li>\n		<li><code>Promise</code>: Promises</li>\n	</ul>\n	<p>\n		<strong>Note:</strong> More tests will be added soon. Check back often.\n	</p>\n\n	<h2 id=\"api\">API</h2>\n\n	<p>\n		You can use the library's <code>api(..)</code> method to retrieve the tests so that you can run them yourself (<code>new Function(..)</code> or <code>eval(..)</code>) if desired:\n	</p>\n\n<pre class=\"examplecode\">\nwindow[\"Reflect.supports\"].api( \"all\", function(tests){<br>\n&nbsp;&nbsp;&nbsp;// ..<br>\n});<br>\n</pre>\n\n	<p>\n		The <code>tests</code> object returned will include keys for all the above mentioned tests, where each value is an object with one of the following properties:\n	</p>\n\n	<ul>\n		<li><code>passes</code>: the test string provided should pass a compilation</li>\n		<li><code>fails</code>: the test string provided should fail a compilation</li>\n		<li><code>is</code>: the test string provided should return <code>true</code> when executed</li>\n		<li><code>not</code>: the test string provided should return <code>false</code> when executed</li>\n	</ul>\n\n	<p>\n		Some tests also include a <code>dependencies</code> array which includes the names of other tests that also must be <code>true</code>.\n	</p>\n	<p>\n		You can also perform an API call to the service itself, without using the libary, at the following URL:\n	</p>\n	<p>\n		<code>https://featuretests.io/api</code>\n	</p>\n	<p>\n		Right now, the API assumes you want all test values back, so there's no options to control the API call. This will probably be more granular in the future. Check back soon.\n	</p>\n	<p>\n		The return from the API call is a JSON object with all the tests, identical to the format received from the library's <code>api(..)</code> call as explained above.\n	</p>\n	<p>\n		The API URL endpoint is CORS enabled, meaning you can make a cross-domain Ajax request to retrieve the test results into a browser. Or you can query the API URL endpoint from your server, and combine the test results into your site's code.\n	</p>\n\n</div>\n\n";return ret;},"/details.html#content");})(this.grips||grips);(function(G){function __sort_fn__(a,b){ return a-b; }var partial = G.definePartial, clone = G.cloneObj, extend = G.extend, unerr = new Error("Unknown error"), RLH = G.RangeLiteralHash, cID = "/index.html";extend(cID,"/master.html");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n\n<div id=\"content\">\n\n	<h1>ES Feature Tests</h1>\n	<p>\n		Feature test ES6+ JavaScript syntax and APIs. Use these in-browser test results to deliver the best code to each browser.\n	</p>\n	<p>\n		<strong>Load your native ES6+ code in ES6+ compliant browsers</strong> and your transpiled code in older browsers.\n	</p>\n	<p>\n		";ret2 = $;ret2 = G.render("#examplecode",ret2,$$);ret += ret2;ret += "\n	</p>\n	<p>\n		<strong>Note:</strong> The use of the inline <code>&lt;script></code> tag here is for illustration purposes only. Don't actually do this in your HTML. Use a script. For more information, see the <a href=\"http://davidwalsh.name/es6-features-testing#the-solution\">discussion of \"bootstrappers\" here</a> in the <a href=\"http://davidwalsh.name/es6-features-testing\">ES6: Features By Testing</a> blog post.\n	</p>\n\n</div>\n\n";return ret;},"/index.html#content");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;$$.results =$.test_results ? "#testresults" : "#pendingresults";ret += "\n<pre class=\"examplecode\" rel=\"js-examplecode\">\n&lt;script src=\"https://featuretests.io/rs.js\">&lt;/script><br>\n&lt;script><br>\nwindow[\"Reflect.supports\"]( \"all\", function(tests){<br>\n&nbsp;&nbsp;&nbsp;console.log( tests );<br>\n";ret2 = $;ret2 = G.render($$.results,ret2,$$);ret += ret2;ret += "\n});<br>\n&lt;/script><br>\n</pre>\n";return ret;},"/index.html#examplecode");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "&nbsp;&nbsp;&nbsp;// ..<br>";return ret;},"/index.html#pendingresults");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	";ret2 = (function(){function __iter__($,$$,value,key,index){var i, ret = "", ret2, _;if (value == null) return ret;$$ = clone($$);_ = {value: value,key: key,index: index,even: (index % 2) === 0,odd: (index % 2) === 1,first: (index === 0),last: (index === len - 1)};ret += "\n&nbsp;&nbsp;&nbsp;// ";ret += _.value;ret += "<br>\n	";return ret;}var i, j = 0, len, ret = "", it, tmp;it = $.test_results;if (it == null) {return "";}if (Array.isArray(it)) {len = it.length;for (i=0; i<len; i++) {ret2 = __iter__($,$$,it[i],""+i,i);ret += ret2;}} else if (typeof it === "object") {tmp = Object.keys(it);len = tmp.length;if (it instanceof RLH) {tmp.sort(__sort_fn__);}for (i=0; i<len; i++) {ret2 = __iter__($,$$,it[tmp[i]],tmp[i],i);ret += ret2;}} else {return unerr;}return ret;})();ret += ret2;ret += "\n";return ret;},"/index.html#testresults");})(this.grips||grips);(function(G){var partial = G.definePartial, clone = G.cloneObj;partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;$$.title =$.page_title ? $.page_title : "ES Feature Tests";$$.loadJSFile =$.PROD ? "load.min.js" : "load.js";ret += "\n\n<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\">\n<meta name=viewport content=\"width=device-width, initial-scale=1\">\n<title>";ret += $$.title;ret += "</title>\n<link rel=\"stylesheet\" href=\"/css/site.css\">\n</head>\n<body>\n\n<div id=\"notifications\"><div class=\"list\"></div><div class=\"close\">X</div></div>\n\n";ret2 = $;ret2 = G.render("#nav",ret2,$$);ret += ret2;ret += "\n\n";ret2 = $;ret2 = G.render("#content",ret2,$$);ret += ret2;ret += "\n\n<script src=\"/js/";ret += $$.loadJSFile;ret += "\"></script>\n\n</body>\n</html>\n\n";return ret;},"/master.html#page");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	<nav><a href=\"/\">home</a> | <a href=\"/about\">about</a> | <a href=\"/details\">details</a> | <a href=\"https://github.com/getify/es-feature-tests\" data-ignore>github</a> | <a href=\"/mybrowser\">test my browser</a></nav>\n";return ret;},"/master.html#nav");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;return ret;},"/master.html#content");})(this.grips||grips);(function(G){function __sort_fn__(a,b){ return a-b; }var partial = G.definePartial, clone = G.cloneObj, extend = G.extend, unerr = new Error("Unknown error"), RLH = G.RangeLiteralHash, cID = "/mybrowser.html";extend(cID,"/master.html");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;$$.last_tested =$.timestamp ? "#test_date" : "#no_test";ret += "\n\n<div id=\"content\">\n\n	<h1>Test My Browser</h1>\n	<p>\n		What ES6+ features does your browser support?\n	</p>\n	<p>\n		<input type=\"button\" value=\"run all tests\" rel=\"js-test-btn\">\n	</p>\n	<p>\n		";ret2 = $;ret2 = G.render($$.last_tested,ret2,$$);ret += ret2;ret += "\n		";ret2 = $;ret2 = G.render("#test_results",ret2,$$);ret += ret2;ret += "\n	</p>\n\n</div>\n\n";return ret;},"/mybrowser.html#content");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	<div rel=\"js-test-date\">No test results available yet...</div>\n";return ret;},"/mybrowser.html#no_test");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	<div rel=\"js-test-date\">Last Tested: <strong>";ret += $.timestamp;ret += "</strong></div>\n";return ret;},"/mybrowser.html#test_date");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;$$.results =$.test_results ? "#results" : "#pendingresults";ret += "\n<pre class=\"examplecode mybrowserresults\" rel=\"js-test-results\">\n{<br>\n";ret2 = $;ret2 = G.render($$.results,ret2,$$);ret += ret2;ret += "\n}<br>\n</pre>\n";return ret;},"/mybrowser.html#test_results");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "&nbsp;&nbsp;&nbsp;// ..<br>";return ret;},"/mybrowser.html#pendingresults");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	";ret2 = (function(){function __iter__($,$$,value,key,index){var i, ret = "", ret2, _;if (value == null) return ret;$$ = clone($$);_ = {value: value,key: key,index: index,even: (index % 2) === 0,odd: (index % 2) === 1,first: (index === 0),last: (index === len - 1)};ret += "\n";ret += _.value;ret += "<br>\n	";return ret;}var i, j = 0, len, ret = "", it, tmp;it = $.test_results;if (it == null) {return "";}if (Array.isArray(it)) {len = it.length;for (i=0; i<len; i++) {ret2 = __iter__($,$$,it[i],""+i,i);ret += ret2;}} else if (typeof it === "object") {tmp = Object.keys(it);len = tmp.length;if (it instanceof RLH) {tmp.sort(__sort_fn__);}for (i=0; i<len; i++) {ret2 = __iter__($,$$,it[tmp[i]],tmp[i],i);ret += ret2;}} else {return unerr;}return ret;})();ret += ret2;ret += "\n";return ret;},"/mybrowser.html#results");})(this.grips||grips);(function(G){var partial = G.definePartial, clone = G.cloneObj;partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "*, *:before, *:after {";ret2 = $;ret2 = G.render("#KiwgKjpiZWZvcmUsICo6YWZ0ZXI=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#KiwgKjpiZWZvcmUsICo6YWZ0ZXI=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n";return ret;},"/site.css#KiwgKjpiZWZvcmUsICo6YWZ0ZXI=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "html, body {";ret2 = $;ret2 = G.render("#aHRtbCwgYm9keQ==_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#aHRtbCwgYm9keQ==");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	padding: 0px;\n	margin: 0px;\n";return ret;},"/site.css#aHRtbCwgYm9keQ==_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "html, body, input[type=text], input[type=password],\ninput[type=checkbox], input[type=radio], textarea {";ret2 = $;ret2 = G.render("#aHRtbCwgYm9keSwgaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sCmlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPXJhZGlvXSwgdGV4dGFyZWE=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#aHRtbCwgYm9keSwgaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sCmlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPXJhZGlvXSwgdGV4dGFyZWE=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	font-size: 19px;\n	line-height: 29px;\n	font-family: Tahoma, sans-serif;\n	background-color: ";ret += $$.mainBGColor;ret += ";\n	color: ";ret += $$.mainTextColor;ret += ";\n	letter-spacing: 2px;\n	border: none;\n";return ret;},"/site.css#aHRtbCwgYm9keSwgaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sCmlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPXJhZGlvXSwgdGV4dGFyZWE=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "input[type=text], input[type=password], textarea {";ret2 = $;ret2 = G.render("#aW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIHRleHRhcmVh_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#aW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIHRleHRhcmVh");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	border: 2px solid ";ret += $$.mainTextColor;ret += ";\n";return ret;},"/site.css#aW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIHRleHRhcmVh_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#content {";ret2 = $;ret2 = G.render("#I2NvbnRlbnQ=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I2NvbnRlbnQ=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	padding: 25px;\n";return ret;},"/site.css#I2NvbnRlbnQ=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "nav {";ret2 = $;ret2 = G.render("#bmF2_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#bmF2");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	padding: 0px 10px;\n	background-color: ";ret += $$.navBGColor;ret += ";\n	color: ";ret += $$.navTextColor;ret += ";\n	width: 100%;\n	height: 60px;\n	line-height: 60px;\n	font-size: 20px;\n	font-weight: bold;\n";return ret;},"/site.css#bmF2_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "nav a {";ret2 = $;ret2 = G.render("#bmF2IGE=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#bmF2IGE=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	color: ";ret += $$.navTextColor;ret += ";\n	text-decoration: none;\n";return ret;},"/site.css#bmF2IGE=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#notifications {";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnM=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I25vdGlmaWNhdGlvbnM=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	display: none;\n	position: fixed;\n	top: 5px;\n	right: 10px;\n	width: 300px;\n	background-color: ";ret += $$.notificationsBGColor;ret += ";\n	color: ";ret += $$.notificationsTextColor;ret += ";\n	border: 2px solid ";ret += $$.notificationsBorderColor;ret += ";\n	padding: 10px;\n";return ret;},"/site.css#I25vdGlmaWNhdGlvbnM=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#notifications .list {";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3Q=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3Q=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	min-height: 20px;\n	max-height: 100px;\n	overflow: scroll;\n";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3Q=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#notifications .close {";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmNsb3Nl_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmNsb3Nl");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	position: absolute;\n	right: -5px;\n	top: -5px;\n	background-color: ";ret += $$.notificationsBGColor;ret += ";\n	color: ";ret += $$.notificationsTextColor;ret += ";\n	border: 2px solid ";ret += $$.notificationsBorderColor;ret += ";\n	font-size: 12px;\n	line-height: 20px;\n	width: 20px;\n	font-weight: bold;\n	text-align: center;\n	letter-spacing: 0px;\n	cursor: pointer;\n";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmNsb3Nl_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#notifications .list .notification {";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbg==_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbg==");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	padding-bottom: 10px;\n	margin-bottom: 10px;\n	border-bottom: 1px solid ";ret += $$.notificationsTextColor;ret += ";\n";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbg==_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "#notifications .list .notification:last-child {";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbjpsYXN0LWNoaWxk_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbjpsYXN0LWNoaWxk");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	padding-bottom: 0px;\n	margin-bottom: 0px;\n	border-bottom: none;\n";return ret;},"/site.css#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbjpsYXN0LWNoaWxk_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += ".examplecode {";ret2 = $;ret2 = G.render("#LmV4YW1wbGVjb2Rl_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#LmV4YW1wbGVjb2Rl");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	max-width: 100%;\n	overflow: scroll;\n	display: inline-block;\n	background-color: ";ret += $$.exampleCodeBGColor;ret += ";\n	padding: 15px;\n	border: 1px solid ";ret += $$.exampleCodeBorderColor;ret += ";\n	color: ";ret += $$.exampleCodeTextColor;ret += ";\n	font-size: 20px;\n	white-space: nowrap;\n";return ret;},"/site.css#LmV4YW1wbGVjb2Rl_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += ".mybrowserresults {";ret2 = $;ret2 = G.render("#Lm15YnJvd3NlcnJlc3VsdHM=_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#Lm15YnJvd3NlcnJlc3VsdHM=");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	min-width: 350px;\n";return ret;},"/site.css#Lm15YnJvd3NlcnJlc3VsdHM=_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "code {";ret2 = $;ret2 = G.render("#Y29kZQ==_",ret2,$$);ret += ret2;ret += "}";return ret;},"/site.css#Y29kZQ==");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret += "\n	display: inline;\n	background-color: ";ret += $$.exampleCodeBGColor;ret += ";\n	color: ";ret += $$.exampleCodeTextColor;ret += ";\n	padding: 2px;\n	font-family: monospace;\n";return ret;},"/site.css#Y29kZQ==_");partial(function($,$$){$$ = clone($$) || {};var i, ret = "", ret2, _;ret2 = $;ret2 = G.render("#KiwgKjpiZWZvcmUsICo6YWZ0ZXI=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#aHRtbCwgYm9keQ==",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#aHRtbCwgYm9keSwgaW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sCmlucHV0W3R5cGU9Y2hlY2tib3hdLCBpbnB1dFt0eXBlPXJhZGlvXSwgdGV4dGFyZWE=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#aW5wdXRbdHlwZT10ZXh0XSwgaW5wdXRbdHlwZT1wYXNzd29yZF0sIHRleHRhcmVh",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I2NvbnRlbnQ=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#bmF2",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#bmF2IGE=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnM=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3Q=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmNsb3Nl",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbg==",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#I25vdGlmaWNhdGlvbnMgLmxpc3QgLm5vdGlmaWNhdGlvbjpsYXN0LWNoaWxk",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#LmV4YW1wbGVjb2Rl",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#Lm15YnJvd3NlcnJlc3VsdHM=",ret2,$$);ret += ret2;ret += "\n\n\n";ret2 = $;ret2 = G.render("#Y29kZQ==",ret2,$$);ret += ret2;ret += "\n\n";return ret;},"/site.css#all");})(this.grips||grips);
	}

	if (context.Events) {
		// hybrid event bindings
		context.Events.once(name,init);
	}

	var grips = context.grips;

	// module API
	var public_api = {
		init: init
	};

	return public_api;
});
