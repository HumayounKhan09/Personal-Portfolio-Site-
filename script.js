// ===================================
// Portfolio Site - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initEyeTracking();
    initGlitchEffects();
    initContactForm();
    initParallax();
});

// ===================================
// Navigation
// ===================================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navItems.forEach(item => item.classList.remove('active'));
                link?.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        { selector: '.about-image', class: 'slide-in-left' },
        { selector: '.about-text', class: 'slide-in-right' },
        { selector: '.project-card', class: 'fade-in' },
        { selector: '.contact-info', class: 'slide-in-left' },
        { selector: '.contact-form', class: 'slide-in-right' },
        { selector: '.section-header', class: 'fade-in' }
    ];

    animatedElements.forEach(({ selector, class: animClass }) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add(animClass);
            el.style.transitionDelay = `${index * 0.1}s`;
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// ===================================
// Eye Tracking (follows mouse)
// ===================================
function initEyeTracking() {
    const eye = document.querySelector('.tech-eye');
    const pupil = document.querySelector('.eye-pupil');
    const iris = document.querySelector('.eye-iris');
    
    if (!eye || !pupil) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateEye() {
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;

        const deltaX = mouseX - eyeCenterX;
        const deltaY = mouseY - eyeCenterY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const maxMove = 15;
        const angle = Math.atan2(deltaY, deltaX);
        const moveDistance = Math.min(distance / 20, maxMove);
        
        const targetX = Math.cos(angle) * moveDistance;
        const targetY = Math.sin(angle) * moveDistance;
        
        // Smooth interpolation
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
        
        pupil.style.transform = `translate(calc(-50% + ${currentX}px), calc(-50% + ${currentY}px))`;
        iris.style.transform = `translate(calc(-50% + ${currentX * 0.5}px), calc(-50% + ${currentY * 0.5}px))`;
        
        requestAnimationFrame(animateEye);
    }

    animateEye();

    // Blink effect
    setInterval(() => {
        if (Math.random() > 0.7) {
            eye.style.transform = 'scaleY(0.1)';
            setTimeout(() => {
                eye.style.transform = 'scaleY(1)';
            }, 150);
        }
    }, 3000);
}

// ===================================
// Random Glitch Effects
// ===================================
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    function triggerGlitch(element) {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    }

    // Random glitch triggers
    setInterval(() => {
        if (Math.random() > 0.8) {
            const randomElement = glitchElements[Math.floor(Math.random() * glitchElements.length)];
            if (randomElement) {
                triggerGlitch(randomElement);
            }
        }
    }, 2000);

    // Screen glitch effect
    function createScreenGlitch() {
        const glitch = document.createElement('div');
        glitch.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}%;
            left: 0;
            width: 100%;
            height: ${5 + Math.random() * 10}px;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(0, 255, 255, 0.1), 
                rgba(255, 0, 255, 0.1), 
                transparent);
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(glitch);
        
        setTimeout(() => {
            glitch.remove();
        }, 100);
    }

    setInterval(() => {
        if (Math.random() > 0.9) {
            createScreenGlitch();
        }
    }, 1000);

    // Text scramble effect on hover
    const scrambleElements = document.querySelectorAll('.project-title, .section-title');
    
    scrambleElements.forEach(element => {
        const originalText = element.textContent;
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        
        element.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                element.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iterations) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');
                
                if (iterations >= originalText.length) {
                    clearInterval(interval);
                    element.textContent = originalText;
                }
                
                iterations += 1/2;
            }, 30);
        });
    });
}

// ===================================
// Contact Form
// ===================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.querySelector('.btn-text').textContent;
        
        // Loading state
        button.querySelector('.btn-text').textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        button.querySelector('.btn-text').textContent = 'Message Sent!';
        button.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';
        
        // Reset form
        form.reset();
        
        // Reset button after delay
        setTimeout(() => {
            button.querySelector('.btn-text').textContent = originalText;
            button.style.background = '';
            button.disabled = false;
        }, 3000);
    });

    // Input focus effects
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===================================
// Parallax Effects
// ===================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.tech-eye-container, .bg-grid');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('tech-eye-container') ? 0.3 : 0.1;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Mouse parallax for hero section
    const hero = document.querySelector('.hero');
    const techEye = document.querySelector('.tech-eye');
    
    if (hero && techEye) {
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            
            const xPos = (clientX - innerWidth / 2) / innerWidth;
            const yPos = (clientY - innerHeight / 2) / innerHeight;
            
            techEye.style.transform = `translate(${xPos * 20}px, ${yPos * 20}px)`;
        });
    }
}

// ===================================
// Utility Functions
// ===================================

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    setTimeout(() => {
        document.querySelector('.hero-content')?.classList.add('visible');
    }, 300);
});

// Console Easter Egg
console.log('%c ⚡ Welcome to my portfolio! ⚡ ', 
    'background: linear-gradient(90deg, #00ffff, #ff00ff); color: #000; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion and a love for creative coding.', 
    'color: #00ffff; font-size: 12px;');
