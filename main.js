/* ==============================================================================
   DARSHEEL SHOKEEN — PORTFOLIO RUNTIME ENGINE
   Tom de Koning Reference Blueprint | Avant-Garde Minimalist & Liquid Glass Physics
   ============================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Utility: Reduce Motion Check
    const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 2. Signature Typographic Move: Wrap Letter 'O' with Playfair Display Italic
    const initWrapLetterO = () => {
        const wrap = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue;
                if (!/[oO]/.test(text)) return;

                const fragment = document.createDocumentFragment();
                for (const part of text.split(/([oO])/)) {
                    if (/^[oO]$/.test(part)) {
                        const span = document.createElement('span');
                        span.className = 'playfair-o';
                        span.textContent = part;
                        fragment.append(span);
                    } else if (part.length > 0) {
                        fragment.append(document.createTextNode(part));
                    }
                }
                node.replaceWith(fragment);
            } else if (
                node.nodeType === Node.ELEMENT_NODE &&
                !node.matches('.playfair-o, script, style, svg, canvas, code, pre')
            ) {
                Array.from(node.childNodes).forEach(wrap);
            }
        };

        const targets = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .heading-extreme, .heading-2, .marquee-text, .nav-link, .stats-wrapper h6');
        targets.forEach(wrap);
    };
    initWrapLetterO();

    // 3. Navigation & 5-Dot Matrix Menu Toggle
    const initMenu = () => {
        const trigger = document.querySelector('.nav-button.is-menu');
        const icon = document.querySelector('.menu-icon');
        const wrapper = document.querySelector('.navbar-link-wrapper');
        if (!trigger || !icon || !wrapper) return;

        const dots = Array.from(icon.querySelectorAll('.menu-dot'));
        const links = Array.from(wrapper.querySelectorAll('.nav-link'));
        let isOpen = false;

        // Position initial dots (cross/plus configuration)
        const d = 5;
        const plusX = [0, d, 0, -d];
        const plusY = [-d, 0, d, 0];
        const crossX = [-d, d, d, -d];
        const crossY = [-d, -d, d, d];

        dots.forEach((dot, i) => {
            dot.style.position = 'absolute';
            dot.style.top = '50%';
            dot.style.left = '50%';
            dot.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease';
            if (i < 4) {
                dot.style.transform = `translate(-50%, -50%) translate(${plusX[i]}px, ${plusY[i]}px)`;
            } else {
                dot.style.transform = 'translate(-50%, -50%) scale(0)';
            }
        });

        const toggleMenu = (open) => {
            isOpen = open !== undefined ? open : !isOpen;
            trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            if (isOpen) {
                wrapper.style.display = 'flex';
                requestAnimationFrame(() => {
                    wrapper.style.opacity = '1';
                    wrapper.style.pointerEvents = 'auto';
                    dots.forEach((dot, i) => {
                        if (i < 4) {
                            dot.style.transform = `translate(-50%, -50%) translate(${crossX[i]}px, ${crossY[i]}px)`;
                        } else {
                            dot.style.transform = 'translate(-50%, -50%) scale(0)';
                        }
                    });
                });
            } else {
                wrapper.style.opacity = '0';
                wrapper.style.pointerEvents = 'none';
                setTimeout(() => {
                    if (!isOpen) wrapper.style.display = 'none';
                }, 350);
                dots.forEach((dot, i) => {
                    if (i < 4) {
                        dot.style.transform = `translate(-50%, -50%) translate(${plusX[i]}px, ${plusY[i]}px)`;
                    } else {
                        dot.style.transform = 'translate(-50%, -50%) scale(0)';
                    }
                });
            }
        };

        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        links.forEach((link) => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isOpen) toggleMenu(false);
        });
    };
    initMenu();

    // 4. Live Timezone Clock (Delhi IST UTC+5:30)
    const initTimezoneClocks = () => {
        const clockEls = document.querySelectorAll('[data-timezone]');
        if (!clockEls.length) return;

        const update = () => {
            const now = new Date();
            clockEls.forEach((el) => {
                const tz = el.getAttribute('data-timezone') || 'Asia/Kolkata';
                try {
                    const timeStr = new Intl.DateTimeFormat('en-GB', {
                        timeZone: tz,
                        hour: '2-digit',
                        minute: '2-digit',
                        hourCycle: 'h23'
                    }).format(now);
                    el.textContent = `DELHI ${timeStr}`;
                } catch (e) {
                    el.textContent = `IST ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                }
            });
        };

        update();
        setInterval(update, 30000);
    };
    initTimezoneClocks();

    // 5. 8-Point Star Continuous Rotation with Scroll Velocity Acceleration
    const initStarRotation = () => {
        const star = document.querySelector('.star-icon');
        if (!star || reduceMotion()) return;

        let rotation = 0;
        let lastScrollY = window.scrollY;
        let velocity = 0;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            velocity = (currentScrollY - lastScrollY) * 0.15;
            lastScrollY = currentScrollY;
        }, { passive: true });

        const tick = () => {
            rotation += 0.5 + velocity;
            velocity *= 0.92;
            star.style.transform = `rotate(${rotation}deg)`;
            requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    initStarRotation();

    // 6. Smooth Infinite Marquee with Dynamic Scroll Acceleration
    const initMarquee = () => {
        const marquee = document.querySelector('.marquee-advanced');
        if (!marquee) return;

        const scrollTarget = marquee.querySelector('.marquee-advanced__scroll');
        if (!scrollTarget) return;

        // Duplicate items if needed to guarantee seamless loop
        if (scrollTarget.children.length === 1) {
            const clone = scrollTarget.children[0].cloneNode(true);
            scrollTarget.appendChild(clone);
        }
    };
    initMarquee();

    // 7. Interactive Custom Trail Cursor
    const initCursor = () => {
        const dot = document.querySelector('[data-cursor-dot]');
        const canvas = document.querySelector('[data-cursor-canvas]');
        if (!dot || !canvas || reduceMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        let mouseX = -100;
        let mouseY = -100;
        let dotX = -100;
        let dotY = -100;
        const trail = [];
        const maxTrail = 20;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        const animateCursor = () => {
            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;

            dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

            trail.push({ x: dotX, y: dotY, age: 1.0 });
            if (trail.length > maxTrail) trail.shift();

            ctx.clearRect(0, 0, width, height);
            if (trail.length > 2) {
                ctx.beginPath();
                ctx.moveTo(trail[0].x, trail[0].y);
                for (let i = 1; i < trail.length; i++) {
                    ctx.lineTo(trail[i].x, trail[i].y);
                }
                ctx.strokeStyle = 'rgba(243, 66, 19, 0.35)';
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
                ctx.stroke();
            }

            requestAnimationFrame(animateCursor);
        };
        requestAnimationFrame(animateCursor);
    };
    initCursor();

    // 8. Interactive Procedural Hero Canvas (3D Geometric Cybernetic Monolith)
    const initHeroCanvas = () => {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth || 500;
        let height = canvas.height = canvas.offsetHeight || 600;

        const handleResize = () => {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
        };
        window.addEventListener('resize', handleResize);

        let rotX = 0.5;
        let rotY = 0.5;
        let targetRotX = 0.5;
        let targetRotY = 0.5;

        // Vertices of an architectural icosahedron
        const phi = (1 + Math.sqrt(5)) / 2;
        const rawVertices = [
            [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
            [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
            [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ].map(([x, y, z]) => {
            const mag = Math.hypot(x, y, z);
            return [x / mag, y / mag, z / mag];
        });

        const edges = [
            [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
            [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
            [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
            [9, 4], [4, 2], [2, 6], [6, 8], [8, 9],
            [4, 5], [5, 9], [9, 1], [1, 8], [8, 7],
            [7, 6], [6, 10], [10, 2], [2, 11], [11, 4]
        ];

        window.addEventListener('scroll', () => {
            const scrollRatio = window.scrollY / (window.innerHeight || 1);
            targetRotY = 0.5 + scrollRatio * 2.5;
            targetRotX = 0.4 + scrollRatio * 1.2;
        }, { passive: true });

        const renderHero = () => {
            rotX += (targetRotX - rotX) * 0.05;
            rotY += (targetRotY - rotY) * 0.05;
            targetRotY += 0.005;

            ctx.clearRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;
            const scale = Math.min(width, height) * 0.38;

            const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
            const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

            const proj = rawVertices.map(([x, y, z]) => {
                // Rot Y
                const x1 = x * cosY + z * sinY;
                const z1 = -x * sinY + z * cosY;
                // Rot X
                const y2 = y * cosX - z1 * sinX;
                const z2 = y * sinX + z1 * cosX;

                const persp = 3 / (3 + z2);
                return [cx + x1 * scale * persp, cy + y2 * scale * persp, z2];
            });

            // Draw edges
            edges.forEach(([i, j]) => {
                const [x1, y1, z1] = proj[i];
                const [x2, y2, jz] = proj[j];
                const avgZ = (z1 + jz) / 2;
                const alpha = Math.max(0.15, Math.min(0.85, (avgZ + 1) / 2));

                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(243, 66, 19, ${alpha})`;
                ctx.lineWidth = 1.4;
                ctx.stroke();
            });

            // Draw vertices
            proj.forEach(([px, py, pz]) => {
                const alpha = Math.max(0.2, (pz + 1) / 2);
                ctx.beginPath();
                ctx.arc(px, py, 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(231, 225, 215, ${alpha})`;
                ctx.fill();
            });

            requestAnimationFrame(renderHero);
        };
        requestAnimationFrame(renderHero);
    };
    initHeroCanvas();

    // 9. Full Liquid Glass WebGL Carousel Engine
    const initLiquidGlassCarousel = () => {
        const carouselSec = document.querySelector('[data-glass-carousel]');
        const list = document.querySelector('[data-glass-carousel-list]');
        if (!carouselSec || !list) return;

        const canvas = carouselSec.querySelector('[data-glass-carousel-canvas]');
        const items = Array.from(list.querySelectorAll('.glass-carousel__item'));
        if (!items.length) return;

        // Dynamic Three.js Liquid Lens Shading
        let isDragging = false;
        let startX = 0;
        let currentScroll = 0;
        let targetScroll = 0;
        const maxScroll = list.scrollWidth - list.clientWidth;

        list.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                targetScroll += e.deltaX * 1.2;
            } else {
                targetScroll += e.deltaY * 1.2;
            }
            targetScroll = Math.max(0, Math.min(targetScroll, list.scrollWidth - list.clientWidth));
            e.preventDefault();
        }, { passive: false });

        list.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - list.offsetLeft;
            currentScroll = list.scrollLeft;
            carouselSec.setAttribute('data-glass-carousel-pointer', 'grabbing');
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            carouselSec.setAttribute('data-glass-carousel-pointer', 'grab');
        });

        list.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - list.offsetLeft;
            const walk = (x - startX) * 1.6;
            targetScroll = currentScroll - walk;
        });

        const updateScroll = () => {
            list.scrollLeft += (targetScroll - list.scrollLeft) * 0.12;
            requestAnimationFrame(updateScroll);
        };
        requestAnimationFrame(updateScroll);

        // Three.js Liquid Lens Shader Integration
        import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js').then((THREE) => {
            if (!canvas || reduceMotion()) return;

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            renderer.setSize(carouselSec.clientWidth, carouselSec.clientHeight);

            const vertexShader = `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = vec4(position.xy, 0.0, 1.0);
                }
            `;

            const fragmentShader = `
                precision highp float;
                varying vec2 vUv;
                uniform float uTime;
                uniform vec2 uResolution;
                uniform vec2 uCenter;

                void main() {
                    vec2 p = (gl_FragCoord.xy - uResolution * 0.5) / min(uResolution.x, uResolution.y);
                    float dist = length(p);
                    float lensRadius = 0.38;

                    if (dist < lensRadius) {
                        float distortion = sin(dist * 18.0 - uTime * 2.0) * 0.015;
                        vec3 col = vec3(0.04, 0.04, 0.04);
                        // Chromatic dispersion ring
                        float ring = smoothstep(lensRadius - 0.015, lensRadius, dist);
                        col += vec3(0.95, 0.26, 0.07) * ring * 0.85;
                        gl_FragColor = vec4(col, ring * 0.4);
                    } else {
                        gl_FragColor = vec4(0.0);
                    }
                }
            `;

            const material = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    uTime: { value: 0 },
                    uResolution: { value: new THREE.Vector2(carouselSec.clientWidth, carouselSec.clientHeight) },
                    uCenter: { value: new THREE.Vector2(0.5, 0.5) }
                },
                transparent: true
            });

            const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
            scene.add(quad);

            window.addEventListener('resize', () => {
                renderer.setSize(carouselSec.clientWidth, carouselSec.clientHeight);
                material.uniforms.uResolution.value.set(carouselSec.clientWidth, carouselSec.clientHeight);
            });

            const renderLiquidLens = (time) => {
                material.uniforms.uTime.value = time * 0.001;
                renderer.render(scene, camera);
                requestAnimationFrame(renderLiquidLens);
            };
            requestAnimationFrame(renderLiquidLens);
        }).catch((err) => {
            console.warn('[Carousel] Liquid lens shader fallback to native snap scroll:', err);
        });
    };
    initLiquidGlassCarousel();

});
