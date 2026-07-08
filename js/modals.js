
/* ==========================================================
   KF Platform
   Modals
   ========================================================== */

(() => {
    "use strict";

    let modals;
    let buttons;
    let closeButtons;

    function init() {

        cache();

        bind();

    }

    function cache() {

        modals =
            document.querySelectorAll(".modal");

        buttons =
            document.querySelectorAll("[data-modal]");

        closeButtons =
            document.querySelectorAll(".close-modal");

    }

    function bind() {

        buttons.forEach(button => {

            button.addEventListener(

                "click",

                open

            );

        });

        closeButtons.forEach(button => {

            button.addEventListener(

                "click",

                closeAll

            );

        });

        modals.forEach(modal => {

            modal.addEventListener(

                "click",

                event => {

                    if (

                        event.target === modal

                    ) {

                        closeAll();

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

                    closeAll();

                }

            }

        );

    }

    function open(event) {

        const name =

            event.currentTarget.dataset.modal;

        const modal =

            document.getElementById(

                `${name}Modal`

            );

        if (!modal) return;

        closeAll();

        modal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeAll() {

        modals.forEach(modal => {

            modal.classList.remove(

                "active"

            );

        });

        document.body.style.overflow = "";

    }

    KF.Modals = {

        init,

        closeAll

    };

})();
