// ===============================
// REVEAL AO SCROLL
// ===============================
const reveals = document.querySelectorAll(".section-reveal");

const reveal = () => {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
            el.classList.add("active");
        }
    });
};

window.addEventListener("scroll", reveal);
reveal();


// ===============================
// CARROSSEL SLIDE POR SLIDE
// ===============================
const track = document.getElementById('carouselTrack');
const container = document.querySelector('.carousel-container');

let slides = Array.from(track.children);
const slideGap = 30; // mesmo gap do CSS
let slideWidth = slides[0].offsetWidth + slideGap;
let index = 0;
let autoPlay = true;
let autoInterval;

// Duplica para loop infinito
track.innerHTML += track.innerHTML;
slides = Array.from(track.children);

// Botões
const btnPrev = document.createElement('button');
btnPrev.className = 'carousel-btn prev';
btnPrev.innerHTML = '&#10094;';

const btnNext = document.createElement('button');
btnNext.className = 'carousel-btn next';
btnNext.innerHTML = '&#10095;';

container.appendChild(btnPrev);
container.appendChild(btnNext);

// Atualiza largura ao redimensionar
function updateSlideWidth() {
    slideWidth = slides[0].offsetWidth + slideGap;
}
window.addEventListener('resize', updateSlideWidth);

// Move para slide específico
function goToSlide(i) {
    index = i;
    track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(${-index * slideWidth}px)`;

    // Loop invisível
    if (index >= slides.length / 2) {
        setTimeout(() => {
            track.style.transition = 'none';
            index = 0;
            track.style.transform = `translateX(0px)`;
        }, 500);
    }

    if (index < 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            index = (slides.length / 2) - 1;
            track.style.transform = `translateX(${-index * slideWidth}px)`;
        }, 500);
    }
}

// Setas
btnNext.addEventListener('click', () => {
    pauseAuto();
    goToSlide(index + 1);
});

btnPrev.addEventListener('click', () => {
    pauseAuto();
    goToSlide(index - 1);
});

// Auto play
function startAuto() {
    autoInterval = setInterval(() => {
        if (autoPlay) {
            goToSlide(index + 1);
        }
    }, 2800);
}

function pauseAuto() {
    autoPlay = false;
    clearTimeout(window.autoTimer);
    window.autoTimer = setTimeout(() => {
        autoPlay = true;
    }, 4000);
}

startAuto();

// Pausa ao hover
container.addEventListener('mouseenter', () => autoPlay = false);
container.addEventListener('mouseleave', () => autoPlay = true);


// ===============================
// FAQ ACCORDION
// ===============================
document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
        const body = header.nextElementSibling;

        document.querySelectorAll(".accordion-body").forEach(b => {
            if (b !== body) b.style.maxHeight = null;
        });

        body.style.maxHeight = body.style.maxHeight
            ? null
            : body.scrollHeight + "px";
    });
});


// ===============================
// SMOOTH SCROLL
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});