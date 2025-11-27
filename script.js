/**
 * Portfolio JavaScript
 * Handles: Smooth scrolling, mobile menu, scroll animations, navigation state
 */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // ============================================
    // MOBILE MENU
    // ============================================
    const navToggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
    
    function openMobileMenu() {
        navToggle.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    navToggle.addEventListener('click', () => {
        if (mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // ============================================
    // NAVIGATION SCROLL STATE
    // ============================================
    const nav = document.querySelector('.nav');
    let lastScroll = 0;
    
    function handleNavScroll() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            nav.style.boxShadow = '0 1px 20px rgba(0, 0, 0, 0.08)';
        } else {
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================
    const revealElements = document.querySelectorAll(
        '.section-header, .about-image, .about-text, .timeline-item, ' +
        '.skill-category, .certifications, .contact-intro, .contact-links'
    );
    
    // Add reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('reveal');
    });
    
    // Intersection Observer for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ============================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        const navHeight = nav.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation, { passive: true });

    // ============================================
    // STAGGER TIMELINE ITEM ANIMATIONS
    // ============================================
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.15}s`;
    });

    // ============================================
    // SKILL CATEGORY STAGGER
    // ============================================
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        // Close mobile menu on Escape
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ============================================
    // PRELOADER (if needed for images)
    // ============================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ============================================
// UTILITY: Throttle function for performance
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

