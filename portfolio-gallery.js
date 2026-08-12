(function () {
  "use strict";

  const grid = document.querySelector("[data-original-project-grid]");
  const status = document.querySelector("[data-original-project-status]");
  const filters = document.querySelectorAll("[data-project-filter]");
  if (!grid) return;

  const collections = [
    { key: "interior", label: "Interior & 3D Visualization", title: "Interior Project", count: 39 },
    { key: "graphic", label: "Graphic Design", title: "Graphic Design Project", count: 21 },
    { key: "logo", label: "Logo & Brand Identity", title: "Logo Project", count: 15 },
    { key: "drawing", label: "Technical Drawing", title: "Drawing Project", count: 6 }
  ];

  const projectItems = collections.flatMap((collection) =>
    Array.from({ length: collection.count }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");
      const extension = collection.key === "graphic" && (index === 10 || index === 11) ? "png" : "jpg";
      return {
        ...collection,
        number,
        path: `assets/old-portfolio/${collection.key}-${number}.${extension}`
      };
    })
  );

  grid.innerHTML = projectItems.map((project, index) => `
    <button class="original-project-card" type="button" data-project-kind="${project.key}" data-preview="${project.path}" data-title="${project.title} ${project.number}">
      <img src="${project.path}" alt="${project.title} ${project.number} by Rameez Pallikkalakam" loading="lazy" decoding="async">
      <span class="original-project-rp" aria-hidden="true">RP</span>
      <span class="original-project-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="original-project-copy">
        <small>${project.label}</small>
        <strong>${project.title} ${project.number}</strong>
        <i>Original portfolio work · View full image ↗</i>
      </span>
    </button>
  `).join("");

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.projectFilter;
      let visible = 0;

      filters.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });

      grid.querySelectorAll(".original-project-card").forEach((card) => {
        const show = selected === "all" || card.dataset.projectKind === selected;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (status) {
        const selectedLabel = button.childNodes[0].textContent.trim();
        status.textContent = `Showing ${visible} ${selectedLabel.toLowerCase()} project${visible === 1 ? "" : "s"}`;
      }
    });
  });
})();
