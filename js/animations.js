/* ==========================================================
   KF Platform
   Animations
   ========================================================== */

(() => {
    "use strict";

    /* ======================================================
       CONFIG
       ====================================================== */

    const CONFIG = {

        threshold: 0.12,

        rootMargin: "0px 0px -10% 0px",

        staggerDelay: 80

    };

    /* ======================================================
       STATE
       ====================================================== */

    let initialized = false;

    let rafId = null;

    let ticking = false;

    let lastScroll = 0;

    /* ======================================================
       ELEMENT CACHE
       ====================================================== */

    const header = document.querySelector(".header");

    const hero = document.querySelector(".hero");

    const revealElements = [

        ...document.querySelectorAll(".reveal"),
        ...document.querySelectorAll(".reveal-left"),
        ...document.querySelectorAll(".reveal-right"),
        ...document.querySelectorAll(".reveal-scale")

    ];

    const parallaxElements = document.querySelectorAll(
        "[data-parallax]"
    );

    const tiltElements = document.querySelectorAll(
        ".hover-tilt"
    );

    const buttons = document.querySelectorAll(
        ".button"
    );

    /* ======================================================
       STAGGER
       ====================================================== */

    function applyStagger(elements) {

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * CONFIG.staggerDelay}ms`;

        });

    }

    /* ======================================================
       INTERSECTION OBSERVER
       ====================================================== */

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: CONFIG.threshold,

            rootMargin: CONFIG.rootMargin

        }

    );

    function bindObserver() {

        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }

    function unbindObserver() {

        observer.disconnect();

    }

    /* ======================================================
       HERO
       ====================================================== */

    function showHero() {

        document.body.classList.add(
            "page-loaded"
        );

        hero?.classList.add("show");

    }

    /* ======================================================
       HEADER
       ====================================================== */

    function updateHeader() {

        if (!header) return;

        const current = window.scrollY;

        header.classList.toggle(
            "scrolled",
            current > 24
        );

        header.classList.toggle(
            "header-hidden",
            current > lastScroll &&
            current > 120
        );

        lastScroll = current;

    }

    function onScroll() {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

            updateHeader();

            updateParallax();

            updateScrollProgress();

            ticking = false;

        });

    }

    /* ======================================================
       PARALLAX
       ====================================================== */

    function updateParallax() {

        const scrollY = window.scrollY;

        parallaxElements.forEach((element) => {

            const speed =

                Number(
                    element.dataset.parallax
                ) || 0.08;

            element.style.transform =

                `translate3d(
                    0,
                    ${scrollY * speed}px,
                    0
                )`;

        });

    }

    /* ======================================================
       HOVER TILT
       ====================================================== */

    function handleTiltMove(event) {

        const element = event.currentTarget;

        const rect =
            element.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y / rect.height) - 0.5) * -8;

        const rotateY =
            ((x / rect.width) - 0.5) * 8;

        element.style.transform =

            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            `;

    }

    function handleTiltLeave(event) {

        event.currentTarget.style.transform = "";

    }

     /* ======================================================
       BUTTON RIPPLE
       ====================================================== */

    function handleButtonClick(event) {

        const button = event.currentTarget;

        const ripple =
            document.createElement("span");

        ripple.className = "button-ripple";

        const rect =
            button.getBoundingClientRect();

        const size =
            Math.max(rect.width, rect.height);

        ripple.style.width =
            ripple.style.height =
            `${size}px`;

        ripple.style.left =
            `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
            `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        ripple.addEventListener(

            "animationend",

            () => {

                ripple.remove();

            },

            { once: true }

        );

    }

    /* ======================================================
       SCROLL PROGRESS
       ====================================================== */

    function updateScrollProgress() {

        const height =

            document.documentElement.scrollHeight -

            window.innerHeight;

        if (height <= 0) return;

        const progress =

            window.scrollY / height;

        document.documentElement.style.setProperty(

            "--scroll-progress",

            progress

        );

    }

    /* ======================================================
       RAF LOOP
       ====================================================== */

    function updateFrame() {

        updateParallax();

        updateScrollProgress();

    }

    function animationFrame() {

        updateFrame();

        rafId = requestAnimationFrame(

            animationFrame

        );

    }

    function startLoop() {

        if (rafId !== null) return;

        rafId = requestAnimationFrame(

            animationFrame

        );

    }

    function stopLoop() {

        if (rafId === null) return;

        cancelAnimationFrame(rafId);

        rafId = null;

    }

    /* ======================================================
       EVENTS
       ====================================================== */

    function bindEvents() {

        window.addEventListener(

            "load",

            showHero,

            { once: true }

        );

        window.addEventListener(

            "scroll",

            onScroll,

            { passive: true }

        );

        tiltElements.forEach((element) => {

            element.addEventListener(

                "mousemove",

                handleTiltMove

            );

            element.addEventListener(

                "mouseleave",

                handleTiltLeave

            );

        });

        buttons.forEach((button) => {

            button.addEventListener(

                "click",

                handleButtonClick

            );

        });

    }

    function unbindEvents() {

        window.removeEventListener(

            "load",

            showHero

        );

        window.removeEventListener(

            "scroll",

            onScroll

        );

        tiltElements.forEach((element) => {

            element.removeEventListener(

                "mousemove",

                handleTiltMove

            );

            element.removeEventListener(

                "mouseleave",

                handleTiltLeave

            );

        });

        buttons.forEach((button) => {

            button.removeEventListener(

                "click",

                handleButtonClick

            );

        });

    }

    /* ======================================================
       REDUCED MOTION
       ====================================================== */

    function applyReducedMotion() {

        if (

            window.matchMedia(

                "(prefers-reduced-motion: reduce)"

            ).matches

        ) {

            stopLoop();

            observer.disconnect();

        }

    }

     /* ======================================================
       MODULE LIFECYCLE
       ====================================================== */

    function init() {

        if (initialized) return;

        initialized = true;

        applyStagger(revealElements);

        bindObserver();

        bindEvents();

        applyReducedMotion();

        updateHeader();

        updateParallax();

        updateScrollProgress();

        startLoop();

    }

    function destroy() {

        if (!initialized) return;

        stopLoop();

        unbindEvents();

        unbindObserver();

        initialized = false;

    }

    /* ======================================================
       PUBLIC API
       ====================================================== */

    window.KF.Animations = {

        get initialized() {

            return initialized;

        },

        init,

        destroy,

        startLoop,

        stopLoop

    };

     /* ======================================================
       AUTO START
       ====================================================== */

    /*
     * A inicialização do módulo é responsabilidade do
     * App Controller (KF.App.init()).
     *
     * Não inicialize este módulo aqui.
     */

})();
