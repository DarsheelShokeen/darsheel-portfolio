/**
 * Main interactivity script
 * Handles: visit counter, clock, card glow, ripple effects, page transitions
 */
(function () {
    // --- Real Worldwide Visit Counter (Serverless + Fallback) ---
    (function initVisitCounter() {
        var el = document.getElementById('visit-count');
        var cachedCount = parseInt(localStorage.getItem('portfolio_global_visits') || '268', 10);
        
        function animateCounter(target) {
            if (!el) return;
            var current = parseInt(el.textContent.replace(/\D/g, '') || '0', 10);
            if (current >= target) {
                el.textContent = target.toLocaleString();
                return;
            }
            var step = Math.max(1, Math.ceil((target - current) / 25));
            var timer = setInterval(function () {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = current.toLocaleString();
            }, 30);
        }

        // Show cached immediately so there's no waiting
        if (el) {
            animateCounter(cachedCount);
        }

        // Fetch real worldwide count from counter.php
        var counterUrl = (window.location.pathname.indexOf('/') !== -1 && !window.location.protocol.startsWith('file')) ? '/counter.php?action=increment' : 'counter.php?action=increment';
        fetch(counterUrl, { cache: 'no-store' })
            .then(function (res) { return res.json(); })
            .then(function (data) {
                if (data && typeof data.count === 'number') {
                    localStorage.setItem('portfolio_global_visits', data.count.toString());
                    animateCounter(data.count);
                }
            })
            .catch(function () {
                // Graceful local increment fallback if offline
                var localFallback = cachedCount + 1;
                localStorage.setItem('portfolio_global_visits', localFallback.toString());
                animateCounter(localFallback);
            });

        // Update specific view counts
        var cbCount = parseInt(localStorage.getItem('chatbridge_use_count') || '142', 10);
        var eduCount = parseInt(localStorage.getItem('educloud_use_count') || '189', 10);
        var sfCount = parseInt(localStorage.getItem('smartflood_use_count') || '97', 10);
        var acCount = parseInt(localStorage.getItem('albumcanvas_use_count') || '114', 10);
        
        var cbEl = document.getElementById('chatbridge-views');
        if (cbEl) cbEl.textContent = cbCount;
        
        var eduEl = document.getElementById('educloud-views');
        if (eduEl) eduEl.textContent = eduCount;

        var sfEl = document.getElementById('smartflood-views');
        if (sfEl) sfEl.textContent = sfCount;

        var acEl = document.getElementById('albumcanvas-views');
        if (acEl) acEl.textContent = acCount;
    })();

    // --- Live Clock ---
    (function initClock() {
        var clockEl = document.getElementById('clock-time');
        if (!clockEl) return;
        function updateClock() {
            var now = new Date();
            var opts = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };
            clockEl.textContent = now.toLocaleTimeString('en-IN', opts) + ' IST';
        }
        updateClock();
        setInterval(updateClock, 1000);
    })();

    // --- Card mouse-follow glow effect ---
    document.addEventListener('mousemove', function (e) {
        var cards = document.querySelectorAll('.project-card, .contact-card');
        cards.forEach(function (card) {
            var rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
        });
    });

    // --- Click Ripple Effect on nav links, cards, and buttons ---
    (function initRipple() {
        var rippleTargets = document.querySelectorAll(
            '.nav-pill .nav-link, .project-card, .contact-card, .nav-back-btn, .social-icon, .role-pill'
        );
        rippleTargets.forEach(function (el) {
            el.addEventListener('click', function (e) {
                // Create ripple element
                var ripple = document.createElement('span');
                ripple.className = 'ripple';
                var rect = el.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height) * 2;
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
                el.appendChild(ripple);
                // Clean up after animation
                setTimeout(function () {
                    if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
                }, 600);
            });
        });
    })();

    // --- Interactive icon bounce on project card click ---
    (function initCardIconBounce() {
        var cards = document.querySelectorAll('.project-card');
        cards.forEach(function (card) {
            card.addEventListener('click', function () {
                var icon = card.querySelector('.project-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotate(-8deg)';
                    icon.style.transition = 'transform 0.15s ease';
                    setTimeout(function () {
                        icon.style.transform = '';
                        icon.style.transition = '';
                    }, 200);
                }
            });
        });
    })();

    // --- Interactive contact card icon spin on click ---
    (function initContactIconSpin() {
        var contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(function (card) {
            card.addEventListener('click', function () {
                var icon = card.querySelector('.contact-card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(360deg)';
                    icon.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    setTimeout(function () {
                        icon.style.transform = '';
                        icon.style.transition = '';
                    }, 600);
                }
            });
        });
    })();

    // --- Social icon bounce on click ---
    (function initSocialBounce() {
        var socials = document.querySelectorAll('.social-icon');
        socials.forEach(function (icon) {
            icon.addEventListener('click', function () {
                icon.style.transform = 'translateY(-6px) scale(1.2)';
                setTimeout(function () {
                    icon.style.transform = '';
                }, 300);
            });
        });
    })();

    // --- Nav link icon wiggle on hover ---
    (function initNavWiggle() {
        var navLinks = document.querySelectorAll('.nav-pill .nav-link');
        navLinks.forEach(function (link) {
            link.addEventListener('mouseenter', function () {
                var svg = link.querySelector('svg');
                if (svg) {
                    svg.style.transform = 'scale(1.2) rotate(-10deg)';
                    setTimeout(function () {
                        svg.style.transform = 'scale(1.15) rotate(5deg)';
                        setTimeout(function () {
                            svg.style.transform = '';
                        }, 150);
                    }, 150);
                }
            });
        });
    })();

    // --- Back button bounce on hover ---
    (function initBackBtnEffect() {
        var backBtn = document.getElementById('nav-back');
        if (backBtn) {
            backBtn.addEventListener('mouseenter', function () {
                backBtn.style.transform = 'translateX(-5px) scale(1.08)';
            });
            backBtn.addEventListener('mouseleave', function () {
                backBtn.style.transform = '';
            });
        }
    })();

    // --- Smooth page transitions ---
    document.querySelectorAll('a[href]').forEach(function (link) {
        var href = link.getAttribute('href');
        if (href && (href.endsWith('.html') || href.indexOf('/index.html') !== -1 || href.startsWith('chatbridge/') || href.startsWith('school-platform/') || href.startsWith('smart-flood/') || href.startsWith('album-canvas/') || href.startsWith('educloud/'))) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(function () {
                    window.location.href = href;
                }, 300);
            });
        }
    });

    // --- Fade in on load ---
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', function () {
        document.body.style.opacity = '1';
    });

    // --- Theme Toggle ---
    (function initTheme() {
        var themeToggleBtn = document.getElementById('theme-toggle');
        if (!themeToggleBtn) return;

        var currentTheme = localStorage.getItem('portfolio_theme') || 'dark';
        if (currentTheme === 'light') {
            document.documentElement.classList.add('light-mode');
            updateThemeIcon('light');
        }

        themeToggleBtn.addEventListener('click', function () {
            document.documentElement.classList.toggle('light-mode');
            var isLight = document.documentElement.classList.contains('light-mode');
            var newTheme = isLight ? 'light' : 'dark';
            localStorage.setItem('portfolio_theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Re-trigger particle system redraw if available
            if (window.initParticles) {
                window.initParticles();
            }
        });

        function updateThemeIcon(theme) {
            if (theme === 'light') {
                themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="sun-icon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
            } else {
                themeToggleBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="moon-icon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>';
            }
        }
    })();
})();
