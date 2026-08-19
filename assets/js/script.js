document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimation();
    initHeroSlider();
    initMenu();
    initFeatureImage();
});

/* ================================= Scroll Animation ================================= */
function initScrollAnimation() {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
        },
    );

    elements.forEach((element) => {
        observer.observe(element);
    });
}

/* ================================= Toggle Menu ================================= */
function initMenu() {
    const button = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");

    if (!button || !nav) return;

    const links = nav.querySelectorAll("a");

    function closeMenu() {
        button.classList.remove("active");
        nav.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
    }

    button.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active");

        button.classList.toggle("active");

        button.setAttribute("aria-expanded", isOpen);
    });

    links.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });
}

/* ================================= Hero Slider ================================= */
function initHeroSlider() {
    const slider = document.querySelector(".hero-slider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".hero-slide");
    const location = document.querySelector(".hero__location");
    const counter = document.querySelector(".hero__counter");

    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

        location.textContent = slides[index].dataset.title;
        counter.textContent = `${String(index + 1).padStart(2, "0")}/${String(slides.length).padStart(2, "0")}`;
    }

    function nextSlide() {
        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);
    }

    function previousSlide() {
        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);
    }

    showSlide(currentSlide);

    setInterval(nextSlide, 6000);

    let startX = 0;

    slider.addEventListener("touchstart", (event) => {
        startX = event.touches[0].clientX;
    });

    slider.addEventListener("touchend", (event) => {
        const endX = event.changedTouches[0].clientX;
        const distance = startX - endX;

        if (Math.abs(distance) < 50) return;

        if (distance > 0) {
            nextSlide();
        } else {
            previousSlide();
        }
    });
}

/* ================================= Feature Image ================================= */
function initFeatureImage() {
    const featureImageElement = document.querySelector(".feature-image__img");

    if (!featureImageElement) return;

    const featureImages = [
        "assets/images/feature-pool.webp",
        "assets/images/feature-model.webp",
        "assets/images/feature-exterior.webp",
    ];

    let currentImage = 0;

    setInterval(() => {
        currentImage++;

        if (currentImage >= featureImages.length) {
            currentImage = 0;
        }

        featureImageElement.src = featureImages[currentImage];
    }, 5000);
}
