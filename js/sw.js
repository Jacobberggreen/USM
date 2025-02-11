self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html' ,
                '/about.html' ,
                '/cookies.html' ,
                '/facilities.html' ,
                '/member.html' ,
                '/policy.html' ,
                '/shop.html' ,
                '/training.html' ,
                '/navbar.html' ,
                '/footer.html' ,

                '../css/styles.css' ,
                '../css/about.css' ,
                '../css/cookies.css' ,
                '../css/facilities.css' ,
                '../css/homepage.css' ,
                '../css/member.css' ,
                '../css/policy.css' ,
                '../css/shop.css' ,
                '../css/training.css' ,

                '../js/script.js' ,
                '../js/about.js' ,
                '../js/app.js' ,
                '../js/facilities.js' ,
                '../js/homepage.js' ,
                '../js/member.js' ,
                '../js/sw.js' ,
                '../js/training.js' ,

                '../js/manifest.json' ,
                '../pictures/fav.png'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
