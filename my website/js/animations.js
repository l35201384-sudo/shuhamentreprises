// Enhanced Animation and scroll effects for Shubham Enterprises website

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffects();
    initTypingAnimation();
    initProgressBars();
    initCountUpAnimation();
    initHoverEffects();
    initPageTransitions();
    initStaggeredAnimations();
    initFloatingAnimations();
    initPulseAnimations();
    initScrollProgress();
    initMagneticEffect();
    initParticleEffect();
    initTextReveal();
    initImageReveal();
    initButtonRipple();
    initCardFlip();
    initProgressRing();
    initWaveEffect();
});

// Enhanced scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationType = element.getAttribute('data-animation') || 'fadeInUp';
                const delay = element.getAttribute('data-delay') || '0';
                
                setTimeout(() => {
                    element.classList.add('animate-in');
                    element.style.animation = `${animationType} 0.8s ease-out forwards`;
                }, parseInt(delay));
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with different effects
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .testimonial-card,
        .portfolio-card,
        .tech-item,
        .team-member,
        .timeline-item,
        .pricing-card,
        .accordion-item,
        .process-step,
        .job-item,
        .response-item,
        .hours-item
    `);
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        // Add staggered delay
        element.setAttribute('data-delay', (index * 100).toString());
        
        // Add different animation types
        const animations = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'bounceIn', 'zoomIn', 'flipInX'];
        const randomAnimation = animations[index % animations.length];
        element.setAttribute('data-animation', randomAnimation);
        
        observer.observe(element);
    });
}

// Enhanced parallax effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero, .service-icon, .tech-icon');
    
    window.addEventListener('scroll', throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }, 16));
}

// Enhanced typing animation
function initTypingAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--white)';
    heroTitle.style.animation = 'blink 1s infinite';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }, 1000);
        }
    };
    
    setTimeout(typeWriter, 500);
}

// Enhanced progress bars
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const percentage = progressBar.getAttribute('data-percentage');
                
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 2s ease-in-out';
                
                setTimeout(() => {
                    progressBar.style.width = percentage + '%';
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Enhanced count up animation
function initCountUpAnimation() {
    const counters = document.querySelectorAll('.stat-number, .count-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = parseInt(counter.getAttribute('data-duration')) || 2000;
                const increment = target / (duration / 16);
                
                let current = 0;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Enhanced hover effects
function initHoverEffects() {
    // Service cards with enhanced hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02) rotateY(5deg)';
            this.style.boxShadow = 'var(--shadow-xl)';
            this.style.animation = 'glow 0.6s ease-out';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
            this.style.boxShadow = 'var(--shadow-md)';
            this.style.animation = 'none';
        });
    });
    
    // Portfolio cards with 3D effect
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
        });
    });
    
    // Enhanced button effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = 'var(--shadow-xl)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
        
        button.addEventListener('click', function() {
            this.style.animation = 'bounceIn 0.3s ease-out';
            setTimeout(() => {
                this.style.animation = 'none';
            }, 300);
        });
    });
}

// Enhanced page transitions
function initPageTransitions() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
}

// Enhanced staggered animations
function initStaggeredAnimations() {
    const lists = document.querySelectorAll('.timeline, .process-timeline, .services-grid, .testimonials-grid');
    
    lists.forEach(list => {
        const items = list.querySelectorAll('li, .timeline-item, .process-step, .service-card, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0) scale(1)';
                            item.style.animation = 'bounceIn 0.6s ease-out';
                        }, index * 150);
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        
        items.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-30px) scale(0.8)';
            item.style.transition = 'all 0.6s ease-out';
        });
        
        observer.observe(list);
    });
}

// Enhanced floating animations
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.service-icon, .tech-icon, .member-photo');
    
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        const duration = 3 + (index * 0.5);
        
        element.style.animation = `float ${duration}s ease-in-out infinite`;
        element.style.animationDelay = `${delay}s`;
        
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'bounceIn 0.6s ease-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = `float ${duration}s ease-in-out infinite`;
        });
    });
}

// Enhanced pulse animations
function initPulseAnimations() {
    const pulseElements = document.querySelectorAll('.btn-primary, .logo, .popular-badge');
    
    pulseElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Enhanced scroll progress
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: var(--gradient-primary);
        z-index: 9999;
        transition: width 0.1s ease-out;
        box-shadow: 0 0 10px var(--primary-blue);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }, 16));
}

// Enhanced magnetic effect
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.btn-primary, .social-link, .service-card');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    hero.appendChild(particleContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Text reveal animation
function initTextReveal() {
    const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let i = 0;
                    const typeWriter = () => {
                        if (i < text.length) {
                            element.textContent += text.charAt(i);
                            i++;
                            setTimeout(typeWriter, 50);
                        }
                        element.style.opacity = '1';
                    };
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// Image reveal animation
function initImageReveal() {
    const images = document.querySelectorAll('img, .service-image, .portfolio-image');
    
    images.forEach(image => {
        image.style.opacity = '0';
        image.style.transform = 'scale(0.8)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 0.8s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(image);
    });
}

// Button ripple effect
function initButtonRipple() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Card flip effect
function initCardFlip() {
    const cards = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'rotateY(180deg)';
            
            setTimeout(() => {
                this.style.transform = 'rotateY(0deg)';
            }, 600);
        });
    });
}

// Progress ring animation
function initProgressRing() {
    const rings = document.querySelectorAll('.progress-ring');
    
    rings.forEach(ring => {
        const circle = ring.querySelector('circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    const offset = circumference - (progress / 100) * circumference;
                    
                    circle.style.strokeDashoffset = offset;
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(ring);
    });
}

// Wave effect
function initWaveEffect() {
    const waveElements = document.querySelectorAll('.hero, .section');
    
    waveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'wave 0.6s ease-out';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });
}

// Add enhanced CSS animations dynamically
function addEnhancedAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: var(--white); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes wave {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) scale(1) !important;
        }
        
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: var(--gradient-primary);
            z-index: 9999;
            transition: width 0.1s ease-out;
            box-shadow: 0 0 10px var(--primary-blue);
        }
        
        .service-card, .portfolio-card, .pricing-card {
            transition: all 0.3s ease;
            transform-style: preserve-3d;
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
    `;
    
    document.head.appendChild(style);
}

// Add enhanced animation styles
document.addEventListener('DOMContentLoaded', addEnhancedAnimationStyles);

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

// Export functions for use in other scripts
window.AnimationUtils = {
    throttle,
    debounce
};
