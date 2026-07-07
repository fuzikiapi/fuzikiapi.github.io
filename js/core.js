/* ==========================================================
   KF Platform
   Core
   ========================================================== */

(() => {
    "use strict";

    if (window.KF) return;

    window.KF = {

        version: "2.0.0",

        config: {

            timezone: "America/Sao_Paulo",

            language: "pt-BR"

        },

        state: {

            introFinished: false,

            theme: "dark"

        },

        elements: {},

        utils: {}

    };

    /* ======================================================
       HELPERS
       ====================================================== */

    window.KF.utils.select = (selector) =>
        document.querySelector(selector);

    window.KF.utils.selectAll = (selector) =>
        document.querySelectorAll(selector);

    window.KF.utils.pad = (value) =>
        String(value).padStart(2, "0");

})();
