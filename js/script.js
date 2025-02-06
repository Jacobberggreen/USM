document.addEventListener("DOMContentLoaded", function () {

    // -------------- Load navbar and initialize event-listeners----------------
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            setupLoginMenu(); // Kör funktionen för att fixa login-popup
        })
        .catch(error => console.error("Fel vid laddning av navbar:", error));

    // -------------- Hamburger Meny----------------
    setTimeout(() => { // Vänta en liten stund för att vara säker på att navbaren har laddats in
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");

        if (menuToggle && navMenu) {
            menuToggle.addEventListener("click", function () {
                navMenu.classList.toggle("active");
            });
        } else {
            console.error("Element saknas: Kontrollera att #menu-toggle och #nav-menu finns i HTML.");
        }

        // Stäng menyn om man klickar utanför den
        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
            }
        });

    }, 500); // Vänta 500ms för att säkerställa att HTML har laddats


    // -------------- Nav Scroll ----------------
    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        const menuToggle = document.getElementById("menu-toggle");
        const navMenu = document.getElementById("nav-menu");
        const logoImg = document.getElementById("logo-img");
        const isHomePage = document.body.id === "home"; // Kolla om vi är på startsidan

        function updateLogo() {
            if (isHomePage && window.scrollY === 0) {
                logoImg.src = "../pictures/logo_white.png"; // Genomskinlig navbar → Ljus logga
            } else {
                logoImg.src = "../pictures/logo.png"; // Skrollad navbar → Mörk logga
            }
        }

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            updateLogo();
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY === 0) {
            navMenu.classList.remove("active");
        }

        updateLogo();
    });


    // -------------- Update Logo ----------------
    function updateLogo() {
        if (navbar.classList.contains("white")) {
            logoImg.src = "../pictures/logo-dark.png"; // Byt till mörk logga
        } else {
            logoImg.src = "../pictures/logo-light.png"; // Byt till ljus logga
        }
    }


    // -------------- Load Footer ----------------
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Fel vid laddning av footer:", error));

    // Funktion som sätter upp login-menyn
    function setupLoginMenu() {
        const loginLink = document.querySelector(".login-link");
        const loginDropdown = document.getElementById("login-dropdown");
        const closeBtn = document.querySelector(".close-btn");

        if (loginLink && loginDropdown && closeBtn) {
            // Öppna login-popup vid klick på "Logga In"
            loginLink.addEventListener("click", function (event) {
                event.preventDefault();
                loginDropdown.style.display = "flex";
            });

            // Stäng popup när man klickar på "X"
            closeBtn.addEventListener("click", function () {
                loginDropdown.style.display = "none";
            });

            // Stäng popup om man klickar utanför rutan
            window.addEventListener("click", function (event) {
                if (event.target === loginDropdown) {
                    loginDropdown.style.display = "none";
                }
            });
        } else {
            console.warn("Login-element hittades inte vid navbar-laddning.");
        }
    }


    // --------------Login----------------
    const loginLink = document.querySelector(".login-link");
    const loginDropdown = document.getElementById("login-dropdown");
    const closeBtn = document.querySelector(".close-btn");

    // Öppna login-popup vid klick på "Logga In"
    loginLink.addEventListener("click", function (event) {
        event.preventDefault();
        loginDropdown.style.display = "flex";
    });

    // Stäng popup när man klickar på "X"
    closeBtn.addEventListener("click", function () {
        loginDropdown.style.display = "none";
    });

    // Stäng popup om man klickar utanför rutan
    window.addEventListener("click", function (event) {
        if (event.target === loginDropdown) {
            loginDropdown.style.display = "none";
        }
    });


    // --------------link centered----------------
    function scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const elementTop = targetElement.getBoundingClientRect().top + window.scrollY;
            const windowHeight = window.innerHeight;
            const elementHeight = targetElement.offsetHeight;

            const scrollToPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

            window.scrollTo({
                top: scrollToPosition,
                behavior: "smooth"
            });
        }
    }

    // Hantera klick på länkar med hash (#)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            scrollToSection(targetId);
        });
    });

    // Om sidan laddas med en hash (ex: example.com#utopia), centrera sektionen direkt
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        setTimeout(() => scrollToSection(targetId), 100); // Försening för att säkerställa att sidan är laddad
    }


});
