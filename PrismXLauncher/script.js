// ── Navbar scroll effect ──────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll-triggered fade-up animations ──────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

// Animate cards and major content blocks
document.querySelectorAll('.feature-card, .mods-inner, .download-content, .footer-inner').forEach((el, i) => {
    el.classList.add('fade-up');
    el.style.transitionDelay = `${i * 0.07}s`;
    observer.observe(el);
});

// ── Animated statistics counter ───────────────────────────────────────────────
function animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const update = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('[data-target]').forEach(el => {
                animateCounter(el, parseInt(el.dataset.target));
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ── Logo tilt effect on mouse move ────────────────────────────────────────────
const heroLogo = document.getElementById('heroLogo');
if (heroLogo) {
    document.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 15;
        const y = (e.clientY / innerHeight - 0.5) * -15;
        heroLogo.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-10px)`;
    });

    document.addEventListener('mouseleave', () => {
        heroLogo.style.transform = '';
    });
}

// ── Smooth scroll for anchor links ────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ── Download button effect ─────────────────────────────────────────────────────
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
        downloadBtn.textContent = '⬇ Download Starting...';
        downloadBtn.style.opacity = '0.8';
        setTimeout(() => {
            downloadBtn.innerHTML = '<span>⬇ Download for Windows</span>';
            downloadBtn.style.opacity = '1';
        }, 2000);
    });
}

// ── Particle sparkles near the hero logo ─────────────────────────────────────
function createSparkle() {
    const logo = document.getElementById('heroLogo');
    if (!logo) return;
    const rect = logo.getBoundingClientRect();
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 0;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? '#BB86FC' : '#FF79C6'};
        border-radius: 50%;
        left: ${rect.left + rect.width / 2 + (Math.random() - 0.5) * 120}px;
        top: ${rect.top + rect.height / 2 + (Math.random() - 0.5) * 120}px;
        opacity: 1;
        transition: transform 1.5s ease, opacity 1.5s ease;
        box-shadow: 0 0 6px currentColor;
    `;
    document.body.appendChild(sparkle);
    requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 200;
        const dy = (Math.random() - 0.5) * 200;
        sparkle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
        sparkle.style.opacity = '0';
    });
    setTimeout(() => sparkle.remove(), 1600);
}

setInterval(createSparkle, 400);
