console.log("script.js loaded successfully");

// ===== Lightbox (click to enlarge) =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

// Only run if lightbox elements exist on the page
if (lightbox && lightboxImg) {
  document.querySelectorAll(".enlargeable").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex"; // Changed from "block" to "flex"
      lightboxImg.src = img.src;
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  lightbox.addEventListener("click", (e) => {
    // Close if clicking the background (but not the wrapper or image)
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
  // ```javascript
  }

  console.log("✅ Hamburger and navLinks found!");

  hamburger.addEventListener("click", () => {
    console.log("🍔 Hamburger clicked!");
    navLinks.classList.toggle("show");
  });

  // Dropdown menu toggle (for mobile click functionality)
  const dropdownLinks = document.querySelectorAll('.dropdown > a');
  
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Only prevent default and toggle on mobile/tablet
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.parentElement;
        
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
          if (otherDropdown !== dropdown) {
            otherDropdown.classList.remove('active');
          }
        });
        
        // Toggle current dropdown
        dropdown.classList.toggle('active');
      }
      // On desktop, let the link work normally (hover still works)
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
      });
    }
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

  // Form submission — show inline errors under each field (no alerts)
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const emelEl = document.getElementById('emel');
    const phoneEl = document.getElementById('phone');
    const emelError = document.getElementById('emelError');
    const phoneError = document.getElementById('phoneError');
    const emelField = document.getElementById('emelField');
    const phoneField = document.getElementById('phoneField');

    // clear previous errors
    emelError.textContent = '';
    phoneError.textContent = '';
    emelEl.classList.remove('input-invalid');
    phoneEl.classList.remove('input-invalid');
    emelField.classList.remove('has-error');
    phoneField.classList.remove('has-error');

    const emel = emelEl.value.trim();
    const phone = phoneEl.value.trim();

    let hasError = false;

    // Email validation: must contain @
    if (!emel || emel.indexOf('@') === -1) {
      emelError.textContent = 'Sila masukkan alamat emel yang sah.';
      emelEl.classList.add('input-invalid');
      emelField.classList.add('has-error');
      hasError = true;
    }

    // Phone validation: must start with 01 and be 10-11 digits
    const phonePattern = /^01\d{8,9}$/;
    if (!phonePattern.test(phone)) {
      phoneError.textContent = 'Sila masukkan nombor telefon yang sah.';
      phoneEl.classList.add('input-invalid');
      phoneField.classList.add('has-error');
      hasError = true;
    }

    if (hasError) {
      // keep popup open and let user correct
      return;
    }

    // No errors -> proceed with previous flow
    popup.style.display = 'none';
    welcomePopup.style.display = 'flex';
    sessionStorage.setItem('popupShown', 'true');

    const scriptURL = "https://script.google.com/macros/s/AKfycbwz7XG3NEy32RV1JGUlHrHZKrUjcf06sYxZSzEivrdzurcxTAXbh5pIrh2SjzQBJTA/exec";
    try {
      await fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: emel, phone }),
      });
    } catch (error) {
      console.error('Error!', error && error.message ? error.message : error);
    }
  });

  // Close welcome popup
  const closeWelcomePopup = () => {
    welcomePopup.style.display = "none";
  };

  closeWelcome.addEventListener('click', closeWelcomePopup);
  welcomeOk.addEventListener('click', closeWelcomePopup);

  // Clear errors as user types
  try {
    const _emel = document.getElementById('emel');
    const _phone = document.getElementById('phone');
    const _emelError = document.getElementById('emelError');
    const _phoneError = document.getElementById('phoneError');
    const _emelField = document.getElementById('emelField');
    const _phoneField = document.getElementById('phoneField');

    if (_emel) {
      _emel.addEventListener('input', () => {
        if (_emelError) _emelError.textContent = '';
        _emel.classList.remove('input-invalid');
        if (_emelField) _emelField.classList.remove('has-error');
      });
    }

    if (_phone) {
      _phone.addEventListener('input', () => {
        if (_phoneError) _phoneError.textContent = '';
        _phone.classList.remove('input-invalid');
        if (_phoneField) _phoneField.classList.remove('has-error');
      });
    }
  } catch (err) {
    // non-critical
  }
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

