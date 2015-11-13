(function() {
    var offline = [ '/', '/css/main.css', '/js/main.js' ];
    var version = 'v1';

    this.addEventListener('install', function(e) {
        e.waitUntil(
            caches
            .open(version)
            .then(function(cache) {
                return cache.addAll(offline);
            })
        );
    });

    this.addEventListener('fetch', function(e) {
        e.respondWith(
            fetch(e.request)
            .catch(function() {
                return caches.match(e.request);
            })
        );
    });
}());
