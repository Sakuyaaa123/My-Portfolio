const texts = [
    "Game Developer",
    "Technical Game Designer",
    "Multi-Disciplinary Artist"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const typingElement = document.getElementById("typing");

    if (!typingElement) return;

    const currentText = texts[textIndex];

    if (!isDeleting) {
        typingElement.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeLoop, 2000);
            return;
        }
    } else {
        typingElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeLoop, 500);
            return;
        }
    }

    setTimeout(typeLoop, isDeleting ? 50 : 100);
}

typeLoop();

function goToTop(){
    window.scrollTo({ top: 0});
}

function showMainPage() {
    const main = document.getElementById("mainpage");
    const sub = document.getElementById("firstsub");

    if (main) main.style.display = "block";
    if (sub) sub.style.display = "none";
}

function onClickProjects(id) {
    window.location.replace(id);
}

function scrollToSection(id){
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({behavior:'smooth'});
}

window.addEventListener("load", () => {
    const home = document.querySelector("#home");

    if (home) {
        home.classList.add("show");
    }

    const sections = document.querySelectorAll(".fade");
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            section.classList.add("show");
        }
    });
});

window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".fade");

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.75;

        if (rect.top < triggerPoint && rect.bottom > 0) {
            section.classList.add("show");
        } else {
            section.classList.remove("show");
        }
    });

    const btn = document.querySelector('.top-btn');
    if (btn) {
        btn.style.display = window.scrollY > 300 ? 'block' : 'none';
    }
});

function scrollToTop(){
    window.scrollTo({top:0,behavior:'smooth'});
}

let currentSlide = 0;
let carouselImages = [];

let isFolderOutside = false;

function openViewer(card) {
    const viewer = document.getElementById("imageViewer");
    const viewerImg = document.getElementById("viewerImg");
    const carousel = document.getElementById("carousel");
    const carouselImg = document.getElementById("carouselImg");
    const dotsContainer = document.getElementById("dots");
    const viewerNumber = document.getElementById("viewerNumber");
    const caption = card.querySelector(".caption").innerText;

    document.getElementById("viewerCaption").textContent = caption;

    const isFolder = card.dataset.folder === "true";

    if (isFolder) {
        viewerImg.style.display = "none";
        carousel.style.display = "block";
        viewerNumber.style.display = "block";

        const imgs = card.querySelectorAll(".carousel-data img");
        carouselImages = Array.from(imgs).map(img => img.src);

        currentSlide = 0;
        updateCarousel();

    } else {
        carousel.style.display = "none";
        viewerImg.style.display = "block";
        viewerNumber.style.display = "none";

        const img = card.querySelector("img").src;
        viewerImg.src = img;
    }

    viewer.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeViewer() {
    const viewer = document.getElementById("imageViewer");

    viewer.style.display = "none";

    document.body.style.overflow = "auto";
}

document.getElementById("imageViewer").addEventListener("click", function(e) {
    if (e.target.id === "imageViewer") {
        closeViewer();
    }
});

function updateCarousel() {
    const carouselImg = document.getElementById("carouselImg");
    const dotsContainer = document.getElementById("dots");
    const viewerNumber = document.getElementById("viewerNumber");

    carouselImg.src = carouselImages[currentSlide];

    viewerNumber.textContent = `${currentSlide + 1}/${carouselImages.length}`;

    const maxDots = 10;
    
    const total = carouselImages.length;

    dotsContainer.innerHTML = "";

    let visibleDots = Math.min(total, maxDots);

    let activeDot;

    if (total <= maxDots) {
        activeDot = currentSlide;
    } else {
        activeDot = Math.min(currentSlide, maxDots - 1);
    }

    for (let i = 0; i < visibleDots; i++) {
        const dot = document.createElement("span");

        if (i === activeDot) {
            dot.classList.add("active");
        }

        dot.onclick = () => {
            if (total <= maxDots) {
                currentSlide = i;
            } else {
                const ratio = i / (maxDots - 1);
                currentSlide = Math.floor(ratio * (total - 1));
            }
            updateCarousel();
        };

        dotsContainer.appendChild(dot);
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselImages.length;
    updateCarousel();
}

function prevSlide() {
    currentSlide =
        (currentSlide - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
}
