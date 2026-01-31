/**
 * Cyber-Grit Interactions
 * Adds high-tech, industrial feel to the web experience.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTextDecoder();
    initMagneticButtons();
    initScrollReveal();
    initNoiseInteraction();
});

// --- 1. Text Decoding Effect ---
function initTextDecoder() {
    const targets = document.querySelectorAll('.cyber-decode');
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    
    targets.forEach(el => {
        const originalText = el.innerText;
        el.dataset.value = originalText;
        
        // Initial scramble on load
        scrambleText(el, originalText, chars);
        
        // Optional: Re-scramble on hover
        el.addEventListener('mouseenter', () => {
             scrambleText(el, originalText, chars, 20); // Faster on hover
        });
    });
}

function scrambleText(element, finalText, chars, speed = 40) {
    let iterations = 0;
    const interval = setInterval(() => {
        element.innerText = finalText
            .split('')
            .map((letter, index) => {
                if(index < iterations) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');
        
        if(iterations >= finalText.length) {
            clearInterval(interval);
        }
        
        iterations += 1/3;
    }, speed);
}

// --- 2. Magnetic Buttons ---
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-magnetic');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Subtle movement
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            
            // Move the background glow/shine if strictly CSS is limited
            btn.style.setProperty('--x', `${e.clientX - rect.left}px`);
            btn.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

// --- 3. Scroll Reveal & Parallax ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.cyber-reveal').forEach(el => observer.observe(el));
    
    // Parallax logic for decorative elements could go here
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.body.style.setProperty('--scroll', scrolled);
    });
}

// --- 4. Interactive Noise/Grain ---
function initNoiseInteraction() {
    // Dynamically adjust noise opacity based on mouse speed (simulating interference)
    let lastX = 0; 
    let lastY = 0;
    let timeout;
    
    const noiseLayer = document.querySelector('.cyber-noise-overlay');
    if(!noiseLayer) return;

    document.addEventListener('mousemove', (e) => {
        const speed = Math.abs(e.movementX) + Math.abs(e.movementY);
        const opacity = Math.min(0.03 + (speed * 0.001), 0.15); // Cap at 0.15
        
        noiseLayer.style.opacity = opacity;
        
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            noiseLayer.style.opacity = 0.03; // Return to base
        }, 100);
    });
}
