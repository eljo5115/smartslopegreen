const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
let currentIndex = 0;
const imageWidth = images[0].clientWidth;

function nextSlide() {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    updateCarousel();
}

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds