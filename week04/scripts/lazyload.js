document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;

    const lastModifiedDate = document.lastModified;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
});

document.addEventListener("DOMContentLoaded", function() {
    const lazyImages = document.querySelectorAll("img.lazy-image");
  
    lazyImages.forEach(img => {
      img.addEventListener("load", () => {
        img.classList.add("loaded"); // Add 'loaded' class once image is fully loaded
      });
    });
});