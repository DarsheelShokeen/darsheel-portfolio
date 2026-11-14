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


    // ==============================================================================
    // 14. AWWWARDS V5.0: NATIVE WEB AUDIO API SYNTHESIZER & MICRO-HAPTICS
    // ==============================================================================
    let audioCtx = null;
    let isAudioEnabled = (localStorage.getItem('portfolio_audio_enabled') === 'true');

    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    if (audioToggleBtn) {
        if (isAudioEnabled) {
            audioToggleBtn.classList.add('active');
            audioToggleBtn.querySelector('.audio-label').textContent = 'Audio: ON';
        }

        audioToggleBtn.addEventListener('click', () => {
            isAudioEnabled = !isAudioEnabled;
            localStorage.setItem('portfolio_audio_enabled', isAudioEnabled.toString());
            audioToggleBtn.classList.toggle('active', isAudioEnabled);
            audioToggleBtn.querySelector('.audio-label').textContent = isAudioEnabled ? 'Audio: ON' : 'Audio: OFF';

            if (isAudioEnabled) {
                playTone(520, 'sine', 0.04, 0.05);
                setTimeout(() => playTone(880, 'sine', 0.08, 0.06), 60);
            }
        });
    }

    const playTone = (freq = 800, type = 'sine', duration = 0.03, vol = 0.03) => {
        if (!isAudioEnabled) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
            gain.gain.setValueAtTime(vol, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.start();
            osc.stop(audioCtx.currentTime + duration);
        } catch (e) {
            // AudioContext not allowed or unsupported
        }
    };

    // Attach subtle audio feedback to interactive controls
    document.querySelectorAll('.btn-primary, .btn-secondary, .nav-link, .cmd-palette-btn, .sim-btn, .node-btn, .step-tab-btn, .swatch-btn').forEach(el => {
        el.addEventListener('mouseenter', () => playTone(1200, 'sine', 0.015, 0.015));
        el.addEventListener('click', () => playTone(750, 'triangle', 0.04, 0.04));
    });

    // ==============================================================================
    // 15. AWWWARDS V5.0: CUSTOM MAGNETIC POINTER & TRAILING RING (Desktop)
    // ==============================================================================
    const initCustomCursor = () => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        let cursorDot = document.querySelector('.custom-cursor');
        let cursorTrail = document.querySelector('.cursor-trail');

        if (!cursorDot) {
            cursorDot = document.createElement('div');
            cursorDot.className = 'custom-cursor';
            document.body.appendChild(cursorDot);
        }
        if (!cursorTrail) {
            cursorTrail = document.createElement('div');
            cursorTrail.className = 'cursor-trail';
            document.body.appendChild(cursorTrail);
        }

        let mouseX = -100, mouseY = -100;
        let trailX = -100, trailY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }, { passive: true });

        const animateCursor = () => {
            trailX += (mouseX - trailX) * 0.18;
            trailY += (mouseY - trailY) * 0.18;
            cursorTrail.style.left = `${trailX}px`;
            cursorTrail.style.top = `${trailY}px`;
            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);

        // Hover expand on interactive targets
        const interactiveTargets = 'a, button, input, select, textarea, .project-card-large, .cmd-item, .sim-btn, .node-btn, .step-tab-btn, .swatch-btn';
        document.querySelectorAll(interactiveTargets).forEach(el => {
            el.addEventListener('mouseenter', () => cursorTrail.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorTrail.classList.remove('hovered'));
        });

        window.addEventListener('mousedown', () => cursorTrail.classList.add('active'));
        window.addEventListener('mouseup', () => cursorTrail.classList.remove('active'));
    };
    initCustomCursor();

    // ==============================================================================
    // 16. AWWWARDS V5.0: ALBUMCANVAS LIVE VINYL & 16-BAND EQUALIZER SIMULATOR
    // ==============================================================================
    const initAlbumCanvasSim = () => {
        const playBtn = document.getElementById('albumcanvas-play-btn');
        const eqContainer = document.getElementById('albumcanvas-eq-bars');
        const vinylDisc = document.querySelector('.project-card-large:nth-child(1) .vinyl-disc-peek');
        const swatchBtns = document.querySelectorAll('.swatch-btn');
        const card1 = document.querySelector('.project-card-large:nth-child(1)');

        if (!playBtn || !eqContainer) return;

        // Generate 16 equalizer columns
        eqContainer.innerHTML = '';
        const eqCols = [];
        for (let i = 0; i < 16; i++) {
            const col = document.createElement('div');
            col.className = 'eq-column';
            col.style.height = `${4 + Math.random() * 8}px`;
            eqContainer.appendChild(col);
            eqCols.push(col);
        }

        let isPlaying = false;
        let eqAnimFrame = null;

        const updateEqBars = () => {
            if (!isPlaying) return;
            const t = performance.now() * 0.005;
            eqCols.forEach((col, idx) => {
                const wave = Math.sin(t + idx * 0.45) * 0.5 + 0.5;
                const noise = Math.sin(t * 1.8 + idx * 0.9) * 0.3 + 0.3;
                const h = Math.round(4 + (wave * 0.65 + noise * 0.35) * 22);
                col.style.height = `${h}px`;
            });
            eqAnimFrame = requestAnimationFrame(updateEqBars);
        };

        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.classList.toggle('active', isPlaying);
            playBtn.innerHTML = isPlaying ? `<span>⏸</span> Pause Simulation` : `<span>▶</span> Play Audio Simulation`;

            if (vinylDisc) {
                if (isPlaying) {
                    vinylDisc.style.right = '24px';
                    vinylDisc.style.opacity = '1';
                    vinylDisc.style.animation = 'vinylSpin 3.5s linear infinite';
                } else {
                    vinylDisc.style.animation = 'none';
                    vinylDisc.style.right = '';
                    vinylDisc.style.opacity = '';
                }
            }

            if (isPlaying) {
                updateEqBars();
            } else {
                cancelAnimationFrame(eqAnimFrame);
                eqCols.forEach(c => c.style.height = '6px');
            }
        });

        // Palette color extraction simulation
        swatchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                swatchBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const color = btn.getAttribute('data-color') || '#00E5FF';
                if (card1) {
                    card1.style.borderColor = color;
                    card1.style.boxShadow = `0 20px 48px rgba(0, 0, 0, 0.65), 0 0 32px ${color}33`;
                }
                eqCols.forEach(col => {
                    col.style.background = `linear-gradient(180deg, ${color}, #2563EB)`;
                });
            });
        });
    };
    initAlbumCanvasSim();

    // ==============================================================================
    // 17. AWWWARDS V5.0: SMART FLOOD ALERT LIVE TELEMETRY NODE SWITCHER
    // ==============================================================================
    const initSmartFloodSim = () => {
        const btnNode1 = document.getElementById('smartflood-node-01');
        const btnNode2 = document.getElementById('smartflood-node-02');
        const depthVal = document.getElementById('flood-depth-val');
        const statusVal = document.getElementById('flood-status-val');
        const voltageVal = document.getElementById('flood-voltage-val');
        const dispatchText = document.getElementById('flood-dispatch-text');

        if (!btnNode1 || !btnNode2 || !depthVal) return;

        const setNode1 = () => {
            btnNode1.classList.add('active');
            btnNode2.classList.remove('active');
            depthVal.textContent = '14.8 cm (74%)';
            depthVal.style.color = '#F59E0B';
            statusVal.textContent = 'WARNING LEVEL';
            statusVal.style.color = '#F59E0B';
            voltageVal.textContent = '2.14 V (ADC 2658)';
            if (dispatchText) {
                dispatchText.textContent = '🚨 ADVISORY DISPATCHED: Ward 12 Canal Drain water depth exceeded 14.0 cm (+2.1 cm/hr rate of rise). Basements advised to monitor.';
            }
        };

        const setNode2 = () => {
            btnNode2.classList.add('active');
            btnNode1.classList.remove('active');
            depthVal.textContent = '19.4 cm (97%)';
            depthVal.style.color = '#EF4444';
            statusVal.textContent = 'CRITICAL EMERGENCY';
            statusVal.style.color = '#EF4444';
            voltageVal.textContent = '2.88 V (ADC 3574)';
            if (dispatchText) {
                dispatchText.textContent = '🚨 IMMEDIATE EVACUATION ORDER: Sector 04 Underpass liquid sensor exceeded 18.0 cm safety threshold. Roadway diversion initiated.';
            }
        };

        btnNode1.addEventListener('click', setNode1);
        btnNode2.addEventListener('click', setNode2);
    };
    initSmartFloodSim();

    // ==============================================================================
    // 18. AWWWARDS V5.0: LESSONPLAN MAKER 5E PEDAGOGICAL FRAMEWORK STEPPER
    // ==============================================================================
    const initLessonPlanSim = () => {
        const stepBtns = document.querySelectorAll('.step-tab-btn');
        const outcomeTag = document.getElementById('lp-outcome-tag');
        const outcomeText = document.getElementById('lp-outcome-text');

        if (stepBtns.length === 0 || !outcomeTag || !outcomeText) return;

        const phases = {
            1: {
                tag: 'PHASE 1: ENGAGE • Elicit Prior Understanding (Bloom: Recall & Connect)',
                text: 'Elicit prior student observations of capillary liquid rise using colored water stalks. Scaffold initial student conjectures regarding plant transpiration mechanics.'
            },
            2: {
                tag: 'PHASE 2: EXPLORE • Hands-on Inquiry Investigation (Bloom: Apply & Analyze)',
                text: 'Students prepare thin blade-cut cross-sections of celery stalks and examine xylem vessel bundles under 40x magnification, tracking dye transport velocities.'
            },
            3: {
                tag: 'PHASE 3: EXPLAIN • Evidence Synthesis (Bloom: Articulate & Conceptualize)',
                text: 'Facilitate student group presentations connecting capillary cohesion-tension theory to observed dye ascent rates. Introduce stomatal transpiration vocabulary.'
            },
            4: {
                tag: 'PHASE 4: ELABORATE • Real-World Extension (Bloom: Evaluate & Synthesize)',
                text: 'Connect plant water conservation adaptations (xerophyte waxy cuticles) to regional agricultural irrigation practices in semi-arid zones.'
            },
            5: {
                tag: 'PHASE 5: EVALUATE • Formative Competency Check (Bloom: Assessment & Creation)',
                text: 'Students generate an annotated predictive diagram of transpiration rates under variable humidity and wind conditions, mapped to NCERT Class 7 Science standards.'
            }
        };

        stepBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                stepBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const step = parseInt(btn.getAttribute('data-step') || '1', 10);
                if (phases[step]) {
                    outcomeTag.textContent = phases[step].tag;
                    outcomeText.textContent = phases[step].text;
                }
            });
        });
    };
    initLessonPlanSim();

    // ==============================================================================
    // 19. AWWWARDS V5.0: FINANCIAL RESEARCH PLATFORM QUANTITATIVE DCF CALCULATOR
    // ==============================================================================
    const initFinancialDCFSim = () => {
        const growthSlider = document.getElementById('dcf-growth-slider');
        const waccSlider = document.getElementById('dcf-wacc-slider');
        const growthVal = document.getElementById('dcf-growth-val');
        const waccVal = document.getElementById('dcf-wacc-val');
        const priceVal = document.getElementById('dcf-share-price');
        const evVal = document.getElementById('dcf-ev');
        const mosVal = document.getElementById('dcf-margin-safety');

        if (!growthSlider || !waccSlider || !priceVal) return;

        const calculateDCF = () => {
            const g = parseFloat(growthSlider.value) / 100.0;
            const wacc = parseFloat(waccSlider.value) / 100.0;

            growthVal.textContent = `${growthSlider.value}%`;
            waccVal.textContent = `${waccSlider.value}%`;

            const baseFcf = 158.0;
            let pvFcf = 0.0;
            let fcf = baseFcf;
            for (let y = 1; y <= 5; y++) {
                fcf *= (1.0 + g);
                pvFcf += fcf / Math.pow(1.0 + wacc, y);
            }

            const gTerm = 0.03;
            const tv = fcf * (1.0 + gTerm) / Math.max(0.005, (wacc - gTerm));
            const pvTv = tv / Math.pow(1.0 + wacc, 5);
            const ev = pvFcf + pvTv;
            const equityVal = Math.max(100.0, ev - 200.0);
            const shares = 25.0;
            const intrinsicPrice = equityVal / shares;
            const currentMkt = 115.0;
            const marginOfSafety = ((intrinsicPrice - currentMkt) / currentMkt) * 100.0;

            priceVal.textContent = `$${intrinsicPrice.toFixed(2)}`;
            evVal.textContent = `$${(ev / 1000).toFixed(2)}B`;

            const sign = marginOfSafety >= 0 ? '+' : '';
            mosVal.textContent = `${sign}${marginOfSafety.toFixed(1)}% MoS`;
            if (marginOfSafety >= 15) {
                mosVal.style.color = '#10B981';
                mosVal.style.borderColor = '#10B981';
            } else if (marginOfSafety >= 0) {
                mosVal.style.color = '#38BDF8';
                mosVal.style.borderColor = '#38BDF8';
            } else {
                mosVal.style.color = '#EF4444';
                mosVal.style.borderColor = '#EF4444';
            }
        };

        growthSlider.addEventListener('input', calculateDCF);
        waccSlider.addEventListener('input', calculateDCF);
        calculateDCF();
    };
    initFinancialDCFSim();


    // ==============================================================================
    // AWWWARDS V5.0 UNCONVENTIONAL EXHIBITION STAGE & SWISS ARCHIVE CATALOG
    // ==============================================================================
    const initExhibitionStageAndCatalog = () => {
        const stageBtn = document.getElementById('view-mode-stage');
        const catalogBtn = document.getElementById('view-mode-catalog');
        const stageDeck = document.getElementById('exhibition-deck');
        const catalogView = document.getElementById('archive-catalog-view');
        const stageTabsContainer = document.getElementById('stage-tabs-nav');
        const stageTabs = document.querySelectorAll('.stage-tab-btn');
        const deckItems = document.querySelectorAll('.deck-item');
        const prevBtn = document.getElementById('deck-prev-btn');
        const nextBtn = document.getElementById('deck-next-btn');
        const indicator = document.getElementById('deck-indicator');

        if (!stageBtn || !catalogBtn || !stageDeck || !catalogView) return;

        let activeProjectIdx = 0;
        const projectNames = [
            'AlbumCanvas',
            'Smart Flood Alert',
            'LessonPlan Maker',
            'Financial Research'
        ];

        const updateStageProject = (idx) => {
            if (idx < 0) idx = deckItems.length - 1;
            if (idx >= deckItems.length) idx = 0;
            activeProjectIdx = idx;

            stageTabs.forEach((tab, i) => {
                tab.classList.toggle('active', i === idx);
                tab.setAttribute('aria-selected', i === idx ? 'true' : 'false');
            });

            deckItems.forEach((item, i) => {
                item.classList.toggle('active', i === idx);
            });

            if (indicator) {
                indicator.textContent = `0${idx + 1} / 0${deckItems.length} — ${projectNames[idx] || ''}`;
            }

            if (window.audioSynth) {
                window.audioSynth.playSubtleBeep(620 + idx * 80, 0.05);
            }
        };

        stageTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const idx = parseInt(tab.getAttribute('data-project'), 10);
                updateStageProject(idx);
            });
        });

        if (prevBtn) {
            prevBtn.addEventListener('click', () => updateStageProject(activeProjectIdx - 1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => updateStageProject(activeProjectIdx + 1));
        }

        // View mode switcher (Stage vs Catalog)
        const setViewMode = (mode) => {
            if (mode === 'stage') {
                stageBtn.classList.add('active');
                stageBtn.setAttribute('aria-selected', 'true');
                catalogBtn.classList.remove('active');
                catalogBtn.setAttribute('aria-selected', 'false');

                if (stageTabsContainer) stageTabsContainer.style.display = 'grid';
                stageDeck.style.display = 'block';
                catalogView.classList.remove('active');
                catalogView.style.display = 'none';
            } else {
                catalogBtn.classList.add('active');
                catalogBtn.setAttribute('aria-selected', 'true');
                stageBtn.classList.remove('active');
                stageBtn.setAttribute('aria-selected', 'false');

                if (stageTabsContainer) stageTabsContainer.style.display = 'none';
                stageDeck.style.display = 'none';
                catalogView.classList.add('active');
                catalogView.style.display = 'block';
            }

            if (window.audioSynth) {
                window.audioSynth.playSubtleBeep(880, 0.06);
            }
        };

        stageBtn.addEventListener('click', () => setViewMode('stage'));
        catalogBtn.addEventListener('click', () => setViewMode('catalog'));

        // Catalog filters
        const filterBtns = document.querySelectorAll('.catalog-filter-btn');
        const tableRows = document.querySelectorAll('.catalog-table tbody tr');

        filterBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter');

                tableRows.forEach((row) => {
                    const rowCat = row.getAttribute('data-category');
                    if (category === 'all' || rowCat === category) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });

                if (window.audioSynth) {
                    window.audioSynth.playSubtleBeep(720, 0.04);
                }
            });
        });
    };
    initExhibitionStageAndCatalog();

});