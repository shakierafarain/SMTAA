console.log("script.js loaded successfully");

// ===== Lightbox (click to enlarge) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Only run if lightbox elements exist on the page
if (lightbox && lightboxImg) {
  document.querySelectorAll(".enlargeable").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "block";
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keyword = searchInput.value.trim().toLowerCase();
      if (!keyword) return;

      // Map keywords to pages
      const routes = {
        "pengenalan": "index.html",
        "syarat": "index.html",
        "kelebihan": "index.html",
        "spm": "pembelajaran.html",
        "pembelajaran": "pembelajaran.html",
        "etika": "pembelajaran.html",
        "pengajian": "pembelajaran.html",
        "halatuju": "pembelajaran.html",
        "fasiliti": "fasiliti.html",
        "surau": "fasiliti.html",
        "ruangan pelajar": "fasiliti.html",
        "kelas": "fasiliti.html",
        "pengangkutan": "fasiliti.html",
        "bas": "fasiliti.html",
        "asrama": "fasiliti.html",
        "dewan": "fasiliti.html",
        "kafeteria": "fasiliti.html",
        "atm": "fasiliti.html",
        "parking": "fasiliti.html",
        "pengawal": "fasiliti.html",
        "aktiviti": "fasiliti.html",
        "bangunan": "fasiliti.html",
        "testimoni": "testimoni.html",
        "batch": "testimoni.html",
        "alamat": "hubungi.html",
        "alamat": "hubungi.html",
        "hubungi": "hubungi.html",
        "whatsapp": "hubungi.html",
        "laman web": "hubungi.html",
        "instagram": "hubungi.html",
        "facebook": "hubungi.html",
        "tiktok": "hubungi.html",
      };

      let targetPage = "index.html"; // default
      for (const key in routes) {
        if (keyword.includes(key)) {
          targetPage = routes[key];
          break;
        }
      }

      window.location.href = `${targetPage}?search=${encodeURIComponent(keyword)}`;
    });
  }

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

document.addEventListener("DOMContentLoaded", () => {
  console.log("script.js loaded successfully");

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (!hamburger) {
    console.error("❌ Hamburger element not found in DOM!");
    return;
  }

  if (!navLinks) {
    console.error("❌ navLinks element not found in DOM!");
    return;
  }

  console.log("✅ Hamburger and navLinks found!");

  hamburger.addEventListener("click", () => {
    console.log("🍔 Hamburger clicked!");
    navLinks.classList.toggle("show");
  });
});


function openModal(id) {
      document.getElementById(id).style.display = "flex";
    }
    function closeModal(id) {
      document.getElementById(id).style.display = "none";
    }
    window.onclick = function(e) {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(modal => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }

// === Popup logic ===
window.addEventListener('load', () => {
  const popup = document.getElementById('userPopup');
  const closeBtn = document.getElementById('closePopup');
  const form = document.getElementById('popupForm');
  const welcomePopup = document.getElementById('welcomePopup');
  const closeWelcome = document.getElementById('closeWelcome');
  const welcomeOk = document.getElementById('welcomeOk');

  // Show popup only once per session
  if (!sessionStorage.getItem('popupShown')) {
    popup.style.display = 'flex';
  }

  // Close registration popup manually
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
    sessionStorage.setItem('popupShown', 'true');
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('emel').value;
    const phone = document.getElementById('phone').value;

    const scriptURL = "https://script.google.com/macros/s/AKfycbwz7XG3NEy32RV1JGUlHrHZKrUjcf06sYxZSzEivrdzurcxTAXbh5pIrh2SjzQBJTA/exec";
    
    // ✅ Phone validation
    const phonePattern = /^01\d{8,9}$/;
    if (!phonePattern.test(phone)) {
      alert("Sila masukkan nombor telefon yang sah (bermula dengan 01 dan 10-11 digit).");
      return;
    }

    // Close registration popup
    popup.style.display = "none";

    // ✅ Show welcome popup instead of alert
    welcomePopup.style.display = "flex";

    // Mark popup as shown (so it won’t appear again)
    sessionStorage.setItem("popupShown", "true");

    // Send data asynchronously (non-blocking)
    try {
      await fetch(scriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone }),
      });
    } catch (error) {
      console.error("Error!", error.message);
    }
  });

  // Close welcome popup
  const closeWelcomePopup = () => {
    welcomePopup.style.display = "none";
  };

  closeWelcome.addEventListener('click', closeWelcomePopup);
  welcomeOk.addEventListener('click', closeWelcomePopup);
});

// === Lightbox logic ===
document.querySelectorAll('.popup-img').forEach(img => {
  img.addEventListener('click', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = img.src;
    lightbox.style.display = 'block';
  });
});
