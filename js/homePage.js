document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("background-video");

    // --------------Homepage Video Mute & Pause----------------
    const muteButton = document.getElementById("mute-button");
    const pauseButton = document.getElementById("pause-button");

    // Kontrollera om elementen finns innan vi använder dem
    if (video && muteButton && pauseButton) {
        video.muted = true; // Starta mutad som standard

        muteButton.addEventListener("click", function () {
            if (video.muted) {
                video.muted = false;
                video.volume = 0.2;
                muteButton.innerHTML = "🔊";
            } else {
                video.muted = true;
                muteButton.innerHTML = "🔇";
            }
        });

        pauseButton.addEventListener("click", function () {
            if (video.paused) {
                video.play();
                pauseButton.innerHTML = "⏸";
            } else {
                video.pause();
                pauseButton.innerHTML = "▶";
            }
        });
    } else {
        console.warn("Video, mute-knapp eller pause-knapp hittades inte i HTML.");
    }

    // -------------- Hero text ----------------
    let textContainer = document.getElementById("changing-text");
    let fixedText = "‎"; // Fast text som alltid står kvar
    let texts = ["USM", "Umeå Sport & Motion", "Träningsanläggningen med DIG i centrum"];
    let index = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 130; // Hastighet på bokstavsskrivning (ms per bokstav)

    function typeEffect() {
        let currentText = texts[index];

        if (!isDeleting) {
            textContainer.textContent = fixedText + currentText.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeEffect, 2000);
                return;
            }
        } else {
            textContainer.textContent = fixedText + currentText.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                index = (index + 1) % texts.length;
            }
        }

        setTimeout(typeEffect, isDeleting ? speed / 2 : speed);
    }

    typeEffect();

});
