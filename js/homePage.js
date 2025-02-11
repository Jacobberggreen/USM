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

});
