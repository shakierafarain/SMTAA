// ===== Swiper Initialization for Pelajar Terbaik =====
document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1024: {
        slidesPerView: 3, // Desktop
      },
      768: {
        slidesPerView: 2, // Tablet
      },
      480: {
        slidesPerView: 1, // Mobile
      },
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (!searchForm) return;

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    // Map keywords to pages
    const routes = {
      "pengenalan": "index.html",
      "syarat": "index.html",
      "spm": "pembelajaran.html",
      "pembelajaran": "pembelajaran.html",
      "kelebihan": "pembelajaran.html",
      "pengajian": "pembelajaran.html",
      "fasiliti": "fasiliti.html",
      "surau": "fasiliti.html",
      "pelajar": "fasiliti.html",
      "testimoni": "testimoni.html",
      "batch": "testimoni.html",
      "kelas": "fasiliti.html",
      "pengangkutan": "fasiliti.html",
      "bas": "fasiliti.html",
      "smart tahfiz": "fasiliti.html",
    };

    // Pick destination
    let targetPage = "index.html"; // default
    for (const key in routes) {
      if (keyword.includes(key)) {
        targetPage = routes[key];
        break;
      }
    }

    // Redirect with keyword in query string
    window.location.href = `${targetPage}?search=${encodeURIComponent(keyword)}`;
  });

  // Highlight function on each page
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get("search");
  if (searchTerm) {
    highlightAndScroll(searchTerm);
  }
});

// Highlight + scroll to first match
function highlightAndScroll(term) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  const regex = new RegExp(term, "gi");
  let firstMatchElement = null;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (regex.test(node.nodeValue)) {
      const span = document.createElement("mark");
      span.innerHTML = node.nodeValue.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      const wrapper = document.createElement("span");
      wrapper.innerHTML = span.innerHTML;
      node.parentNode.replaceChild(wrapper, node);

      if (!firstMatchElement) {
        firstMatchElement = wrapper.querySelector(".highlight");
      }
    }
  }

  if (firstMatchElement) {
    firstMatchElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}