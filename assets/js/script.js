const featureImageElement = document.querySelector(".feature-image__img");

const featureImages = [
    "assets/images/feature-pool.webp",
    "assets/images/feature-model.webp",
    "assets/images/feature-exterior.webp"
];

let currentImage = 0;

setInterval(() => {
    currentImage++;

    if (currentImage >= featureImages.length) {
        currentImage = 0;
    }

    featureImageElement.src = featureImages[currentImage];
}, 5000);
