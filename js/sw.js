self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '../USM/index.html' ,
                '../USM/about.html' ,
                '../USM/cookies.html' ,
                '../USM/facilities.html' ,
                '../USM/member.html' ,
                '../USM/policy.html' ,
                '../USM/shop.html' ,
                '../USM/training.html' ,
                '../USM/navbar.html' ,
                '../USM/footer.html' ,

                '../USM/css/styles.css' ,
                '../USM/css/about.css' ,
                '../USM/css/cookies.css' ,
                '../USM/css/facilities.css' ,
                '../USM/css/homepage.css' ,
                '../USM/css/member.css' ,
                '../USM/css/policy.css' ,
                '../USM/css/shop.css' ,
                '../USM/css/training.css' ,

                '../USM/js/script.js' ,
                '../USM/js/about.js' ,
                '../USM/js/app.js' ,
                '../USM/js/facilities.js' ,
                '../USM/js/homepage.js' ,
                '../USM/js/member.js' ,
                '../USM/js/sw.js' ,
                '../USM/js/training.js' ,
                '../USM/js/manifest.json' ,

                '../USM/pictures/fav.png'
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
