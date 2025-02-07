document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("email-form");
    const formMessage = document.getElementById("form-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Förhindrar standardinlämning

        // Hämta fältens innehåll
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Skapa en mailto-länk
        const mailtoLink = `mailto:kontakt@placeholder.se?subject=Kontakt från ${name}&body=Namn: ${name}%0AEmail: ${email}%0A%0A${message}`;

        // Öppna användarens e-postklient
        window.location.href = mailtoLink;

        // Bekräftelsemeddelande
        formMessage.textContent = "Ditt meddelande har skickats!";
        formMessage.style.color = "green";

        // Rensa fälten efter några sekunder
        setTimeout(() => {
            form.reset();
            formMessage.textContent = "";
        }, 3000);
    });
});
