!function(){var a=["/","/css/main.css","/js/main.js"],b="v1";this.addEventListener("install",function(c){c.waitUntil(caches.open(b).then(function(b){return b.addAll(a)}))}),this.addEventListener("fetch",function(a){a.respondWith(fetch(a.request)["catch"](function(){return caches.match(a.request)}))})}();