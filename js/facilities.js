document.addEventListener("DOMContentLoaded", function () {

    // --------------Karta----------------

    // Skapa kartan och sätt startposition (Umeå)
    let zoomLevel = window.innerWidth <= 768 ? 12 : 13; // Välj zoom baserat på skärmstorlek

    const map = L.map("map").setView([63.825733, 20.289039], zoomLevel);

    // Lyssna på fönsterstorleksändringar och uppdatera zoomnivån vid behov
    window.addEventListener("resize", function () {
        let newZoom = window.innerWidth <= 768 ? 12 : 13;
        map.setZoom(newZoom); // Uppdatera zoomnivån vid ändring
    });

    L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: '&copy; <a href="https://www.esri.com/">Esri</a>',
        maxZoom: 19
    }).addTo(map);


    // Lägg till öppettider för varje gym
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Söndag, 1 = Måndag, ..., 6 = Lördag

    // Lägg till öppettider för varje gym
    const facilitiesWithHours = [
        {
            name: "Utopia",
            coords: [63.826405, 20.264859],
            openHours: {1: [5, 23], 2: [5, 23], 3: [5, 23], 4: [5, 23], 5: [5, 21], 6: [9, 18], 0: [5, 23]}
        },
        {
            name: "Östra",
            coords: [63.818047, 20.292100],
            openHours: {1: [5, 23], 2: [5, 23], 3: [5, 23], 4: [5, 23], 5: [5, 21], 6: [9, 18], 0: [5, 23]}
        },
        {
            name: "Mariehem",
            coords: [63.831972, 20.328991],
            openHours: {1: [5, 23], 2: [5, 23], 3: [5, 23], 4: [5, 23], 5: [5, 22], 6: [5, 22], 0: [5, 23]}
        },
        {
            name: "Navet",
            coords: [63.826413, 20.269455],
            openHours: {1: [5, 22], 2: [5, 22], 3: [5, 22], 4: [5, 22], 5: [5, 22], 6: [6, 21], 0: [6, 21]}
        }
    ];

    // Funktion som kollar om gymmet är öppet
    function getStatusText(openHours) {
        if (!openHours[currentDay]) return "<span style='color:red;'>STÄNGT NU ❌</span>";

        const [open, close] = openHours[currentDay];
        const timeLeft = close - currentHour;

        let status;
        if (currentHour < open || currentHour >= close) {
            status = "<span style='color:red;'>❌ STÄNGT NU</span>";
        } else if (timeLeft <= 1) {
            status = "<span style='color:gold;'>⏳ STÄNGER SNART</span>";
        } else {
            status = "<span style='color:green;'>✅ ÖPPET NU</span>";
        }

        return `<b>Öppettider idag:</b><br>🕒 ${open}:00 - ${close}:00 <br>${status}`;
    }

    // Map Icon
    const customIcon = L.icon({
        iconUrl: "../pictures/map_marker.png", // Lokal ikon
        iconSize: [50, 50],
        iconAnchor: [25, 40],
        popupAnchor: [1, -34]
    });

    // Skapa makrörer
    facilitiesWithHours.forEach(facility => {
        const statusText = getStatusText(facility.openHours);

        // Koppla popupen till en specifik klass beroende på gymmet
        let popupClass = "";
        switch (facility.name) {
            case "Utopia":
                popupClass = "utopia-popup";
                break;
            case "Östra":
                popupClass = "ostra-popup";
                break;
            case "Mariehem":
                popupClass = "mariehem-popup";
                break;
            case "Navet":
                popupClass = "navet-popup";
                break;
        }

        // Skapa popup med unik bakgrund och overlay
        const customPopup = `
            <div class="custom-popup ${popupClass}">
                <div class="custom-popup-content">
                    <div class="popup-title">${facility.name}</div> <!-- Större text för namnet -->
                    ${statusText}
                </div>
            </div>
        `;

        L.marker(facility.coords, {icon: customIcon})
            .addTo(map)
            .bindPopup(customPopup);
    });

    //--------------Gym info under karta---------------

    function updateGymHours() {
        document.querySelectorAll(".gym-hours").forEach(p => {
            const gymName = p.dataset.gym;
            const facility = facilitiesWithHours.find(f => f.name === gymName);

            if (!facility || !facility.openHours[currentDay]) return;

            const [open, close] = facility.openHours[currentDay];
            const timeLeft = close - currentHour;

            let statusColor, statusIcon;
            if (currentHour < open || currentHour >= close) {
                statusColor = "red"; // Stängt
                statusIcon = "❌";
            } else if (timeLeft <= 1) {
                statusColor = "gold"; // Stänger snart
                statusIcon = "⏳";
            } else {
                statusColor = "limegreen"; // Öppet
                statusIcon = "✅";
            }

            // Hämta öppettidstexten och färga ENDAST dagens rad + ikon
            const hoursLines = p.innerHTML.split("<br>");
            const updatedLines = hoursLines.map(line => {
                if (isCurrentDay(line)) {
                    return `<span style="color: ${statusColor};">${statusIcon} ${line}</span>`;
                }
                return `<span style="color: white;">${line}</span>`;
            });

            p.innerHTML = updatedLines.join("<br>");
        });
    }

// Funktion för att kolla om en rad innehåller dagens namn
    function isCurrentDay(line) {
        const daysMap = {
            0: ["Söndag"],
            1: ["Mån", "Mån-Tors", "Mån-Fre"],
            2: ["Tis", "Mån-Tors", "Mån-Fre"],
            3: ["Ons", "Mån-Tors", "Mån-Fre"],
            4: ["Tors", "Mån-Tors", "Mån-Fre"],
            5: ["Fre", "Fre-Lör", "Mån-Fre"],
            6: ["Lör", "Fre-Lör", "Lör-Sön"]
        };

        return daysMap[currentDay].some(day => line.includes(day));
    }

// Kör funktionen direkt vid sidladdning
    updateGymHours();

    // Funktion för att toggla info-rutan när man klickar på info-ikonen
    window.toggleInfo = function (id) {
        const infoBox = document.getElementById(id);
        const gymCard = infoBox.closest(".gym-card");

        // Om rutan redan är aktiv → stäng den
        if (infoBox.classList.contains("active")) {
            infoBox.classList.remove("active");
            gymCard.classList.remove("active"); // Ta bort aktiv-klassen från kortet
        } else {
            // Stäng alla andra rutor först
            document.querySelectorAll(".gym-info-slide").forEach(box => box.classList.remove("active"));
            document.querySelectorAll(".gym-card").forEach(card => card.classList.remove("active"));

            // Lägg till active på det aktuella kortet och infoboxen
            infoBox.classList.add("active");
            gymCard.classList.add("active");
        }
    };

});
