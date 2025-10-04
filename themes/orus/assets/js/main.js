/****
Color Toggle
*****/

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-toggle");
  if (!btn) return;

  // Load saved theme or fallback to auto
  const currentTheme = localStorage.getItem("theme") || "auto";
  if (currentTheme !== "auto") {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  btn.addEventListener("click", () => {
    const html = document.documentElement;
    let theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});


/****
hamburger
*****/

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active"); // toggle menu visibility
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);
  });
});


/****
Lightbox
*****/


document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox.querySelector(".close");

  const images = Array.from(gallery.querySelectorAll("img"));
  let currentIndex = 0;

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  }

  function showLightbox(index) {
    currentIndex = index;
    lightboxImg.classList.add("fade-out");
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].dataset.full;
      lightboxImg.classList.remove("fade-out");
    }, 150);
    lightbox.style.display = "flex";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.classList.add("fade-out");
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].dataset.full;
      lightboxImg.classList.remove("fade-out");
    }, 150);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.classList.add("fade-out");
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].dataset.full;
      lightboxImg.classList.remove("fade-out");
    }, 150);
  }

  // Thumbnail click
  images.forEach((img, i) => {
    img.addEventListener("click", () => showLightbox(i));
  });

  // Close button click
  closeBtn.addEventListener("click", closeLightbox);

  // Click on image itself -> next
  lightboxImg.addEventListener("click", nextImage);

  // Click outside image -> close
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
});
