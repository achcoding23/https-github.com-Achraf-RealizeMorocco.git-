// ============================================================
// REALIZE MOROCCO - MOBILE MENU SCRIPT
// Add this script to all your HTML pages
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Create mobile menu toggle button
    const header = document.querySelector('header .container');
    const nav = document.querySelector('header nav');
    
    // Check if elements exist
    if (header && nav) {
        // Create hamburger button
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle Mobile Menu');
        
        // Insert button into header
        header.appendChild(menuToggle);
        
        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('active');
            
            // Change icon
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (nav.classList.contains('active') && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 768) {
                    nav.classList.remove('active');
                    menuToggle.querySelector('i').className = 'fas fa-bars';
                }
            }, 250);
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add current year to footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Lazy loading for images (improves mobile performance)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Handle orientation change on mobile devices
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 100);
});

// Prevent iOS double-tap zoom on buttons
document.addEventListener('touchend', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('.btn')) {
        e.preventDefault();
        e.target.click();
    }
}, { passive: false });
