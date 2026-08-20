function initProjects() {
    const grid = document.querySelector(".projects-grid");

    if (!grid) return;

    let projects = [];

    async function loadProjects() {
        const response = await fetch("assets/data/projects.json");

        projects = await response.json();

        renderProjects(projects);
    }

    function renderProjects(items) {
        grid.innerHTML = "";

        items.forEach((project, index) => {
            const card = document.createElement("article");
            card.className = "project-card--page";

            let cardsPerRow = 3;

            if (window.innerWidth <= 1100) {
                cardsPerRow = 2;
            }

            if (window.innerWidth <= 900) {
                cardsPerRow = 1;
            }

            card.style.animationDelay = `${Math.floor(index / cardsPerRow) * 0.1}s`;
            card.dataset.category = project.slug;

            card.innerHTML = `
                <div class="project-card--page__image">

                    <img
                        src="assets/images/projects-images/${project.image}"
                        loading="lazy"
                        decoding="async"
                        alt="${project.title}"
                    >

                </div>


                <div class="project-card--page__info">

                    <div>

                        <h3>
                            ${project.title}
                        </h3>


                        <span class="project-card--page__type">
                            ${project.category}
                        </span>

                    </div>


                    <span class="project-card--page__location">
                        ${project.location}
                    </span>

                </div>
            `;

            grid.appendChild(card);
        });
    }

    function filterProjects(category) {
        if (category === "all") {
            renderProjects(projects);

            return;
        }

        const filtered = projects.filter((project) => {
            return project.slug === category;
        });

        renderProjects(filtered);
    }

    const buttons = document.querySelectorAll(".filter-button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            filterProjects(button.dataset.filter);
        });
    });

    loadProjects();
}

document.addEventListener("DOMContentLoaded", () => {
    initProjects();
});
