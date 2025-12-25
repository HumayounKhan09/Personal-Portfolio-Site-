// ===================================
// Portfolio Site - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initEyeTracking();
    initStaticParticles();
    // initASCIIAnimation(); // Disabled - using Framer component
    // initScreenGlitch(); // Disabled - using Framer component
    initGlitchEffects();
    initContactForm();
    initParallax();
    initAccessSequence();
    
    // Immediate check to make about section visible if needed
    setTimeout(() => {
        const aboutSection = document.querySelector('#about.about');
        if (aboutSection) {
            // Simple scroll listener to make it visible
            const makeAboutVisible = () => {
                const scrollY = window.scrollY || window.pageYOffset;
                if (scrollY > 100) { // After 100px scroll, make it visible
                    aboutSection.classList.add('visible');
                    aboutSection.style.setProperty('opacity', '1', 'important');
                    aboutSection.style.setProperty('visibility', 'visible', 'important');
                    aboutSection.style.setProperty('display', 'block', 'important');
                }
            };
            
            window.addEventListener('scroll', makeAboutVisible, { passive: true });
            makeAboutVisible(); // Check immediately
        }
    }, 100);
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
                
                // Make about section visible when it comes into view (aggressive fallback)
                if (entry.target.classList.contains('about')) {
                    entry.target.classList.add('visible');
                    // Force visibility with inline styles
                    entry.target.style.setProperty('opacity', '1', 'important');
                    entry.target.style.setProperty('visibility', 'visible', 'important');
                    entry.target.style.setProperty('display', 'block', 'important');
                    entry.target.style.setProperty('z-index', '10', 'important');
                    console.log('About section made visible by intersection observer');
                }
            }
        });
    }, observerOptions);

    // Observe all sections to ensure they become visible
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
    
        // Additional aggressive check for about section - make it visible when scrolled to
        const aboutSection = document.querySelector('#about.about');
        if (aboutSection) {
            // Function to check and make visible
            const checkAndShowAbout = () => {
                const rect = aboutSection.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const isInView = rect.top < viewportHeight * 1.2 && rect.bottom > -200;
                
                if (isInView) {
                    aboutSection.classList.add('visible');
                    aboutSection.style.setProperty('opacity', '1', 'important');
                    aboutSection.style.setProperty('visibility', 'visible', 'important');
                    aboutSection.style.setProperty('display', 'block', 'important');
                    aboutSection.style.setProperty('z-index', '10', 'important');
                    console.log('About section made visible - is in viewport');
                    return true;
                }
                return false;
            };
            
            // Check immediately on page load
            setTimeout(checkAndShowAbout, 500);
            
            // Check on every scroll event
            window.addEventListener('scroll', () => {
                checkAndShowAbout();
            }, { passive: true });
            
            // Also check on resize
            window.addEventListener('resize', checkAndShowAbout, { passive: true });
        } else {
            console.error('About section not found in initScrollAnimations!');
        }
}

// ===================================
// Eye Tracking (follows mouse)
// ===================================
// Note: This function is disabled as we're using the Framer Tech Eye component
// The component handles its own interactions
function initEyeTracking() {
    // The Framer Tech Eye component handles eye tracking internally
    // No custom tracking needed
    console.log('Using Framer Tech Eye component - eye tracking handled by component');
}

// ===================================
// Static Particles - Flickering Specks
// ===================================
function initStaticParticles() {
    const container = document.getElementById('staticParticles');
    if (!container) return;

    const particleCount = 80; // More particles for better visibility
    
    // Create particles distributed across the viewport
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'static-particle';
        
        // Random position across viewport
        const x = Math.random() * 100; // Percentage
        const y = Math.random() * 100; // Percentage
        
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        
        // Vary animation timing for random flicker effect
        const flickerDelay = Math.random() * 4;
        const floatDelay = Math.random() * 4;
        const flickerDuration = 2 + Math.random() * 3;
        const floatDuration = 4 + Math.random() * 2;
        
        particle.style.setProperty('--flicker-delay', `${flickerDelay}s`);
        particle.style.setProperty('--float-delay', `${floatDelay}s`);
        
        // Apply animations with delays
        particle.style.animation = 
            `particle-flicker ${flickerDuration}s ease-in-out ${flickerDelay}s infinite, 
             particle-float ${floatDuration}s ease-in-out ${floatDelay}s infinite`;
        
        // Random size variation for more visual interest
        const size = 2.5 + Math.random() * 2.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random brightness variation
        const brightness = 0.7 + Math.random() * 0.3;
        particle.style.filter = `brightness(${brightness})`;
        
        container.appendChild(particle);
    }
}

