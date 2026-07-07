/* ==========================================================
   KF Platform
   Background Engine
   ========================================================== */

(() => {
    "use strict";

    if (!window.KF) {
        throw new Error("KF Core não foi carregado.");
    }

    /* ======================================================
       CONFIG
       ====================================================== */

    const CONFIG = {

        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),

        blobCount: 7,

        blur: 140,

        opacity: 0.28,

        speed: 0.15,

        colors: [

            "#4F7DFB",

            "#6EE7F7",

            "#8B5CF6",

            "#A855F7",

            "#3B82F6"

        ]

    };

    /* ======================================================
       STATE
       ====================================================== */

    let initialized = false;

    let running = false;

    let rafId = null;

    let width = 0;

    let height = 0;

    let time = 0;

    let lastFrame = performance.now();

    /* ======================================================
       CANVAS
       ====================================================== */

    const canvas =
        document.getElementById(
            "aurora-canvas"
        );

    if (!canvas) {

        console.warn(
            "Aurora canvas não encontrado."
        );

        return;

    }

    const ctx =
        canvas.getContext(
            "2d",
            {
                alpha: true
            }
        );

    /* ======================================================
       HELPERS
       ====================================================== */

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

    function clamp(value, min, max) {

        return Math.min(

            max,

            Math.max(min, value)

        );

    }

    /* ======================================================
       RESIZE
       ====================================================== */

    function resize() {

        width = window.innerWidth;

        height = window.innerHeight;

        canvas.width =
            width *
            CONFIG.pixelRatio;

        canvas.height =
            height *
            CONFIG.pixelRatio;

        canvas.style.width =
            width + "px";

        canvas.style.height =
            height + "px";

        ctx.setTransform(

            CONFIG.pixelRatio,

            0,

            0,

            CONFIG.pixelRatio,

            0,

            0

        );

    }

    /* ======================================================
       BLOB
       ====================================================== */

    class Blob {

        constructor() {

            this.radius = random(220, 420);

            this.x = random(0, width);

            this.y = random(0, height);

            this.speed = random(0.08, 0.20);

            this.offset = random(0, 100);

            this.color = CONFIG.colors[
                Math.floor(
                    random(
                        0,
                        CONFIG.colors.length
                    )
                )
            ];

        }

        update(dt) {

            this.x +=
                Math.cos(
                    time * this.speed +
                    this.offset
                ) *
                dt *
                0.18;

            this.y +=
                Math.sin(
                    time * this.speed +
                    this.offset
                ) *
                dt *
                0.18;

            if (this.x < -this.radius)
                this.x = width + this.radius;

            if (this.x > width + this.radius)
                this.x = -this.radius;

            if (this.y < -this.radius)
                this.y = height + this.radius;

            if (this.y > height + this.radius)
                this.y = -this.radius;

        }

        draw() {

            const gradient =
                ctx.createRadialGradient(

                    this.x,

                    this.y,

                    0,

                    this.x,

                    this.y,

                    this.radius

                );

            gradient.addColorStop(

                0,

                this.color

            );

            gradient.addColorStop(

                .4,

                this.color + "66"

            );

            gradient.addColorStop(

                1,

                this.color + "00"

            );

            ctx.globalAlpha =
                CONFIG.opacity;

            ctx.filter =
                `blur(${CONFIG.blur}px)`;

            ctx.fillStyle =
                gradient;

            ctx.beginPath();

            ctx.arc(

                this.x,

                this.y,

                this.radius,

                0,

                Math.PI * 2

            );

            ctx.fill();

        }

    }

    /* ======================================================
       SCENE
       ====================================================== */

    const blobs = [];

    function createScene() {

        blobs.length = 0;

        for (
            let i = 0;
            i < CONFIG.blobCount;
            i++
        ) {

            blobs.push(
                new Blob()
            );

        }

    }

     /* ======================================================
       BACKGROUND
       ====================================================== */

    function drawBackground() {

        ctx.filter = "none";

        ctx.globalAlpha = 1;

        ctx.globalCompositeOperation =
            "source-over";

        const gradient =
            ctx.createLinearGradient(

                0,

                0,

                0,

                height

            );

        gradient.addColorStop(

            0,

            "#040406"

        );

        gradient.addColorStop(

            .45,

            "#07070A"

        );

        gradient.addColorStop(

            1,

            "#050507"

        );

        ctx.fillStyle = gradient;

        ctx.fillRect(

            0,

            0,

            width,

            height

        );

    }

    /* ======================================================
       AMBIENT LIGHT
       ====================================================== */

    function drawAmbientLight() {

        ctx.globalCompositeOperation =
            "screen";

        ctx.filter = "none";

        ctx.globalAlpha = .08;

        const light =
            ctx.createRadialGradient(

                width * .5,

                height * .2,

                0,

                width * .5,

                height * .2,

                Math.max(width, height)

            );

        light.addColorStop(

            0,

            "rgba(255,255,255,.35)"

        );

        light.addColorStop(

            .25,

            "rgba(110,231,247,.10)"

        );

        light.addColorStop(

            .60,

            "rgba(139,92,246,.05)"

        );

        light.addColorStop(

            1,

            "rgba(0,0,0,0)"

        );

        ctx.fillStyle = light;

        ctx.fillRect(

            0,

            0,

            width,

            height

        );

    }

    /* ======================================================
       VIGNETTE
       ====================================================== */

    function drawVignette() {

        ctx.filter = "none";

        ctx.globalCompositeOperation =
            "multiply";

        ctx.globalAlpha = 1;

        const vignette =
            ctx.createRadialGradient(

                width * .5,

                height * .5,

                Math.min(width, height) * .25,

                width * .5,

                height * .5,

                Math.max(width, height) * .75

            );

        vignette.addColorStop(

            0,

            "rgba(0,0,0,0)"

        );

        vignette.addColorStop(

            .75,

            "rgba(0,0,0,.08)"

        );

        vignette.addColorStop(

            1,

            "rgba(0,0,0,.22)"

        );

        ctx.fillStyle = vignette;

        ctx.fillRect(

            0,

            0,

            width,

            height

        );

    }

    /* ======================================================
       UPDATE
       ====================================================== */

    function update(delta) {

        time += delta * 0.001;

        for (const blob of blobs) {

            blob.update(delta);

        }

    }

    /* ======================================================
       RENDER
       ====================================================== */

    function render() {

        ctx.clearRect(

            0,

            0,

            width,

            height

        );

        drawBackground();

        ctx.globalCompositeOperation =
            "screen";

        for (const blob of blobs) {

            blob.draw();

        }

        drawAmbientLight();

        drawVignette();

    }

    /* ======================================================
       LOOP
       ====================================================== */

    function frame(now) {

        if (!running) return;

        const delta = clamp(

            now - lastFrame,

            0,

            40

        );

        lastFrame = now;

        update(delta);

        render();

        rafId =
            requestAnimationFrame(frame);

    }

    function start() {

        if (running) return;

        running = true;

        lastFrame = performance.now();

        rafId =
            requestAnimationFrame(frame);

    }

    function stop() {

        running = false;

        if (rafId !== null) {

            cancelAnimationFrame(rafId);

            rafId = null;

        }

    }

     /* ======================================================
       EVENTS
       ====================================================== */

    function onResize() {

        resize();

    }

    function onVisibilityChange() {

        if (document.hidden) {

            stop();

        } else {

            start();

        }

    }

    function bindEvents() {

        window.addEventListener(

            "resize",

            onResize,

            { passive: true }

        );

        document.addEventListener(

            "visibilitychange",

            onVisibilityChange,

            { passive: true }

        );

        window.addEventListener(

            "focus",

            start,

            { passive: true }

        );

        window.addEventListener(

            "blur",

            stop,

            { passive: true }

        );

    }

    function unbindEvents() {

        window.removeEventListener(

            "resize",

            onResize

        );

        document.removeEventListener(

            "visibilitychange",

            onVisibilityChange

        );

        window.removeEventListener(

            "focus",

            start

        );

        window.removeEventListener(

            "blur",

            stop

        );

    }

    /* ======================================================
       INIT
       ====================================================== */

    function init() {

        if (initialized) return;

        initialized = true;

        resize();

        createScene();

        bindEvents();

        render();

        start();

    }

    /* ======================================================
       DESTROY
       ====================================================== */

    function destroy() {

        if (!initialized) return;

        stop();

        unbindEvents();

        blobs.length = 0;

        initialized = false;

    }

    /* ======================================================
       PUBLIC API
       ====================================================== */

    window.KF.Background = {

        get initialized() {

            return initialized;

        },

        init,

        destroy,

        start,

        stop,

        resize

    };

})();
