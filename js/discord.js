/* ==========================================================
   KF Platform
   Discord
   ========================================================== */

(() => {
    "use strict";

    let statusElement;
    let statusDot;
    let presenceElement;
    let activityElement;

    async function init() {

        statusElement =
            document.getElementById("discordStatus");

        statusDot =
            statusElement?.querySelector(".status-dot");

        if (!CONFIG.discord.lanyardId) {

            updateOffline();

            return;

        }

        await update();

        setInterval(update, 30000);

    }

    async function update() {

        try {

            const response = await fetch(

                `https://api.lanyard.rest/v1/users/${CONFIG.discord.lanyardId}`

            );

            const json = await response.json();

            if (!json.success) {

                updateOffline();

                return;

            }

            const data = json.data;

            if (data.discord_status === "offline") {

                updateOffline();

            } else {

                updateOnline(

    data.discord_status,

    data

);

            }

        }

        catch {

            updateOffline();

        }

    }

    function updateOffline() {

    presenceElement.textContent =

        "Offline";

    activityElement.textContent =

        "Desconectado";

    statusDot.style.background =

        "#ef4444";

    statusDot.style.boxShadow =

        "0 0 12px #ef4444";

}
   
    function updateOnline(status, data) {

    presenceElement.textContent =

        capitalize(status);

    statusDot.style.background =

        "#22c55e";

    statusDot.style.boxShadow =

        "0 0 12px #22c55e";

    if (data.spotify) {

        activityElement.textContent =

            "🎵 " +

            data.spotify.song;

        return;

    }

    if (

        data.activities

            ?.length

    ) {

        activityElement.textContent =

            "🎮 " +

            data.activities[0].name;

        return;

    }

    activityElement.textContent =

        "Online";

}

   presenceElement =

    document.getElementById(

        "discordPresence"

    );

activityElement =

    document.getElementById(

        "discordActivity"

    );

    function capitalize(text) {

        return text.charAt(0).toUpperCase()

            + text.slice(1);

    }

    KF.Discord = {

        init

    };

})();
