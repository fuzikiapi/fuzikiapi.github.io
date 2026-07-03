/*
=========================================
AETHER v2
script.js
=========================================
*/

document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loaded");

    /* ============================
       Typing Effect
    ============================ */

    const text = [
        "Developer",
        "Discord Developer",
        "Open Source",
        "Tech Enthusiast",
        "UI Explorer",
        "Building the future."
    ];

    const target = document.getElementById("typing-text");

    let word = 0;
    let char = 0;
    let deleting = false;

    function type() {

        if (!target) return;

        const current = text[word];

        if (!deleting) {

            target.textContent = current.substring(0, char++);

            if (char > current.length) {

                deleting = true;

                setTimeout(type, 1800);

                return;

            }

        } else {

            target.textContent = current.substring(0, char--);

            if (char < 0) {

                deleting = false;

                word++;

                if (word >= text.length) {

                    word = 0;

                }

            }

        }

        setTimeout(type, deleting ? 35 : 80);

    }

    type();

    /* ============================
       Scroll Reveal
    ============================ */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    }, {
        threshold: .15
    });

    document.querySelectorAll(".content").forEach(section => {

        observer.observe(section);

    });

    /* ============================
       Smooth Scroll
    ============================ */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            const target = document.querySelector(link.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

        /* ============================
       Loader
    ============================ */

    window.addEventListener("load", () => {

        const loader = document.getElementById("loader");

        setTimeout(() => {

            loader.classList.add("hidden");

        },1200);

    });
    
});
