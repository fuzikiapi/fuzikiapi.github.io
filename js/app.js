/* ==========================================================
   KF Platform
   App
   ========================================================== */

(() => {
    "use strict";

    const App = {

        intro: null,

        app: null,

        enterButton: null,

        clock: null,

        modals: [],

        navButtons: [],

        closeButtons: []

    };

    /* ======================================================
       INIT
       ====================================================== */

    function init() {

        cacheDOM();

        bindEvents();

        startClock();

    }

    /* ======================================================
       DOM
       ====================================================== */

    function cacheDOM() {

        App.intro =
            document.getElementById("intro");

        App.app =
            document.getElementById("app");

        App.enterButton =
            document.getElementById("enterButton");

        App.clock =
            document.getElementById("clock");

        App.modals =
            document.querySelectorAll(".modal");

        App.navButtons =
            document.querySelectorAll(".nav-button");

        App.closeButtons =
            document.querySelectorAll(".close-modal");

    }

    /* ======================================================
       EVENTS
       ====================================================== */

    function bindEvents() {

        App.enterButton.addEventListener(

            "click",

            enterPlatform

        );

        App.navButtons.forEach((button) => {

            button.addEventListener(

                "click",

                openModal

            );

        });

        App.closeButtons.forEach((button) => {

            button.addEventListener(

                "click",

                closeAllModals

            );

        });

        App.modals.forEach((modal) => {

            modal.addEventListener(

                "click",

                (event) => {

                    if (event.target === modal) {

                        closeAllModals();

                    }

                }

            );

        });

        document.addEventListener(

            "keydown",

            (event) => {

                if (event.key === "Escape") {

                    closeAllModals();

                }

            }

        );

    }

    /* ======================================================
       INTRO
       ====================================================== */

    function enterPlatform() {

        App.intro.style.opacity = "0";

        App.intro.style.pointerEvents = "none";

        setTimeout(() => {

            App.intro.remove();

            App.app.hidden = false;

            App.app.animate(

                [

                    {

                        opacity: 0,

                        transform:
                            "translateY(20px)"

                    },

                    {

                        opacity: 1,

                        transform:
                            "translateY(0)"

                    }

                ],

                {

                    duration: 600,

                    easing:
                        "ease-out",

                    fill: "forwards"

                }

            );

            window.KF.state.introFinished = true;

        }, 600);

    }

    /* ======================================================
       MODALS
       ====================================================== */

    function openModal(event) {

        const modalName =

            event.currentTarget.dataset.modal;

        closeAllModals();

        document

            .getElementById(

                modalName + "Modal"

            )

            ?.classList.add("active");

    }

    function closeAllModals() {

        App.modals.forEach((modal) => {

            modal.classList.remove("active");

        });

    }

    /* ======================================================
       CLOCK
       ====================================================== */

    function updateClock() {

        const now = new Date();

        const formatter =

            new Intl.DateTimeFormat(

                "pt-BR",

                {

                    timeZone:

                        "America/Sao_Paulo",

                    hour: "2-digit",

                    minute: "2-digit"

                }

            );

        App.clock.textContent =

            "UTC-3 " +

            formatter.format(now);

    }

    function startClock() {

        updateClock();

        setInterval(

            updateClock,

            1000

        );

    }

    /* ======================================================
       START
       ====================================================== */

    document.addEventListener(

        "DOMContentLoaded",

        init

    );

})();
