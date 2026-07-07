/* ==========================================================
   KF Platform
   App
   ========================================================== */

(() => {
    "use strict";

    const DOM = {};

    const INTRO_STEPS = [

        "Carregando módulos...",

        "Checando GitHub API...",

        "Checando Discord Gateway...",

        "Carregando Interface...",

        "Carregando Recursos...",

        "Inicializando Componentes..."

    ];

    document.addEventListener(

        "DOMContentLoaded",

        init

    );

    function init() {

        cacheDOM();

        bindEvents();

        buildIntro();

        startClock();

    }

    function cacheDOM() {

        DOM.intro =
            document.getElementById("intro");

        DOM.app =
            document.getElementById("app");

        DOM.enter =
            document.getElementById("enterButton");

        DOM.clock =
            document.getElementById("clock");

        DOM.items =
            document.querySelectorAll(".intro-item");

        DOM.modals =
            document.querySelectorAll(".modal");

        DOM.navButtons =
            document.querySelectorAll(".nav-button");

        DOM.closeButtons =
            document.querySelectorAll(".close-modal");

    }

    function bindEvents() {

        DOM.enter.addEventListener(

            "click",

            enterPlatform

        );

        DOM.navButtons.forEach(button => {

            button.addEventListener(

                "click",

                openModal

            );

        });

        DOM.closeButtons.forEach(button => {

            button.addEventListener(

                "click",

                closeModals

            );

        });

        DOM.modals.forEach(modal => {

            modal.addEventListener(

                "click",

                event => {

                    if (

                        event.target === modal

                    ) {

                        closeModals();

                    }

                }

            );

        });

        document.addEventListener(

            "keydown",

            event => {

                if (

                    event.key === "Escape"

                ) {

                    closeModals();

                }

            }

        );

    }

     /* ======================================================
       INTRO
       ====================================================== */

    async function buildIntro() {

        DOM.enter.style.display = "none";

        for (const item of DOM.items) {

            const fill =
                item.querySelector(".progress-fill");

            const status =
                item.querySelector("strong");

            fill.style.width = "0%";

            status.textContent = "...";

        }

        for (const item of DOM.items) {

            const fill =
                item.querySelector(".progress-fill");

            const status =
                item.querySelector("strong");

            await animateProgress(fill);

            status.textContent = "OK";

            await wait(120);

        }

        DOM.enter.classList.add("show");

        DOM.enter.animate(

            [

                {

                    opacity: 0,

                    transform: "translateY(10px)"

                },

                {

                    opacity: 1,

                    transform: "translateY(0)"

                }

            ],

            {

                duration: 500,

                easing: "ease"

            }

        );

    }

    function animateProgress(fill) {

        return new Promise(resolve => {

            let progress = 0;

            const interval = setInterval(() => {

                progress += 4;

                fill.style.width = progress + "%";

                if (progress >= 100) {

                    clearInterval(interval);

                    resolve();

                }

            }, 12);

        });

    }

    function wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    function enterPlatform() {

        DOM.intro.animate(

            [

                {

                    opacity: 1

                },

                {

                    opacity: 0

                }

            ],

            {

                duration: 700,

                easing: "ease",

                fill: "forwards"

            }

        );

        setTimeout(() => {

            DOM.intro.remove();

            DOM.app.hidden = false;

            DOM.app.animate(

                [

                    {

                        opacity: 0,

                        transform: "translateY(20px)"

                    },

                    {

                        opacity: 1,

                        transform: "translateY(0)"

                    }

                ],

                {

                    duration: 700,

                    easing: "ease",

                    fill: "forwards"

                }

            );

        }, 700);

    }

     /* ======================================================
       MODALS
       ====================================================== */

    function openModal(event) {

        const modalName =
            event.currentTarget.dataset.modal;

        closeModals();

        const modal =
            document.getElementById(
                modalName + "Modal"
            );

        if (!modal) return;

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeModals() {

        DOM.modals.forEach((modal) => {

            modal.classList.remove("active");

        });

        document.body.style.overflow = "";

    }

    /* ======================================================
       CLOCK
       ====================================================== */

    function startClock() {

        updateClock();

        setInterval(updateClock, 1000);

    }

    function updateClock() {

        const now = new Date();

        const formatter =
            new Intl.DateTimeFormat(

                "pt-BR",

                {

                    hour: "2-digit",

                    minute: "2-digit",

                    second: "2-digit",

                    timeZone:
                        "America/Sao_Paulo"

                }

            );

        DOM.clock.textContent =
            "UTC-3 " +
            formatter.format(now);

    }

})();
