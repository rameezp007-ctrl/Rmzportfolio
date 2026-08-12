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

  const cdnBase = "https://custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1920,f_auto,q_auto/15915785";
  const projectSources = {
    interior: [
      "50592_619138.jpeg", "679743_504656.jpeg", "863048_433898.jpeg", "785165_891114.jpeg", "728179_541762.jpeg",
      "25544_790456.jpeg", "203159_666527.jpeg", "582697_463010.jpeg", "433465_202339.jpeg", "267728_547056.jpeg",
      "564970_468371.jpeg", "69680_315342.jpeg", "686146_411493.jpeg", "520979_743255.jpeg", "58526_557977.jpeg",
      "774938_341406.jpeg", "860649_469452.jpeg", "197988_71605.jpeg", "72339_517751.jpeg", "539611_797592.jpeg",
      "739864_695956.jpeg", "505544_593917.jpeg", "838535_61989.jpeg", "830031_603339.jpeg", "588579_828970.jpeg",
      "38055_793290.jpeg", "285486_554826.jpeg", "200212_824082.jpeg", "426814_277220.jpeg", "203840_418830.jpeg",
      "102969_424249.jpeg", "18550_921938.jpeg", "102046_569348.jpeg", "828596_161447.jpeg", "286458_921679.jpeg",
      "953407_180233.jpeg", "828707_145577.jpeg", "827070_269360.jpeg", "301118_327652.jpeg"
    ],
    graphic: [
      "728657_344763.jpeg", "693427_347251.jpeg", "883862_213251.jpeg", "8504_229390.jpeg", "256275_725506.jpeg",
      "647560_900898.jpeg", "696423_196537.jpeg", "954922_65297.jpeg", "25415_176262.jpeg", "906698_623140.jpeg",
      "262887_681258.png", "742343_227842.png", "305469_294078.jpeg", "895453_963891.jpeg", "280820_124951.jpeg",
      "14014_591934.jpeg", "81877_279843.jpeg", "646751_61504.jpeg", "459769_226846.jpeg", "1399_521207.jpeg", "933486_274933.jpeg"
    ],
    logo: [
      "698036_688222.jpeg", "175596_821170.jpeg", "80004_878470.jpeg", "993377_700908.jpeg", "680372_382394.jpeg",
      "44872_545490.jpeg", "612109_189610.jpeg", "644524_528456.jpeg", "242405_64794.jpeg", "169374_677585.jpeg",
      "360817_146118.jpeg", "426781_177589.jpeg", "294708_17525.jpeg", "796534_42346.jpeg", "75491_595391.jpeg"
    ],
    drawing: [
      "959212_24139.jpeg", "335536_772272.jpeg", "69618_312703.jpeg", "105060_62995.jpeg", "1878_738312.jpeg", "930091_592236.jpeg"
    ]
  };

  const projectItems = collections.flatMap((collection) =>
    Array.from({ length: collection.count }, (_, index) => {
      const number = String(index + 1).padStart(2, "0");
      return {
        ...collection,
        number,
        path: `${cdnBase}/${projectSources[collection.key][index]}`
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
