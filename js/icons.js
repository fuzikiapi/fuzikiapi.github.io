/* ==========================================================
   KF Platform
   Icons
   ========================================================== */

(() => {
    "use strict";

    function init() {

        if (!window.lucide) {

            console.warn(

                "Lucide Icons não carregado."

            );

            return;

        }

        lucide.createIcons();

    }

    function refresh() {

        if (!window.lucide) return;

        lucide.createIcons();

    }

    KF.Icons = {

        init,

        refresh

    };

})();
