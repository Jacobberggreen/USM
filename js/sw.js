self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/',
                '../pages/index.html' ,
                '../pages/about.html' ,
                '../pages/cookies.html' ,
                '../pages/facilities.html' ,
                '../pages/member.html' ,
                '../pages/policy.html' ,
                '../pages/shop.html' ,
                '../pages/training.html' ,
                '../pages/navbar.html' ,
                '../pages/footer.html' ,

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
