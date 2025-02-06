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

    // -------------- Update Hero ----------------
    function isIphone() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    if (isIphone()) {
        const gif = document.createElement("img");
        gif.src = "../media/gym_gif.gif";
        gif.alt = "Gym video";
        gif.classList.add("hero-img");

        video.replaceWith(gif); // Ersätt videon med GIF utan att lägga till onödiga mått
    }

});
