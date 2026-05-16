const emailButton = document.querySelector(".email-button");
const themeToggle = document.querySelector(".theme-toggle");
const revealElements = document.querySelectorAll(".hero-content, .hero-panel, .section, footer");
const heroSection = document.querySelector(".hero");
const heroCanvas = document.querySelector(".hero-canvas");
const featuredProject = document.querySelector(".featured-project");
const projectShowcase = document.querySelector(".project-showcase");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeToggle?.setAttribute("aria-pressed", "true");
}

if (emailButton) {
    const originalLabel = emailButton.querySelector("span").textContent;

    emailButton.addEventListener("click", async () => {
        const email = emailButton.dataset.email;
        const label = emailButton.querySelector("span");

        try {
            await navigator.clipboard.writeText(email);
            label.textContent = "Email copiado";
        } catch {
            window.location.href = `mailto:${email}`;
            label.textContent = "Abrindo email";
        }

        window.setTimeout(() => {
            label.textContent = originalLabel;
        }, 2200);
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");

        themeToggle.setAttribute("aria-pressed", String(isLight));
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });
}

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
}

if (heroCanvas && heroSection && !reduceMotion.matches) {
    const context = heroCanvas.getContext("2d");
    const pointer = { x: 0, y: 0, active: false };
    let particles = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const createParticles = () => {
        const isSmallScreen = window.innerWidth < 720;
        const count = isSmallScreen ? 34 : 78;

        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.36,
            vy: (Math.random() - 0.5) * 0.36,
            size: Math.random() * 2.4 + 1
        }));
    };

    const resizeCanvas = () => {
        const rect = heroCanvas.getBoundingClientRect();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);

        width = rect.width;
        height = rect.height;
        heroCanvas.width = width * ratio;
        heroCanvas.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        createParticles();
    };

    const drawLine = (a, b, opacity) => {
        context.strokeStyle = `rgba(124, 243, 212, ${opacity})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
    };

    const animateCanvas = () => {
        context.clearRect(0, 0, width, height);

        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > height) particle.vy *= -1;

            context.fillStyle = "rgba(124, 243, 212, 0.92)";
            context.beginPath();
            context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            context.fill();

            for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
                const next = particles[nextIndex];
                const distance = Math.hypot(particle.x - next.x, particle.y - next.y);

                if (distance < 130) {
                    drawLine(particle, next, (1 - distance / 130) * 0.28);
                }
            }

            if (pointer.active) {
                const pointerDistance = Math.hypot(particle.x - pointer.x, particle.y - pointer.y);

                if (pointerDistance < 170) {
                    drawLine(particle, pointer, (1 - pointerDistance / 170) * 0.44);
                }
            }
        });

        animationFrame = window.requestAnimationFrame(animateCanvas);
    };

    heroSection.addEventListener("pointermove", (event) => {
        const rect = heroCanvas.getBoundingClientRect();

        pointer.x = event.clientX - rect.left;
        pointer.y = event.clientY - rect.top;
        pointer.active = window.matchMedia("(hover: hover)").matches;
    });

    heroSection.addEventListener("pointerleave", () => {
        pointer.active = false;
    });

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animateCanvas();

    reduceMotion.addEventListener("change", (event) => {
        if (event.matches) {
            window.cancelAnimationFrame(animationFrame);
        }
    });
}

if (featuredProject && projectShowcase) {
    featuredProject.addEventListener("pointermove", (event) => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const rect = featuredProject.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        projectShowcase.style.setProperty("--tilt-x", `${y * -7}deg`);
        projectShowcase.style.setProperty("--tilt-y", `${x * 9}deg`);
    });

    featuredProject.addEventListener("pointerleave", () => {
        projectShowcase.style.setProperty("--tilt-x", "0deg");
        projectShowcase.style.setProperty("--tilt-y", "0deg");
    });
}
