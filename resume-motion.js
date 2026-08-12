(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("motion-ready");

  function setupMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("open", !open);
      document.body.classList.toggle("menu-open", !open);
    });
    nav.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  }

  function setupReveal() {
    const items = Array.from(document.querySelectorAll(".reveal"));
    items.forEach((item, index) => item.style.setProperty("--delay", `${Math.min((index % 5) * 55, 220)}ms`));
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px" });
    items.forEach((item) => observer.observe(item));
  }

  function setupScrollEffects() {
    const progress = document.querySelector(".reading-progress span");
    const heroImage = document.querySelector(".hero-image img");
    let scheduled = false;
    const update = () => {
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      if (progress) progress.style.transform = `scaleX(${Math.min(window.scrollY / maximum, 1)})`;
      if (heroImage && !reduceMotion && window.scrollY < 900) {
        heroImage.style.transform = `translate3d(0,${window.scrollY * 0.055}px,0) scale(1.025)`;
      }
      scheduled = false;
    };
    window.addEventListener("scroll", () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function setupAccordions() {
    const accordions = Array.from(document.querySelectorAll(".job-accordion"));
    accordions.forEach((accordion) => {
      accordion.addEventListener("toggle", () => {
        if (!accordion.open) return;
        accordions.forEach((other) => { if (other !== accordion) other.open = false; });
      });
    });
    document.querySelectorAll(".work-card[href^='#']").forEach((card) => {
      card.addEventListener("click", () => {
        const target = document.querySelector(card.getAttribute("href"));
        if (target?.tagName === "DETAILS") target.open = true;
      });
    });
  }

  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll(".site-header nav a[href^='#']"));
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => link.classList.remove("active"));
        links.find((link) => link.getAttribute("href") === `#${entry.target.id}`)?.classList.add("active");
      });
    }, { rootMargin: "-30% 0px -60%", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });
    setupMenu();
    setupReveal();
    setupScrollEffects();
    setupAccordions();
    setupActiveNav();
    requestAnimationFrame(() => document.documentElement.classList.add("page-ready"));
  });
})();
