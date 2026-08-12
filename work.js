(function () {
  "use strict";

  const lightbox = document.querySelector(".work-lightbox");
  const preview = lightbox?.querySelector("img");
  const caption = lightbox?.querySelector("figcaption");
  const closeButton = lightbox?.querySelector(".lightbox-close");

  function closePreview() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove("lightbox-open");
  }

  document.querySelectorAll("[data-preview]").forEach((card) => {
    card.addEventListener("click", () => {
      if (!lightbox || !preview || !caption) return;
      preview.src = card.dataset.preview;
      preview.alt = card.dataset.title;
      caption.textContent = card.dataset.title;
      lightbox.hidden = false;
      document.body.classList.add("lightbox-open");
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener("click", closePreview);
  lightbox?.addEventListener("click", (event) => { if (event.target === lightbox) closePreview(); });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closePreview(); });
  document.querySelectorAll("[data-year]").forEach((item) => { item.textContent = new Date().getFullYear(); });
})();
