/* ==========================================================
   KF Platform
   App
   ========================================================== */

(() => {
    "use strict";

    function init() {

        KF.Intro.init();

        KF.Profile.init();

        KF.Projects.init();

        KF.Modals.init();

        KF.Clock.init();

        KF.Icons.init();

        console.log("KF Platform iniciada.");

    }

    document.addEventListener(

        "DOMContentLoaded",

        init,

        { once: true }

    );

})();
