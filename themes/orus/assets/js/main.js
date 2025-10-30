/****
Color Toggle
*****/

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn-toggle");
  const sun = document.getElementById("icon-sun");
  const moon = document.getElementById("icon-moon");

  if (!btn) return;

  const setIcon = (theme) => {
    if (theme === "dark") {
      moon.style.display = "none";
      sun.style.display = "inline";
    } else {
      sun.style.display = "none";
      moon.style.display = "inline";
    }
  };

  // Load theme from storage or fall back to system preference (or dark default)
  let currentTheme = localStorage.getItem("theme");

  if (!currentTheme) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      currentTheme = "dark"; // respect OS dark
    } else {
      currentTheme = "dark"; // still default to dark if no pref
    }
    localStorage.setItem("theme", currentTheme);
  }

  document.documentElement.setAttribute("data-theme", currentTheme);
  setIcon(currentTheme);

  // Toggle on click
  btn.addEventListener("click", () => {
    const html = document.documentElement;
    let theme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    setIcon(theme);
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