// ===================================
// ASCII Code Animation
// ===================================
function initASCIIAnimation() {
    const canvas = document.getElementById('asciiCanvas');
    const iris = document.querySelector('.eye-iris');
    
    if (!canvas || !iris) return;

    const irisRect = iris.getBoundingClientRect();
    const size = 120; // Match iris width
    canvas.width = size;
    canvas.height = size;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00ff88';
    ctx.font = '7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // ASCII characters pool
    const asciiChars = '01!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    // Grid system
    const cols = 12;
    const rows = 12;
    const cellWidth = size / cols;
    const cellHeight = size / rows;
    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size / 2;

    // Grid cells state
    const grid = [];
    for (let y = 0; y < rows; y++) {
        grid[y] = [];
        for (let x = 0; x < cols; x++) {
            grid[y][x] = {
                char: '',
                opacity: 0,
                filled: false,
                fadeOut: false,
                fadeOpacity: 1
            };
        }
    }

    // Calculate distance from center
    function getDistanceFromCenter(x, y) {
        const centerCellX = cols / 2;
        const centerCellY = rows / 2;
        const dx = x - centerCellX;
        const dy = y - centerCellY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // Check if cell is within circle
    function isInCircle(x, y) {
        const centerCellX = cols / 2;
        const centerCellY = rows / 2;
        const radius = cols / 2;
        const dx = x - centerCellX;
        const dy = y - centerCellY;
        return (dx * dx + dy * dy) <= radius * radius;
    }

    let fillProgress = 0;
    let isFadingOut = false;
    let fadeProgress = 0;

    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, size, size);
        
        // Draw circle mask
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
        ctx.clip();

        // Fill from right to left, starting from outside edge
        if (!isFadingOut && fillProgress < 1) {
            fillProgress += 0.012; // Speed of filling
            
            // Fill cells column by column from right to left
            const fillColumn = Math.floor(fillProgress * cols);
            
            // Fill cells from right to left
            for (let x = cols - 1; x >= 0; x--) {
                if (x >= cols - 1 - fillColumn) {
                    for (let y = 0; y < rows; y++) {
                        if (isInCircle(x, y) && !grid[y][x].filled) {
                            grid[y][x].filled = true;
                            grid[y][x].char = asciiChars[Math.floor(Math.random() * asciiChars.length)];
                            grid[y][x].opacity = 0.7 + Math.random() * 0.3;
                        }
                    }
                }
            }

            // Start fade out when fully filled
            if (fillProgress >= 1) {
                setTimeout(() => {
                    isFadingOut = true;
                    fillProgress = 0; // Reset for next cycle
                }, 1000);
            }
        }

        // Fade out effect
        if (isFadingOut) {
            fadeProgress += 0.02;
            
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    if (grid[y][x].filled) {
                        grid[y][x].fadeOpacity = Math.max(0, 1 - fadeProgress);
                        
                        // Random character change during fade
                        if (Math.random() > 0.7) {
                            grid[y][x].char = asciiChars[Math.floor(Math.random() * asciiChars.length)];
                        }
                    }
                }
            }

            // Reset when fade complete
            if (fadeProgress >= 1) {
                // Clear grid
                for (let y = 0; y < rows; y++) {
                    for (let x = 0; x < cols; x++) {
                        grid[y][x].filled = false;
                        grid[y][x].opacity = 0;
                        grid[y][x].fadeOpacity = 1;
                    }
                }
                isFadingOut = false;
                fadeProgress = 0;
                fillProgress = 0;
            }
        }

        // Draw characters
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (grid[y][x].filled) {
                    const char = grid[y][x].char;
                    const opacity = grid[y][x].opacity * grid[y][x].fadeOpacity;
                    
                    if (opacity > 0) {
                        const pixelX = x * cellWidth + cellWidth / 2;
                        const pixelY = y * cellHeight + cellHeight / 2;
                        
                        ctx.globalAlpha = opacity;
                        ctx.fillText(char, pixelX, pixelY);
                    }
                }
            }
        }

        ctx.restore();
        requestAnimationFrame(animate);
    }

    animate();
}

