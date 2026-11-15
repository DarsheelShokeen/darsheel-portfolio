// ==========================================================================
//  AlbumCanvas — Interactive Showcase Controller
// ==========================================================================

// Track project visit in portfolio
(function() {
    var acCount = parseInt(localStorage.getItem('albumcanvas_use_count') || '0', 10);
    localStorage.setItem('albumcanvas_use_count', (acCount + 1).toString());
})();

// --------------------------------------------------------------------------
//  Theme Synchronization
// --------------------------------------------------------------------------
function getTheme() {
    return localStorage.getItem('portfolio_theme') || 'dark';
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
}

setTheme(getTheme());

const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const next = getTheme() === 'dark' ? 'light' : 'dark';
        setTheme(next);
    });
}

// --------------------------------------------------------------------------
//  Presets Data
// --------------------------------------------------------------------------
const TRACK_PRESETS = [
    {
        title: "After Hours",
        artist: "The Weeknd",
        cover: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        palette: {
            dominant: "#180b13",
            vibrant: "#e11d48",
            muted: "#9f1239",
            lightVibrant: "#fecdd3",
            darkMuted: "#4c0519"
        }
    },
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        cover: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80",
        palette: {
            dominant: "#0b1329",
            vibrant: "#0284c7",
            muted: "#334155",
            lightVibrant: "#bae6fd",
            darkMuted: "#0f172a"
        }
    },
    {
        title: "Blonde",
        artist: "Frank Ocean",
        cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
        palette: {
            dominant: "#192211",
            vibrant: "#84cc16",
            muted: "#4d5f2a",
            lightVibrant: "#d9f99d",
            darkMuted: "#1a2e05"
        }
    },
    {
        title: "Currents",
        artist: "Tame Impala",
        cover: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
        palette: {
            dominant: "#1c0d29",
            vibrant: "#a855f7",
            muted: "#701a75",
            lightVibrant: "#f0abfc",
            darkMuted: "#3b0764"
        }
    }
];

let currentTrackIndex = 0;

// --------------------------------------------------------------------------
//  DOM Elements
// --------------------------------------------------------------------------
const phoneClock = document.getElementById('phone-clock');
const phoneDate = document.getElementById('phone-date');
const wallpaperBg = document.getElementById('wallpaper-bg');
const wallpaperScrim = document.getElementById('wallpaper-scrim');
const albumArtImg = document.getElementById('album-art-img');
const albumArtCard = document.getElementById('album-art-card');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

const wallpaperView = document.getElementById('wallpaper-view');
const widgetView = document.getElementById('widget-view');
const widgetArt = document.getElementById('widget-art');
const widgetTitle = document.getElementById('widget-title');
const widgetArtist = document.getElementById('widget-artist');
const materialWidget = document.getElementById('material-widget');

const sliderBlur = document.getElementById('slider-blur');
const valBlur = document.getElementById('val-blur');
const sliderSize = document.getElementById('slider-size');
const valSize = document.getElementById('val-size');
const sliderRadius = document.getElementById('slider-radius');
const valRadius = document.getElementById('val-radius');
const sliderScrim = document.getElementById('slider-scrim');
const valScrim = document.getElementById('val-scrim');

const tracksContainer = document.getElementById('tracks-container');
const paletteContainer = document.getElementById('palette-container');

// --------------------------------------------------------------------------
//  Phone Clock Live Updater
// --------------------------------------------------------------------------
function updatePhoneClock() {
    const now = new Date();
    if (phoneClock) {
        phoneClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    if (phoneDate) {
        phoneDate.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
}
setInterval(updatePhoneClock, 1000);
updatePhoneClock();

// --------------------------------------------------------------------------
//  Render Track Presets
// --------------------------------------------------------------------------
function renderTrackChips() {
    tracksContainer.innerHTML = TRACK_PRESETS.map((t, idx) => `
        <div class="track-chip ${idx === currentTrackIndex ? 'active' : ''}" data-index="${idx}">
            <img src="${t.cover}" class="chip-img" alt="${t.title}" />
            <div class="chip-meta">
                <div class="chip-title">${t.title}</div>
                <div class="chip-artist">${t.artist}</div>
            </div>
        </div>
    `).join('');

    tracksContainer.querySelectorAll('.track-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const idx = parseInt(chip.getAttribute('data-index'), 10);
            applyTrack(idx);
        });
    });
}

