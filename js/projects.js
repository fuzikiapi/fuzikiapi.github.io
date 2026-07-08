/* ==========================================================
   KF Platform
   Projects
   ========================================================== */

(() => {
    "use strict";

    let container;

    function init() {

        container =
            document.getElementById(
                "projectsContainer"
            );

        if (!container) return;

        render();

    }

    function render() {

        container.innerHTML = "";

        if (!window.PROJECTS) return;

        PROJECTS.forEach(project => {

            container.appendChild(

                createCard(project)

            );

        });

    }

    function createCard(project) {

        const card =
            document.createElement("article");

        card.className =
            "project-card";

        card.innerHTML = `

            <img
                src="${project.image}"
                alt="${project.title}"
                class="project-image"
            >

            <div class="project-content">

                <h3>

                    ${project.title}

                </h3>

                <p>

                    ${project.description}

                </p>

                <div class="project-technologies">

                    ${renderTechnologies(project.technologies)}

                </div>

                <div class="project-footer">

                    <span class="project-status">

                        ${project.status}

                    </span>

                    <div class="project-links">

                        ${
                            project.github
                                ? `
                                <a
                                    href="${project.github}"
                                    target="_blank"
                                >
                                    GitHub
                                </a>
                                `
                                : ""
                        }

                        ${
                            project.demo
                                ? `
                                <a
                                    href="${project.demo}"
                                    target="_blank"
                                >
                                    Demo
                                </a>
                                `
                                : ""
                        }

                    </div>

                </div>

            </div>

        `;

        return card;

    }

    function renderTechnologies(list) {

        if (!list?.length) return "";

        return list.map(item =>

            `<span class="tech-badge">${item}</span>`

        ).join("");

    }

    KF.Projects = {

        init

    };

})();
