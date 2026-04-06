document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       HAMBURGER MENU
       ========================================= */
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const menuLinks = document.querySelectorAll('.menu-link');

    function openMenu() {
        menuToggle.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuToggle.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuToggle.addEventListener('click', () => {
        menuOverlay.classList.contains('active') ? closeMenu() : openMenu();
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closeMenu();

            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 300);
            }
        });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    /* =========================================
       SCROLL REVEAL
       ========================================= */
    const revealTargets = document.querySelectorAll(
        '.section-heading, .about-grid, .exp-card, .project-card, ' +
        '.skills-grid, .certificates, .contact-links, .contact-location'
    );

    revealTargets.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealTargets.forEach(el => revealObserver.observe(el));

    /* =========================================
       STAGGERED PROJECT CARDS
       ========================================= */
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.1}s`;
    });
});