// --------------------------------------------------------------------------
//  Apply Selected Track
// --------------------------------------------------------------------------
function applyTrack(index) {
    currentTrackIndex = index;
    const t = TRACK_PRESETS[index];

    // Highlight active chip
    tracksContainer.querySelectorAll('.track-chip').forEach((c, idx) => {
        c.classList.toggle('active', idx === index);
    });

    // Update phone wallpaper and artwork
    wallpaperBg.style.backgroundImage = `url('${t.cover}')`;
    albumArtImg.src = t.cover;
    songTitle.textContent = t.title;
    songArtist.textContent = t.artist;

    // Update Widget
    if (widgetArt) widgetArt.src = t.cover;
    if (widgetTitle) widgetTitle.textContent = t.title;
    if (widgetArtist) widgetArtist.textContent = t.artist;
    if (materialWidget) {
        materialWidget.style.borderColor = `${t.palette.vibrant}55`;
        materialWidget.style.boxShadow = `0 16px 36px ${t.palette.vibrant}33`;
    }

    // Render extracted palette swatches
    renderPalette(t.palette);
}

// --------------------------------------------------------------------------
//  Render Extracted Palette
// --------------------------------------------------------------------------
function renderPalette(palette) {
    const labels = [
        { key: 'dominant', label: 'Dominant' },
        { key: 'vibrant', label: 'Vibrant' },
        { key: 'muted', label: 'Muted' },
        { key: 'lightVibrant', label: 'Light Vibrant' },
        { key: 'darkMuted', label: 'Dark Muted' }
    ];

    paletteContainer.innerHTML = labels.map(item => {
        const hex = palette[item.key] || '#888888';
        return `
            <div class="palette-swatch" onclick="copyHex('${hex}')" title="Click to copy ${hex}">
                <div class="swatch-color-box" style="background-color: ${hex};"></div>
                <span class="swatch-label">${item.label}</span>
                <span class="swatch-hex">${hex}</span>
            </div>
        `;
    }).join('');
}

window.copyHex = function(hex) {
    navigator.clipboard.writeText(hex).then(() => {
        alert(`Copied ${hex} to clipboard!`);
    }).catch(() => {});
};

// --------------------------------------------------------------------------
//  Customization Controls (Real-time updates)
// --------------------------------------------------------------------------
sliderBlur.addEventListener('input', (e) => {
    valBlur.textContent = `${e.target.value}px`;
    wallpaperBg.style.filter = `blur(${e.target.value}px)`;
});

sliderSize.addEventListener('input', (e) => {
    valSize.textContent = `${e.target.value}px`;
    albumArtCard.style.width = `${e.target.value}px`;
    albumArtCard.style.height = `${e.target.value}px`;
});

sliderRadius.addEventListener('input', (e) => {
    valRadius.textContent = `${e.target.value}px`;
    albumArtCard.style.borderRadius = `${e.target.value}px`;
});

sliderScrim.addEventListener('input', (e) => {
    valScrim.textContent = `${e.target.value}%`;
    const opacity = (parseInt(e.target.value, 10) / 100).toFixed(2);
    wallpaperScrim.style.opacity = opacity;
});

// --------------------------------------------------------------------------
//  Mode Switcher (Live Wallpaper vs Widget)
// --------------------------------------------------------------------------
const tabWallpaper = document.getElementById('tab-wallpaper');
const tabWidget = document.getElementById('tab-widget');

tabWallpaper.addEventListener('click', () => {
    tabWallpaper.classList.add('active');
    tabWidget.classList.remove('active');
    wallpaperView.style.display = 'flex';
    widgetView.style.display = 'none';
});

tabWidget.addEventListener('click', () => {
    tabWidget.classList.add('active');
    tabWallpaper.classList.remove('active');
    wallpaperView.style.display = 'none';
    widgetView.style.display = 'flex';
});

// --------------------------------------------------------------------------
//  Custom Artwork Upload Support
// --------------------------------------------------------------------------
const fileInput = document.getElementById('custom-art-upload');
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const customTrack = {
                    title: file.name.replace(/\.[^/.]+$/, ""),
                    artist: "Custom Media",
                    cover: event.target.result,
                    palette: {
                        dominant: "#121216",
                        vibrant: "#8b5cf6",
                        muted: "#475569",
                        lightVibrant: "#c084fc",
                        darkMuted: "#1e1b4b"
                    }
                };
                TRACK_PRESETS.unshift(customTrack);
                renderTrackChips();
                applyTrack(0);
            };
            reader.readAsDataURL(file);
        }
    });
}

// --------------------------------------------------------------------------
//  Init
// --------------------------------------------------------------------------
renderTrackChips();
applyTrack(0);
