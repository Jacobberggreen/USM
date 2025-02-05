document.addEventListener("DOMContentLoaded", function () {

    // --------------Hängande medlemskort----------------

    let facilitySelect = document.getElementById("facility-select"); // Hämta dropdown-menyn
    let cards = document.querySelectorAll(".membership-card"); // Hämta alla kort

    // Lägg till en eventlistener som reagerar på förändringar i dropdown-menyn
    facilitySelect.addEventListener("change", function () {
        let selectedFacility = this.value; // Hämta valt värde

        // Loopar igenom alla kort och visar endast de som matchar valet
        cards.forEach(card => {
            if (card.getAttribute("data-facility") === selectedFacility) {
                card.style.display = "block"; // Visa kortet
            } else {
                card.style.display = "none"; // Dölj kortet
            }
        });
    });
});
