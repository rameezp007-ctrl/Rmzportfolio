(function () {
  "use strict";

  const rooms = {
    "living-room": {
      title: "Living Room",
      description: "Contemporary social spaces exploring double-height volumes, sculptural furniture, feature walls, integrated lighting and indoor-outdoor connections.",
      sources: ["assets/hero-interior.png", "assets/living-room-02.png", "assets/living-room-03.png"]
    },
    "master-bedroom": {
      title: "Master Bedroom",
      description: "Refined private suites exploring upholstered feature walls, integrated wardrobes, calm reading corners, layered lighting and hotel-inspired comfort.",
      sources: ["assets/interior-bedroom.png", "assets/master-bedroom-02.png", "assets/master-bedroom-03.png"]
    },
    kitchen: {
      title: "Kitchen",
      description: "Open-plan kitchens exploring stone islands, bespoke cabinetry, integrated appliances, dark and light palettes, and clean functional circulation.",
      sources: ["assets/interior-kitchen.png", "assets/kitchen-02.png", "assets/kitchen-03.png"]
    },
    bathroom: {
      title: "Bathroom",
      description: "Spa-inspired bathrooms exploring natural stone, sculptural baths, walk-in showers, floating vanities, courtyards and atmospheric lighting.",
      sources: ["assets/interior-bathroom.png", "assets/bathroom-02.png", "assets/bathroom-03.png"]
    },
    "dining-room": {
      title: "Dining Room",
      description: "Formal and casual dining environments exploring statement lighting, sculptural tables, custom seating, garden views and hospitality-focused layouts.",
      sources: ["assets/interior-dining.png", "assets/dining-room-02.png", "assets/dining-room-03.png"]
    },
    "entrance-hall": {
      title: "Entrance Hall",
      description: "Arrival spaces exploring floating stairs, gallery corridors, double-height foyers, art, water features and strong architectural perspectives.",
      sources: ["assets/interior-entrance-hall.png", "assets/entrance-hall-02.png", "assets/entrance-hall-03.png"]
    }
  };

  const params = new URLSearchParams(window.location.search);
  const roomKey = rooms[params.get("room")] ? params.get("room") : "living-room";
  const room = rooms[roomKey];
  const renderCount = room.sources.length;
  const positions = ["50% 50%", "35% 45%", "65% 50%", "50% 32%", "42% 60%", "72% 42%", "28% 55%", "58% 62%", "48% 38%", "62% 54%"];
  const sizeClasses = ["render-wide", "render-standard", "render-tall", "render-standard", "render-panorama", "render-standard", "render-tall", "render-wide", "render-standard", "render-panorama"];
  const grid = document.querySelector("[data-room-grid]");

  document.title = `${room.title} 3D Gallery — Rameez Pallikkalakam`;
  document.querySelectorAll("[data-room-title]").forEach((item) => { item.textContent = room.title; });
  document.querySelectorAll("[data-room-count]").forEach((item) => { item.textContent = String(renderCount).padStart(2, "0"); });
  document.querySelectorAll("[data-room-range]").forEach((item) => { item.textContent = `01—${String(renderCount).padStart(2, "0")}`; });
  const description = document.querySelector("[data-room-description]");
  if (description) description.textContent = room.description;
  const hero = document.querySelector("[data-room-hero]");
  if (hero) {
    hero.src = room.sources[0];
    hero.alt = `${room.title} 3D visualization`;
  }

  if (grid) {
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < renderCount; index += 1) {
      const source = room.sources[index];
      const number = String(index + 1).padStart(2, "0");
      const card = document.createElement("button");
      card.type = "button";
      card.className = `room-render-card ${sizeClasses[index % sizeClasses.length]}`;
      card.dataset.preview = source;
      card.dataset.title = `${room.title} — Render ${number}`;
      card.style.setProperty("--focus", positions[index % positions.length]);
      card.style.setProperty("--zoom", String(1 + ((index % 5) * .025)));
      card.innerHTML = `<img src="${source}" loading="lazy" alt="${room.title} 3D render ${number}"><span class="room-render-number">${number}</span><span class="room-render-copy"><small>Interior / 3D Visualization</small><strong>${room.title}</strong><i>View full image ↗</i></span>`;
      fragment.appendChild(card);
    }
    grid.appendChild(fragment);
  }
})();
