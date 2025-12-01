// M&M Elektro Engineering - Main JavaScript

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.mobile-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

// Cursor glow effect
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    if (window.innerWidth < 992) {
        cursorGlow.style.display = 'none';
    }
}

// Reveal animations on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stat-card, .service-card, .feature-card, .value-card');

function revealOnScroll() {
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

if (reveals.length > 0) {
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Check for hash in URL and scroll to section
if (window.location.hash) {
    setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, 100);
}

// Rotating word animation (Homepage Hero)
const rotatingWordElement = document.getElementById('rotatingWord');
if (rotatingWordElement) {
    const words = ['Smart Home', 'Photovoltaik', 'Elektrotechnik', 'Netzwerke', 'LED-Beleuchtung'];
    let currentWordIndex = 0;

    function rotateWord() {
        rotatingWordElement.classList.add('flip-out');

        setTimeout(() => {
            currentWordIndex = (currentWordIndex + 1) % words.length;
            rotatingWordElement.textContent = words[currentWordIndex];
            rotatingWordElement.classList.remove('flip-out');
            rotatingWordElement.classList.add('flip-in');

            setTimeout(() => {
                rotatingWordElement.classList.remove('flip-in');
            }, 380);
        }, 380);
    }

    setInterval(rotateWord, 2800);
}

// Number counter animation for stat cards
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = element.textContent;
    const match = target.match(/(\d+)/);

    if (!match) return;

    const targetNum = parseInt(match[1]);
    const suffix = target.replace(/\d+/, '');
    const duration = 2000;
    const step = targetNum / (duration / 16);
    let current = 0;
    let hasAnimated = element.dataset.animated === 'true';

    if (hasAnimated) return;

    const counter = setInterval(() => {
        current += step;
        if (current >= targetNum) {
            element.textContent = targetNum + suffix;
            element.dataset.animated = 'true';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation on scroll
const statCards = document.querySelectorAll('.stat-card');
function checkStatsInView() {
    statCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
            const numberEl = card.querySelector('.stat-number');
            if (numberEl && numberEl.dataset.animated !== 'true') {
                animateCounter(numberEl);
            }
        }
    });
}

if (statCards.length > 0) {
    window.addEventListener('scroll', checkStatsInView);
    checkStatsInView();
}

// Orbit animation for hero circles (Homepage)
const heroCircles = document.querySelectorAll('.hero-circle');
heroCircles.forEach((circle, index) => {
    const radius = parseInt(circle.style.width) / 2 || (400 - index * 100) / 2;
    const duration = 20 + index * 5;

    circle.style.animation = `orbit ${duration}s linear infinite`;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes orbit {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;

    if (index === 0 && !document.querySelector('style[data-orbit]')) {
        style.setAttribute('data-orbit', 'true');
        document.head.appendChild(style);
    }
});

// Form submission handler (Contact form)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Show success message
        alert('Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.');

        // Reset form
        contactForm.reset();
    });
}

// Video lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video[data-src]');

    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const source = video.querySelector('source');
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        video.load();
                    }
                    videoObserver.unobserve(video);
                }
            });
        });

        videos.forEach(video => videoObserver.observe(video));
    } else {
        // Fallback for browsers without IntersectionObserver
        videos.forEach(video => {
            const source = video.querySelector('source');
            if (source && source.dataset.src) {
                source.src = source.dataset.src;
                video.load();
            }
        });
    }
});

// Image lazy loading (if needed)
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});

// Parallax effect for background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.bg-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.3 + (index * 0.1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Active nav link highlighting based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', highlightNav);
}

// Prevent scroll when mobile menu is open
if (mobileNav) {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (mobileNav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
    });

    observer.observe(mobileNav, { attributes: true });
}

// Page load performance monitoring
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    }
});
