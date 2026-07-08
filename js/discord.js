/* ==========================================================
   KF Platform
   Discord
   ========================================================== */

(() => {
    "use strict";

    let statusElement;

    let statusDot;

    function init() {

        statusElement = document.getElementById(

            "discordStatus"

        );

        statusDot = statusElement?.querySelector(

            ".status-dot"

        );

        updateOffline();

    }

    function updateOffline() {

        if (!statusElement) return;

        statusElement.lastChild.textContent = " Offline";

        statusDot.style.background = "#ef4444";

        statusDot.style.boxShadow =

            "0 0 12px #ef4444";

    }

    function updateOnline() {

        if (!statusElement) return;

        statusElement.lastChild.textContent = " Online";

        statusDot.style.background = "#22c55e";

        statusDot.style.boxShadow =

            "0 0 12px #22c55e";

    }

    KF.Discord = {

        init,

        updateOffline,

        updateOnline

    };

})();
