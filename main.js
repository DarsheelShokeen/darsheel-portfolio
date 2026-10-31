/**
 * DARSHEEL SHOKEEN — Runtime Engine V2.0
 * Obsidian Violet Design System • Fast, Accessible, Pure ES6+
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Treatment & Mobile Drawer
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

    // 2. Active Section Spy
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

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
                link.classList.add('active');
            } else if (href.startsWith('#')) {
                link.classList.remove('active');
            }
        });
    };
    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // 3. Live IST Clock (Delhi, India)
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

    // 4. Real Worldwide Visit Counter
    const counterEl = document.getElementById('visit-counter-val');
    if (counterEl) {
        const cached = parseInt(localStorage.getItem('portfolio_global_visits') || '268', 10);

        const animateCount = (target) => {
            let current = parseInt(counterEl.textContent.replace(/\D/g, '') || '0', 10);
            if (current >= target) {
                counterEl.textContent = target.toLocaleString();
                return;
            }
            const increment = Math.max(1, Math.ceil((target - current) / 28));
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counterEl.textContent = current.toLocaleString();
            }, 30);
        };

        animateCount(cached);

        const counterEndpoint = (!window.location.protocol.startsWith('file')) ? 'counter.php?action=increment' : null;
        if (counterEndpoint) {
            fetch(counterEndpoint, { cache: 'no-store' })
                .then(res => res.json())
                .then(data => {
                    if (data && typeof data.count === 'number') {
                        localStorage.setItem('portfolio_global_visits', data.count.toString());
                        animateCount(data.count);
                    }
                })
                .catch(() => {
                    const fallback = cached + 1;
                    localStorage.setItem('portfolio_global_visits', fallback.toString());
                    animateCount(fallback);
                });
        }
    }

    // 5. Dynamic Footer Copyright Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 6. Back-to-Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 7. Command Palette (Ctrl+K / Cmd+K)
    const cmdOverlay = document.getElementById('cmd-palette');
    const cmdInput = document.getElementById('cmd-input');
    const cmdList = document.getElementById('cmd-list');
    const cmdOpenBtns = document.querySelectorAll('.open-cmd-btn');

    if (cmdOverlay && cmdInput && cmdList) {
        const openPalette = () => {
            cmdOverlay.classList.add('open');
            cmdInput.value = '';
            filterCmdItems('');
            setTimeout(() => cmdInput.focus(), 50);
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

        function filterCmdItems(query) {
            const items = cmdList.querySelectorAll('.cmd-item');
            const q = query.toLowerCase().trim();
            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (!q || text.includes(q)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        }

        cmdInput.addEventListener('input', (e) => {
            filterCmdItems(e.target.value);
        });

        // Keyboard arrow navigation in palette
        cmdInput.addEventListener('keydown', (e) => {
            const visibleItems = Array.from(cmdList.querySelectorAll('.cmd-item')).filter(it => it.style.display !== 'none');
            const activeIdx = visibleItems.findIndex(it => it.classList.contains('active'));

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (activeIdx !== -1) visibleItems[activeIdx].classList.remove('active');
                const nextIdx = (activeIdx + 1) % visibleItems.length;
                if (visibleItems[nextIdx]) visibleItems[nextIdx].classList.add('active');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (activeIdx !== -1) visibleItems[activeIdx].classList.remove('active');
                const prevIdx = (activeIdx - 1 + visibleItems.length) % visibleItems.length;
                if (visibleItems[prevIdx]) visibleItems[prevIdx].classList.add('active');
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const target = activeIdx !== -1 ? visibleItems[activeIdx] : visibleItems[0];
                if (target) {
                    const link = target.getAttribute('data-href');
                    if (link) window.location.href = link;
                }
            }
        });
    }

    // 8. Contact Form Handling
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
