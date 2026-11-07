/**
 * DARSHEEL SHOKEEN — Master Runtime Engine
 * Obsidian Violet Design System • Unlumen & SmoothUI Kinetic System • Privacy Telemetry
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Privacy-First Telemetry Beacon
    try {
        if (!window.location.protocol.startsWith('file')) {
            const beaconData = {
                page: window.location.pathname || '/',
                referrer: document.referrer || ''
            };
            const beaconBody = JSON.stringify(beaconData);
            if (navigator.sendBeacon) {
                const blob = new Blob([beaconBody], { type: 'application/json' });
                navigator.sendBeacon('analytics.php?action=log', blob);
            } else {
                fetch('analytics.php?action=log', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: beaconBody,
                    keepalive: true
                }).catch(() => {});
            }
        }
    } catch (e) {
        // Fail silently
    }

    // 1. SmoothUI: Top Scroll Progress Rail
    const initScrollProgress = () => {
        let rail = document.getElementById('scroll-progress-rail');
        if (!rail) {
            rail = document.createElement('div');
            rail.id = 'scroll-progress-rail';
            document.body.prepend(rail);
        }

        let ticking = false;
        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
            rail.style.width = `${scrollPercent.toFixed(1)}%`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateProgress);
                ticking = true;
            }
        }, { passive: true });
        updateProgress();
    };
    initScrollProgress();

    // 2. SmoothUI: Fluid Hover Sliding Navigation Pill (Animated Tabs)
    const initFluidNav = () => {
        const navMenu = document.querySelector('.nav-menu');
        if (!navMenu) return;

        let pill = navMenu.querySelector('.nav-sliding-pill');
        if (!pill) {
            pill = document.createElement('div');
            pill.className = 'nav-sliding-pill';
            navMenu.prepend(pill);
        }

        const navLinks = navMenu.querySelectorAll('.nav-link');

        const movePillTo = (el) => {
            if (!el) {
                pill.style.opacity = '0';
                return;
            }
            const offsetLeft = el.offsetLeft;
            const width = el.offsetWidth;
            pill.style.transform = `translateX(${offsetLeft}px)`;
            pill.style.width = `${width}px`;
            pill.style.opacity = '1';
        };

        const activeLink = navMenu.querySelector('.nav-link.active') || navLinks[0];
        if (activeLink && window.scrollY < 200) {
            setTimeout(() => movePillTo(activeLink), 150);
        }

        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => movePillTo(link));
        });

        navMenu.addEventListener('mouseleave', () => {
            const currentActive = navMenu.querySelector('.nav-link.active');
            if (currentActive) {
                movePillTo(currentActive);
            } else {
                pill.style.opacity = '0';
            }
        });

        // Update when active link changes
        window.addEventListener('scrollNavUpdate', () => {
            const currentActive = navMenu.querySelector('.nav-link.active');
            if (currentActive && !navMenu.matches(':hover')) {
                movePillTo(currentActive);
            }
        });
    };
    initFluidNav();

    // 3. SmoothUI: Magnetic Field Physics (Buttons & Key Controls)
    const initMagneticField = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        const magneticTargets = document.querySelectorAll('.btn-primary, .btn-secondary, .cmd-palette-btn, .link-case-study, .magnetic');
        magneticTargets.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - (rect.left + rect.width / 2);
                const y = e.clientY - (rect.top + rect.height / 2);
                // Spring magnetic attraction damping factor
                el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
                el.style.transition = 'transform 0.08s ease-out';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
                el.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    };
    initMagneticField();

    // 4. Unlumen UI & SmoothUI: Spotlight Glow Border & 3D Subtle Tilt Cards
    const initSpotlightCards = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const isTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0);

        const cards = document.querySelectorAll('.project-card-large, .expertise-card, .experiment-card, .now-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                if (!isTouch) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const tiltX = ((y - centerY) / centerY) * -1.6;
                    const tiltY = ((x - centerX) / centerX) * 1.6;
                    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-2px)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', `-500px`);
                card.style.setProperty('--mouse-y', `-500px`);
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });
    };
    initSpotlightCards();

    // 5. SmoothUI: Staggered Scroll Reveal System
    const initScrollReveals = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const revealElements = document.querySelectorAll('.section-header, .project-card-large, .expertise-card, .experiment-card, .now-card, .timeline-item, .journal-entry-row');
        revealElements.forEach(el => el.classList.add('reveal-on-scroll'));

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    };
    initScrollReveals();

    // 6. Navigation Scroll Treatment & Mobile Drawer
    const nav = document.querySelector('.site-nav');
    const navToggle = document.getElementById('nav-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    const handleScrollNav = () => {
        if (!nav) return;
        if (window.scrollY > 25) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollNav, { passive: true });
    handleScrollNav();

    if (navToggle && mobileDrawer) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileDrawer.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
        });

        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileDrawer.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!mobileDrawer.contains(e.target) && !navToggle.contains(e.target)) {
                mobileDrawer.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // 7. Active Section Spy
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveNav = () => {
        let currentId = '';
        const scrollPosition = window.scrollY + 180;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        let changed = false;
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                if (!link.classList.contains('active')) {
                    link.classList.add('active');
                    changed = true;
                }
            } else if (href && href.startsWith('#')) {
                if (link.classList.contains('active')) {
                    link.classList.remove('active');
                    changed = true;
                }
            }
        });

        if (changed) {
            window.dispatchEvent(new CustomEvent('scrollNavUpdate'));
        }
    };
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // 8. Live IST Clock (Delhi, India)
    const clockEl = document.getElementById('ist-clock');
    if (clockEl) {
        const updateClock = () => {
            const now = new Date();
            const options = {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            };
            clockEl.textContent = `${now.toLocaleTimeString('en-IN', options)} IST`;
        };
        updateClock();
        setInterval(updateClock, 1000);
    }

    // 9. SmoothUI Spring Number Ticker for Real Public Visitor Counter
    const counterEls = document.querySelectorAll('#visit-counter-val, .visit-counter-target');
    if (counterEls.length > 0) {
        const cached = parseInt(localStorage.getItem('portfolio_global_visits') || '482', 10);

        const animateSpringCount = (target) => {
            counterEls.forEach(el => {
                let current = parseInt(el.textContent.replace(/\D/g, '') || '0', 10);
                if (current >= target) {
                    el.textContent = target.toLocaleString();
                    return;
                }
                const duration = 1400;
                const startTime = performance.now();
                const startVal = current;

                const tick = (now) => {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Smooth quartic ease-out
                    const ease = 1 - Math.pow(1 - progress, 4);
                    const val = Math.round(startVal + (target - startVal) * ease);
                    el.textContent = val.toLocaleString();
                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = target.toLocaleString();
                    }
                };
                requestAnimationFrame(tick);
            });
        };

        animateSpringCount(cached);

        if (!window.location.protocol.startsWith('file')) {
            fetch('analytics.php?action=public_count', { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    if (data && typeof data.total === 'number') {
                        localStorage.setItem('portfolio_global_visits', data.total.toString());
                        animateSpringCount(data.total);
                    }
                })
                .catch(() => {
                    fetch('counter.php', { cache: 'no-store' })
                        .then(r => r.json())
                        .then(d => {
                            if (d && typeof d.count === 'number') {
                                localStorage.setItem('portfolio_global_visits', d.count.toString());
                                animateSpringCount(d.count);
                            }
                        })
                        .catch(() => {});
                });
        }
    }

    // 10. Dynamic Footer Copyright Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 11. Back-to-Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 12. Command Palette (Ctrl+K / Cmd+K) with Secret Keyword Discovery ('iamdarsheel')
    const cmdOverlay = document.getElementById('cmd-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdList = document.getElementById('cmd-list');
    const cmdOpenBtns = document.querySelectorAll('.open-cmd-btn');

    if (cmdOverlay && cmdInput && cmdList) {
        const openPalette = () => {
            cmdOverlay.classList.add('open');
            cmdInput.value = '';
            filterCmdItems('');
            setTimeout(() => cmdInput.focus(), 60);
        };

        const closePalette = () => {
            cmdOverlay.classList.remove('open');
        };

        cmdOpenBtns.forEach(btn => btn.addEventListener('click', openPalette));

        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                if (cmdOverlay.classList.contains('open')) {
                    closePalette();
                } else {
                    openPalette();
                }
            } else if (e.key === 'Escape' && cmdOverlay.classList.contains('open')) {
                closePalette();
            }
        });

        cmdOverlay.addEventListener('click', (e) => {
            if (e.target === cmdOverlay) {
                closePalette();
            }
        });

        // Delegate click on command list items
        cmdList.addEventListener('click', (e) => {
            const item = e.target.closest('.cmd-item');
            if (item) {
                const href = item.getAttribute('data-href');
                if (href) {
                    closePalette();
                    window.location.href = href;
                }
            }
        });

        function filterCmdItems(query) {
            const q = query.toLowerCase().trim();
            const isSecret = (q === 'iamdarsheel');

            // Find or create hidden dashboard entry
            let secretItem = cmdList.querySelector('.cmd-secret');
            if (!secretItem) {
                secretItem = document.createElement('li');
                secretItem.className = 'cmd-item cmd-secret';
                secretItem.setAttribute('data-href', 'analytics.html');
                secretItem.style.background = 'rgba(139, 92, 246, 0.14)';
                secretItem.style.border = '1px solid rgba(139, 92, 246, 0.4)';
                secretItem.innerHTML = `
                    <div class="cmd-item-left">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span style="color: #A78BFA; font-weight: 600;">⚡ Master Telemetry & Analytics Dashboard</span>
                    </div>
                    <span class="cmd-badge" style="background: #8B5CF6; color: #ffffff;">Admin Access</span>
                `;
                cmdList.prepend(secretItem);
            }

            const normalItems = cmdList.querySelectorAll('.cmd-item:not(.cmd-secret), .cmd-group-label');

            if (isSecret) {
                // Secret revealed: show ONLY the hidden dashboard entry
                secretItem.style.display = 'flex';
                secretItem.classList.add('active');
                normalItems.forEach(it => it.style.display = 'none');
            } else {
                // Normal search: keep secret hidden
                secretItem.style.display = 'none';
                secretItem.classList.remove('active');

                cmdList.querySelectorAll('.cmd-item:not(.cmd-secret)').forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (!q || text.includes(q)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Group labels visibility
                cmdList.querySelectorAll('.cmd-group-label').forEach(lbl => {
                    lbl.style.display = q ? 'none' : 'block';
                });
            }
        }

        cmdInput.addEventListener('input', (e) => {
            filterCmdItems(e.target.value);
        });

        // Keyboard arrow navigation in palette
        cmdInput.addEventListener('keydown', (e) => {
            const visibleItems = Array.from(cmdList.querySelectorAll('.cmd-item')).filter(it => it.style.display !== 'none');
            if (visibleItems.length === 0) return;

            const activeIdx = visibleItems.findIndex(it => it.classList.contains('active'));

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (activeIdx !== -1) visibleItems[activeIdx].classList.remove('active');
                const nextIdx = (activeIdx + 1) % visibleItems.length;
                visibleItems[nextIdx].classList.add('active');
                visibleItems[nextIdx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (activeIdx !== -1) visibleItems[activeIdx].classList.remove('active');
                const prevIdx = (activeIdx - 1 + visibleItems.length) % visibleItems.length;
                visibleItems[prevIdx].classList.add('active');
                visibleItems[prevIdx].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const target = activeIdx !== -1 ? visibleItems[activeIdx] : visibleItems[0];
                if (target) {
                    const link = target.getAttribute('data-href');
                    if (link) {
                        closePalette();
                        window.location.href = link;
                    }
                }
            }
        });
    }

    // 13. Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const feedbackBox = document.getElementById('form-feedback');

    if (contactForm && feedbackBox) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn ? submitBtn.textContent : 'Send Message';

            const name = document.getElementById('form-name')?.value.trim();
            const email = document.getElementById('form-email')?.value.trim();
            const subject = document.getElementById('form-subject')?.value.trim();
            const message = document.getElementById('form-message')?.value.trim();
            const honeypot = document.getElementById('form-hp')?.value.trim();

            if (!name || !email || !message) {
                feedbackBox.className = 'form-feedback error';
                feedbackBox.textContent = 'Please fill out all required fields (Name, Email, Message).';
                return;
            }

            if (honeypot) {
                feedbackBox.className = 'form-feedback success';
                feedbackBox.textContent = 'Thank you! Your message has been transmitted.';
                contactForm.reset();
                return;
            }

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Transmitting...';
            }

            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, subject, message, website: honeypot })
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    feedbackBox.className = 'form-feedback success';
                    feedbackBox.textContent = data.message || 'Thank you! Your message has been sent successfully.';
                    contactForm.reset();
                } else {
                    throw new Error(data.message || 'Unable to transmit message at this time.');
                }
            } catch (err) {
                feedbackBox.className = 'form-feedback success';
                feedbackBox.innerHTML = `Message noted! You can also email me directly at <a href="mailto:darsheelshokeen@gmail.com" style="text-decoration: underline; color: inherit;">darsheelshokeen@gmail.com</a>.`;
                contactForm.reset();
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;
                }
            }
        });
    }
});
