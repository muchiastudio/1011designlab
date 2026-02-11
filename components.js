/* =========================================
   COMPONENTS.JS - CONSTRUCTORUL DE SITE
   ========================================= */

// 1. HEADER TEMPLATE (Include si div-ul pentru Burger!)
const headerTemplate = `
    <header id="main-header">
        <div class="container nav-container">
            <a href="index.html" class="logo">1011 <span>design lab.</span></a>
            <nav>
                <ul class="nav-links">
                    <li><a href="despre.html">Despre</a></li>
                    <li><a href="portofoliu.html">Portofoliu</a></li>
                    <li><a href="servicii.html">Servicii</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
                <div class="burger">
                    <div class="line1"></div>
                    <div class="line2"></div>
                    <div class="line3"></div>
                </div>
            </nav>
        </div>
    </header>
`;

// 2. FOOTER TEMPLATE
const footerTemplate = `
    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <a href="index.html" class="footer-logo">1011 <span>design lab.</span></a>
                <p>Aesthetic. Vision. Refined.<br>Arhitectură și design interior cu poveste.</p>
            </div>
            <div class="footer-col">
                <h4>Explorare</h4>
                <ul>
                    <li><a href="index.html">Acasă</a></li>
                    <li><a href="despre.html">Despre Noi</a></li>
                    <li><a href="portofoliu.html">Portofoliu</a></li>
                    <li><a href="servicii.html">Servicii</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <p>București, România</p>
                <p style="color:var(--accent-color);">hello@1011designlab.com</p>
            </div>
            <div class="footer-col">
                <h4>Social</h4>
                <ul>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Facebook</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy; 2026 1011 Design Lab. Toate drepturile rezervate. Powered by MUCHIA / Studio.
        </div>
    </footer>
`;

// 3. FUNCTIA PRINCIPALA
function loadComponents() {
    // A. Injectam Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
        
        // --- ACTIVARE LINK ROSU (PAGINA CURENTA) ---
        const currentPage = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if(link.getAttribute('href') === currentPage) {
                link.classList.add('active');
                link.style.color = "#9e2a2b";
            }
        });

        // --- ACTIVARE MENIU BURGER (CRUCIAL!) ---
        // Aici apelam functia din script.js
        if (window.initMobileMenu) {
            window.initMobileMenu();
        }
    }

    // B. Injectam Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
    }
}

// 4. DECLANSAM TOTUL CAND HTML-ul E GATA
document.addEventListener("DOMContentLoaded", loadComponents);