/* ==========================================================
   KF Platform
   Intro
   ========================================================== */

(() => {
    "use strict";

    let intro;
    let app;
    let enterButton;
    let items;

    function init() {

        intro = document.getElementById("intro");
        app = document.getElementById("app");
        enterButton = document.getElementById("enterButton");
        items = document.querySelectorAll(".intro-item");

        if (!intro) return;

        buildIntro();

        enterButton.addEventListener(
            "click",
            enterPlatform
        );

    }

    async function buildIntro() {

        enterButton.classList.remove("show");

        for (const item of items) {

            const fill =
                item.querySelector(".progress-fill");

            const status =
                item.querySelector("strong");

            fill.style.width = "0%";

            status.textContent = "...";

        }

        for (const item of items) {

            const fill =
                item.querySelector(".progress-fill");

            const status =
                item.querySelector("strong");

            await animate(fill);

            status.textContent = "OK";

            await delay(120);

        }

        enterButton.classList.add("show");

    }

    function animate(fill) {

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

    function enterPlatform() {

        intro.animate(

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

            intro.remove();

            app.hidden = false;

            document
                .querySelector(".hero")
                ?.classList.add("show");

        }, 700);

    }

    function delay(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    }

    KF.Intro = {

        init

    };

})();
