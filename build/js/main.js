//register serviceWorker
(function() {
    if (!('serviceWorker' in navigator)) {
        return;
    }

    navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
}());
