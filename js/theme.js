/* ==========================================================
   KF Platform
   Theme
   ========================================================== */

(() => {
    "use strict";

    const STORAGE_KEY = "kf-theme";

    let currentTheme = "dark";

    function init() {

        const savedTheme =

            localStorage.getItem(

                STORAGE_KEY

            );

        if (savedTheme) {

            currentTheme = savedTheme;

        }

        apply(currentTheme);

    }

    function toggle() {

        currentTheme =

            currentTheme === "dark"

                ? "light"

                : "dark";

        apply(currentTheme);

        localStorage.setItem(

            STORAGE_KEY,

            currentTheme

        );

    }

    function apply(theme) {

        document.documentElement.dataset.theme =

            theme;

    }

    function getTheme() {

        return currentTheme;

    }

    KF.Theme = {

        init,

        toggle,

        apply,

        getTheme

    };

})();
