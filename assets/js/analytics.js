/* ======================================
   DUNIA DIGITAL SHOP - ANALYTICS.JS
   Fungsi:
   - Tracking page view
   - Tracking klik tombol beli
   - Siap dikembangkan untuk Google Analytics / custom tracking
====================================== */

// ==============================
// PAGE VIEW TRACKING
// ==============================
function trackPageView(page) {
  console.log(`📊 Page viewed: ${page}`);
  // Di sini bisa kirim data ke server atau GA
}

// ==============================
// BUTTON CLICK TRACKING
// ==============================
function trackButtonClick(product) {
  console.log(`🛒 Tombol beli diklik: ${product}`);
  // Bisa kirim ke server / GA
}

// ==============================
// AUTO PAGE VIEW ON LOAD
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname;
  trackPageView(page);

  // Tambahkan listener untuk semua tombol beli
  document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest(".card");
      const title = card ? card.querySelector(".title").textContent : "Unknown";
      trackButtonClick(title);
    });
  });
});
