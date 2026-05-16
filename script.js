const emailButton = document.querySelector(".email-button");
const themeToggle = document.querySelector(".theme-toggle");
const revealElements = document.querySelectorAll(".hero-content, .hero-panel, .section, footer");

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
