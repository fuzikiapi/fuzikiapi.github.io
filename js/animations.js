/* ==========================================================
   KF Platform
   Animations
   Parte 1
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
       ELEMENTS
       ====================================================== */

    const revealElements = [

        ...document.querySelectorAll(".reveal"),
        ...document.querySelectorAll(".reveal-left"),
        ...document.querySelectorAll(".reveal-right"),
        ...document.querySelectorAll(".reveal-scale")

    ];

    /* ======================================================
       STAGGER
       ====================================================== */

    function applyStagger(elements) {

        elements.forEach((element, index) => {

            element.style.transitionDelay =
                `${index * CONFIG.staggerDelay}ms`;

        });

    }

    applyStagger(revealElements);

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

    revealElements.forEach((element) => {

        observer.observe(element);

    });

    /* ======================================================
       HERO INTRO
       ====================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add("page-loaded");

            document
                .querySelector(".hero")
                ?.classList.add("show");

        },
        { once: true }
    );

    /* ======================================================
       HEADER SCROLL
       ====================================================== */

    const header = document.querySelector(".header");

    let lastScroll = 0;

    function updateHeader() {

        const current = window.scrollY;

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            current > 24
        );

        header.classList.toggle(
            "header-hidden",
            current > lastScroll && current > 120
        );

        lastScroll = current;

    }

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    /* ======================================================
       RAF SCROLL EFFECT
       ====================================================== */

    let ticking = false;

    function onScroll() {

        if (ticking) return;

        ticking = true;

        requestAnimationFrame(() => {

            updateHeader();

            ticking = false;

        });

    }

    window.removeEventListener("scroll", updateHeader);

    window.addEventListener(
        "scroll",
        onScroll,
        { passive: true }
    );

     /* ======================================================
       PARALLAX
       ====================================================== */

    const parallaxElements = document.querySelectorAll(
        "[data-parallax]"
    );

    function updateParallax() {

        const scrollY = window.scrollY;

        parallaxElements.forEach((element) => {

            const speed =
                Number(
                    element.dataset.parallax
                ) || 0.08;

            element.style.transform =
                `translate3d(0, ${scrollY * speed}px, 0)`;

        });

    }

    /* ======================================================
       HOVER TILT
       ====================================================== */

    const tiltElements = document.querySelectorAll(
        ".hover-tilt"
    );

    tiltElements.forEach((element) => {

        element.addEventListener("mousemove", (event) => {

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

        });

        element.addEventListener("mouseleave", () => {

            element.style.transform =
                "";

        });

    });

    /* ======================================================
       BUTTON RIPPLE
       ====================================================== */

    document.querySelectorAll(".button")
        .forEach((button) => {

            button.addEventListener("click", (event) => {

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
                    () => ripple.remove(),
                    { once: true }
                );

            });

        });

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

        requestAnimationFrame(animationFrame);

    }

    requestAnimationFrame(animationFrame);

    /* ======================================================
       REDUCED MOTION
       ====================================================== */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        observer.disconnect();

    }

/* ======================================================
   MODULE
   ====================================================== */

let initialized = false;

   window.KF.Animations = {

    get initialized() {

        return initialized;

    },

    init() {

        if (initialized) return;

        initialized = true;

    },

    destroy() {

        if (!initialized) return;

        initialized = false;

    }

};
   
})();
