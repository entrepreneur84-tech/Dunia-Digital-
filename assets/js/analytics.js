// assets/js/analytics.js

document.addEventListener("DOMContentLoaded", function() {
  // Simple page view counter
  if(!localStorage.getItem("pageViews")) {
    localStorage.setItem("pageViews", 0);
  }
  let views = parseInt(localStorage.getItem("pageViews"));
  views += 1;
  localStorage.setItem("pageViews", views);
  console.log(`Anda sudah mengunjungi halaman ini ${views} kali.`);

  // Track Beli Sekarang clicks
  const buyButtons = document.querySelectorAll(".btn");
  buyButtons.forEach(button => {
    button.addEventListener("click", function() {
      const productTitle = this.closest(".card").querySelector(".title").textContent;
      console.log(`Produk dibeli: ${productTitle}`);
      // Bisa dihubungkan ke server / Google Analytics
    });
  });

});
