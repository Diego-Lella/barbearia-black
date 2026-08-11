/* =========================================================
   BARBEARIA BLACK — main.js
   Sem backend, sem banco de dados: só interações de front-end.
   ========================================================= */

/* ⚙️ ============ CONFIGURAÇÕES — EDITE AQUI ============ ⚙️
   1. Troque WHATSAPP_NUMBER pelo número real, no formato:
      DDI + DDD + número, só dígitos (ex.: 55 11 91234-5678 -> "5511912345678")
   2. As mensagens abaixo já vêm preenchidas e podem ser editadas livremente.
--------------------------------------------------------- */
const CONFIG = {
  WHATSAPP_NUMBER: "5511999999999", // número de exemplo — SUBSTITUA pelo número real

  MESSAGES: {
    hero: "Olá! Vim pelo site e quero agendar um horário na Barbearia Black.",
    corte: "Olá! Quero agendar um Corte Masculino na Barbearia Black.",
    combo: "Olá! Quero agendar um Corte + Barba na Barbearia Black.",
    barba: "Olá! Quero agendar uma Barba na Barbearia Black.",
    local: "Olá! Vi a localização no site e quero marcar um horário na Barbearia Black.",
    cta_final: "Olá! Quero agendar meu horário na Barbearia Black."
  }
};

/* ---------- monta o link do WhatsApp ---------- */
function buildWhatsAppLink(messageKey) {
  const text = CONFIG.MESSAGES[messageKey] || CONFIG.MESSAGES.hero;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function wireWhatsAppButtons() {
  document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
    const key = btn.dataset.message || "hero";
    btn.setAttribute("href", buildWhatsAppLink(key));
  });
}

/* ---------- header muda de estilo ao rolar ---------- */
function wireHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header) return;
  const toggle = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}

/* ---------- menu mobile ---------- */
function wireMobileNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("mainNav");
  if (!toggle || !nav) return;

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeNav();
  });
}

/* ---------- animações leves ao rolar a página ---------- */
function wireRevealOnScroll() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- ano atual no rodapé ---------- */
function setFooterYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireWhatsAppButtons();
  wireHeaderScroll();
  wireMobileNav();
  wireRevealOnScroll();
  setFooterYear();
});
