/* ==========================================================
   KF Platform
   Background
   Parte 1
   ========================================================== */

(() => {
    "use strict";

    /* ======================================================
       CONFIG
       ====================================================== */

    const CONFIG = {

        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),

        blobCount: 6,

        blur: 160,

        opacity: 0.22,

        speed: 0.18,

        colors: [
            "#4E7DFF",
            "#6EE7F7",
            "#8B5CF6",
            "#6D4AFF",
            "#D946EF"
        ]

    };

    /* ======================================================
       CANVAS
       ====================================================== */

    const canvas = document.getElementById("aurora-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
        alpha: true,
        desynchronized: true
    });

    let width = 0;
    let height = 0;

    let time = 0;

    /* ======================================================
       HELPERS
       ====================================================== */

    const random = (min, max) =>
        Math.random() * (max - min) + min;

    const lerp = (a, b, t) =>
        a + (b - a) * t;

    const clamp = (v, min, max) =>
        Math.min(max, Math.max(min, v));

    /* ======================================================
       SIMPLE NOISE
       ====================================================== */

    function noise(x, y, t) {

        return (

            Math.sin(x * 0.0019 + t) *

            Math.cos(y * 0.0014 - t * .7) +

            Math.sin((x + y) * 0.0008 + t * .35)

        ) * .5;

    }

    /* ======================================================
       RESIZE
       ====================================================== */

    function resize() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width * CONFIG.pixelRatio;
        canvas.height = height * CONFIG.pixelRatio;

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        ctx.setTransform(
            CONFIG.pixelRatio,
            0,
            0,
            CONFIG.pixelRatio,
            0,
            0
        );

    }

    window.addEventListener("resize", resize);

    resize();

    /* ======================================================
       BLOB
       ====================================================== */

    class Blob {

        constructor(index) {

            this.index = index;

            this.reset();

        }

        reset() {

            this.radius =
                random(
                    Math.min(width, height) * .18,
                    Math.min(width, height) * .34
                );

            this.x =
                random(0, width);

            this.y =
                random(0, height);

            this.offset =
                random(0, 1000);

            this.speed =
                random(.3, 1.2);

            this.amplitude =
                random(40, 140);

            this.color =
                CONFIG.colors[
                    Math.floor(
                        random(
                            0,
                            CONFIG.colors.length
                        )
                    )
                ];

        }

        update(dt) {

            const n = noise(
                this.x,
                this.y,
                time * .2 + this.offset
            );

            this.x +=
                Math.cos(
                    time * this.speed + this.offset
                ) *
                CONFIG.speed *
                this.amplitude *
                dt *
                .05;

            this.y +=
                Math.sin(
                    time * this.speed + this.offset + n
                ) *
                CONFIG.speed *
                this.amplitude *
                dt *
                .05;

            if (this.x < -this.radius)
                this.x = width + this.radius;

            if (this.x > width + this.radius)
                this.x = -this.radius;

            if (this.y < -this.radius)
                this.y = height + this.radius;

            if (this.y > height + this.radius)
                this.y = -this.radius;

        }

        draw(context) {

            const gradient =
                context.createRadialGradient(
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
                .45,
                this.color + "66"
            );

            gradient.addColorStop(
                1,
                this.color + "00"
            );

            context.fillStyle = gradient;

            context.beginPath();

            context.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            context.fill();

        }

    }

    /* ======================================================
       SCENE
       ====================================================== */

    const blobs = [];

    for (let i = 0; i < CONFIG.blobCount; i++) {

        blobs.push(new Blob(i));

    }

    /* ======================================================
       BACKGROUND
       ====================================================== */

    function drawBackground() {

        const background =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        background.addColorStop(
            0,
            "#040406"
        );

        background.addColorStop(
            .45,
            "#07070a"
        );

        background.addColorStop(
            1,
            "#050507"
        );

        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;

        ctx.fillStyle = background;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

    }

    /* ======================================================
       BLOBS
       ====================================================== */

    function drawBlobs() {

        ctx.save();

        ctx.filter = `blur(${CONFIG.blur}px)`;

        ctx.globalCompositeOperation = "screen";

        ctx.globalAlpha = CONFIG.opacity;

        for (const blob of blobs) {

            blob.draw(ctx);

        }

        ctx.restore();

    }

    /* ======================================================
       LIGHT
       ====================================================== */

    function drawAmbientLight() {

        const gradient =
            ctx.createRadialGradient(
                width * .5,
                height * .2,
                0,
                width * .5,
                height * .2,
                Math.max(width, height)
            );

        gradient.addColorStop(
            0,
            "rgba(255,255,255,.05)"
        );

        gradient.addColorStop(
            .35,
            "rgba(110,231,247,.03)"
        );

        gradient.addColorStop(
            .75,
            "rgba(78,125,255,.015)"
        );

        gradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        ctx.globalCompositeOperation = "screen";

        ctx.fillStyle = gradient;

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

        const vignette =
            ctx.createRadialGradient(

                width * .5,
                height * .5,
                Math.min(width, height) * .28,

                width * .5,
                height * .5,
                Math.max(width, height) * .75

            );

        vignette.addColorStop(
            0,
            "rgba(0,0,0,0)"
        );

        vignette.addColorStop(
            .82,
            "rgba(0,0,0,.08)"
        );

        vignette.addColorStop(
            1,
            "rgba(0,0,0,.22)"
        );

        ctx.globalCompositeOperation = "multiply";

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

        for (const blob of blobs) {

            blob.update(delta);

        }

    }

    /* ======================================================
       RENDER
       ====================================================== */

    function render() {

        drawBackground();

        drawBlobs();

        drawAmbientLight();

        drawVignette();

    }

    /* ======================================================
       FPS CLOCK
       ====================================================== */

    let previousTime =
        performance.now();

   let rafId = null;
   
    function frame(now) {

        const delta =
            clamp(
                (now - previousTime) / 16.666,
                0,
                2
            );

        previousTime = now;

        time +=
            delta * 0.01;

        update(delta);

        render();

        rafId = requestAnimationFrame(frame);

    }

     /* ======================================================
       VISIBILITY CONTROL
       ====================================================== */

    let running = true;

    function start() {

        if (running) return;

        running = true;

        previousTime = performance.now();

        rafId = requestAnimationFrame(frame);
       
    }

    function stop() {

    running = false;

    if (rafId !== null) {

        cancelAnimationFrame(rafId);

        rafId = null;

    }

}

    /* ======================================================
       RAF LOOP
       ====================================================== */

    function animationLoop(now) {

        if (!running) {

            return;

        }

        frame(now);

    }

    /* ======================================================
       PAGE VISIBILITY
       ====================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (document.hidden) {

                stop();

            } else {

                start();

            }

        },
        { passive: true }
    );

    /* ======================================================
       CANVAS CONTEXT EVENTS
       ====================================================== */

    canvas.addEventListener(
        "contextlost",
        (event) => {

            event.preventDefault();

            stop();

        },
        false
    );

    canvas.addEventListener(
        "contextrestored",
        () => {

            resize();

            start();

        },
        false
    );

    /* ======================================================
       COLOR REFRESH
       ====================================================== */

    function randomizePalette() {

        for (const blob of blobs) {

            blob.color =
                CONFIG.colors[
                    Math.floor(
                        random(
                            0,
                            CONFIG.colors.length
                        )
                    )
                ];

        }

    }

    setInterval(
        randomizePalette,
        45000
    );

    /* ======================================================
       WINDOW FOCUS
       ====================================================== */

    window.addEventListener(
        "focus",
        () => {

            start();

        },
        { passive: true }
    );

    window.addEventListener(
        "blur",
        () => {

            stop();

        },
        { passive: true }
    );

    /* ======================================================
       INITIALIZATION
       ====================================================== */

    resize();

    requestAnimationFrame(animationLoop);

})();