// === FAQ Accordion Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const faqCategories = document.querySelectorAll('.faq-category-header');
  
  faqCategories.forEach(header => {
    header.addEventListener('click', () => {
      const category = header.parentElement;
      const isActive = category.classList.contains('active');
      
      // Close all other categories
      document.querySelectorAll('.faq-category').forEach(cat => {
        cat.classList.remove('active');
      });
      
      // Toggle current category
      if (!isActive) {
        category.classList.add('active');
      }
    });
  });
});

// === Support Widget Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const supportIcon = document.getElementById('supportIcon');
  const supportFormContainer = document.getElementById('supportFormContainer');
  const supportClose = document.getElementById('supportClose');
  const supportForm = document.getElementById('supportForm');

  // Toggle form visibility
  if (supportIcon) {
    supportIcon.addEventListener('click', () => {
      supportFormContainer.classList.toggle('show');
    });
  }

  // Close form
  if (supportClose) {
    supportClose.addEventListener('click', () => {
      supportFormContainer.classList.remove('show');
    });
  }

  // Handle form submission
  if (supportForm) {
    supportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('supportName').value.trim();
      const phone = document.getElementById('supportPhone').value.trim();
      const email = document.getElementById('supportEmail').value.trim();
      const question = document.getElementById('supportQuestion').value.trim();

      // Validate phone number (Malaysian format)
      const phoneRegex = /^01\d{8,9}$/;
      if (!phoneRegex.test(phone)) {
        alert('Sila masukkan nombor telefon yang sah (bermula dengan 01 dan 10-11 digit)');
        return;
      }

      // Create WhatsApp message
      const whatsappNumber = '601118558600'; // Your WhatsApp number (without + and spaces)
      let message = `*Pertanyaan Baru dari Website SMTAA*\n\n`;
      message += `👤 *Nama:* ${name}\n`;
      message += `📱 *Telefon:* ${phone}\n`;
      if (email) {
        message += `📧 *Email:* ${email}\n`;
      }
      message += `\n❓ *Soalan:*\n${question}`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Open WhatsApp with pre-filled message
      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(whatsappURL, '_blank');

      // Optional: Save to localStorage for record keeping
      const inquiry = {
        timestamp: new Date().toISOString(),
        name: name,
        phone: phone,
        email: email,
        question: question
      };

      // Get existing inquiries or create new array
      let inquiries = JSON.parse(localStorage.getItem('smtaaInquiries') || '[]');
      inquiries.push(inquiry);
      localStorage.setItem('smtaaInquiries', JSON.stringify(inquiries));

      // Reset form and close
      supportForm.reset();
      supportFormContainer.classList.remove('show');
      
      // Show success message
      alert('Terima kasih! Soalan anda akan dibuka di WhatsApp. Sila hantar mesej tersebut.');
    });
  }

  // Close form when clicking outside
  document.addEventListener('click', (e) => {
    if (supportFormContainer && 
        supportFormContainer.classList.contains('show') &&
        !supportFormContainer.contains(e.target) &&
        !supportIcon.contains(e.target)) {
      supportFormContainer.classList.remove('show');
    }
  });
});

// === Dropdown arrow toggle (Hubungi → FAQs) ===
document.addEventListener('DOMContentLoaded', () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const arrow = dropdown.querySelector('.dropdown-arrow');
    const link = dropdown.querySelector('a'); // "Hubungi"
    const content = dropdown.querySelector('.dropdown-content');

    if (arrow) {
      arrow.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        content.classList.toggle('active');
      });
    }

    // Ensure Hubungi link works normally on mobile
    link.addEventListener('click', (e) => {
      // Only apply this fix for small screens
      if (window.innerWidth <= 768) {
        // Let the browser navigate normally
        window.location.href = link.getAttribute('href');
      }
    });
  });
});

