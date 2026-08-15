/* =========================================================
   BARBEARIA BLACK — main.js
   ========================================================= */

const CONFIG = {
  WHATSAPP_NUMBER: "5511999999999",

  MESSAGES: {
    hero: "Olá! Vim pelo site e quero agendar um horário na Barbearia Black.",
    corte: "Olá! Quero agendar um Corte Masculino na Barbearia Black.",
    combo: "Olá! Quero agendar um Corte + Barba na Barbearia Black.",
    barba: "Olá! Quero agendar uma Barba na Barbearia Black.",
    local: "Olá! Vi a localização no site e quero marcar um horário na Barbearia Black.",
    cta_final: "Olá! Quero agendar meu horário na Barbearia Black."
  }
};

/* ---------- WhatsApp ---------- */

function buildWhatsAppLink(messageKey) {
  const text =
    CONFIG.MESSAGES[messageKey] || CONFIG.MESSAGES.hero;

  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function wireWhatsAppButtons() {
  document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
    const key = btn.dataset.message || "hero";

    btn.setAttribute(
      "href",
      buildWhatsAppLink(key)
    );
  });
}

/* ---------- Header ---------- */

function wireHeaderScroll() {
  const header = document.getElementById("siteHeader");

  if (!header) return;

  const toggle = () => {
    header.classList.toggle(
      "is-scrolled",
      window.scrollY > 8
    );
  };

  toggle();

  window.addEventListener(
    "scroll",
    toggle,
    { passive: true }
  );
}

/* ---------- Menu mobile ---------- */

function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");

  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");

    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  };

  toggle.addEventListener("click", () => {
    const isOpen =
      nav.classList.toggle("is-open");

    toggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

/* ---------- Animações ---------- */

function wireRevealOnScroll() {
  const items =
    document.querySelectorAll(".reveal");

  if (!items.length) return;

  if (
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
  ) {
    items.forEach((el) => {
      el.classList.add("is-visible");
    });

    return;
  }

  const observer =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
      }
    );

  items.forEach((el) => {
    observer.observe(el);
  });
}

/* ---------- Ano ---------- */

function setFooterYear() {
  const el =
    document.getElementById("year");

  if (el) {
    el.textContent =
      new Date().getFullYear();
  }
}

/* =========================================================
   IMAGENS PROFISSIONAIS
   ========================================================= */

function applyDemoImages() {

  const images = {

    

    ambiente:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=90",

    corte:
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=90",

    navalha:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=90",

    barba:
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=90",

    espera:
      "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=90",

    degrade:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=90"
  };


  /* HERO */

  const hero =
    document.querySelector(".hero-visual");

  if (hero) {
    hero.style.setProperty(
      "--hero-image",
      `url("${images.hero}")`
    );
  }


  /* GALERIA */

  const galleryImages = [
    images.ambiente,
    images.corte,
    images.navalha,
    images.barba,
    images.espera,
    images.degrade
  ];

  document
    .querySelectorAll(".gallery-item")
    .forEach((item, index) => {

      if (galleryImages[index]) {

        item.style.setProperty(
          "--gallery-image",
          `url("${galleryImages[index]}")`
        );

      }

    });


  /* SOBRE */

  const aboutVisual =
    document.querySelector(".about-visual");

  if (aboutVisual) {

    aboutVisual.style.setProperty(
      "--about-image",
      `url("${images.corte}")`
    );

  }

}


/* ---------- Inicialização ---------- */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    wireWhatsAppButtons();

    wireHeaderScroll();

    wireMobileNav();

    wireRevealOnScroll();

    setFooterYear();

    applyDemoImages();

  }
);
