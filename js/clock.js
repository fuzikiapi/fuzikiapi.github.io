/* ==========================================================
   KF Platform
   Clock
   ========================================================== */

(() => {
    "use strict";

    let clock;

    let interval = null;

    function init() {

        clock = document.getElementById("clock");

        if (!clock) return;

        update();

        interval = setInterval(

            update,

            1000

        );

    }

    function update() {

        const now = new Date();

        const formatter = new Intl.DateTimeFormat(

            CONFIG.language || "pt-BR",

            {

                timeZone:

                    CONFIG.timezone ||

                    "America/Sao_Paulo",

                hour: "2-digit",

                minute: "2-digit",

                second: "2-digit"

            }

        );

       clock.textContent =

    CONFIG.utcLabel +

    " " +

    formatter.format(now);

    }

    function destroy() {

        if (interval) {

            clearInterval(interval);

            interval = null;

        }

    }

    KF.Clock = {

        init,

        destroy

    };

})();
