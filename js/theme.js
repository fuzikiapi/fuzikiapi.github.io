/* ==========================================================
   KF Platform
   Theme
   ========================================================== */

(() => {
    "use strict";

    const STORAGE = "kf-theme";

    let button;

    let current = "dark";

    function init() {

        button = document.getElementById(

            "themeToggle"

        );

        current =

            localStorage.getItem(STORAGE)

            || "dark";

        apply(current);

        button?.addEventListener(

            "click",

            toggle

        );

    }

    function toggle() {

        current =

            current === "dark"

            ? "light"

            : "dark";

        apply(current);

        localStorage.setItem(

            STORAGE,

            current

        );

    }

    function apply(theme) {

        document.documentElement.dataset.theme =

            theme;

        if (!button) return;

        button.textContent =

            theme === "dark"

            ? "🌙"

            : "☀️";

    }

    KF.Theme = {

        init,

        toggle

    };

})();
