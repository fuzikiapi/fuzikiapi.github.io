/* ==========================================================
   KF Platform
   Core
   ========================================================== */

(() => {
    "use strict";

    if (window.KF) return;

    window.KF = {

        version: "1.0.0",

        config: {

            debug: false,

            language: "pt-BR"

        },

        state: {

            initialized: false,

            mobile: false,

            touch: false,

            reducedMotion: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches

        },

        utils: {

            clamp(value, min, max) {

                return Math.min(max, Math.max(min, value));

            },

            lerp(start, end, amount) {

                return start + (end - start) * amount;

            },

            debounce(callback, delay = 100) {

                let timeout;

                return (...args) => {

                    clearTimeout(timeout);

                    timeout = setTimeout(() => {

                        callback(...args);

                    }, delay);

                };

            },

            throttle(callback, delay = 100) {

                let waiting = false;

                return (...args) => {

                    if (waiting) return;

                    waiting = true;

                    callback(...args);

                    setTimeout(() => {

                        waiting = false;

                    }, delay);

                };

            }

        }

    };

})();
