document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const nav = document.querySelector(".nav");
  const overlay = document.getElementById("menuOverlay");

  if (mobileMenuBtn && nav && overlay) {
    const toggleMenu = () => {
      const isOpen = nav.classList.toggle("active");
      overlay.classList.toggle("active");
      mobileMenuBtn.querySelector("i").classList.toggle("fa-bars", !isOpen);
      mobileMenuBtn.querySelector("i").classList.toggle("fa-xmark", isOpen);
      document.body.style.overflow = isOpen ? "hidden" : ""; // Prevent scroll
    };

    mobileMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    const closeMenuBtn = document.getElementById("closeMenuBtn");
    if (closeMenuBtn) {
      closeMenuBtn.addEventListener("click", toggleMenu);
    }

    overlay.addEventListener("click", toggleMenu);

    // Fechar menu ao clicar em links
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (nav.classList.contains("active")) toggleMenu();
      });
    });
  }

  // Scroll Effects
  const header = document.querySelector(".header");
  const btnTop = document.getElementById("btnScrollTop");

  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    if (btnTop) {
      if (window.scrollY > 300) btnTop.classList.add("visible");
      else btnTop.classList.remove("visible");
    }
  });

  if (btnTop) {
    btnTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