// ===================================
// Screen Glitch Effects
// ===================================
function initScreenGlitch() {
    const overlay = document.getElementById('screenGlitch');
    if (!overlay) return;

    function createScreenGlitch() {
        // Clear previous glitches
        overlay.innerHTML = '';
        overlay.classList.add('active');

        // Create multiple glitch elements
        const glitchCount = 3 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < glitchCount; i++) {
            setTimeout(() => {
                const glitchType = Math.random() > 0.5 ? 'line' : 'block';
                
                if (glitchType === 'line') {
                    const line = document.createElement('div');
                    line.className = 'glitch-line';
                    const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
                    
                    if (direction === 'horizontal') {
                        line.style.top = `${Math.random() * 100}%`;
                        line.style.width = '100%';
                        line.style.height = '2px';
                        line.style.transform = `translateX(${(Math.random() - 0.5) * 50}px)`;
                    } else {
                        line.style.left = `${Math.random() * 100}%`;
                        line.style.width = '2px';
                        line.style.height = '100%';
                        line.style.transform = `translateY(${(Math.random() - 0.5) * 50}px)`;
                    }
                    
                    overlay.appendChild(line);
                } else {
                    const block = document.createElement('div');
                    block.className = 'glitch-block';
                    const size = 20 + Math.random() * 100;
                    block.style.width = `${size}px`;
                    block.style.height = `${size}px`;
                    block.style.left = `${Math.random() * (window.innerWidth - size)}px`;
                    block.style.top = `${Math.random() * (window.innerHeight - size)}px`;
                    block.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px) rotate(${Math.random() * 360}deg)`;
                    
                    overlay.appendChild(block);
                }
            }, i * 50);
        }

        // Remove glitch after animation
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => {
                overlay.innerHTML = '';
            }, 300);
        }, 500);
    }

    // Trigger glitch periodically
    setInterval(() => {
        if (Math.random() > 0.7) {
            createScreenGlitch();
        }
    }, 2000 + Math.random() * 3000);

    // Also trigger on eye animation cycles
    setTimeout(() => {
        createScreenGlitch();
    }, 8000);
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

// ===================================
// Welcome Transition (Hero to About)
// ===================================
function initAccessSequence() {
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    const techEyeContainer = document.querySelector('.tech-eye-container');
    const aboutSection = document.querySelector('#about.about');
    
    let hasTriggered = false;
    
    console.log('🚀 Welcome Transition Initialized');
    console.log('Welcome overlay element:', welcomeOverlay);
    
    // Show WELCOME and transition to About
    function showWelcomeAndTransition() {
        if (hasTriggered) return;
        hasTriggered = true;
        
        console.log('✨ SHOWING WELCOME TEXT NOW!');
        
        // Show welcome overlay
        if (welcomeOverlay) {
            welcomeOverlay.style.opacity = '1';
            welcomeOverlay.style.visibility = 'visible';
            welcomeOverlay.classList.add('active');
            console.log('Welcome overlay activated');
        } else {
            console.error('Welcome overlay not found!');
        }
        
        // After 2 seconds, fade out and go to about
        setTimeout(() => {
            console.log('📍 Fading out welcome, going to About');
            
            if (welcomeOverlay) {
                welcomeOverlay.classList.add('fade-out');
            }
            
            if (techEyeContainer) {
                techEyeContainer.classList.add('fade-to-background');
            }
            
            // After fade animation, hide and scroll
            setTimeout(() => {
                if (welcomeOverlay) {
                    welcomeOverlay.style.opacity = '0';
                    welcomeOverlay.style.visibility = 'hidden';
                    welcomeOverlay.classList.remove('active', 'fade-out');
                }
                
                if (aboutSection) {
                    aboutSection.style.opacity = '1';
                    aboutSection.style.visibility = 'visible';
                    aboutSection.classList.add('visible');
                    window.scrollTo({ top: aboutSection.offsetTop, behavior: 'smooth' });
                }
            }, 1000);
            
        }, 2000);
    }
    
    // Trigger on ANY wheel scroll down
    window.addEventListener('wheel', (e) => {
        if (hasTriggered) return;
        if (e.deltaY > 0) {
            console.log('⬇️ Wheel scroll down detected!');
            showWelcomeAndTransition();
        }
    }, { passive: true });
    
    // Trigger on scroll
    window.addEventListener('scroll', () => {
        if (hasTriggered) return;
        if (window.scrollY > 30) {
            console.log('📜 Scroll detected!');
            showWelcomeAndTransition();
        }
    }, { passive: true });
    
    // Keyboard trigger
    window.addEventListener('keydown', (e) => {
        if (hasTriggered) return;
        if (e.key === 'ArrowDown' || e.key === ' ') {
            console.log('⌨️ Keyboard trigger!');
            showWelcomeAndTransition();
        }
    });
    
    // CLICK anywhere to trigger (for testing)
    document.body.addEventListener('click', () => {
        if (hasTriggered) return;
        console.log('🖱️ Click trigger!');
        showWelcomeAndTransition();
    });
}

// Console Easter Egg
console.log('%c ⚡ Welcome to my portfolio! ⚡ ', 
    'background: linear-gradient(90deg, #00ff88, #0088ff); color: #000; font-size: 16px; padding: 10px; border-radius: 5px;');
console.log('%c Built with passion and a love for creative coding.', 
    'color: #00ff88; font-size: 12px;');
