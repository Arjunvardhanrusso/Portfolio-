// --- BOOT SEQUENCE ---
const bootText = document.getElementById('boot-text');
const bootScreen = document.getElementById('boot-sequence');
const bootLines = [
    "Initializing Neural Net...",
    "Mounting sys.ARJUN_AKKENA...",
    "Loading XGBoost Core Weights...",
    "Establishing Quantum Entanglement...",
    "Securing Pipeline to localhost:8080...",
    "ACCESS GRANTED."
];

async function runBootSequence() {
    let currentHtml = "";
    for (let i = 0; i < bootLines.length; i++) {
        currentHtml += `> ${bootLines[i]}<br>`;
        bootText.innerHTML = currentHtml;
        // Wait 300ms per line
        await new Promise(r => setTimeout(r, 300));
    }
    await new Promise(r => setTimeout(r, 500));
    bootScreen.classList.add('fade-out');
    
    // Start canvas after boot
    initCanvas();
}
window.addEventListener('load', runBootSequence);


// --- NEURAL NETWORK CANVAS ---
function initCanvas() {
    const canvas = document.getElementById('neural-net');
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > width) this.vx = -this.vx;
            if (this.y < 0 || this.y > height) this.vy = -this.vy;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)';
            ctx.fill();
        }
    }
    
    // Create particles
    for(let i=0; i<80; i++) particles.push(new Particle());
    
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x; mouse.y = e.y;
    });
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw lines between particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 243, 255, ${0.2 - dist/600})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
            
            // Mouse interaction
            if (mouse.x != null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(188, 19, 254, ${0.4 - dist/375})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// --- 3D TILT EFFECT ON CARDS ---
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top; // y position within the element
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -10; // Max tilt 10deg
        const rotateY = ((x - centerX) / centerX) * 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        this.style.transition = "transform 0.5s ease"; // smooth snap back
    });
    
    card.addEventListener('mouseenter', function() {
        this.style.transition = "none"; // remove transition while moving
    });
});


// --- SCROLL ANIMATIONS (Intersection Observer) ---
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


// --- FORM SUBMISSION & BACKEND INTEGRATION (Typewriter Effect) ---
const orderForm = document.getElementById('orderForm');
const terminalOutput = document.getElementById('terminalOutput');

// Helper to simulate slow typing
async function typeWriter(element, text, speed = 25) {
    let currentHtml = element.innerHTML.replace('<span class="cursor"></span>', '');
    element.innerHTML = currentHtml + '<span class="cursor"></span>';
    
    for(let i=0; i<text.length; i++) {
        currentHtml += text.charAt(i);
        element.innerHTML = currentHtml + '<span class="cursor"></span>';
        await new Promise(r => setTimeout(r, speed));
    }
    element.innerHTML = currentHtml + '<br><span class="cursor"></span>';
}

orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const customerIdEl = document.getElementById('customerId');
    const productIdEl = document.getElementById('productId');
    const quantityEl = document.getElementById('quantity');
    const submitBtn = document.getElementById('submitBtn');

    const payload = {
        customerId: customerIdEl.value,
        productId: productIdEl.value,
        quantity: parseInt(quantityEl.value, 10)
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'executing [███---]';
    terminalOutput.classList.remove('hidden');
    terminalOutput.innerHTML = '';
    
    await typeWriter(terminalOutput, "> transmitting payload to localhost:8080...", 10);

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const dataText = await response.text();

        if (response.ok) {
            await typeWriter(terminalOutput, `> HTTP 200 OK`, 10);
            await typeWriter(terminalOutput, `> [SUCCESS]: ${dataText}`, 30);
            await typeWriter(terminalOutput, `> Your deployment sequence has been successfully initialized.`, 15);
            orderForm.reset();
        } else {
            await typeWriter(terminalOutput, `> HTTP ${response.status} CONFLICT`, 20);
            await typeWriter(terminalOutput, `> <span class="error-msg">[ERROR]: ${dataText}</span>`, 30);
        }

    } catch (error) {
        await typeWriter(terminalOutput, `> <span class="error-msg">[CRITICAL]: Backend unreachable. ${error.message}</span>`, 10);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'execute --deploy';
    }
});
