/* ==========================================================
   KF Platform
   App Controller
   ========================================================== */

(() => {
    "use strict";

    /* ======================================================
       STATE
       ====================================================== */

    let initialized = false;

    /* ======================================================
       DOM CACHE
       ====================================================== */

    const DOM = {

        body: document.body,

        header: document.querySelector(".header"),

        main: document.querySelector("main"),

        footer: document.querySelector("footer"),

        languageButton: document.getElementById("languageButton")

    };

    /* ======================================================
       MODULE INITIALIZATION
       ====================================================== */

    function initializeModules() {

        if (window.KF.Background) {

            window.KF.Background.init();

        }

        if (window.KF.Animations) {

            window.KF.Animations.init();

        }

        if (window.KF.Language?.init) {

            window.KF.Language.init();

        }

        if (window.KF.GitHub?.init) {

            window.KF.GitHub.init();

        }

        if (window.KF.Spotify?.init) {

            window.KF.Spotify.init();

        }

        if (window.KF.Cursor?.init) {

            window.KF.Cursor.init();

        }

        if (window.KF.Discord?.init) {

            window.KF.Discord.init();

        }

    }

    /* ======================================================
       MODULE DESTROY
       ====================================================== */

    function destroyModules() {

        if (window.KF.Background?.destroy) {

            window.KF.Background.destroy();

        }

        if (window.KF.Animations?.destroy) {

            window.KF.Animations.destroy();

        }

        if (window.KF.Language?.destroy) {

            window.KF.Language.destroy();

        }

        if (window.KF.GitHub?.destroy) {

            window.KF.GitHub.destroy();

        }

        if (window.KF.Spotify?.destroy) {

            window.KF.Spotify.destroy();

        }

        if (window.KF.Cursor?.destroy) {

            window.KF.Cursor.destroy();

        }

        if (window.KF.Discord?.destroy) {

            window.KF.Discord.destroy();

        }

    }

    /* ======================================================
       APP
       ====================================================== */

    function init() {

        if (initialized) return;

        initialized = true;

        initializeModules();

        console.info(
            "%cKF Platform initialized",
            "color:#8B5CF6;font-weight:bold;"
        );

    }

    function destroy() {

        if (!initialized) return;

        destroyModules();

        initialized = false;

    }

    /* ======================================================
       PUBLIC API
       ====================================================== */

    window.KF.App = {

        get initialized() {

            return initialized;

        },

        DOM,

        init,

        destroy

    };

    /* ======================================================
       START
       ====================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        () => {

            window.KF.App.init();

        },

        { once: true }

    );

})();
