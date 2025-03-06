document.addEventListener("DOMContentLoaded", function () {
    // -------------- Load navbar----------------
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-placeholder").innerHTML = data;
            setupLoginMenu();
            setupSearchBox()
            setupScrollToTop();
            animatedElements()
            gymWeight()
        })
        .catch(error => console.error("Fel vid laddning av navbar:", error));

    // -------------- Hamburger Meny----------------
    setTimeout(() => {
        const hamburger = document.getElementById("hamburger");
        const navMenu = document.getElementById("nav-menu");
        const navItems = document.querySelectorAll("nav ul li");

        if (hamburger && navMenu) {
            // Kolla om hamburgermenyn används (t.ex. vid mobil-läge)
            function isMobileMenu() {
                return window.getComputedStyle(hamburger).display !== "none"; // Kollar om hamburgaren är synlig
            }

            // Endast om vi är i mobil-läge, göm alla li från början
            if (isMobileMenu()) {
                navItems.forEach((item) => {
                    item.style.opacity = "0";
                    item.style.transform = "translateX(50px)";
                });
            }

            hamburger.addEventListener("click", function () {
                hamburger.classList.toggle("active");
                navMenu.classList.toggle("active");

                if (navMenu.classList.contains("active")) {
                    navItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "translateX(0)";
                            item.style.transition = "opacity 0.3s ease-out, transform 0.3s ease-out";
                        }, 150 + index * 150);
                    });
                } else {
                    // Om menyn stängs, resetta animationen (endast om det är mobil-läge)
                    if (isMobileMenu()) {
                        navItems.forEach((item) => {
                            item.style.opacity = "0";
                            item.style.transform = "translateX(50px)";
                        });
                    }
                }
            });

            // Lyssna på fönsterstorlek för att fixa eventuella problem vid resize
            window.addEventListener("resize", () => {
                if (!isMobileMenu()) {
                    // Om vi byter till desktop-läge, återställ alla li till normalläge
                    navItems.forEach((item) => {
                        item.style.opacity = "1";
                        item.style.transform = "translateX(0)";
                    });
                }
            });
        } else {
            console.error("Element saknas: Kontrollera att #hamburger och #nav-menu finns i HTML.");
        }
    }, 500);


    // -------------- Search ----------------
    function setupSearchBox() {
        $(document).on("click", "#search-icon", function (e) {
            e.preventDefault();
            const $searchBox = $("#search-box");
            const $resultsContainer = $("#search-results");
            const $searchBtn = $(".search-padding");

            // Öppna eller stäng sökrutan
            if ($searchBox.is(":visible")) {
                $searchBox.fadeOut(300);
                $resultsContainer.fadeOut(300); // Stäng även resultatrutan
                if (window.innerWidth <= 980) {
                    setTimeout(() => {
                        $searchBtn.css({
                            padding: "0"
                        });
                    }, 100);
                }

            } else {
                setTimeout(() => {
                    $searchBox.fadeIn(300, function () {
                        $searchBox.focus(); // Auto-select input när det öppnas
                    }).css({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "20px" // Initial border-radius när sökrutan öppnas
                    });
                }, 100);
                if (window.innerWidth <= 980) {
                    $searchBtn.css({
                        transition: "padding 0.3s ease-in-out",
                        padding: "5.5rem 0 0 0"
                    });
                }
            }
        });

        // Stäng sökrutan om man klickar utanför
        $(document).on("click", function (e) {
            if (!$(e.target).closest("#search-box, #search-icon").length) {
                $("#search-box").fadeOut(300);
                $("#search-results").fadeOut(300); // Stäng även resultatrutan om man klickar utanför
                if (window.innerWidth <= 980) {
                    setTimeout(() => {
                        $(".search-padding").css({
                            padding: "0"
                        });
                    }, 100);
                }
            }
        });

        // Hantera sökfunktionalitet
        $("#search-box").on("input", function () {
            const searchText = $(this).val().toLowerCase();
            const $resultsContainer = $("#search-results");

            // Om sökrutan är tom, döljs resultat och återställ sökrutans border-radius
            if (searchText === "") {
                $resultsContainer.hide(); // Dölj resultat om sökrutan är tom
                $("#search-box").css("border-radius", "20px"); // Återställ border-radius
            } else {
                $resultsContainer.show(); // Visa resultatrutan om det finns text
                $("#search-box").css("border-radius", "20px 20px 0 0"); // Ändra border-radius när vi söker
            }

            const pages = [
                {file: 'facilities.html', name: 'Anläggningar'},
                {file: 'shop.html', name: 'Butik'},
                {file: 'cookies.html', name: 'Cookies'},
                {file: 'index.html', name: 'Hem'},
                {file: 'member.html', name: 'Medlemskap'},
                {file: 'about.html', name: 'Om oss'},
                {file: 'policy.html', name: 'Policy'},
                {file: 'training.html', name: 'Träning'}
            ];

            let results = [];

            pages.forEach(function (page) {
                $.ajax({
                    url: page.file,
                    method: 'GET',
                    success: function (data) {
                        const pageContent = $(data).text().toLowerCase();
                        if (pageContent.includes(searchText)) {
                            results.push(page.name); // Lägg till namn på sidan i resultaten
                        }
                        displayResults(results, pages); // Skicka även med pages-arrayen för att få URL:er
                    },
                    error: function () {
                        console.log("Fel vid hämtning av " + page.file);
                    }
                });
            });
        });

        // Funktion för att visa resultaten i en grid
        function displayResults(results, pages) {
            const $resultsContainer = $("#search-results");
            $resultsContainer.empty(); // Rensa tidigare resultat


            if (results.length === 0) {
                $resultsContainer.append("<p>Inga resultat hittades.</p>");
            } else {
                // Skapa en div-container för att hålla griden
                const $gridContainer = $("<div></div>").addClass("results-grid");

                // Lägg till varje resultat som en grid item
                results.forEach(function (result) {
                    const $resultItem = $("<div></div>").addClass("result-item").text(result);

                    // Lägg till en click-händelse på varje resultat
                    $resultItem.on("click", function () {
                        // Hitta den rätta sidan för det här resultatet
                        const matchingPage = pages.find(page => page.name === result);
                        if (matchingPage) {
                            // Navigera till den rätta sidan
                            window.location.href = matchingPage.file; // Gå till sidan
                        }
                    });

                    $gridContainer.append($resultItem);
                });

                // Lägg till grid container till $resultsContainer
                $resultsContainer.append($gridContainer);
            }
        }

    }


    // -------------- Nav Scroll ----------------
    const header = document.querySelector("header");
    const navMenu = document.getElementById("nav-menu"); // Lägg till kollapsad meny-kontroll

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        if (window.scrollY === 0) {
            navMenu.classList.remove("active");
        }
    });


    // -------------- Load Footer ----------------
    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer-placeholder").innerHTML = data;
        })
        .catch(error => console.error("Fel vid laddning av footer:", error));

    // ---------------- Login menu ----------------
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

    // -------------- Loading screen ----------------
    let video = document.getElementById("background-video");
    let preloader = document.getElementById("preloader");
    let content = document.getElementById("content");
    let navbar = document.getElementById("navbar-placeholder");

    function removePreloader() {
        if (preloader) {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
                if (content) content.classList.remove("hidden"); // Gör huvudinnehåll synligt
                if (navbar) navbar.style.opacity = "1"; // Se till att navbaren är synlig
            }, 500); // Väntar på fade-out-animationen innan den försvinner helt
        }
    }

    if (video) {
        // Om en video finns, vänta tills den laddats innan preloadern tas bort
        video.addEventListener("canplaythrough", function () {
            setTimeout(removePreloader, 200);
        });

        // Failsafe: Om videon inte laddas inom 2 sekunder, ta bort preloader ändå
        setTimeout(() => {
            removePreloader();
        }, 2000);
    } else {
        // Om ingen video finns, ta bort preloader direkt
        removePreloader();
    }


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

    // --------------Animated transition----------------
    function animatedElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    entry.target.classList.remove("show");
                }
            });
        });

        document.querySelectorAll(".animate").forEach(element => {
            observer.observe(element);
        });
    }


    // --------------Back to top - Med JQuery----------------
    function setupScrollToTop() {
        const $scrollToTopBtn = $("#scroll-to-top");

        if ($scrollToTopBtn.length === 0) return;

        // Förbered för smooth fade-in/fade-out
        $scrollToTopBtn.css({
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.2s ease-out, visibility 0.2s"
        });

        $(window).on("scroll", function () {
            if ($(this).scrollTop() > 800) {
                $scrollToTopBtn.css({
                    opacity: 1,
                    visibility: "visible"
                });
            } else {
                $scrollToTopBtn.css({
                    opacity: 0,
                    visibility: "hidden"
                });
            }
        });

        $scrollToTopBtn.on("click", function () {
            $("html, body").scrollTop(0);
        });
    }


    // --------------Drag object - Med JQuery----------------
    function gymWeight() {
        $(document).ready(function () {
            $("#gym-weight").draggable({
                stop: function (event, ui) {
                    const weight = $(this);
                    const dropAreaHeight = $("#drop-area").height();
                    const weightBottom = weight.offset().top + weight.outerHeight();

                    // Om objektet är nära botten, låt det "ramla" till botten och ge den studseffekten
                    if (weightBottom >= dropAreaHeight) {
                        // Först gör vikten en snabb rörelse till botten
                        weight.animate({top: dropAreaHeight - weight.outerHeight()}, 200, "easeInQuad", function () {
                            // Sedan lägg till studseffekten med hjälp av animationer
                            weight.animate({top: dropAreaHeight - weight.outerHeight() - 90}, 150, "easeOutQuad", function () {
                                weight.animate({top: dropAreaHeight - weight.outerHeight()}, 150, "easeInQuad");

                                weight.animate({top: dropAreaHeight - weight.outerHeight() - 45}, 125, "easeOutQuad", function () {
                                    weight.animate({top: dropAreaHeight - weight.outerHeight()}, 125, "easeInQuad");

                                    weight.animate({top: dropAreaHeight - weight.outerHeight() - 15}, 100, "easeOutQuad", function () {
                                        weight.animate({top: dropAreaHeight - weight.outerHeight()}, 100, "easeInQuad");
                                    });
                                });
                            });
                        });
                    }
                }
            });
        });
    }

});
