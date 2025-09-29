/****
Color Toggle
*****/

const btn = document.querySelector(".btn-toggle");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);

});

/****
Lightbox
*****/


document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = lightbox.querySelector(".close");
  const nextBtn = lightbox.querySelector(".next");
  const prevBtn = lightbox.querySelector(".prev");

  const images = Array.from(gallery.querySelectorAll("img"));
  let currentIndex = 0;

function showLightbox(index) {
  currentIndex = index;
  lightboxImg.classList.add("fade-out");
  setTimeout(() => {
    lightboxImg.src = images[currentIndex].dataset.full;
    lightboxImg.classList.remove("fade-out");
  }, 150);
  lightbox.style.display = "flex";
}

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
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

  // Lightbox buttons
  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

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
