/* =====================================================
   1. MENU BURGER & MOBILE NAVIGATION
   Această funcție este "globală" pentru a putea fi apelată
   din components.js imediat ce Header-ul este creat.
   ===================================================== */
window.initMobileMenu = function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Verificăm dacă elementele există înainte să adăugăm click
    if (burger && nav) {
        // Truc pentru a elimina event listeners vechi (clonează elementul)
        const newBurger = burger.cloneNode(true);
        if(burger.parentNode) {
            burger.parentNode.replaceChild(newBurger, burger);
        }

        newBurger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');
            
            // Burger Animation (transformare în X)
            newBurger.classList.toggle('toggle');
            
            // Animate Links (apar unul câte unul)
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
        console.log("Meniu mobil inițializat.");
    }
};

/* =====================================================
   2. HEADER SCROLL EFFECT (LOGICA COMPLETA)
   Se asigura ca header-ul e corect si la incarcare, si la scroll
   ===================================================== */
function updateHeader() {
    const header = document.getElementById('main-header');
    const hasHero = document.querySelector('.hero-fullscreen'); // Verificam daca avem poza mare

    if (!header) return;

    // SCENARIUL 1: Am dat scroll in jos
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } 
    // SCENARIUL 2: Suntem sus de tot
    else {
        if (hasHero) {
            // Daca e Homepage (are Hero), il facem TRANSPARENT
            header.classList.remove('scrolled');
        } else {
            // Daca e pagina interna (nu are Hero), il fortam ALB
            header.classList.add('scrolled');
        }
    }
}

// Rulam functia cand dam scroll
window.addEventListener('scroll', updateHeader);

// DAR O RULAM SI IMEDIAT CE SE INCARCA PAGINA (Asta repara problema ta!)
window.addEventListener('load', updateHeader);
// Si inca o data rapid pentru siguranta (pt module)
document.addEventListener('DOMContentLoaded', updateHeader);

/* =====================================================
   3. SCROLL ANIMATIONS (Intersection Observer)
   Face ca elementele să apară elegant (fade-in) la scroll
   ===================================================== */
const observerOptions = {
    threshold: 0.1, // Se declanșează când 10% din element e vizibil
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Nu mai observă după ce a apărut
        }
    });
}, observerOptions);

// Pornim observatorul când pagina e gata
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.animate-block');
    elements.forEach(el => observer.observe(el));
});

/* =====================================================
   4. FILTRU PORTOFOLIU (Funcția ta veche, păstrată)
   ===================================================== */
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Schimbă clasa activă pe butoane
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'Toate')) {
            btn.classList.add('active');
        }
    });

    // Ascunde/Arată proiecte
    projects.forEach(project => {
        // Verificam daca elementul este un link <a> sau div si cautam in interior sau atribut
        // Daca folosesti structura noua, atributul e pe <a>
        const projectCategory = project.querySelector('.category') ? project.querySelector('.category').innerText.toLowerCase() : '';
        
        // Logica simplificata pentru demo (poti adapta in functie de structura HTML exacta)
        // Daca vrei filtrare stricta pe categorii, asigura-te ca ai data-category pe elemente
        // Momentan lasam codul tau de baza:
        if(category === 'all') {
             project.style.display = 'block';
        } else {
             // Aici e nevoie de o logica specifica daca folosesti data-category
             // Pentru moment, pe homepage nu ai filtre, deci e ok.
             project.style.display = 'block'; 
        }
    });
}

/* =====================================================
   5. SMOOTH SCROLL (Link-uri interne)
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* =====================================================
   6. SAFETY NET (PENTRU PAGINA ALBĂ)
   Dacă ceva nu merge, forțăm elementele să apară după 0.5s
   ===================================================== */
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelectorAll('.animate-block').forEach(el => {
            el.classList.add('is-visible');
        });
        
        // Fortam header alb pe pagini interne (fara hero)
        if(!document.querySelector('.hero-fullscreen')) {
            const header = document.getElementById('main-header');
            if(header) header.classList.add('scrolled');
        }
    }, 500);
});


/* =========================================
   INITIALIZARE SWIPER GALLERY
   ========================================= */
// Verificam daca exista slider in pagina inainte sa rulam codul
if (document.querySelector('.mySwiper')) {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // Pe mobil arata 1
        spaceBetween: 30, // Spatiu intre ele
        loop: true, // Se invarte infinit
        grabCursor: true, // Cursor de "trage"
        
        // Navigare (Sageti)
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        
        // Puncte jos
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        // Setari pentru ecrane mai mari
        breakpoints: {
            768: {
                slidesPerView: 2, // Pe tableta: 2 poze
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3, // Pe desktop: 3 poze
                spaceBetween: 40,
            },
        },
    });
}

/* =========================================
   ACTIVARE LIGHTBOX (GLIGHTBOX)
   ========================================= */
const lightbox = GLightbox({
    selector: '.glightbox', // Cauta elementele cu clasa asta
    touchNavigation: true,  // Swipe pe mobil in modul full screen
    loop: true,             // Se invarte infinit
    zoomable: true          // Permite zoom pe poza
});